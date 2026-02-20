-- Migration: create multi‑tenant foundation tables

create extension if not exists "uuid-ossp";

-- tenants table holds top–level tenant metadata
create table if not exists tenants (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  slug text unique not null,
  created_at timestamptz not null default now(),
  metadata jsonb not null default '{}'
);

-- organizations beloging to a tenant (optional)
create table if not exists tenant_organizations (
  id uuid primary key default uuid_generate_v4(),
  tenant_id uuid not null references tenants(id) on delete cascade,
  name text not null,
  role text not null,
  created_at timestamptz not null default now()
);
create index if not exists idx_tenant_organizations_tenant on tenant_organizations(tenant_id);

-- mapping of users to tenants with a role
create table if not exists tenant_members (
  user_id uuid not null,
  tenant_id uuid not null references tenants(id) on delete cascade,
  role text not null,
  created_at timestamptz not null default now(),
  primary key (user_id, tenant_id)
);
create index if not exists idx_tenant_members_tenant on tenant_members(tenant_id);

-- billing information per tenant
create table if not exists tenant_billing (
  tenant_id uuid primary key references tenants(id) on delete cascade,
  plan text not null,
  monthly_spend numeric default 0,
  subscription_status text not null,
  updated_at timestamptz not null default now()
);
create index if not exists idx_tenant_billing_tenant on tenant_billing(tenant_id);
