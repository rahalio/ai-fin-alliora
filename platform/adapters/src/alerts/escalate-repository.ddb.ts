/**
 * EscalateRepositoryDdb — sandbox Map implementation (hand-fit after Mode A codegen).
 */

import type { EscalateRepository } from "@alliora/services/alerts"
import type { AdapterDynamoDBClient } from "../_shared/dynamodb-client-types.js";
import { ProductSandbox } from "../_shared/product-sandbox.js";

export class EscalateRepositoryDdb implements EscalateRepository {
  constructor(private readonly _dynamoClient: AdapterDynamoDBClient) {}

  async escalatePlatformRiskAlert(input: any): Promise<any> {
    return ProductSandbox.escalatePlatformRiskAlert((input ?? {}) as Record<string, unknown>);
  }
}
