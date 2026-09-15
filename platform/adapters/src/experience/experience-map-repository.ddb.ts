/**
 * ExperienceMapRepositoryDdb — sandbox Map implementation (hand-fit after Mode A codegen).
 */

import type { ExperienceMapRepository } from "@alliora/services/experience"
import type { AdapterDynamoDBClient } from "../_shared/dynamodb-client-types.js";
import { ProductSandbox } from "../_shared/product-sandbox.js";

export class ExperienceMapRepositoryDdb implements ExperienceMapRepository {
  constructor(private readonly _dynamoClient: AdapterDynamoDBClient) {}

  async listExperienceOwnershipMaps(input: any): Promise<any> {
    return ProductSandbox.listExperienceOwnershipMaps((input ?? {}) as Record<string, unknown>);
  }
  async createExperienceOwnershipMap(input: any): Promise<any> {
    return ProductSandbox.createExperienceOwnershipMap((input ?? {}) as Record<string, unknown>);
  }
  async getExperienceOwnershipMap(input: any): Promise<any> {
    return ProductSandbox.getExperienceOwnershipMap((input ?? {}) as Record<string, unknown>);
  }
}
