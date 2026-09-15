import { makeApi, Zodios, type ZodiosOptions } from '@zodios/core';
import { z } from 'zod';

const createExperienceOwnershipMap_Body = z
  .object({
    capabilityId: z.string(),
    journeyName: z.string(),
    uxOwner: z.enum(['bank', 'partner', 'coBrand', 'shared']),
    brandOwner: z.enum(['bank', 'partner', 'coBrand', 'shared']),
    dataOwner: z.enum(['bank', 'partner', 'coBrand', 'shared']),
    complaintsOwner: z.enum(['bank', 'partner', 'coBrand', 'shared']),
    liabilityOwner: z.enum(['bank', 'partner', 'coBrand', 'shared']).optional(),
  })
  .passthrough();
const attachLiabilityTerms_Body = z
  .object({
    manufacturerLiability: z.string(),
    distributorLiability: z.string(),
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
const ExperienceMapId = z.string();
const OwnerParty = z.enum(['bank', 'partner', 'coBrand', 'shared']);
const ExperienceOwnershipMap = z
  .object({
    mapId: z.string().regex(/^exp_[0-9A-HJKMNP-TV-Z]{26}$/),
    capabilityId: z.string(),
    journeyName: z.string(),
    uxOwner: z.enum(['bank', 'partner', 'coBrand', 'shared']),
    brandOwner: z.enum(['bank', 'partner', 'coBrand', 'shared']),
    dataOwner: z.enum(['bank', 'partner', 'coBrand', 'shared']),
    complaintsOwner: z.enum(['bank', 'partner', 'coBrand', 'shared']),
    liabilityOwner: z.enum(['bank', 'partner', 'coBrand', 'shared']).optional(),
    liabilityTermsId: z.string().optional(),
    goLiveBlocked: z.boolean(),
    createdAt: z.string().datetime({ offset: true }),
    updatedAt: z.string().datetime({ offset: true }).optional(),
  })
  .passthrough();
const ExperienceOwnershipMapListData = z
  .object({
    items: z.array(
      z
        .object({
          mapId: z.string().regex(/^exp_[0-9A-HJKMNP-TV-Z]{26}$/),
          capabilityId: z.string(),
          journeyName: z.string(),
          uxOwner: z.enum(['bank', 'partner', 'coBrand', 'shared']),
          brandOwner: z.enum(['bank', 'partner', 'coBrand', 'shared']),
          dataOwner: z.enum(['bank', 'partner', 'coBrand', 'shared']),
          complaintsOwner: z.enum(['bank', 'partner', 'coBrand', 'shared']),
          liabilityOwner: z
            .enum(['bank', 'partner', 'coBrand', 'shared'])
            .optional(),
          liabilityTermsId: z.string().optional(),
          goLiveBlocked: z.boolean(),
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
const ExperienceOwnershipMapListResponse = z
  .object({
    data: z
      .object({
        items: z.array(
          z
            .object({
              mapId: z.string().regex(/^exp_[0-9A-HJKMNP-TV-Z]{26}$/),
              capabilityId: z.string(),
              journeyName: z.string(),
              uxOwner: z.enum(['bank', 'partner', 'coBrand', 'shared']),
              brandOwner: z.enum(['bank', 'partner', 'coBrand', 'shared']),
              dataOwner: z.enum(['bank', 'partner', 'coBrand', 'shared']),
              complaintsOwner: z.enum(['bank', 'partner', 'coBrand', 'shared']),
              liabilityOwner: z
                .enum(['bank', 'partner', 'coBrand', 'shared'])
                .optional(),
              liabilityTermsId: z.string().optional(),
              goLiveBlocked: z.boolean(),
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
const ExperienceOwnershipMapCreate = z
  .object({
    capabilityId: z.string(),
    journeyName: z.string(),
    uxOwner: z.enum(['bank', 'partner', 'coBrand', 'shared']),
    brandOwner: z.enum(['bank', 'partner', 'coBrand', 'shared']),
    dataOwner: z.enum(['bank', 'partner', 'coBrand', 'shared']),
    complaintsOwner: z.enum(['bank', 'partner', 'coBrand', 'shared']),
    liabilityOwner: z.enum(['bank', 'partner', 'coBrand', 'shared']).optional(),
  })
  .passthrough();
const ExperienceOwnershipMapResponse = z
  .object({
    data: z
      .object({
        mapId: z.string().regex(/^exp_[0-9A-HJKMNP-TV-Z]{26}$/),
        capabilityId: z.string(),
        journeyName: z.string(),
        uxOwner: z.enum(['bank', 'partner', 'coBrand', 'shared']),
        brandOwner: z.enum(['bank', 'partner', 'coBrand', 'shared']),
        dataOwner: z.enum(['bank', 'partner', 'coBrand', 'shared']),
        complaintsOwner: z.enum(['bank', 'partner', 'coBrand', 'shared']),
        liabilityOwner: z
          .enum(['bank', 'partner', 'coBrand', 'shared'])
          .optional(),
        liabilityTermsId: z.string().optional(),
        goLiveBlocked: z.boolean(),
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
const LiabilityTermsCreate = z
  .object({
    manufacturerLiability: z.string(),
    distributorLiability: z.string(),
  })
  .passthrough();
const LiabilityTermsId = z.string();
const LiabilityTerms = z
  .object({
    liabilityId: z.string().regex(/^lia_[0-9A-HJKMNP-TV-Z]{26}$/),
    mapId: z.string().regex(/^exp_[0-9A-HJKMNP-TV-Z]{26}$/),
    manufacturerLiability: z.string(),
    distributorLiability: z.string(),
    signed: z.boolean(),
    signedAt: z.string().datetime({ offset: true }).optional(),
    createdAt: z.string().datetime({ offset: true }).optional(),
    updatedAt: z.string().datetime({ offset: true }).optional(),
  })
  .passthrough();
const LiabilityTermsResponse = z
  .object({
    data: z
      .object({
        liabilityId: z.string().regex(/^lia_[0-9A-HJKMNP-TV-Z]{26}$/),
        mapId: z.string().regex(/^exp_[0-9A-HJKMNP-TV-Z]{26}$/),
        manufacturerLiability: z.string(),
        distributorLiability: z.string(),
        signed: z.boolean(),
        signedAt: z.string().datetime({ offset: true }).optional(),
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

export const schemas: any = {
  createExperienceOwnershipMap_Body,
  attachLiabilityTerms_Body,
  Problem,
  ExperienceMapId,
  OwnerParty,
  ExperienceOwnershipMap,
  ExperienceOwnershipMapListData,
  ResponseMeta,
  ExperienceOwnershipMapListResponse,
  ExperienceOwnershipMapCreate,
  ExperienceOwnershipMapResponse,
  LiabilityTermsCreate,
  LiabilityTermsId,
  LiabilityTerms,
  LiabilityTermsResponse,
};

const endpoints = makeApi([
  {
    method: 'get',
    path: '/v1/experience-maps',
    alias: 'listExperienceOwnershipMaps',
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
                  mapId: z.string().regex(/^exp_[0-9A-HJKMNP-TV-Z]{26}$/),
                  capabilityId: z.string(),
                  journeyName: z.string(),
                  uxOwner: z.enum(['bank', 'partner', 'coBrand', 'shared']),
                  brandOwner: z.enum(['bank', 'partner', 'coBrand', 'shared']),
                  dataOwner: z.enum(['bank', 'partner', 'coBrand', 'shared']),
                  complaintsOwner: z.enum([
                    'bank',
                    'partner',
                    'coBrand',
                    'shared',
                  ]),
                  liabilityOwner: z
                    .enum(['bank', 'partner', 'coBrand', 'shared'])
                    .optional(),
                  liabilityTermsId: z.string().optional(),
                  goLiveBlocked: z.boolean(),
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
    path: '/v1/experience-maps',
    alias: 'createExperienceOwnershipMap',
    requestFormat: 'json',
    parameters: [
      {
        name: 'body',
        type: 'Body',
        schema: createExperienceOwnershipMap_Body,
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
            mapId: z.string().regex(/^exp_[0-9A-HJKMNP-TV-Z]{26}$/),
            capabilityId: z.string(),
            journeyName: z.string(),
            uxOwner: z.enum(['bank', 'partner', 'coBrand', 'shared']),
            brandOwner: z.enum(['bank', 'partner', 'coBrand', 'shared']),
            dataOwner: z.enum(['bank', 'partner', 'coBrand', 'shared']),
            complaintsOwner: z.enum(['bank', 'partner', 'coBrand', 'shared']),
            liabilityOwner: z
              .enum(['bank', 'partner', 'coBrand', 'shared'])
              .optional(),
            liabilityTermsId: z.string().optional(),
            goLiveBlocked: z.boolean(),
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
    path: '/v1/experience-maps/:mapId',
    alias: 'getExperienceOwnershipMap',
    requestFormat: 'json',
    parameters: [
      {
        name: 'mapId',
        type: 'Path',
        schema: z.string().regex(/^exp_[0-9A-HJKMNP-TV-Z]{26}$/),
      },
    ],
    response: z
      .object({
        data: z
          .object({
            mapId: z.string().regex(/^exp_[0-9A-HJKMNP-TV-Z]{26}$/),
            capabilityId: z.string(),
            journeyName: z.string(),
            uxOwner: z.enum(['bank', 'partner', 'coBrand', 'shared']),
            brandOwner: z.enum(['bank', 'partner', 'coBrand', 'shared']),
            dataOwner: z.enum(['bank', 'partner', 'coBrand', 'shared']),
            complaintsOwner: z.enum(['bank', 'partner', 'coBrand', 'shared']),
            liabilityOwner: z
              .enum(['bank', 'partner', 'coBrand', 'shared'])
              .optional(),
            liabilityTermsId: z.string().optional(),
            goLiveBlocked: z.boolean(),
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
    method: 'post',
    path: '/v1/experience-maps/:mapId/liability',
    alias: 'attachLiabilityTerms',
    requestFormat: 'json',
    parameters: [
      {
        name: 'body',
        type: 'Body',
        schema: attachLiabilityTerms_Body,
      },
      {
        name: 'mapId',
        type: 'Path',
        schema: z.string().regex(/^exp_[0-9A-HJKMNP-TV-Z]{26}$/),
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
            mapId: z.string().regex(/^exp_[0-9A-HJKMNP-TV-Z]{26}$/),
            capabilityId: z.string(),
            journeyName: z.string(),
            uxOwner: z.enum(['bank', 'partner', 'coBrand', 'shared']),
            brandOwner: z.enum(['bank', 'partner', 'coBrand', 'shared']),
            dataOwner: z.enum(['bank', 'partner', 'coBrand', 'shared']),
            complaintsOwner: z.enum(['bank', 'partner', 'coBrand', 'shared']),
            liabilityOwner: z
              .enum(['bank', 'partner', 'coBrand', 'shared'])
              .optional(),
            liabilityTermsId: z.string().optional(),
            goLiveBlocked: z.boolean(),
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
    method: 'post',
    path: '/v1/liability-terms/:liabilityId/sign',
    alias: 'signLiabilityTerms',
    requestFormat: 'json',
    parameters: [
      {
        name: 'liabilityId',
        type: 'Path',
        schema: z.string().regex(/^lia_[0-9A-HJKMNP-TV-Z]{26}$/),
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
            liabilityId: z.string().regex(/^lia_[0-9A-HJKMNP-TV-Z]{26}$/),
            mapId: z.string().regex(/^exp_[0-9A-HJKMNP-TV-Z]{26}$/),
            manufacturerLiability: z.string(),
            distributorLiability: z.string(),
            signed: z.boolean(),
            signedAt: z.string().datetime({ offset: true }).optional(),
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
