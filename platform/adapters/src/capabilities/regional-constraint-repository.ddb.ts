/**
 * RegionalConstraintRepositoryDdb — sandbox Map implementation (hand-fit after Mode A codegen).
 */

import type { RegionalConstraintRepository } from "@alliora/services/capabilities"
import type { AdapterDynamoDBClient } from "../_shared/dynamodb-client-types.js";
import { ProductSandbox } from "../_shared/product-sandbox.js";

export class RegionalConstraintRepositoryDdb implements RegionalConstraintRepository {
  constructor(private readonly _dynamoClient: AdapterDynamoDBClient) {}

  async listRegionalConstraints(input: any): Promise<any> {
    return ProductSandbox.listRegionalConstraints((input ?? {}) as Record<string, unknown>);
  }
  async createRegionalConstraint(input: any): Promise<any> {
    return ProductSandbox.createRegionalConstraint((input ?? {}) as Record<string, unknown>);
  }
}
