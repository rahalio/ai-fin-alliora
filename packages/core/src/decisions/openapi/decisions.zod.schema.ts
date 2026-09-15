import { makeApi, Zodios, type ZodiosOptions } from '@zodios/core';
import { z } from 'zod';

const recordDecisionClass_Body = z
  .object({
    capabilityId: z.string(),
    decision: z.enum([
      'mutualise',
      'externalise',
      'automate',
      'build',
      'invest',
      'decline',
    ]),
    economicOwner: z.string(),
    rationale: z.string().optional(),
  })
  .passthrough();
const createProfitPoolHypothesis_Body = z
  .object({
    capabilityId: z.string(),
    whoGains: z.string(),
    whoLoses: z.string(),
    manufacturerMarginNote: z.string().optional(),
    distributorMarginNote: z.string().optional(),
  })
  .passthrough();
const attachProfitPoolTest_Body = z
  .object({ tested: z.boolean(), resultNotes: z.string() })
  .passthrough();
const createCostCompare_Body = z
  .object({
    capabilityId: z.string(),
    duplicateSpendAmount: z
      .object({
        amount: z.string().regex(/^-?\d+(\.\d{1,5})?$/),
        currency: z
          .string()
          .min(3)
          .max(3)
          .regex(/^[A-Z]{3}$/),
      })
      .passthrough(),
    mutualiseSpendAmount: z
      .object({
        amount: z.string().regex(/^-?\d+(\.\d{1,5})?$/),
        currency: z
          .string()
          .min(3)
          .max(3)
          .regex(/^[A-Z]{3}$/),
      })
      .passthrough(),
    chosenPath: z.enum(['mutualise', 'keepBuild', 'undecided']).optional(),
    estimateOnly: z.boolean().optional(),
    rationale: z.string().optional(),
  })
  .passthrough();
const createPartnershipContract_Body = z
  .object({
    capabilityId: z.string(),
    experienceMapId: z.string().optional(),
    status: z
      .enum(['draft', 'executed', 'terminated', 'blockedGoLive'])
      .optional(),
  })
  .passthrough();
const updatePartnershipContract_Body = z
  .object({
    experienceMapId: z.string(),
    status: z.enum(['draft', 'executed', 'terminated', 'blockedGoLive']),
  })
  .partial()
  .passthrough();
const Problem = z
  .object({
    type: z.string().url(),
    title: z.string(),
    status: z.number().int(),
    detail: z.string(),
    instance: z.string().url(),
    code: z.string(),
  })
  .partial()
  .passthrough();
const DecisionId = z.string();
const DecisionClass = z
  .object({
    decisionId: z.string().regex(/^dcs_[0-9A-HJKMNP-TV-Z]{26}$/),
    capabilityId: z.string(),
    decision: z.enum([
      'mutualise',
      'externalise',
      'automate',
      'build',
      'invest',
      'decline',
    ]),
    economicOwner: z.string(),
    rationale: z.string().optional(),
    decidedAt: z.string().datetime({ offset: true }),
    createdAt: z.string().datetime({ offset: true }).optional(),
    updatedAt: z.string().datetime({ offset: true }).optional(),
  })
  .passthrough();
const DecisionClassListData = z
  .object({
    items: z.array(
      z
        .object({
          decisionId: z.string().regex(/^dcs_[0-9A-HJKMNP-TV-Z]{26}$/),
          capabilityId: z.string(),
          decision: z.enum([
            'mutualise',
            'externalise',
            'automate',
            'build',
            'invest',
            'decline',
          ]),
          economicOwner: z.string(),
          rationale: z.string().optional(),
          decidedAt: z.string().datetime({ offset: true }),
          createdAt: z.string().datetime({ offset: true }).optional(),
          updatedAt: z.string().datetime({ offset: true }).optional(),
        })
        .passthrough()
    ),
    nextCursor: z.string().optional(),
  })
  .passthrough();
const ResponseMeta = z
  .object({
    requestId: z.string().uuid(),
    correlationId: z.string(),
    generatedAt: z.string().datetime({ offset: true }),
  })
  .partial()
  .passthrough();
const DecisionClassListResponse = z
  .object({
    data: z
      .object({
        items: z.array(
          z
            .object({
              decisionId: z.string().regex(/^dcs_[0-9A-HJKMNP-TV-Z]{26}$/),
              capabilityId: z.string(),
              decision: z.enum([
                'mutualise',
                'externalise',
                'automate',
                'build',
                'invest',
                'decline',
              ]),
              economicOwner: z.string(),
              rationale: z.string().optional(),
              decidedAt: z.string().datetime({ offset: true }),
              createdAt: z.string().datetime({ offset: true }).optional(),
              updatedAt: z.string().datetime({ offset: true }).optional(),
            })
            .passthrough()
        ),
        nextCursor: z.string().optional(),
      })
      .passthrough(),
    meta: z
      .object({
        requestId: z.string().uuid(),
        correlationId: z.string(),
        generatedAt: z.string().datetime({ offset: true }),
      })
      .partial()
      .passthrough()
      .optional(),
  })
  .passthrough();
const DecisionClassCreate = z
  .object({
    capabilityId: z.string(),
    decision: z.enum([
      'mutualise',
      'externalise',
      'automate',
      'build',
      'invest',
      'decline',
    ]),
    economicOwner: z.string(),
    rationale: z.string().optional(),
  })
  .passthrough();
const DecisionClassResponse = z
  .object({
    data: z
      .object({
        decisionId: z.string().regex(/^dcs_[0-9A-HJKMNP-TV-Z]{26}$/),
        capabilityId: z.string(),
        decision: z.enum([
          'mutualise',
          'externalise',
          'automate',
          'build',
          'invest',
          'decline',
        ]),
        economicOwner: z.string(),
        rationale: z.string().optional(),
        decidedAt: z.string().datetime({ offset: true }),
        createdAt: z.string().datetime({ offset: true }).optional(),
        updatedAt: z.string().datetime({ offset: true }).optional(),
      })
      .passthrough(),
    meta: z
      .object({
        requestId: z.string().uuid(),
        correlationId: z.string(),
        generatedAt: z.string().datetime({ offset: true }),
      })
      .partial()
      .passthrough()
      .optional(),
  })
  .passthrough();
const ProfitPoolId = z.string();
const ProfitPoolHypothesis = z
  .object({
    hypothesisId: z.string().regex(/^pph_[0-9A-HJKMNP-TV-Z]{26}$/),
    capabilityId: z.string(),
    whoGains: z.string(),
    whoLoses: z.string(),
    manufacturerMarginNote: z.string().optional(),
    distributorMarginNote: z.string().optional(),
    tested: z.boolean().optional(),
    resultNotes: z.string().optional(),
    createdAt: z.string().datetime({ offset: true }),
    updatedAt: z.string().datetime({ offset: true }).optional(),
  })
  .passthrough();
const ProfitPoolHypothesisListData = z
  .object({
    items: z.array(
      z
        .object({
          hypothesisId: z.string().regex(/^pph_[0-9A-HJKMNP-TV-Z]{26}$/),
          capabilityId: z.string(),
          whoGains: z.string(),
          whoLoses: z.string(),
          manufacturerMarginNote: z.string().optional(),
          distributorMarginNote: z.string().optional(),
          tested: z.boolean().optional(),
          resultNotes: z.string().optional(),
          createdAt: z.string().datetime({ offset: true }),
          updatedAt: z.string().datetime({ offset: true }).optional(),
        })
        .passthrough()
    ),
    nextCursor: z.string().optional(),
  })
  .passthrough();
const ProfitPoolHypothesisListResponse = z
  .object({
    data: z
      .object({
        items: z.array(
          z
            .object({
              hypothesisId: z.string().regex(/^pph_[0-9A-HJKMNP-TV-Z]{26}$/),
              capabilityId: z.string(),
              whoGains: z.string(),
              whoLoses: z.string(),
              manufacturerMarginNote: z.string().optional(),
              distributorMarginNote: z.string().optional(),
              tested: z.boolean().optional(),
              resultNotes: z.string().optional(),
              createdAt: z.string().datetime({ offset: true }),
              updatedAt: z.string().datetime({ offset: true }).optional(),
            })
            .passthrough()
        ),
        nextCursor: z.string().optional(),
      })
      .passthrough(),
    meta: z
      .object({
        requestId: z.string().uuid(),
        correlationId: z.string(),
        generatedAt: z.string().datetime({ offset: true }),
      })
      .partial()
      .passthrough()
      .optional(),
  })
  .passthrough();
const ProfitPoolHypothesisCreate = z
  .object({
    capabilityId: z.string(),
    whoGains: z.string(),
    whoLoses: z.string(),
    manufacturerMarginNote: z.string().optional(),
    distributorMarginNote: z.string().optional(),
  })
  .passthrough();
const ProfitPoolHypothesisResponse = z
  .object({
    data: z
      .object({
        hypothesisId: z.string().regex(/^pph_[0-9A-HJKMNP-TV-Z]{26}$/),
        capabilityId: z.string(),
        whoGains: z.string(),
        whoLoses: z.string(),
        manufacturerMarginNote: z.string().optional(),
        distributorMarginNote: z.string().optional(),
        tested: z.boolean().optional(),
        resultNotes: z.string().optional(),
        createdAt: z.string().datetime({ offset: true }),
        updatedAt: z.string().datetime({ offset: true }).optional(),
      })
      .passthrough(),
    meta: z
      .object({
        requestId: z.string().uuid(),
        correlationId: z.string(),
        generatedAt: z.string().datetime({ offset: true }),
      })
      .partial()
      .passthrough()
      .optional(),
  })
  .passthrough();
const ProfitPoolTestAttach = z
  .object({ tested: z.boolean(), resultNotes: z.string() })
  .passthrough();
const CostCompareId = z.string();
const Currency = z.string();
const Money = z
  .object({
    amount: z.string().regex(/^-?\d+(\.\d{1,5})?$/),
    currency: z
      .string()
      .min(3)
      .max(3)
      .regex(/^[A-Z]{3}$/),
  })
  .passthrough();
const CostCompare = z
  .object({
    costCompareId: z.string().regex(/^ccc_[0-9A-HJKMNP-TV-Z]{26}$/),
    capabilityId: z.string(),
    duplicateSpendAmount: z
      .object({
        amount: z.string().regex(/^-?\d+(\.\d{1,5})?$/),
        currency: z
          .string()
          .min(3)
          .max(3)
          .regex(/^[A-Z]{3}$/),
      })
      .passthrough(),
    mutualiseSpendAmount: z
      .object({
        amount: z.string().regex(/^-?\d+(\.\d{1,5})?$/),
        currency: z
          .string()
          .min(3)
          .max(3)
          .regex(/^[A-Z]{3}$/),
      })
      .passthrough(),
    chosenPath: z.enum(['mutualise', 'keepBuild', 'undecided']).optional(),
    estimateOnly: z.boolean().optional(),
    rationale: z.string().optional(),
    createdAt: z.string().datetime({ offset: true }),
    updatedAt: z.string().datetime({ offset: true }).optional(),
  })
  .passthrough();
const CostCompareListData = z
  .object({
    items: z.array(
      z
        .object({
          costCompareId: z.string().regex(/^ccc_[0-9A-HJKMNP-TV-Z]{26}$/),
          capabilityId: z.string(),
          duplicateSpendAmount: z
            .object({
              amount: z.string().regex(/^-?\d+(\.\d{1,5})?$/),
              currency: z
                .string()
                .min(3)
                .max(3)
                .regex(/^[A-Z]{3}$/),
            })
            .passthrough(),
          mutualiseSpendAmount: z
            .object({
              amount: z.string().regex(/^-?\d+(\.\d{1,5})?$/),
              currency: z
                .string()
                .min(3)
                .max(3)
                .regex(/^[A-Z]{3}$/),
            })
            .passthrough(),
          chosenPath: z
            .enum(['mutualise', 'keepBuild', 'undecided'])
            .optional(),
          estimateOnly: z.boolean().optional(),
          rationale: z.string().optional(),
          createdAt: z.string().datetime({ offset: true }),
          updatedAt: z.string().datetime({ offset: true }).optional(),
        })
        .passthrough()
    ),
    nextCursor: z.string().optional(),
  })
  .passthrough();
const CostCompareListResponse = z
  .object({
    data: z
      .object({
        items: z.array(
          z
            .object({
              costCompareId: z.string().regex(/^ccc_[0-9A-HJKMNP-TV-Z]{26}$/),
              capabilityId: z.string(),
              duplicateSpendAmount: z
                .object({
                  amount: z.string().regex(/^-?\d+(\.\d{1,5})?$/),
                  currency: z
                    .string()
                    .min(3)
                    .max(3)
                    .regex(/^[A-Z]{3}$/),
                })
                .passthrough(),
              mutualiseSpendAmount: z
                .object({
                  amount: z.string().regex(/^-?\d+(\.\d{1,5})?$/),
                  currency: z
                    .string()
                    .min(3)
                    .max(3)
                    .regex(/^[A-Z]{3}$/),
                })
                .passthrough(),
              chosenPath: z
                .enum(['mutualise', 'keepBuild', 'undecided'])
                .optional(),
              estimateOnly: z.boolean().optional(),
              rationale: z.string().optional(),
              createdAt: z.string().datetime({ offset: true }),
              updatedAt: z.string().datetime({ offset: true }).optional(),
            })
            .passthrough()
        ),
        nextCursor: z.string().optional(),
      })
      .passthrough(),
    meta: z
      .object({
        requestId: z.string().uuid(),
        correlationId: z.string(),
        generatedAt: z.string().datetime({ offset: true }),
      })
      .partial()
      .passthrough()
      .optional(),
  })
  .passthrough();
const CostCompareCreate = z
  .object({
    capabilityId: z.string(),
    duplicateSpendAmount: z
      .object({
        amount: z.string().regex(/^-?\d+(\.\d{1,5})?$/),
        currency: z
          .string()
          .min(3)
          .max(3)
          .regex(/^[A-Z]{3}$/),
      })
      .passthrough(),
    mutualiseSpendAmount: z
      .object({
        amount: z.string().regex(/^-?\d+(\.\d{1,5})?$/),
        currency: z
          .string()
          .min(3)
          .max(3)
          .regex(/^[A-Z]{3}$/),
      })
      .passthrough(),
    chosenPath: z.enum(['mutualise', 'keepBuild', 'undecided']).optional(),
    estimateOnly: z.boolean().optional(),
    rationale: z.string().optional(),
  })
  .passthrough();
const CostCompareResponse = z
  .object({
    data: z
      .object({
        costCompareId: z.string().regex(/^ccc_[0-9A-HJKMNP-TV-Z]{26}$/),
        capabilityId: z.string(),
        duplicateSpendAmount: z
          .object({
            amount: z.string().regex(/^-?\d+(\.\d{1,5})?$/),
            currency: z
              .string()
              .min(3)
              .max(3)
              .regex(/^[A-Z]{3}$/),
          })
          .passthrough(),
        mutualiseSpendAmount: z
          .object({
            amount: z.string().regex(/^-?\d+(\.\d{1,5})?$/),
            currency: z
              .string()
              .min(3)
              .max(3)
              .regex(/^[A-Z]{3}$/),
          })
          .passthrough(),
        chosenPath: z.enum(['mutualise', 'keepBuild', 'undecided']).optional(),
        estimateOnly: z.boolean().optional(),
        rationale: z.string().optional(),
        createdAt: z.string().datetime({ offset: true }),
        updatedAt: z.string().datetime({ offset: true }).optional(),
      })
      .passthrough(),
    meta: z
      .object({
        requestId: z.string().uuid(),
        correlationId: z.string(),
        generatedAt: z.string().datetime({ offset: true }),
      })
      .partial()
      .passthrough()
      .optional(),
  })
  .passthrough();
const PartnershipContractId = z.string();
const PartnershipContract = z
  .object({
    contractId: z.string().regex(/^pct_[0-9A-HJKMNP-TV-Z]{26}$/),
    capabilityId: z.string(),
    experienceMapId: z.string().optional(),
    status: z.enum(['draft', 'executed', 'terminated', 'blockedGoLive']),
    createdAt: z.string().datetime({ offset: true }),
    updatedAt: z.string().datetime({ offset: true }).optional(),
  })
  .passthrough();
const PartnershipContractListData = z
  .object({
    items: z.array(
      z
        .object({
          contractId: z.string().regex(/^pct_[0-9A-HJKMNP-TV-Z]{26}$/),
          capabilityId: z.string(),
          experienceMapId: z.string().optional(),
          status: z.enum(['draft', 'executed', 'terminated', 'blockedGoLive']),
          createdAt: z.string().datetime({ offset: true }),
          updatedAt: z.string().datetime({ offset: true }).optional(),
        })
        .passthrough()
    ),
    nextCursor: z.string().optional(),
  })
  .passthrough();
const PartnershipContractListResponse = z
  .object({
    data: z
      .object({
        items: z.array(
          z
            .object({
              contractId: z.string().regex(/^pct_[0-9A-HJKMNP-TV-Z]{26}$/),
              capabilityId: z.string(),
              experienceMapId: z.string().optional(),
              status: z.enum([
                'draft',
                'executed',
                'terminated',
                'blockedGoLive',
              ]),
              createdAt: z.string().datetime({ offset: true }),
              updatedAt: z.string().datetime({ offset: true }).optional(),
            })
            .passthrough()
        ),
        nextCursor: z.string().optional(),
      })
      .passthrough(),
    meta: z
      .object({
        requestId: z.string().uuid(),
        correlationId: z.string(),
        generatedAt: z.string().datetime({ offset: true }),
      })
      .partial()
      .passthrough()
      .optional(),
  })
  .passthrough();
const PartnershipContractCreate = z
  .object({
    capabilityId: z.string(),
    experienceMapId: z.string().optional(),
    status: z
      .enum(['draft', 'executed', 'terminated', 'blockedGoLive'])
      .optional(),
  })
  .passthrough();
const PartnershipContractResponse = z
  .object({
    data: z
      .object({
        contractId: z.string().regex(/^pct_[0-9A-HJKMNP-TV-Z]{26}$/),
        capabilityId: z.string(),
        experienceMapId: z.string().optional(),
        status: z.enum(['draft', 'executed', 'terminated', 'blockedGoLive']),
        createdAt: z.string().datetime({ offset: true }),
        updatedAt: z.string().datetime({ offset: true }).optional(),
      })
      .passthrough(),
    meta: z
      .object({
        requestId: z.string().uuid(),
        correlationId: z.string(),
        generatedAt: z.string().datetime({ offset: true }),
      })
      .partial()
      .passthrough()
      .optional(),
  })
  .passthrough();
const PartnershipContractUpdate = z
  .object({
    experienceMapId: z.string(),
    status: z.enum(['draft', 'executed', 'terminated', 'blockedGoLive']),
  })
  .partial()
  .passthrough();

export const schemas: any = {
  recordDecisionClass_Body,
  createProfitPoolHypothesis_Body,
  attachProfitPoolTest_Body,
  createCostCompare_Body,
  createPartnershipContract_Body,
  updatePartnershipContract_Body,
  Problem,
  DecisionId,
  DecisionClass,
  DecisionClassListData,
  ResponseMeta,
  DecisionClassListResponse,
  DecisionClassCreate,
  DecisionClassResponse,
  ProfitPoolId,
  ProfitPoolHypothesis,
  ProfitPoolHypothesisListData,
  ProfitPoolHypothesisListResponse,
  ProfitPoolHypothesisCreate,
  ProfitPoolHypothesisResponse,
  ProfitPoolTestAttach,
  CostCompareId,
  Currency,
  Money,
  CostCompare,
  CostCompareListData,
  CostCompareListResponse,
  CostCompareCreate,
  CostCompareResponse,
  PartnershipContractId,
  PartnershipContract,
  PartnershipContractListData,
  PartnershipContractListResponse,
  PartnershipContractCreate,
  PartnershipContractResponse,
  PartnershipContractUpdate,
};

const endpoints = makeApi([
  {
    method: 'get',
    path: '/v1/cost-compares',
    alias: 'listCostCompares',
    requestFormat: 'json',
    parameters: [
      {
        name: 'cursor',
        type: 'Query',
        schema: z.string().optional(),
      },
      {
        name: 'limit',
        type: 'Query',
        schema: z.number().int().gte(1).lte(100).optional().default(25),
      },
      {
        name: 'capabilityId',
        type: 'Query',
        schema: z.string().optional(),
      },
    ],
    response: z
      .object({
        data: z
          .object({
            items: z.array(
              z
                .object({
                  costCompareId: z
                    .string()
                    .regex(/^ccc_[0-9A-HJKMNP-TV-Z]{26}$/),
                  capabilityId: z.string(),
                  duplicateSpendAmount: z
                    .object({
                      amount: z.string().regex(/^-?\d+(\.\d{1,5})?$/),
                      currency: z
                        .string()
                        .min(3)
                        .max(3)
                        .regex(/^[A-Z]{3}$/),
                    })
                    .passthrough(),
                  mutualiseSpendAmount: z
                    .object({
                      amount: z.string().regex(/^-?\d+(\.\d{1,5})?$/),
                      currency: z
                        .string()
                        .min(3)
                        .max(3)
                        .regex(/^[A-Z]{3}$/),
                    })
                    .passthrough(),
                  chosenPath: z
                    .enum(['mutualise', 'keepBuild', 'undecided'])
                    .optional(),
                  estimateOnly: z.boolean().optional(),
                  rationale: z.string().optional(),
                  createdAt: z.string().datetime({ offset: true }),
                  updatedAt: z.string().datetime({ offset: true }).optional(),
                })
                .passthrough()
            ),
            nextCursor: z.string().optional(),
          })
          .passthrough(),
        meta: z
          .object({
            requestId: z.string().uuid(),
            correlationId: z.string(),
            generatedAt: z.string().datetime({ offset: true }),
          })
          .partial()
          .passthrough()
          .optional(),
      })
      .passthrough(),
    errors: [
      {
        status: 401,
        description: `Missing or invalid API key`,
        schema: z
          .object({
            type: z.string().url(),
            title: z.string(),
            status: z.number().int(),
            detail: z.string(),
            instance: z.string().url(),
            code: z.string(),
          })
          .partial()
          .passthrough(),
      },
    ],
  },
  {
    method: 'post',
    path: '/v1/cost-compares',
    alias: 'createCostCompare',
    requestFormat: 'json',
    parameters: [
      {
        name: 'body',
        type: 'Body',
        schema: createCostCompare_Body,
      },
      {
        name: 'Idempotency-Key',
        type: 'Header',
        schema: z.string().min(1).max(128),
      },
    ],
    response: z
      .object({
        data: z
          .object({
            costCompareId: z.string().regex(/^ccc_[0-9A-HJKMNP-TV-Z]{26}$/),
            capabilityId: z.string(),
            duplicateSpendAmount: z
              .object({
                amount: z.string().regex(/^-?\d+(\.\d{1,5})?$/),
                currency: z
                  .string()
                  .min(3)
                  .max(3)
                  .regex(/^[A-Z]{3}$/),
              })
              .passthrough(),
            mutualiseSpendAmount: z
              .object({
                amount: z.string().regex(/^-?\d+(\.\d{1,5})?$/),
                currency: z
                  .string()
                  .min(3)
                  .max(3)
                  .regex(/^[A-Z]{3}$/),
              })
              .passthrough(),
            chosenPath: z
              .enum(['mutualise', 'keepBuild', 'undecided'])
              .optional(),
            estimateOnly: z.boolean().optional(),
            rationale: z.string().optional(),
            createdAt: z.string().datetime({ offset: true }),
            updatedAt: z.string().datetime({ offset: true }).optional(),
          })
          .passthrough(),
        meta: z
          .object({
            requestId: z.string().uuid(),
            correlationId: z.string(),
            generatedAt: z.string().datetime({ offset: true }),
          })
          .partial()
          .passthrough()
          .optional(),
      })
      .passthrough(),
    errors: [
      {
        status: 400,
        description: `Malformed request`,
        schema: z
          .object({
            type: z.string().url(),
            title: z.string(),
            status: z.number().int(),
            detail: z.string(),
            instance: z.string().url(),
            code: z.string(),
          })
          .partial()
          .passthrough(),
      },
      {
        status: 401,
        description: `Missing or invalid API key`,
        schema: z
          .object({
            type: z.string().url(),
            title: z.string(),
            status: z.number().int(),
            detail: z.string(),
            instance: z.string().url(),
            code: z.string(),
          })
          .partial()
          .passthrough(),
      },
      {
        status: 422,
        description: `Semantically invalid request (e.g. PACK_EMPTY)`,
        schema: z
          .object({
            type: z.string().url(),
            title: z.string(),
            status: z.number().int(),
            detail: z.string(),
            instance: z.string().url(),
            code: z.string(),
          })
          .partial()
          .passthrough(),
      },
    ],
  },
  {
    method: 'get',
    path: '/v1/decisions',
    alias: 'listDecisionClasses',
    requestFormat: 'json',
    parameters: [
      {
        name: 'cursor',
        type: 'Query',
        schema: z.string().optional(),
      },
      {
        name: 'limit',
        type: 'Query',
        schema: z.number().int().gte(1).lte(100).optional().default(25),
      },
      {
        name: 'capabilityId',
        type: 'Query',
        schema: z.string().optional(),
      },
    ],
    response: z
      .object({
        data: z
          .object({
            items: z.array(
              z
                .object({
                  decisionId: z.string().regex(/^dcs_[0-9A-HJKMNP-TV-Z]{26}$/),
                  capabilityId: z.string(),
                  decision: z.enum([
                    'mutualise',
                    'externalise',
                    'automate',
                    'build',
                    'invest',
                    'decline',
                  ]),
                  economicOwner: z.string(),
                  rationale: z.string().optional(),
                  decidedAt: z.string().datetime({ offset: true }),
                  createdAt: z.string().datetime({ offset: true }).optional(),
                  updatedAt: z.string().datetime({ offset: true }).optional(),
                })
                .passthrough()
            ),
            nextCursor: z.string().optional(),
          })
          .passthrough(),
        meta: z
          .object({
            requestId: z.string().uuid(),
            correlationId: z.string(),
            generatedAt: z.string().datetime({ offset: true }),
          })
          .partial()
          .passthrough()
          .optional(),
      })
      .passthrough(),
    errors: [
      {
        status: 401,
        description: `Missing or invalid API key`,
        schema: z
          .object({
            type: z.string().url(),
            title: z.string(),
            status: z.number().int(),
            detail: z.string(),
            instance: z.string().url(),
            code: z.string(),
          })
          .partial()
          .passthrough(),
      },
    ],
  },
  {
    method: 'post',
    path: '/v1/decisions',
    alias: 'recordDecisionClass',
    requestFormat: 'json',
    parameters: [
      {
        name: 'body',
        type: 'Body',
        schema: recordDecisionClass_Body,
      },
      {
        name: 'Idempotency-Key',
        type: 'Header',
        schema: z.string().min(1).max(128),
      },
    ],
    response: z
      .object({
        data: z
          .object({
            decisionId: z.string().regex(/^dcs_[0-9A-HJKMNP-TV-Z]{26}$/),
            capabilityId: z.string(),
            decision: z.enum([
              'mutualise',
              'externalise',
              'automate',
              'build',
              'invest',
              'decline',
            ]),
            economicOwner: z.string(),
            rationale: z.string().optional(),
            decidedAt: z.string().datetime({ offset: true }),
            createdAt: z.string().datetime({ offset: true }).optional(),
            updatedAt: z.string().datetime({ offset: true }).optional(),
          })
          .passthrough(),
        meta: z
          .object({
            requestId: z.string().uuid(),
            correlationId: z.string(),
            generatedAt: z.string().datetime({ offset: true }),
          })
          .partial()
          .passthrough()
          .optional(),
      })
      .passthrough(),
    errors: [
      {
        status: 400,
        description: `Malformed request`,
        schema: z
          .object({
            type: z.string().url(),
            title: z.string(),
            status: z.number().int(),
            detail: z.string(),
            instance: z.string().url(),
            code: z.string(),
          })
          .partial()
          .passthrough(),
      },
      {
        status: 401,
        description: `Missing or invalid API key`,
        schema: z
          .object({
            type: z.string().url(),
            title: z.string(),
            status: z.number().int(),
            detail: z.string(),
            instance: z.string().url(),
            code: z.string(),
          })
          .partial()
          .passthrough(),
      },
      {
        status: 422,
        description: `Semantically invalid request (e.g. PACK_EMPTY)`,
        schema: z
          .object({
            type: z.string().url(),
            title: z.string(),
            status: z.number().int(),
            detail: z.string(),
            instance: z.string().url(),
            code: z.string(),
          })
          .partial()
          .passthrough(),
      },
    ],
  },
  {
    method: 'get',
    path: '/v1/decisions/:decisionId',
    alias: 'getDecisionClass',
    requestFormat: 'json',
    parameters: [
      {
        name: 'decisionId',
        type: 'Path',
        schema: z.string().regex(/^dcs_[0-9A-HJKMNP-TV-Z]{26}$/),
      },
    ],
    response: z
      .object({
        data: z
          .object({
            decisionId: z.string().regex(/^dcs_[0-9A-HJKMNP-TV-Z]{26}$/),
            capabilityId: z.string(),
            decision: z.enum([
              'mutualise',
              'externalise',
              'automate',
              'build',
              'invest',
              'decline',
            ]),
            economicOwner: z.string(),
            rationale: z.string().optional(),
            decidedAt: z.string().datetime({ offset: true }),
            createdAt: z.string().datetime({ offset: true }).optional(),
            updatedAt: z.string().datetime({ offset: true }).optional(),
          })
          .passthrough(),
        meta: z
          .object({
            requestId: z.string().uuid(),
            correlationId: z.string(),
            generatedAt: z.string().datetime({ offset: true }),
          })
          .partial()
          .passthrough()
          .optional(),
      })
      .passthrough(),
    errors: [
      {
        status: 401,
        description: `Missing or invalid API key`,
        schema: z
          .object({
            type: z.string().url(),
            title: z.string(),
            status: z.number().int(),
            detail: z.string(),
            instance: z.string().url(),
            code: z.string(),
          })
          .partial()
          .passthrough(),
      },
      {
        status: 404,
        description: `Resource not found`,
        schema: z
          .object({
            type: z.string().url(),
            title: z.string(),
            status: z.number().int(),
            detail: z.string(),
            instance: z.string().url(),
            code: z.string(),
          })
          .partial()
          .passthrough(),
      },
    ],
  },
  {
    method: 'get',
    path: '/v1/partnership-contracts',
    alias: 'listPartnershipContracts',
    requestFormat: 'json',
    parameters: [
      {
        name: 'cursor',
        type: 'Query',
        schema: z.string().optional(),
      },
      {
        name: 'limit',
        type: 'Query',
        schema: z.number().int().gte(1).lte(100).optional().default(25),
      },
    ],
    response: z
      .object({
        data: z
          .object({
            items: z.array(
              z
                .object({
                  contractId: z.string().regex(/^pct_[0-9A-HJKMNP-TV-Z]{26}$/),
                  capabilityId: z.string(),
                  experienceMapId: z.string().optional(),
                  status: z.enum([
                    'draft',
                    'executed',
                    'terminated',
                    'blockedGoLive',
                  ]),
                  createdAt: z.string().datetime({ offset: true }),
                  updatedAt: z.string().datetime({ offset: true }).optional(),
                })
                .passthrough()
            ),
            nextCursor: z.string().optional(),
          })
          .passthrough(),
        meta: z
          .object({
            requestId: z.string().uuid(),
            correlationId: z.string(),
            generatedAt: z.string().datetime({ offset: true }),
          })
          .partial()
          .passthrough()
          .optional(),
      })
      .passthrough(),
    errors: [
      {
        status: 401,
        description: `Missing or invalid API key`,
        schema: z
          .object({
            type: z.string().url(),
            title: z.string(),
            status: z.number().int(),
            detail: z.string(),
            instance: z.string().url(),
            code: z.string(),
          })
          .partial()
          .passthrough(),
      },
    ],
  },
  {
    method: 'post',
    path: '/v1/partnership-contracts',
    alias: 'createPartnershipContract',
    requestFormat: 'json',
    parameters: [
      {
        name: 'body',
        type: 'Body',
        schema: createPartnershipContract_Body,
      },
      {
        name: 'Idempotency-Key',
        type: 'Header',
        schema: z.string().min(1).max(128),
      },
    ],
    response: z
      .object({
        data: z
          .object({
            contractId: z.string().regex(/^pct_[0-9A-HJKMNP-TV-Z]{26}$/),
            capabilityId: z.string(),
            experienceMapId: z.string().optional(),
            status: z.enum([
              'draft',
              'executed',
              'terminated',
              'blockedGoLive',
            ]),
            createdAt: z.string().datetime({ offset: true }),
            updatedAt: z.string().datetime({ offset: true }).optional(),
          })
          .passthrough(),
        meta: z
          .object({
            requestId: z.string().uuid(),
            correlationId: z.string(),
            generatedAt: z.string().datetime({ offset: true }),
          })
          .partial()
          .passthrough()
          .optional(),
      })
      .passthrough(),
    errors: [
      {
        status: 400,
        description: `Malformed request`,
        schema: z
          .object({
            type: z.string().url(),
            title: z.string(),
            status: z.number().int(),
            detail: z.string(),
            instance: z.string().url(),
            code: z.string(),
          })
          .partial()
          .passthrough(),
      },
      {
        status: 401,
        description: `Missing or invalid API key`,
        schema: z
          .object({
            type: z.string().url(),
            title: z.string(),
            status: z.number().int(),
            detail: z.string(),
            instance: z.string().url(),
            code: z.string(),
          })
          .partial()
          .passthrough(),
      },
      {
        status: 422,
        description: `Semantically invalid request (e.g. PACK_EMPTY)`,
        schema: z
          .object({
            type: z.string().url(),
            title: z.string(),
            status: z.number().int(),
            detail: z.string(),
            instance: z.string().url(),
            code: z.string(),
          })
          .partial()
          .passthrough(),
      },
    ],
  },
  {
    method: 'patch',
    path: '/v1/partnership-contracts/:contractId',
    alias: 'updatePartnershipContract',
    requestFormat: 'json',
    parameters: [
      {
        name: 'body',
        type: 'Body',
        schema: updatePartnershipContract_Body,
      },
      {
        name: 'contractId',
        type: 'Path',
        schema: z.string().regex(/^pct_[0-9A-HJKMNP-TV-Z]{26}$/),
      },
    ],
    response: z
      .object({
        data: z
          .object({
            contractId: z.string().regex(/^pct_[0-9A-HJKMNP-TV-Z]{26}$/),
            capabilityId: z.string(),
            experienceMapId: z.string().optional(),
            status: z.enum([
              'draft',
              'executed',
              'terminated',
              'blockedGoLive',
            ]),
            createdAt: z.string().datetime({ offset: true }),
            updatedAt: z.string().datetime({ offset: true }).optional(),
          })
          .passthrough(),
        meta: z
          .object({
            requestId: z.string().uuid(),
            correlationId: z.string(),
            generatedAt: z.string().datetime({ offset: true }),
          })
          .partial()
          .passthrough()
          .optional(),
      })
      .passthrough(),
    errors: [
      {
        status: 400,
        description: `Malformed request`,
        schema: z
          .object({
            type: z.string().url(),
            title: z.string(),
            status: z.number().int(),
            detail: z.string(),
            instance: z.string().url(),
            code: z.string(),
          })
          .partial()
          .passthrough(),
      },
      {
        status: 401,
        description: `Missing or invalid API key`,
        schema: z
          .object({
            type: z.string().url(),
            title: z.string(),
            status: z.number().int(),
            detail: z.string(),
            instance: z.string().url(),
            code: z.string(),
          })
          .partial()
          .passthrough(),
      },
      {
        status: 404,
        description: `Resource not found`,
        schema: z
          .object({
            type: z.string().url(),
            title: z.string(),
            status: z.number().int(),
            detail: z.string(),
            instance: z.string().url(),
            code: z.string(),
          })
          .partial()
          .passthrough(),
      },
      {
        status: 422,
        description: `Semantically invalid request (e.g. PACK_EMPTY)`,
        schema: z
          .object({
            type: z.string().url(),
            title: z.string(),
            status: z.number().int(),
            detail: z.string(),
            instance: z.string().url(),
            code: z.string(),
          })
          .partial()
          .passthrough(),
      },
    ],
  },
  {
    method: 'get',
    path: '/v1/profit-pool-hypotheses',
    alias: 'listProfitPoolHypotheses',
    requestFormat: 'json',
    parameters: [
      {
        name: 'cursor',
        type: 'Query',
        schema: z.string().optional(),
      },
      {
        name: 'limit',
        type: 'Query',
        schema: z.number().int().gte(1).lte(100).optional().default(25),
      },
      {
        name: 'capabilityId',
        type: 'Query',
        schema: z.string().optional(),
      },
    ],
    response: z
      .object({
        data: z
          .object({
            items: z.array(
              z
                .object({
                  hypothesisId: z
                    .string()
                    .regex(/^pph_[0-9A-HJKMNP-TV-Z]{26}$/),
                  capabilityId: z.string(),
                  whoGains: z.string(),
                  whoLoses: z.string(),
                  manufacturerMarginNote: z.string().optional(),
                  distributorMarginNote: z.string().optional(),
                  tested: z.boolean().optional(),
                  resultNotes: z.string().optional(),
                  createdAt: z.string().datetime({ offset: true }),
                  updatedAt: z.string().datetime({ offset: true }).optional(),
                })
                .passthrough()
            ),
            nextCursor: z.string().optional(),
          })
          .passthrough(),
        meta: z
          .object({
            requestId: z.string().uuid(),
            correlationId: z.string(),
            generatedAt: z.string().datetime({ offset: true }),
          })
          .partial()
          .passthrough()
          .optional(),
      })
      .passthrough(),
    errors: [
      {
        status: 401,
        description: `Missing or invalid API key`,
        schema: z
          .object({
            type: z.string().url(),
            title: z.string(),
            status: z.number().int(),
            detail: z.string(),
            instance: z.string().url(),
            code: z.string(),
          })
          .partial()
          .passthrough(),
      },
    ],
  },
  {
    method: 'post',
    path: '/v1/profit-pool-hypotheses',
    alias: 'createProfitPoolHypothesis',
    requestFormat: 'json',
    parameters: [
      {
        name: 'body',
        type: 'Body',
        schema: createProfitPoolHypothesis_Body,
      },
      {
        name: 'Idempotency-Key',
        type: 'Header',
        schema: z.string().min(1).max(128),
      },
    ],
    response: z
      .object({
        data: z
          .object({
            hypothesisId: z.string().regex(/^pph_[0-9A-HJKMNP-TV-Z]{26}$/),
            capabilityId: z.string(),
            whoGains: z.string(),
            whoLoses: z.string(),
            manufacturerMarginNote: z.string().optional(),
            distributorMarginNote: z.string().optional(),
            tested: z.boolean().optional(),
            resultNotes: z.string().optional(),
            createdAt: z.string().datetime({ offset: true }),
            updatedAt: z.string().datetime({ offset: true }).optional(),
          })
          .passthrough(),
        meta: z
          .object({
            requestId: z.string().uuid(),
            correlationId: z.string(),
            generatedAt: z.string().datetime({ offset: true }),
          })
          .partial()
          .passthrough()
          .optional(),
      })
      .passthrough(),
    errors: [
      {
        status: 400,
        description: `Malformed request`,
        schema: z
          .object({
            type: z.string().url(),
            title: z.string(),
            status: z.number().int(),
            detail: z.string(),
            instance: z.string().url(),
            code: z.string(),
          })
          .partial()
          .passthrough(),
      },
      {
        status: 401,
        description: `Missing or invalid API key`,
        schema: z
          .object({
            type: z.string().url(),
            title: z.string(),
            status: z.number().int(),
            detail: z.string(),
            instance: z.string().url(),
            code: z.string(),
          })
          .partial()
          .passthrough(),
      },
      {
        status: 422,
        description: `Semantically invalid request (e.g. PACK_EMPTY)`,
        schema: z
          .object({
            type: z.string().url(),
            title: z.string(),
            status: z.number().int(),
            detail: z.string(),
            instance: z.string().url(),
            code: z.string(),
          })
          .partial()
          .passthrough(),
      },
    ],
  },
  {
    method: 'post',
    path: '/v1/profit-pool-hypotheses/:hypothesisId/test',
    alias: 'attachProfitPoolTest',
    requestFormat: 'json',
    parameters: [
      {
        name: 'body',
        type: 'Body',
        schema: attachProfitPoolTest_Body,
      },
      {
        name: 'hypothesisId',
        type: 'Path',
        schema: z.string().regex(/^pph_[0-9A-HJKMNP-TV-Z]{26}$/),
      },
      {
        name: 'Idempotency-Key',
        type: 'Header',
        schema: z.string().min(1).max(128),
      },
    ],
    response: z
      .object({
        data: z
          .object({
            hypothesisId: z.string().regex(/^pph_[0-9A-HJKMNP-TV-Z]{26}$/),
            capabilityId: z.string(),
            whoGains: z.string(),
            whoLoses: z.string(),
            manufacturerMarginNote: z.string().optional(),
            distributorMarginNote: z.string().optional(),
            tested: z.boolean().optional(),
            resultNotes: z.string().optional(),
            createdAt: z.string().datetime({ offset: true }),
            updatedAt: z.string().datetime({ offset: true }).optional(),
          })
          .passthrough(),
        meta: z
          .object({
            requestId: z.string().uuid(),
            correlationId: z.string(),
            generatedAt: z.string().datetime({ offset: true }),
          })
          .partial()
          .passthrough()
          .optional(),
      })
      .passthrough(),
    errors: [
      {
        status: 400,
        description: `Malformed request`,
        schema: z
          .object({
            type: z.string().url(),
            title: z.string(),
            status: z.number().int(),
            detail: z.string(),
            instance: z.string().url(),
            code: z.string(),
          })
          .partial()
          .passthrough(),
      },
      {
        status: 401,
        description: `Missing or invalid API key`,
        schema: z
          .object({
            type: z.string().url(),
            title: z.string(),
            status: z.number().int(),
            detail: z.string(),
            instance: z.string().url(),
            code: z.string(),
          })
          .partial()
          .passthrough(),
      },
      {
        status: 404,
        description: `Resource not found`,
        schema: z
          .object({
            type: z.string().url(),
            title: z.string(),
            status: z.number().int(),
            detail: z.string(),
            instance: z.string().url(),
            code: z.string(),
          })
          .partial()
          .passthrough(),
      },
    ],
  },
]);

export const api: any = new Zodios(
  'https://api.ddd-codegen-starter.local/v1',
  endpoints
);

export function createApiClient(baseUrl: string, options?: ZodiosOptions): any {
  return new Zodios(baseUrl, endpoints, options);
}
