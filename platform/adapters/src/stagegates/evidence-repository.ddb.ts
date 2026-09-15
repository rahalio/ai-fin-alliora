/**
 * EvidenceRepositoryDdb — sandbox Map implementation (hand-fit after Mode A codegen).
 */

import type { EvidenceRepository } from "@alliora/services/stagegates"
import type { AdapterDynamoDBClient } from "../_shared/dynamodb-client-types.js";
import { ProductSandbox } from "../_shared/product-sandbox.js";

export class EvidenceRepositoryDdb implements EvidenceRepository {
  constructor(private readonly _dynamoClient: AdapterDynamoDBClient) {}

  async getEvidencePack(input: any): Promise<any> {
    return ProductSandbox.getEvidencePack((input ?? {}) as Record<string, unknown>);
  }
  async submitEvidencePack(input: any): Promise<any> {
    return ProductSandbox.submitEvidencePack((input ?? {}) as Record<string, unknown>);
  }
}
