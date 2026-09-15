/**
 * ProfitPoolHypothesisRepositoryDdb — sandbox Map implementation (hand-fit after Mode A codegen).
 */

import type { ProfitPoolHypothesisRepository } from "@alliora/services/decisions"
import type { AdapterDynamoDBClient } from "../_shared/dynamodb-client-types.js";
import { ProductSandbox } from "../_shared/product-sandbox.js";

export class ProfitPoolHypothesisRepositoryDdb implements ProfitPoolHypothesisRepository {
  constructor(private readonly _dynamoClient: AdapterDynamoDBClient) {}

  async listProfitPoolHypotheses(input: any): Promise<any> {
    return ProductSandbox.listProfitPoolHypotheses((input ?? {}) as Record<string, unknown>);
  }
  async createProfitPoolHypothesis(input: any): Promise<any> {
    return ProductSandbox.createProfitPoolHypothesis((input ?? {}) as Record<string, unknown>);
  }
}
