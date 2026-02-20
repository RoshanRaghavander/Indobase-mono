import { NextRequest, NextResponse } from 'next/server';
import type { TenantContext } from './types';
import jwt from 'jsonwebtoken';

// simple middleware example for Next.js edge
export function withTenantContext(handler: (req: NextRequest, ctx: TenantContext) => Promise<NextResponse>) {
  return async (req: NextRequest) => {
    const auth = req.headers.get('authorization');
    if (!auth?.startsWith('Bearer ')) {
      return NextResponse.json({ success: false, error: 'unauthenticated' }, { status: 401 });
    }
    const token = auth.replace('Bearer ', '');
    let payload: any;
    try {
      payload = jwt.verify(token, process.env.JWT_SECRET as string);
    } catch (e) {
      return NextResponse.json({ success: false, error: 'invalid token' }, { status: 401 });
    }

    const tenantId = payload?.tenant_id;
    const userId = payload?.sub;
    const role = payload?.role;
    if (!tenantId || !userId) {
      return NextResponse.json({ success: false, error: 'missing tenant claim' }, { status: 403 });
    }

    const ctx: TenantContext = { tenantId, userId, role };
    return handler(req, ctx);
  };
}
