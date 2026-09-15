/**
 * PortfolioRepositoryDdb — sandbox Map implementation (hand-fit after Mode A codegen).
 */

import type { PortfolioRepository } from "@alliora/services/reports"
import type { AdapterDynamoDBClient } from "../_shared/dynamodb-client-types.js";
import { ProductSandbox } from "../_shared/product-sandbox.js";

export class PortfolioRepositoryDdb implements PortfolioRepository {
  constructor(private readonly _dynamoClient: AdapterDynamoDBClient) {}

  async getPortfolioReport(input: any): Promise<any> {
    return ProductSandbox.getPortfolioReport((input ?? {}) as Record<string, unknown>);
  }
}
