/**
 * Decisions Domain Types
 *
 * Auto-generated from OpenAPI spec
 * Generator: types-generator v2.0.0
 *
 * This file re-exports types from generated OpenAPI types and adds
 * convenient type aliases for handlers (response types, etc.)
 *
 * ⚠️ DO NOT EDIT MANUALLY - this file is auto-generated
 */

import type { components, operations } from "../openapi/decisions.openapi.types";

// ============================================================================
// Domain Types Export - Domain-specific types only (excludes components/operations)
// ============================================================================
// This file exports domain-specific types for use in main index.ts
// components and operations are NOT exported here to avoid duplicate export errors
// Access components/operations via namespace: domain.types.components

// ============================================================================
// Convenient Type Aliases for Schemas
// ============================================================================

export type CostCompare = components["schemas"]["CostCompare"];
export type CostCompareCreate = components["schemas"]["CostCompareCreate"];
export type CostCompareId = components["schemas"]["CostCompareId"];
export type CostCompareListData = components["schemas"]["CostCompareListData"];
export type DecisionClass = components["schemas"]["DecisionClass"];
export type DecisionClassCreate = components["schemas"]["DecisionClassCreate"];
export type DecisionClassListData = components["schemas"]["DecisionClassListData"];
export type DecisionId = components["schemas"]["DecisionId"];
export type PartnershipContract = components["schemas"]["PartnershipContract"];
export type PartnershipContractCreate = components["schemas"]["PartnershipContractCreate"];
export type PartnershipContractId = components["schemas"]["PartnershipContractId"];
export type PartnershipContractListData = components["schemas"]["PartnershipContractListData"];
export type PartnershipContractUpdate = components["schemas"]["PartnershipContractUpdate"];
export type ProfitPoolHypothesis = components["schemas"]["ProfitPoolHypothesis"];
export type ProfitPoolHypothesisCreate = components["schemas"]["ProfitPoolHypothesisCreate"];
export type ProfitPoolHypothesisListData = components["schemas"]["ProfitPoolHypothesisListData"];
export type ProfitPoolId = components["schemas"]["ProfitPoolId"];
export type ProfitPoolTestAttach = components["schemas"]["ProfitPoolTestAttach"];
export type Decision = operations["listDecisionClasses"]["responses"]["200"]["content"]["application/json"]["data"];


// ============================================================================
// Operation Input Types (Request Bodies)
// ============================================================================

// These types represent the input data for create/update operations

export type RecordDecisionClassRequestInput = NonNullable<operations["recordDecisionClass"]["requestBody"]>["content"]["application/json"];
export type CreateProfitPoolHypothesisRequestInput = NonNullable<operations["createProfitPoolHypothesis"]["requestBody"]>["content"]["application/json"];
export type AttachProfitPoolTestRequestInput = NonNullable<operations["attachProfitPoolTest"]["requestBody"]>["content"]["application/json"];
export type CreateCostCompareRequestInput = NonNullable<operations["createCostCompare"]["requestBody"]>["content"]["application/json"];
export type CreatePartnershipContractRequestInput = NonNullable<operations["createPartnershipContract"]["requestBody"]>["content"]["application/json"];
export type UpdatePartnershipContractRequestInput = NonNullable<operations["updatePartnershipContract"]["requestBody"]>["content"]["application/json"];
export type UpdatePartnershipContractRequest = UpdatePartnershipContractRequestInput;


// ============================================================================
// Operation Parameter Types (Query/Path Parameters)
// ============================================================================

// These types represent parameters for operations without request bodies.
// Aligned with get_input_schema_or_type_name for consistent naming across generators.

export type ListDecisionClassesParams = NonNullable<operations["listDecisionClasses"]["parameters"]["query"]>;
export type GetDecisionClassParams = operations["getDecisionClass"]["parameters"]["path"];
export type ListProfitPoolHypothesesParams = NonNullable<operations["listProfitPoolHypotheses"]["parameters"]["query"]>;
export type AttachProfitPoolTestParams = operations["attachProfitPoolTest"]["parameters"]["path"];
export type ListCostComparesParams = NonNullable<operations["listCostCompares"]["parameters"]["query"]>;
export type ListPartnershipContractsParams = NonNullable<operations["listPartnershipContracts"]["parameters"]["query"]>;
export type UpdatePartnershipContractParams = operations["updatePartnershipContract"]["parameters"]["path"];


// ============================================================================
// Operation Response Types
// ============================================================================

// These types are used by handlers for type-safe response envelopes

export type ListDecisionClassesResponse = operations["listDecisionClasses"]["responses"]["200"]["content"]["application/json"];
export type RecordDecisionClassResponse = operations["recordDecisionClass"]["responses"]["201"]["content"]["application/json"];
export type GetDecisionClassResponse = operations["getDecisionClass"]["responses"]["200"]["content"]["application/json"];
export type ListProfitPoolHypothesesResponse = operations["listProfitPoolHypotheses"]["responses"]["200"]["content"]["application/json"];
export type CreateProfitPoolHypothesisResponse = operations["createProfitPoolHypothesis"]["responses"]["201"]["content"]["application/json"];
export type AttachProfitPoolTestResponse = operations["attachProfitPoolTest"]["responses"]["200"]["content"]["application/json"];
export type ListCostComparesResponse = operations["listCostCompares"]["responses"]["200"]["content"]["application/json"];
export type CreateCostCompareResponse = operations["createCostCompare"]["responses"]["201"]["content"]["application/json"];
export type ListPartnershipContractsResponse = operations["listPartnershipContracts"]["responses"]["200"]["content"]["application/json"];
export type CreatePartnershipContractResponse = operations["createPartnershipContract"]["responses"]["201"]["content"]["application/json"];
export type UpdatePartnershipContractResponse = operations["updatePartnershipContract"]["responses"]["200"]["content"]["application/json"];


