/**
 * SignRepositoryDdb — sandbox Map implementation (hand-fit after Mode A codegen).
 */

import type { SignRepository } from "@alliora/services/experience"
import type { AdapterDynamoDBClient } from "../_shared/dynamodb-client-types.js";
import { ProductSandbox } from "../_shared/product-sandbox.js";

export class SignRepositoryDdb implements SignRepository {
  constructor(private readonly _dynamoClient: AdapterDynamoDBClient) {}

  async signLiabilityTerms(input: any): Promise<any> {
    return ProductSandbox.signLiabilityTerms((input ?? {}) as Record<string, unknown>);
  }
}
