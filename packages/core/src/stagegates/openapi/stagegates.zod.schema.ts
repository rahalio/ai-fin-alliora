import { makeApi, Zodios, type ZodiosOptions } from '@zodios/core';
import { z } from 'zod';

const createStageGate_Body = z
  .object({
    capabilityId: z.string(),
    dayMarker: z.union([z.literal(30), z.literal(90), z.literal(180)]),
  })
  .passthrough();
const submitEvidencePack_Body = z
  .object({
    switchingMateriality: z.boolean(),
    unitEconomicsPass: z.boolean(),
    operationalRiskNotes: z.string().optional(),
  })
  .passthrough();
const decideStageGateOutcome_Body = z
  .object({
    outcome: z.enum(['pass', 'kill', 'scale', 'extend']),
    rationale: z.string().optional(),
  })
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
const StageGateId = z.string();
const StageGate = z
  .object({
    gateId: z.string().regex(/^gat_[0-9A-HJKMNP-TV-Z]{26}$/),
    capabilityId: z.string(),
    dayMarker: z.union([z.literal(30), z.literal(90), z.literal(180)]),
    status: z.enum(['pending', 'pass', 'kill', 'scale', 'extend']),
    evidencePackId: z.string().optional(),
    outcomeRationale: z.string().optional(),
    createdAt: z.string().datetime({ offset: true }),
    updatedAt: z.string().datetime({ offset: true }).optional(),
  })
  .passthrough();
const StageGateListData = z
  .object({
    items: z.array(
      z
        .object({
          gateId: z.string().regex(/^gat_[0-9A-HJKMNP-TV-Z]{26}$/),
          capabilityId: z.string(),
          dayMarker: z.union([z.literal(30), z.literal(90), z.literal(180)]),
          status: z.enum(['pending', 'pass', 'kill', 'scale', 'extend']),
          evidencePackId: z.string().optional(),
          outcomeRationale: z.string().optional(),
          createdAt: z.string().datetime({ offset: true }),
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
const StageGateListResponse = z
  .object({
    data: z
      .object({
        items: z.array(
          z
            .object({
              gateId: z.string().regex(/^gat_[0-9A-HJKMNP-TV-Z]{26}$/),
              capabilityId: z.string(),
              dayMarker: z.union([
                z.literal(30),
                z.literal(90),
                z.literal(180),
              ]),
              status: z.enum(['pending', 'pass', 'kill', 'scale', 'extend']),
              evidencePackId: z.string().optional(),
              outcomeRationale: z.string().optional(),
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
const StageGateCreate = z
  .object({
    capabilityId: z.string(),
    dayMarker: z.union([z.literal(30), z.literal(90), z.literal(180)]),
  })
  .passthrough();
const StageGateResponse = z
  .object({
    data: z
      .object({
        gateId: z.string().regex(/^gat_[0-9A-HJKMNP-TV-Z]{26}$/),
        capabilityId: z.string(),
        dayMarker: z.union([z.literal(30), z.literal(90), z.literal(180)]),
        status: z.enum(['pending', 'pass', 'kill', 'scale', 'extend']),
        evidencePackId: z.string().optional(),
        outcomeRationale: z.string().optional(),
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
const EvidencePackId = z.string();
const EvidencePack = z
  .object({
    evidencePackId: z.string().regex(/^evi_[0-9A-HJKMNP-TV-Z]{26}$/),
    gateId: z.string().regex(/^gat_[0-9A-HJKMNP-TV-Z]{26}$/),
    switchingMateriality: z.boolean(),
    unitEconomicsPass: z.boolean(),
    operationalRiskNotes: z.string().optional(),
    attachedAt: z.string().datetime({ offset: true }),
    createdAt: z.string().datetime({ offset: true }).optional(),
    updatedAt: z.string().datetime({ offset: true }).optional(),
  })
  .passthrough();
const EvidencePackResponse = z
  .object({
    data: z
      .object({
        evidencePackId: z.string().regex(/^evi_[0-9A-HJKMNP-TV-Z]{26}$/),
        gateId: z.string().regex(/^gat_[0-9A-HJKMNP-TV-Z]{26}$/),
        switchingMateriality: z.boolean(),
        unitEconomicsPass: z.boolean(),
        operationalRiskNotes: z.string().optional(),
        attachedAt: z.string().datetime({ offset: true }),
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
const EvidencePackCreate = z
  .object({
    switchingMateriality: z.boolean(),
    unitEconomicsPass: z.boolean(),
    operationalRiskNotes: z.string().optional(),
  })
  .passthrough();
const StageGateOutcomeRequest = z
  .object({
    outcome: z.enum(['pass', 'kill', 'scale', 'extend']),
    rationale: z.string().optional(),
  })
  .passthrough();

export const schemas: any = {
  createStageGate_Body,
  submitEvidencePack_Body,
  decideStageGateOutcome_Body,
  Problem,
  StageGateId,
  StageGate,
  StageGateListData,
  ResponseMeta,
  StageGateListResponse,
  StageGateCreate,
  StageGateResponse,
  EvidencePackId,
  EvidencePack,
  EvidencePackResponse,
  EvidencePackCreate,
  StageGateOutcomeRequest,
};

const endpoints = makeApi([
  {
    method: 'get',
    path: '/v1/stage-gates',
    alias: 'listStageGates',
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
      {
        name: 'status',
        type: 'Query',
        schema: z
          .enum(['pending', 'pass', 'kill', 'scale', 'extend'])
          .optional(),
      },
    ],
    response: z
      .object({
        data: z
          .object({
            items: z.array(
              z
                .object({
                  gateId: z.string().regex(/^gat_[0-9A-HJKMNP-TV-Z]{26}$/),
                  capabilityId: z.string(),
                  dayMarker: z.union([
                    z.literal(30),
                    z.literal(90),
                    z.literal(180),
                  ]),
                  status: z.enum([
                    'pending',
                    'pass',
                    'kill',
                    'scale',
                    'extend',
                  ]),
                  evidencePackId: z.string().optional(),
                  outcomeRationale: z.string().optional(),
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
    path: '/v1/stage-gates',
    alias: 'createStageGate',
    requestFormat: 'json',
    parameters: [
      {
        name: 'body',
        type: 'Body',
        schema: createStageGate_Body,
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
            gateId: z.string().regex(/^gat_[0-9A-HJKMNP-TV-Z]{26}$/),
            capabilityId: z.string(),
            dayMarker: z.union([z.literal(30), z.literal(90), z.literal(180)]),
            status: z.enum(['pending', 'pass', 'kill', 'scale', 'extend']),
            evidencePackId: z.string().optional(),
            outcomeRationale: z.string().optional(),
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
    path: '/v1/stage-gates/:gateId',
    alias: 'getStageGate',
    requestFormat: 'json',
    parameters: [
      {
        name: 'gateId',
        type: 'Path',
        schema: z.string().regex(/^gat_[0-9A-HJKMNP-TV-Z]{26}$/),
      },
    ],
    response: z
      .object({
        data: z
          .object({
            gateId: z.string().regex(/^gat_[0-9A-HJKMNP-TV-Z]{26}$/),
            capabilityId: z.string(),
            dayMarker: z.union([z.literal(30), z.literal(90), z.literal(180)]),
            status: z.enum(['pending', 'pass', 'kill', 'scale', 'extend']),
            evidencePackId: z.string().optional(),
            outcomeRationale: z.string().optional(),
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
    path: '/v1/stage-gates/:gateId/evidence',
    alias: 'getEvidencePack',
    requestFormat: 'json',
    parameters: [
      {
        name: 'gateId',
        type: 'Path',
        schema: z.string().regex(/^gat_[0-9A-HJKMNP-TV-Z]{26}$/),
      },
    ],
    response: z
      .object({
        data: z
          .object({
            evidencePackId: z.string().regex(/^evi_[0-9A-HJKMNP-TV-Z]{26}$/),
            gateId: z.string().regex(/^gat_[0-9A-HJKMNP-TV-Z]{26}$/),
            switchingMateriality: z.boolean(),
            unitEconomicsPass: z.boolean(),
            operationalRiskNotes: z.string().optional(),
            attachedAt: z.string().datetime({ offset: true }),
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
    method: 'post',
    path: '/v1/stage-gates/:gateId/evidence',
    alias: 'submitEvidencePack',
    requestFormat: 'json',
    parameters: [
      {
        name: 'body',
        type: 'Body',
        schema: submitEvidencePack_Body,
      },
      {
        name: 'gateId',
        type: 'Path',
        schema: z.string().regex(/^gat_[0-9A-HJKMNP-TV-Z]{26}$/),
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
            evidencePackId: z.string().regex(/^evi_[0-9A-HJKMNP-TV-Z]{26}$/),
            gateId: z.string().regex(/^gat_[0-9A-HJKMNP-TV-Z]{26}$/),
            switchingMateriality: z.boolean(),
            unitEconomicsPass: z.boolean(),
            operationalRiskNotes: z.string().optional(),
            attachedAt: z.string().datetime({ offset: true }),
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
    method: 'post',
    path: '/v1/stage-gates/:gateId/outcome',
    alias: 'decideStageGateOutcome',
    requestFormat: 'json',
    parameters: [
      {
        name: 'body',
        type: 'Body',
        schema: decideStageGateOutcome_Body,
      },
      {
        name: 'gateId',
        type: 'Path',
        schema: z.string().regex(/^gat_[0-9A-HJKMNP-TV-Z]{26}$/),
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
            gateId: z.string().regex(/^gat_[0-9A-HJKMNP-TV-Z]{26}$/),
            capabilityId: z.string(),
            dayMarker: z.union([z.literal(30), z.literal(90), z.literal(180)]),
            status: z.enum(['pending', 'pass', 'kill', 'scale', 'extend']),
            evidencePackId: z.string().optional(),
            outcomeRationale: z.string().optional(),
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
]);

export const api: any = new Zodios(
  'https://api.ddd-codegen-starter.local/v1',
  endpoints
);

export function createApiClient(baseUrl: string, options?: ZodiosOptions): any {
  return new Zodios(baseUrl, endpoints, options);
}
