/**
 * StageGateRepositoryDdb — sandbox Map implementation (hand-fit after Mode A codegen).
 */

import type { StageGateRepository } from "@alliora/services/stagegates"
import type { AdapterDynamoDBClient } from "../_shared/dynamodb-client-types.js";
import { ProductSandbox } from "../_shared/product-sandbox.js";

export class StageGateRepositoryDdb implements StageGateRepository {
  constructor(private readonly _dynamoClient: AdapterDynamoDBClient) {}

  async listStageGates(input: any): Promise<any> {
    return ProductSandbox.listStageGates((input ?? {}) as Record<string, unknown>);
  }
  async createStageGate(input: any): Promise<any> {
    return ProductSandbox.createStageGate((input ?? {}) as Record<string, unknown>);
  }
  async getStageGate(input: any): Promise<any> {
    return ProductSandbox.getStageGate((input ?? {}) as Record<string, unknown>);
  }
}
