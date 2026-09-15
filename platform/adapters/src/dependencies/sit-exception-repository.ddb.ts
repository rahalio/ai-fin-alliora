/**
 * SitExceptionRepositoryDdb — sandbox Map implementation (hand-fit after Mode A codegen).
 */

import type { SitExceptionRepository } from "@alliora/services/dependencies"
import type { AdapterDynamoDBClient } from "../_shared/dynamodb-client-types.js";
import { ProductSandbox } from "../_shared/product-sandbox.js";

export class SitExceptionRepositoryDdb implements SitExceptionRepository {
  constructor(private readonly _dynamoClient: AdapterDynamoDBClient) {}

  async listSitLimitExceptions(input: any): Promise<any> {
    return ProductSandbox.listSitLimitExceptions((input ?? {}) as Record<string, unknown>);
  }
  async requestSitLimitException(input: any): Promise<any> {
    return ProductSandbox.requestSitLimitException((input ?? {}) as Record<string, unknown>);
  }
}
