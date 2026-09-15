/**
 * Workforce Domain Types
 *
 * Auto-generated from OpenAPI spec
 * Generator: types-generator v2.0.0
 *
 * This file re-exports types from generated OpenAPI types and adds
 * convenient type aliases for handlers (response types, etc.)
 *
 * ⚠️ DO NOT EDIT MANUALLY - this file is auto-generated
 */

import type { components, operations } from "../openapi/workforce.openapi.types";

// ============================================================================
// Re-export all generated types
// ============================================================================
// Note: components and operations are exported here but should be accessed via namespace
// in main index.ts to avoid duplicate export errors (e.g., blockchain.types.components)

export type { components, operations };


// ============================================================================
// Convenient Type Aliases for Schemas
// ============================================================================

export type BionicRoleMap = components["schemas"]["BionicRoleMap"];
export type BionicRoleMapCreate = components["schemas"]["BionicRoleMapCreate"];
export type BionicRoleMapId = components["schemas"]["BionicRoleMapId"];
export type BionicRoleMapListData = components["schemas"]["BionicRoleMapListData"];
export type BionicRoleMapSignoff = components["schemas"]["BionicRoleMapSignoff"];
export type WorkforceMap = operations["listBionicRoleMaps"]["responses"]["200"]["content"]["application/json"]["data"];


// ============================================================================
// Operation Input Types (Request Bodies)
// ============================================================================

// These types represent the input data for create/update operations

export type CreateBionicRoleMapRequestInput = NonNullable<operations["createBionicRoleMap"]["requestBody"]>["content"]["application/json"];
export type SignBionicRoleMapRequestInput = NonNullable<operations["signBionicRoleMap"]["requestBody"]>["content"]["application/json"];


// ============================================================================
// Operation Parameter Types (Query/Path Parameters)
// ============================================================================

// These types represent parameters for operations without request bodies.
// Aligned with get_input_schema_or_type_name for consistent naming across generators.

export type ListBionicRoleMapsParams = NonNullable<operations["listBionicRoleMaps"]["parameters"]["query"]>;
export type GetBionicRoleMapParams = operations["getBionicRoleMap"]["parameters"]["path"];
export type SignBionicRoleMapParams = operations["signBionicRoleMap"]["parameters"]["path"];


// ============================================================================
// Operation Response Types
// ============================================================================

// These types are used by handlers for type-safe response envelopes

export type ListBionicRoleMapsResponse = operations["listBionicRoleMaps"]["responses"]["200"]["content"]["application/json"];
export type CreateBionicRoleMapResponse = operations["createBionicRoleMap"]["responses"]["201"]["content"]["application/json"];
export type GetBionicRoleMapResponse = operations["getBionicRoleMap"]["responses"]["200"]["content"]["application/json"];
export type SignBionicRoleMapResponse = operations["signBionicRoleMap"]["responses"]["200"]["content"]["application/json"];


