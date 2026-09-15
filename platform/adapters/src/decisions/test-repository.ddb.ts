/**
 * TestRepositoryDdb — sandbox Map implementation (hand-fit after Mode A codegen).
 */

import type { TestRepository } from "@alliora/services/decisions"
import type { AdapterDynamoDBClient } from "../_shared/dynamodb-client-types.js";
import { ProductSandbox } from "../_shared/product-sandbox.js";

export class TestRepositoryDdb implements TestRepository {
  constructor(private readonly _dynamoClient: AdapterDynamoDBClient) {}

  async attachProfitPoolTest(input: any): Promise<any> {
    return ProductSandbox.attachProfitPoolTest((input ?? {}) as Record<string, unknown>);
  }
}
