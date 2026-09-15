/**
 * AcknowledgeRepositoryDdb — sandbox Map implementation (hand-fit after Mode A codegen).
 */

import type { AcknowledgeRepository } from "@alliora/services/alerts"
import type { AdapterDynamoDBClient } from "../_shared/dynamodb-client-types.js";
import { ProductSandbox } from "../_shared/product-sandbox.js";

export class AcknowledgeRepositoryDdb implements AcknowledgeRepository {
  constructor(private readonly _dynamoClient: AdapterDynamoDBClient) {}

  async acknowledgePlatformRiskAlert(input: any): Promise<any> {
    return ProductSandbox.acknowledgePlatformRiskAlert((input ?? {}) as Record<string, unknown>);
  }
}
