/**
 * CapabilityRepositoryDdb — sandbox Map implementation (hand-fit after Mode A codegen).
 */

import type { CapabilityRepository } from "@alliora/services/capabilities"
import type { AdapterDynamoDBClient } from "../_shared/dynamodb-client-types.js";
import { ProductSandbox } from "../_shared/product-sandbox.js";

export class CapabilityRepositoryDdb implements CapabilityRepository {
  constructor(private readonly _dynamoClient: AdapterDynamoDBClient) {}

  async listCapabilities(input: any): Promise<any> {
    return ProductSandbox.listCapabilities((input ?? {}) as Record<string, unknown>);
  }
  async createCapability(input: any): Promise<any> {
    return ProductSandbox.createCapability((input ?? {}) as Record<string, unknown>);
  }
  async getCapability(input: any): Promise<any> {
    return ProductSandbox.getCapability((input ?? {}) as Record<string, unknown>);
  }
  async updateCapability(input: any): Promise<any> {
    return ProductSandbox.updateCapability((input ?? {}) as Record<string, unknown>);
  }
}
