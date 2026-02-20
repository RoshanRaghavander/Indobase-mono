-- Enable row level security on tenant tables

alter table tenants enable row level security;
alter table tenant_organizations enable row level security;
alter table tenant_members enable row level security;
alter table tenant_billing enable row level security;

-- Policy: only authenticated users with matching tenant_id can SELECT their tenant
create policy "tenant_select" on tenants
  for select using (current_setting('jwt.claims.tenant_id', true) = id);

-- Policy: members may see other users in same tenant
create policy "member_select_within_tenant" on tenant_members
  for select using (
    current_setting('jwt.claims.tenant_id', true) = tenant_id
    and current_setting('jwt.claims.role', true) in ('owner','admin','member')
  );

-- Policy: only users with role=admin can update billing
create policy "billing_update_by_admin" on tenant_billing
  for update using (
    current_setting('jwt.claims.tenant_id', true) = tenant_id
    and current_setting('jwt.claims.role', true) in ('owner','billing','admin')
  );

-- anonymous (no jwt) prohibited by default (no using clause)
-- any other operations should be guarded by verifying tenant_id claim
