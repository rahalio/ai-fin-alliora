import { makeApi, Zodios, type ZodiosOptions } from '@zodios/core';
import { z } from 'zod';

const createBionicRoleMap_Body = z
  .object({
    capabilityId: z.string(),
    roleName: z.string(),
    treatment: z.enum(['augment', 'replace']),
    transitionFundingNote: z.string().optional(),
  })
  .passthrough();
const signBionicRoleMap_Body = z
  .object({ hrSigned: z.boolean(), conductSigned: z.boolean().optional() })
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
const BionicRoleMapId = z.string();
const BionicRoleMap = z
  .object({
    mapId: z.string().regex(/^bio_[0-9A-HJKMNP-TV-Z]{26}$/),
    capabilityId: z.string(),
    roleName: z.string(),
    treatment: z.enum(['augment', 'replace']),
    transitionFundingNote: z.string().optional(),
    hrSigned: z.boolean(),
    conductSigned: z.boolean().optional(),
    scaleBlocked: z.boolean(),
    signedAt: z.string().datetime({ offset: true }).optional(),
    createdAt: z.string().datetime({ offset: true }),
    updatedAt: z.string().datetime({ offset: true }).optional(),
  })
  .passthrough();
const BionicRoleMapListData = z
  .object({
    items: z.array(
      z
        .object({
          mapId: z.string().regex(/^bio_[0-9A-HJKMNP-TV-Z]{26}$/),
          capabilityId: z.string(),
          roleName: z.string(),
          treatment: z.enum(['augment', 'replace']),
          transitionFundingNote: z.string().optional(),
          hrSigned: z.boolean(),
          conductSigned: z.boolean().optional(),
          scaleBlocked: z.boolean(),
          signedAt: z.string().datetime({ offset: true }).optional(),
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
const BionicRoleMapListResponse = z
  .object({
    data: z
      .object({
        items: z.array(
          z
            .object({
              mapId: z.string().regex(/^bio_[0-9A-HJKMNP-TV-Z]{26}$/),
              capabilityId: z.string(),
              roleName: z.string(),
              treatment: z.enum(['augment', 'replace']),
              transitionFundingNote: z.string().optional(),
              hrSigned: z.boolean(),
              conductSigned: z.boolean().optional(),
              scaleBlocked: z.boolean(),
              signedAt: z.string().datetime({ offset: true }).optional(),
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
const BionicRoleMapCreate = z
  .object({
    capabilityId: z.string(),
    roleName: z.string(),
    treatment: z.enum(['augment', 'replace']),
    transitionFundingNote: z.string().optional(),
  })
  .passthrough();
const BionicRoleMapResponse = z
  .object({
    data: z
      .object({
        mapId: z.string().regex(/^bio_[0-9A-HJKMNP-TV-Z]{26}$/),
        capabilityId: z.string(),
        roleName: z.string(),
        treatment: z.enum(['augment', 'replace']),
        transitionFundingNote: z.string().optional(),
        hrSigned: z.boolean(),
        conductSigned: z.boolean().optional(),
        scaleBlocked: z.boolean(),
        signedAt: z.string().datetime({ offset: true }).optional(),
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
const BionicRoleMapSignoff = z
  .object({ hrSigned: z.boolean(), conductSigned: z.boolean().optional() })
  .passthrough();

export const schemas: any = {
  createBionicRoleMap_Body,
  signBionicRoleMap_Body,
  Problem,
  BionicRoleMapId,
  BionicRoleMap,
  BionicRoleMapListData,
  ResponseMeta,
  BionicRoleMapListResponse,
  BionicRoleMapCreate,
  BionicRoleMapResponse,
  BionicRoleMapSignoff,
};

const endpoints = makeApi([
  {
    method: 'get',
    path: '/v1/workforce-maps',
    alias: 'listBionicRoleMaps',
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
                  mapId: z.string().regex(/^bio_[0-9A-HJKMNP-TV-Z]{26}$/),
                  capabilityId: z.string(),
                  roleName: z.string(),
                  treatment: z.enum(['augment', 'replace']),
                  transitionFundingNote: z.string().optional(),
                  hrSigned: z.boolean(),
                  conductSigned: z.boolean().optional(),
                  scaleBlocked: z.boolean(),
                  signedAt: z.string().datetime({ offset: true }).optional(),
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
    path: '/v1/workforce-maps',
    alias: 'createBionicRoleMap',
    requestFormat: 'json',
    parameters: [
      {
        name: 'body',
        type: 'Body',
        schema: createBionicRoleMap_Body,
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
            mapId: z.string().regex(/^bio_[0-9A-HJKMNP-TV-Z]{26}$/),
            capabilityId: z.string(),
            roleName: z.string(),
            treatment: z.enum(['augment', 'replace']),
            transitionFundingNote: z.string().optional(),
            hrSigned: z.boolean(),
            conductSigned: z.boolean().optional(),
            scaleBlocked: z.boolean(),
            signedAt: z.string().datetime({ offset: true }).optional(),
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
    path: '/v1/workforce-maps/:mapId',
    alias: 'getBionicRoleMap',
    requestFormat: 'json',
    parameters: [
      {
        name: 'mapId',
        type: 'Path',
        schema: z.string().regex(/^bio_[0-9A-HJKMNP-TV-Z]{26}$/),
      },
    ],
    response: z
      .object({
        data: z
          .object({
            mapId: z.string().regex(/^bio_[0-9A-HJKMNP-TV-Z]{26}$/),
            capabilityId: z.string(),
            roleName: z.string(),
            treatment: z.enum(['augment', 'replace']),
            transitionFundingNote: z.string().optional(),
            hrSigned: z.boolean(),
            conductSigned: z.boolean().optional(),
            scaleBlocked: z.boolean(),
            signedAt: z.string().datetime({ offset: true }).optional(),
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
    path: '/v1/workforce-maps/:mapId/hr-signoff',
    alias: 'signBionicRoleMap',
    requestFormat: 'json',
    parameters: [
      {
        name: 'body',
        type: 'Body',
        schema: signBionicRoleMap_Body,
      },
      {
        name: 'mapId',
        type: 'Path',
        schema: z.string().regex(/^bio_[0-9A-HJKMNP-TV-Z]{26}$/),
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
            mapId: z.string().regex(/^bio_[0-9A-HJKMNP-TV-Z]{26}$/),
            capabilityId: z.string(),
            roleName: z.string(),
            treatment: z.enum(['augment', 'replace']),
            transitionFundingNote: z.string().optional(),
            hrSigned: z.boolean(),
            conductSigned: z.boolean().optional(),
            scaleBlocked: z.boolean(),
            signedAt: z.string().datetime({ offset: true }).optional(),
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
