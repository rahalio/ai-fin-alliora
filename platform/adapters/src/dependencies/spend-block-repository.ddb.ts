/**
 * SpendBlockRepositoryDdb — sandbox Map implementation (hand-fit after Mode A codegen).
 */

import type { SpendBlockRepository } from "@alliora/services/dependencies"
import type { AdapterDynamoDBClient } from "../_shared/dynamodb-client-types.js";
import { ProductSandbox } from "../_shared/product-sandbox.js";

export class SpendBlockRepositoryDdb implements SpendBlockRepository {
  constructor(private readonly _dynamoClient: AdapterDynamoDBClient) {}

  async getSitSpendBlock(input: any): Promise<any> {
    return ProductSandbox.getSitSpendBlock((input ?? {}) as Record<string, unknown>);
  }
}
