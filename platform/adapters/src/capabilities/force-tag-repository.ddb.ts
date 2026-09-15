/**
 * ForceTagRepositoryDdb — sandbox Map implementation (hand-fit after Mode A codegen).
 */

import type { ForceTagRepository } from "@alliora/services/capabilities"
import type { AdapterDynamoDBClient } from "../_shared/dynamodb-client-types.js";
import { ProductSandbox } from "../_shared/product-sandbox.js";

export class ForceTagRepositoryDdb implements ForceTagRepository {
  constructor(private readonly _dynamoClient: AdapterDynamoDBClient) {}

  async tagCapabilityForces(input: any): Promise<any> {
    return ProductSandbox.tagCapabilityForces((input ?? {}) as Record<string, unknown>);
  }
}
