/**
 * Dependencies Domain Types
 *
 * Auto-generated from OpenAPI spec
 * Generator: types-generator v2.0.0
 *
 * This file re-exports types from generated OpenAPI types and adds
 * convenient type aliases for handlers (response types, etc.)
 *
 * ⚠️ DO NOT EDIT MANUALLY - this file is auto-generated
 */

import type { components, operations } from "../openapi/dependencies.openapi.types";

// ============================================================================
// Re-export all generated types
// ============================================================================
// Note: components and operations are exported here but should be accessed via namespace
// in main index.ts to avoid duplicate export errors (e.g., blockchain.types.components)

export type { components, operations };


// ============================================================================
// Convenient Type Aliases for Schemas
// ============================================================================

export type SitDependency = components["schemas"]["SitDependency"];
export type SitDependencyCreate = components["schemas"]["SitDependencyCreate"];
export type SitDependencyId = components["schemas"]["SitDependencyId"];
export type SitDependencyListData = components["schemas"]["SitDependencyListData"];
export type SitDependencyUpdate = components["schemas"]["SitDependencyUpdate"];
export type SitLimitException = components["schemas"]["SitLimitException"];
export type SitLimitExceptionCreate = components["schemas"]["SitLimitExceptionCreate"];
export type SitLimitExceptionId = components["schemas"]["SitLimitExceptionId"];
export type SitLimitExceptionListData = components["schemas"]["SitLimitExceptionListData"];
export type SitSpendBlock = components["schemas"]["SitSpendBlock"];
export type Dependency = operations["listSitDependencies"]["responses"]["200"]["content"]["application/json"]["data"];
export type SitException = operations["listSitLimitExceptions"]["responses"]["200"]["content"]["application/json"]["data"];


// ============================================================================
// Operation Input Types (Request Bodies)
// ============================================================================

// These types represent the input data for create/update operations

export type RegisterSitDependencyRequestInput = NonNullable<operations["registerSitDependency"]["requestBody"]>["content"]["application/json"];
export type UpdateSitDependencyRequestInput = NonNullable<operations["updateSitDependency"]["requestBody"]>["content"]["application/json"];
export type UpdateSitDependencyRequest = UpdateSitDependencyRequestInput;
export type RequestSitLimitExceptionRequestInput = NonNullable<operations["requestSitLimitException"]["requestBody"]>["content"]["application/json"];


// ============================================================================
// Operation Parameter Types (Query/Path Parameters)
// ============================================================================

// These types represent parameters for operations without request bodies.
// Aligned with get_input_schema_or_type_name for consistent naming across generators.

export type ListSitDependenciesParams = NonNullable<operations["listSitDependencies"]["parameters"]["query"]>;
export type GetSitDependencyParams = operations["getSitDependency"]["parameters"]["path"];
export type UpdateSitDependencyParams = operations["updateSitDependency"]["parameters"]["path"];
export type GetSitSpendBlockParams = operations["getSitSpendBlock"]["parameters"]["path"];
export type ListSitLimitExceptionsParams = NonNullable<operations["listSitLimitExceptions"]["parameters"]["query"]>;


// ============================================================================
// Operation Response Types
// ============================================================================

// These types are used by handlers for type-safe response envelopes

export type ListSitDependenciesResponse = operations["listSitDependencies"]["responses"]["200"]["content"]["application/json"];
export type RegisterSitDependencyResponse = operations["registerSitDependency"]["responses"]["201"]["content"]["application/json"];
export type GetSitDependencyResponse = operations["getSitDependency"]["responses"]["200"]["content"]["application/json"];
export type UpdateSitDependencyResponse = operations["updateSitDependency"]["responses"]["200"]["content"]["application/json"];
export type GetSitSpendBlockResponse = operations["getSitSpendBlock"]["responses"]["200"]["content"]["application/json"];
export type ListSitLimitExceptionsResponse = operations["listSitLimitExceptions"]["responses"]["200"]["content"]["application/json"];
export type RequestSitLimitExceptionResponse = operations["requestSitLimitException"]["responses"]["201"]["content"]["application/json"];


