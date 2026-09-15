/**
 * DecisionRepositoryDdb — sandbox Map implementation (hand-fit after Mode A codegen).
 */

import type { DecisionRepository } from "@alliora/services/decisions"
import type { AdapterDynamoDBClient } from "../_shared/dynamodb-client-types.js";
import { ProductSandbox } from "../_shared/product-sandbox.js";

export class DecisionRepositoryDdb implements DecisionRepository {
  constructor(private readonly _dynamoClient: AdapterDynamoDBClient) {}

  async listDecisionClasses(input: any): Promise<any> {
    return ProductSandbox.listDecisionClasses((input ?? {}) as Record<string, unknown>);
  }
  async recordDecisionClass(input: any): Promise<any> {
    return ProductSandbox.recordDecisionClass((input ?? {}) as Record<string, unknown>);
  }
  async getDecisionClass(input: any): Promise<any> {
    return ProductSandbox.getDecisionClass((input ?? {}) as Record<string, unknown>);
  }
}
