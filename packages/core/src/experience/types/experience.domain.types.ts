/**
 * Experience Domain Types
 *
 * Auto-generated from OpenAPI spec
 * Generator: types-generator v2.0.0
 *
 * This file re-exports types from generated OpenAPI types and adds
 * convenient type aliases for handlers (response types, etc.)
 *
 * ⚠️ DO NOT EDIT MANUALLY - this file is auto-generated
 */

import type { components, operations } from "../openapi/experience.openapi.types";

// ============================================================================
// Domain Types Export - Domain-specific types only (excludes components/operations)
// ============================================================================
// This file exports domain-specific types for use in main index.ts
// components and operations are NOT exported here to avoid duplicate export errors
// Access components/operations via namespace: domain.types.components

// ============================================================================
// Convenient Type Aliases for Schemas
// ============================================================================

export type ExperienceMapId = components["schemas"]["ExperienceMapId"];
export type ExperienceOwnershipMap = components["schemas"]["ExperienceOwnershipMap"];
export type ExperienceOwnershipMapCreate = components["schemas"]["ExperienceOwnershipMapCreate"];
export type ExperienceOwnershipMapListData = components["schemas"]["ExperienceOwnershipMapListData"];
export type LiabilityTerms = components["schemas"]["LiabilityTerms"];
export type LiabilityTermsCreate = components["schemas"]["LiabilityTermsCreate"];
export type LiabilityTermsId = components["schemas"]["LiabilityTermsId"];
export type OwnerParty = components["schemas"]["OwnerParty"];
export type ExperienceMap = operations["listExperienceOwnershipMaps"]["responses"]["200"]["content"]["application/json"]["data"];


// ============================================================================
// Operation Input Types (Request Bodies)
// ============================================================================

// These types represent the input data for create/update operations

export type CreateExperienceOwnershipMapRequestInput = NonNullable<operations["createExperienceOwnershipMap"]["requestBody"]>["content"]["application/json"];
export type AttachLiabilityTermsRequestInput = NonNullable<operations["attachLiabilityTerms"]["requestBody"]>["content"]["application/json"];


// ============================================================================
// Operation Parameter Types (Query/Path Parameters)
// ============================================================================

// These types represent parameters for operations without request bodies.
// Aligned with get_input_schema_or_type_name for consistent naming across generators.

export type ListExperienceOwnershipMapsParams = NonNullable<operations["listExperienceOwnershipMaps"]["parameters"]["query"]>;
export type GetExperienceOwnershipMapParams = operations["getExperienceOwnershipMap"]["parameters"]["path"];
export type AttachLiabilityTermsParams = operations["attachLiabilityTerms"]["parameters"]["path"];
export type SignLiabilityTermsParams = operations["signLiabilityTerms"]["parameters"]["path"];


// ============================================================================
// Operation Response Types
// ============================================================================

// These types are used by handlers for type-safe response envelopes

export type ListExperienceOwnershipMapsResponse = operations["listExperienceOwnershipMaps"]["responses"]["200"]["content"]["application/json"];
export type CreateExperienceOwnershipMapResponse = operations["createExperienceOwnershipMap"]["responses"]["201"]["content"]["application/json"];
export type GetExperienceOwnershipMapResponse = operations["getExperienceOwnershipMap"]["responses"]["200"]["content"]["application/json"];
export type AttachLiabilityTermsResponse = operations["attachLiabilityTerms"]["responses"]["200"]["content"]["application/json"];
export type SignLiabilityTermsResponse = operations["signLiabilityTerms"]["responses"]["200"]["content"]["application/json"];


