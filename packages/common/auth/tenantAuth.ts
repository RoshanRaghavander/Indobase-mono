import { issueToken, JwtPayload } from './jwt';
import { db } from './db-client'; // hypothetical shared database client

/**
 * Create a new user and assign to a tenant. Returns a JWT with tenant claim.
 */
export async function signUp(email: string, password: string, tenantId: string) {
  // create user record in auth table (could be Supabase/Gotrue)
  const user = await db.insert('auth_users').values({ email, password_hash: hash(password) }).returning('*');

  // link user to tenant_members
  await db.insert('tenant_members').values({ user_id: user.id, tenant_id: tenantId, role: 'member' });

  const payload: JwtPayload = {
    sub: user.id,
    tenant_id: tenantId,
    role: 'member',
  };

  const token = issueToken(payload);
  return { user, token };
}

/**
 * After authenticating via email/password or OAuth, generate a tenant-aware JWT.
 */
export function createSessionToken(userId: string, tenantId: string, role: string) {
  const payload: JwtPayload = { sub: userId, tenant_id: tenantId, role };
  return issueToken(payload);
}

function hash(pw: string) {
  // placeholder for bcrypt/argon
  return pw;
}
