import { describe, it, expect } from 'vitest';
import { POST } from '../../../apps/www/app/api/tenants/route';
import { NextRequest } from 'next/server';

function makeReq(body: any, headers: Record<string,string> = {}) {
  const req = new Request('https://indobase.fun/api/tenants/create', {
    method: 'POST',
    body: JSON.stringify(body),
    headers: { 'content-type': 'application/json', ...headers },
  }) as any as NextRequest;
  return req;
}

// note: this test hits the real DB connection; in CI you'd mock 'db' instead.
describe('tenant provisioning API', () => {
  it('refuses requests missing required fields', async () => {
    const res = await POST(makeReq({}));
    const json = await res.json();
    expect(res.status).toBe(400);
    expect(json.success).toBe(false);
  });
});
