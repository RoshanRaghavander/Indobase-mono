export interface Tenant {
  id: string;
  name: string;
  slug: string;
  createdAt: string; // ISO timestamp
  metadata: Record<string, any>;
}

export interface TenantContext {
  tenantId: string;
  userId: string;
  role: 'owner' | 'admin' | 'member' | 'billing' | string;
}

// common API response wrappers
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
}

export interface TenantDetailResponse extends ApiResponse<Tenant> {}
export interface TenantListResponse extends ApiResponse<Tenant[]> {}
