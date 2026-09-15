/**
 * OutcomeRepositoryDdb — sandbox Map implementation (hand-fit after Mode A codegen).
 */

import type { OutcomeRepository } from "@alliora/services/stagegates"
import type { AdapterDynamoDBClient } from "../_shared/dynamodb-client-types.js";
import { ProductSandbox } from "../_shared/product-sandbox.js";

export class OutcomeRepositoryDdb implements OutcomeRepository {
  constructor(private readonly _dynamoClient: AdapterDynamoDBClient) {}

  async decideStageGateOutcome(input: any): Promise<any> {
    return ProductSandbox.decideStageGateOutcome((input ?? {}) as Record<string, unknown>);
  }
}
