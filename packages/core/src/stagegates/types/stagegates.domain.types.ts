/**
 * Stagegates Domain Types
 *
 * Auto-generated from OpenAPI spec
 * Generator: types-generator v2.0.0
 *
 * This file re-exports types from generated OpenAPI types and adds
 * convenient type aliases for handlers (response types, etc.)
 *
 * ⚠️ DO NOT EDIT MANUALLY - this file is auto-generated
 */

import type { components, operations } from "../openapi/stagegates.openapi.types";

// ============================================================================
// Domain Types Export - Domain-specific types only (excludes components/operations)
// ============================================================================
// This file exports domain-specific types for use in main index.ts
// components and operations are NOT exported here to avoid duplicate export errors
// Access components/operations via namespace: domain.types.components

// ============================================================================
// Convenient Type Aliases for Schemas
// ============================================================================

export type EvidencePack = components["schemas"]["EvidencePack"];
export type EvidencePackCreate = components["schemas"]["EvidencePackCreate"];
export type EvidencePackId = components["schemas"]["EvidencePackId"];
export type StageGate = components["schemas"]["StageGate"];
export type StageGateCreate = components["schemas"]["StageGateCreate"];
export type StageGateId = components["schemas"]["StageGateId"];
export type StageGateListData = components["schemas"]["StageGateListData"];
export type StageGateOutcomeRequest = components["schemas"]["StageGateOutcomeRequest"];


// ============================================================================
// Operation Input Types (Request Bodies)
// ============================================================================

// These types represent the input data for create/update operations

export type CreateStageGateRequestInput = NonNullable<operations["createStageGate"]["requestBody"]>["content"]["application/json"];
export type SubmitEvidencePackRequestInput = NonNullable<operations["submitEvidencePack"]["requestBody"]>["content"]["application/json"];
export type DecideStageGateOutcomeRequestInput = NonNullable<operations["decideStageGateOutcome"]["requestBody"]>["content"]["application/json"];


// ============================================================================
// Operation Parameter Types (Query/Path Parameters)
// ============================================================================

// These types represent parameters for operations without request bodies.
// Aligned with get_input_schema_or_type_name for consistent naming across generators.

export type ListStageGatesParams = NonNullable<operations["listStageGates"]["parameters"]["query"]>;
export type GetStageGateParams = operations["getStageGate"]["parameters"]["path"];
export type GetEvidencePackParams = operations["getEvidencePack"]["parameters"]["path"];
export type SubmitEvidencePackParams = operations["submitEvidencePack"]["parameters"]["path"];
export type DecideStageGateOutcomeParams = operations["decideStageGateOutcome"]["parameters"]["path"];


// ============================================================================
// Operation Response Types
// ============================================================================

// These types are used by handlers for type-safe response envelopes

export type ListStageGatesResponse = operations["listStageGates"]["responses"]["200"]["content"]["application/json"];
export type CreateStageGateResponse = operations["createStageGate"]["responses"]["201"]["content"]["application/json"];
export type GetStageGateResponse = operations["getStageGate"]["responses"]["200"]["content"]["application/json"];
export type GetEvidencePackResponse = operations["getEvidencePack"]["responses"]["200"]["content"]["application/json"];
export type SubmitEvidencePackResponse = operations["submitEvidencePack"]["responses"]["201"]["content"]["application/json"];
export type DecideStageGateOutcomeResponse = operations["decideStageGateOutcome"]["responses"]["200"]["content"]["application/json"];


