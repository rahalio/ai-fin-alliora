/**
 * DependencyRepositoryDdb — sandbox Map implementation (hand-fit after Mode A codegen).
 */

import type { DependencyRepository } from "@alliora/services/dependencies"
import type { AdapterDynamoDBClient } from "../_shared/dynamodb-client-types.js";
import { ProductSandbox } from "../_shared/product-sandbox.js";

export class DependencyRepositoryDdb implements DependencyRepository {
  constructor(private readonly _dynamoClient: AdapterDynamoDBClient) {}

  async listSitDependencies(input: any): Promise<any> {
    return ProductSandbox.listSitDependencies((input ?? {}) as Record<string, unknown>);
  }
  async registerSitDependency(input: any): Promise<any> {
    return ProductSandbox.registerSitDependency((input ?? {}) as Record<string, unknown>);
  }
  async getSitDependency(input: any): Promise<any> {
    return ProductSandbox.getSitDependency((input ?? {}) as Record<string, unknown>);
  }
  async updateSitDependency(input: any): Promise<any> {
    return ProductSandbox.updateSitDependency((input ?? {}) as Record<string, unknown>);
  }
}
