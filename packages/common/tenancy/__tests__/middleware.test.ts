import { describe, it, expect } from 'vitest';
import { withTenantContext } from '../middleware';
import { issueToken } from '../../common/auth/jwt';
import { NextResponse } from 'next/server';

// helper to build a fake NextRequest-like object
function makeReq(auth?: string) {
  const headers = new Headers();
  if (auth) headers.set('authorization', auth);
  return { headers, url: 'https://indobase.fun/foo' } as any;
}

describe('withTenantContext middleware', () => {
  it('rejects requests without auth header', async () => {
    const handler = withTenantContext(async () => NextResponse.json({ success: true }));
    const res = await handler(makeReq());
    expect(res.status).toBe(401);
  });

  it('rejects invalid tokens', async () => {
    const handler = withTenantContext(async () => NextResponse.json({ success: true }));
    const res = await handler(makeReq('Bearer invalid')); 
    expect(res.status).toBe(401);
  });

  it('rejects tokens missing tenant claim', async () => {
    const bad = issueToken({ sub: 'user1', tenant_id: '' });
    const handler = withTenantContext(async () => NextResponse.json({ success: true }));
    const res = await handler(makeReq(`Bearer ${bad}`));
    expect(res.status).toBe(403);
  });

  it('calls wrapped handler with context', async () => {
    const token = issueToken({ sub: 'u1', tenant_id: 't1', role: 'admin' });
    const handler = withTenantContext(async (_req, ctx) => {
      expect(ctx).toEqual({ tenantId: 't1', userId: 'u1', role: 'admin' });
      return NextResponse.json({ success: true });
    });
    const res = await handler(makeReq(`Bearer ${token}`));
    expect(res.status).toBe(200);
  });

  it('issueToken produces a valid JWT with expected claims', () => {
    const token = issueToken({ sub: 'user42', tenant_id: 'tenantA', role: 'owner' });
    const payload = JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString());
    expect(payload.sub).toBe('user42');
    expect(payload.tenant_id).toBe('tenantA');
    expect(payload.role).toBe('owner');
  });
});
