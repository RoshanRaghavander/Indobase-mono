import { pgTable, text, uuid, timestamp, jsonb, numeric } from 'drizzle-orm/pg-core';

export const tenants = pgTable('tenants', {
  id: uuid('id').defaultRandom().primaryKey(),
  name: text('name').notNull(),
  slug: text('slug').notNull().unique(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  metadata: jsonb('metadata').notNull().default('{}'),
});

export const tenantOrganizations = pgTable('tenant_organizations', {
  id: uuid('id').defaultRandom().primaryKey(),
  tenantId: uuid('tenant_id').notNull().references(() => tenants.id, { onDelete: 'cascade' }),
  name: text('name').notNull(),
  role: text('role').notNull(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
});

export const tenantMembers = pgTable('tenant_members', {
  userId: uuid('user_id').notNull(),
  tenantId: uuid('tenant_id').notNull().references(() => tenants.id, { onDelete: 'cascade' }),
  role: text('role').notNull(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
}, (table) => ({
  pk: primaryKey(table.userId, table.tenantId),
}));

export const tenantBilling = pgTable('tenant_billing', {
  tenantId: uuid('tenant_id').notNull().references(() => tenants.id, { onDelete: 'cascade' }).primaryKey(),
  plan: text('plan').notNull(),
  monthlySpend: numeric('monthly_spend').default(0),
  subscriptionStatus: text('subscription_status').notNull(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
});
