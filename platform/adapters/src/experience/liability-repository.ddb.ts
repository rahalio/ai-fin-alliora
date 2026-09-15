/**
 * LiabilityRepositoryDdb — sandbox Map implementation (hand-fit after Mode A codegen).
 */

import type { LiabilityRepository } from "@alliora/services/experience"
import type { AdapterDynamoDBClient } from "../_shared/dynamodb-client-types.js";
import { ProductSandbox } from "../_shared/product-sandbox.js";

export class LiabilityRepositoryDdb implements LiabilityRepository {
  constructor(private readonly _dynamoClient: AdapterDynamoDBClient) {}

  async attachLiabilityTerms(input: any): Promise<any> {
    return ProductSandbox.attachLiabilityTerms((input ?? {}) as Record<string, unknown>);
  }
}
