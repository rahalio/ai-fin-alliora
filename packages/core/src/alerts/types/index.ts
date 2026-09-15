/**
 * Alerts Domain Types
 *
 * Auto-generated from OpenAPI spec
 * Generator: types-generator v2.0.0
 *
 * This file re-exports types from generated OpenAPI types and adds
 * convenient type aliases for handlers (response types, etc.)
 *
 * ⚠️ DO NOT EDIT MANUALLY - this file is auto-generated
 */

import type { components, operations } from "../openapi/alerts.openapi.types";

// ============================================================================
// Re-export all generated types
// ============================================================================
// Note: components and operations are exported here but should be accessed via namespace
// in main index.ts to avoid duplicate export errors (e.g., blockchain.types.components)

export type { components, operations };


// ============================================================================
// Convenient Type Aliases for Schemas
// ============================================================================

export type PlatformRiskAlert = components["schemas"]["PlatformRiskAlert"];
export type PlatformRiskAlertCreate = components["schemas"]["PlatformRiskAlertCreate"];
export type PlatformRiskAlertEscalate = components["schemas"]["PlatformRiskAlertEscalate"];
export type PlatformRiskAlertId = components["schemas"]["PlatformRiskAlertId"];
export type PlatformRiskAlertListData = components["schemas"]["PlatformRiskAlertListData"];
export type Alert = operations["listPlatformRiskAlerts"]["responses"]["200"]["content"]["application/json"]["data"];


// ============================================================================
// Operation Input Types (Request Bodies)
// ============================================================================

// These types represent the input data for create/update operations

export type RaisePlatformRiskAlertRequestInput = NonNullable<operations["raisePlatformRiskAlert"]["requestBody"]>["content"]["application/json"];
export type EscalatePlatformRiskAlertRequestInput = NonNullable<operations["escalatePlatformRiskAlert"]["requestBody"]>["content"]["application/json"];


// ============================================================================
// Operation Parameter Types (Query/Path Parameters)
// ============================================================================

// These types represent parameters for operations without request bodies.
// Aligned with get_input_schema_or_type_name for consistent naming across generators.

export type ListPlatformRiskAlertsParams = NonNullable<operations["listPlatformRiskAlerts"]["parameters"]["query"]>;
export type GetPlatformRiskAlertParams = operations["getPlatformRiskAlert"]["parameters"]["path"];
export type AcknowledgePlatformRiskAlertParams = operations["acknowledgePlatformRiskAlert"]["parameters"]["path"];
export type EscalatePlatformRiskAlertParams = operations["escalatePlatformRiskAlert"]["parameters"]["path"];


// ============================================================================
// Operation Response Types
// ============================================================================

// These types are used by handlers for type-safe response envelopes

export type ListPlatformRiskAlertsResponse = operations["listPlatformRiskAlerts"]["responses"]["200"]["content"]["application/json"];
export type RaisePlatformRiskAlertResponse = operations["raisePlatformRiskAlert"]["responses"]["201"]["content"]["application/json"];
export type GetPlatformRiskAlertResponse = operations["getPlatformRiskAlert"]["responses"]["200"]["content"]["application/json"];
export type AcknowledgePlatformRiskAlertResponse = operations["acknowledgePlatformRiskAlert"]["responses"]["200"]["content"]["application/json"];
export type EscalatePlatformRiskAlertResponse = operations["escalatePlatformRiskAlert"]["responses"]["200"]["content"]["application/json"];


