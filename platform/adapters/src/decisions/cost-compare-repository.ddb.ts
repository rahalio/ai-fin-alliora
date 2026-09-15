/**
 * CostCompareRepositoryDdb — sandbox Map implementation (hand-fit after Mode A codegen).
 */

import type { CostCompareRepository } from "@alliora/services/decisions"
import type { AdapterDynamoDBClient } from "../_shared/dynamodb-client-types.js";
import { ProductSandbox } from "../_shared/product-sandbox.js";

export class CostCompareRepositoryDdb implements CostCompareRepository {
  constructor(private readonly _dynamoClient: AdapterDynamoDBClient) {}

  async listCostCompares(input: any): Promise<any> {
    return ProductSandbox.listCostCompares((input ?? {}) as Record<string, unknown>);
  }
  async createCostCompare(input: any): Promise<any> {
    return ProductSandbox.createCostCompare((input ?? {}) as Record<string, unknown>);
  }
}
