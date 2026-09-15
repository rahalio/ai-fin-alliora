/**
 * PartnershipContractRepositoryDdb — sandbox Map implementation (hand-fit after Mode A codegen).
 */

import type { PartnershipContractRepository } from "@alliora/services/decisions"
import type { AdapterDynamoDBClient } from "../_shared/dynamodb-client-types.js";
import { ProductSandbox } from "../_shared/product-sandbox.js";

export class PartnershipContractRepositoryDdb implements PartnershipContractRepository {
  constructor(private readonly _dynamoClient: AdapterDynamoDBClient) {}

  async listPartnershipContracts(input: any): Promise<any> {
    return ProductSandbox.listPartnershipContracts((input ?? {}) as Record<string, unknown>);
  }
  async createPartnershipContract(input: any): Promise<any> {
    return ProductSandbox.createPartnershipContract((input ?? {}) as Record<string, unknown>);
  }
  async updatePartnershipContract(input: any): Promise<any> {
    return ProductSandbox.updatePartnershipContract((input ?? {}) as Record<string, unknown>);
  }
}
