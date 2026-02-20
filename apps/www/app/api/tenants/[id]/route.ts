import { NextRequest, NextResponse } from 'next/server';
import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import { tenants, tenantMembers } from '../../../../../packages/common/tenancy/schema';
import { TenantContext } from '../../../../../packages/common/tenancy/types';

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const db = drizzle(pool);

function getTenantContext(req: NextRequest): TenantContext | null {
  const tid = req.headers.get('x-tenant-id');
  const uid = req.headers.get('x-user-id');
  const role = req.headers.get('x-role');
  if (!tid || !uid || !role) return null;
  return { tenantId: tid, userId: uid, role: role as any };
}

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const ctx = getTenantContext(req);
  if (!ctx || ctx.tenantId !== params.id) {
    return NextResponse.json({ success: false, error: 'forbidden' }, { status: 403 });
  }
  const [tenant] = await db.select().from(tenants).where(tenants.id.eq(params.id));
  return NextResponse.json({ success: true, data: tenant });
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  const ctx = getTenantContext(req);
  if (!ctx || ctx.tenantId !== params.id || !['owner','admin'].includes(ctx.role)) {
    return NextResponse.json({ success: false, error: 'forbidden' }, { status: 403 });
  }
  const updates = await req.json();
  await db.update(tenants).set(updates).where(tenants.id.eq(params.id));
  return NextResponse.json({ success: true });
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  const ctx = getTenantContext(req);
  if (!ctx || ctx.tenantId !== params.id || ctx.role !== 'owner') {
    return NextResponse.json({ success: false, error: 'forbidden' }, { status: 403 });
  }
  await db.delete(tenants).where(tenants.id.eq(params.id));
  return NextResponse.json({ success: true });
}

// mount: POST /api/tenants/:id/members
export async function POST(req: NextRequest, { params }: { params: { id: string } }) {
  const path = new URL(req.url).pathname;
  if (path.endsWith('/members')) {
    const ctx = getTenantContext(req);
    if (!ctx || ctx.tenantId !== params.id || !['owner','admin'].includes(ctx.role)) {
      return NextResponse.json({ success: false, error: 'forbidden' }, { status: 403 });
    }
    const { userId, role } = await req.json();
    await db.insert(tenantMembers).values({ tenantId: params.id, userId, role });
    return NextResponse.json({ success: true });
  }
  return NextResponse.json({ success: false, error: 'not found' }, { status: 404 });
}
