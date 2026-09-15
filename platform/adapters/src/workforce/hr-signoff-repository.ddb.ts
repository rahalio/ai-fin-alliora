/**
 * HrSignoffRepositoryDdb — sandbox Map implementation (hand-fit after Mode A codegen).
 */

import type { HrSignoffRepository } from "@alliora/services/workforce"
import type { AdapterDynamoDBClient } from "../_shared/dynamodb-client-types.js";
import { ProductSandbox } from "../_shared/product-sandbox.js";

export class HrSignoffRepositoryDdb implements HrSignoffRepository {
  constructor(private readonly _dynamoClient: AdapterDynamoDBClient) {}

  async signBionicRoleMap(input: any): Promise<any> {
    return ProductSandbox.signBionicRoleMap((input ?? {}) as Record<string, unknown>);
  }
}
