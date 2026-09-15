/**
 * AlertRepositoryDdb — sandbox Map implementation (hand-fit after Mode A codegen).
 */

import type { AlertRepository } from "@alliora/services/alerts"
import type { AdapterDynamoDBClient } from "../_shared/dynamodb-client-types.js";
import { ProductSandbox } from "../_shared/product-sandbox.js";

export class AlertRepositoryDdb implements AlertRepository {
  constructor(private readonly _dynamoClient: AdapterDynamoDBClient) {}

  async listPlatformRiskAlerts(input: any): Promise<any> {
    return ProductSandbox.listPlatformRiskAlerts((input ?? {}) as Record<string, unknown>);
  }
  async raisePlatformRiskAlert(input: any): Promise<any> {
    return ProductSandbox.raisePlatformRiskAlert((input ?? {}) as Record<string, unknown>);
  }
  async getPlatformRiskAlert(input: any): Promise<any> {
    return ProductSandbox.getPlatformRiskAlert((input ?? {}) as Record<string, unknown>);
  }
}
