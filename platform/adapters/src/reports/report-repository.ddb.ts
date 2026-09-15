/**
 * ReportRepositoryDdb — sandbox Map implementation (hand-fit after Mode A codegen).
 */

import type { ReportRepository } from "@alliora/services/reports"
import type { AdapterDynamoDBClient } from "../_shared/dynamodb-client-types.js";
import { ProductSandbox } from "../_shared/product-sandbox.js";

export class ReportRepositoryDdb implements ReportRepository {
  constructor(private readonly _dynamoClient: AdapterDynamoDBClient) {}

  async listPortfolioReports(input: any): Promise<any> {
    return ProductSandbox.listPortfolioReports((input ?? {}) as Record<string, unknown>);
  }
  async generatePortfolioReport(input: any): Promise<any> {
    return ProductSandbox.generatePortfolioReport((input ?? {}) as Record<string, unknown>);
  }
  async publishPortfolioReport(input: any): Promise<any> {
    return ProductSandbox.publishPortfolioReport((input ?? {}) as Record<string, unknown>);
  }
}

