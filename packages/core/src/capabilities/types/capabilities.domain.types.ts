/**
 * Capabilities Domain Types
 *
 * Auto-generated from OpenAPI spec
 * Generator: types-generator v2.0.0
 *
 * This file re-exports types from generated OpenAPI types and adds
 * convenient type aliases for handlers (response types, etc.)
 *
 * ⚠️ DO NOT EDIT MANUALLY - this file is auto-generated
 */

import type { components, operations } from "../openapi/capabilities.openapi.types";

// ============================================================================
// Domain Types Export - Domain-specific types only (excludes components/operations)
// ============================================================================
// This file exports domain-specific types for use in main index.ts
// components and operations are NOT exported here to avoid duplicate export errors
// Access components/operations via namespace: domain.types.components

// ============================================================================
// Convenient Type Aliases for Schemas
// ============================================================================

export type Capability = components["schemas"]["Capability"];
export type CapabilityCreate = components["schemas"]["CapabilityCreate"];
export type CapabilityId = components["schemas"]["CapabilityId"];
export type CapabilityListData = components["schemas"]["CapabilityListData"];
export type CapabilityUpdate = components["schemas"]["CapabilityUpdate"];
export type DisruptiveForce = components["schemas"]["DisruptiveForce"];
export type RegionalConstraint = components["schemas"]["RegionalConstraint"];
export type RegionalConstraintCreate = components["schemas"]["RegionalConstraintCreate"];
export type RegionalConstraintId = components["schemas"]["RegionalConstraintId"];
export type RegionalConstraintListData = components["schemas"]["RegionalConstraintListData"];
export type ValueChainPosition = components["schemas"]["ValueChainPosition"];
export type ForceTagRequest = components["schemas"]["ForceTagRequest"];


// ============================================================================
// Operation Input Types (Request Bodies)
// ============================================================================

// These types represent the input data for create/update operations

export type CreateCapabilityRequestInput = NonNullable<operations["createCapability"]["requestBody"]>["content"]["application/json"];
export type UpdateCapabilityRequestInput = NonNullable<operations["updateCapability"]["requestBody"]>["content"]["application/json"];
export type UpdateCapabilityRequest = UpdateCapabilityRequestInput;
export type TagCapabilityForcesRequestInput = NonNullable<operations["tagCapabilityForces"]["requestBody"]>["content"]["application/json"];
export type CreateRegionalConstraintRequestInput = NonNullable<operations["createRegionalConstraint"]["requestBody"]>["content"]["application/json"];


// ============================================================================
// Operation Parameter Types (Query/Path Parameters)
// ============================================================================

// These types represent parameters for operations without request bodies.
// Aligned with get_input_schema_or_type_name for consistent naming across generators.

export type ListCapabilitiesParams = NonNullable<operations["listCapabilities"]["parameters"]["query"]>;
export type GetCapabilityParams = operations["getCapability"]["parameters"]["path"];
export type UpdateCapabilityParams = operations["updateCapability"]["parameters"]["path"];
export type TagCapabilityForcesParams = operations["tagCapabilityForces"]["parameters"]["path"];
export type ListRegionalConstraintsParams = NonNullable<operations["listRegionalConstraints"]["parameters"]["query"]>;


// ============================================================================
// Operation Response Types
// ============================================================================

// These types are used by handlers for type-safe response envelopes

export type ListCapabilitiesResponse = operations["listCapabilities"]["responses"]["200"]["content"]["application/json"];
export type CreateCapabilityResponse = operations["createCapability"]["responses"]["201"]["content"]["application/json"];
export type GetCapabilityResponse = operations["getCapability"]["responses"]["200"]["content"]["application/json"];
export type UpdateCapabilityResponse = operations["updateCapability"]["responses"]["200"]["content"]["application/json"];
export type TagCapabilityForcesResponse = operations["tagCapabilityForces"]["responses"]["200"]["content"]["application/json"];
export type ListRegionalConstraintsResponse = operations["listRegionalConstraints"]["responses"]["200"]["content"]["application/json"];
export type CreateRegionalConstraintResponse = operations["createRegionalConstraint"]["responses"]["201"]["content"]["application/json"];


