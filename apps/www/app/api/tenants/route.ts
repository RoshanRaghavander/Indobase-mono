import { NextRequest, NextResponse } from 'next/server';
import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import { tenants } from '../../../../packages/common/tenancy/schema';
import { Tenant } from '../../../../packages/common/tenancy/types';
import { v4 as uuidv4 } from 'uuid';

// simple postgres connection (edge functions use serverless pool)
const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const db = drizzle(pool);

/** POST /api/tenants/create */
export async function POST(req: NextRequest) {
  const body = await req.json();
  const { name, slug, metadata } = body as Partial<Tenant>;
  if (!name || !slug) {
    return NextResponse.json({ success: false, error: 'name/slug required' }, { status: 400 });
  }

  const [inserted] = await db
    .insert(tenants)
    .values({ id: uuidv4(), name, slug, metadata: metadata || {} })
    .returning();

  return NextResponse.json({ success: true, data: inserted });
}

// GET list of tenants (could be limited to admins)
export async function GET(req: NextRequest) {
  const tenantIdClaim = req.headers.get('x-tenant-id');
  if (!tenantIdClaim) {
    return NextResponse.json({ success: false, error: 'missing tenant context' }, { status: 403 });
  }
  const rows = await db.select().from(tenants).where(tenants.id.eq(tenantIdClaim));
  return NextResponse.json({ success: true, data: rows });
}
