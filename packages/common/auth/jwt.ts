import jwt from 'jsonwebtoken';

export interface JwtPayload {
  sub: string;            // user id
  tenant_id: string;      // tenant id
  role?: string;          // user role within tenant
  iat?: number;
  exp?: number;
}

const SECRET = process.env.JWT_SECRET || 'secret';

export function issueToken(payload: JwtPayload, opts?: jwt.SignOptions) {
  // ensure tenant_id & sub provided
  if (!payload.sub || !payload.tenant_id) {
    throw new Error('sub and tenant_id required');
  }
  return jwt.sign(payload, SECRET, { expiresIn: '1h', ...opts });
}

export function verifyToken(token: string) {
  return jwt.verify(token, SECRET) as JwtPayload;
}
