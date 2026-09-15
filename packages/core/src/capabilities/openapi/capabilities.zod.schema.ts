import { makeApi, Zodios, type ZodiosOptions } from '@zodios/core';
import { z } from 'zod';

const createCapability_Body = z
  .object({
    name: z.string(),
    sourceType: z.enum(['fintech', 'utility', 'internalBuild', 'acquisition']),
    economicOwner: z.string(),
    vendorName: z.string().optional(),
  })
  .passthrough();
const updateCapability_Body = z
  .object({
    name: z.string(),
    vendorName: z.string(),
    economicOwner: z.string(),
    scorecardNotes: z.string(),
    status: z.enum(['intake', 'tagged', 'inPilot', 'scaled', 'killed']),
  })
  .partial()
  .passthrough();
const tagCapabilityForces_Body = z
  .object({
    forces: z
      .array(
        z.enum([
          'costCommoditization',
          'profitRedistribution',
          'experienceOwnership',
          'platformsRising',
          'dataMonetization',
          'bionicWorkforce',
          'systemicallyImportantTechs',
          'financialRegionalization',
        ])
      )
      .min(1),
    valueChainPosition: z.enum([
      'manufacture',
      'distribute',
      'infrastructure',
      'data',
      'labourAugmentation',
    ]),
  })
  .passthrough();
const createRegionalConstraint_Body = z
  .object({
    capabilityId: z.string().regex(/^cap_[0-9A-HJKMNP-TV-Z]{26}$/),
    region: z.string(),
    constraintType: z.enum(['licence', 'dataResidency', 'conduct']),
    blocksCopyPaste: z.boolean().optional(),
    notes: z.string().optional(),
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
const CapabilityId = z.string();
const DisruptiveForce = z.enum([
  'costCommoditization',
  'profitRedistribution',
  'experienceOwnership',
  'platformsRising',
  'dataMonetization',
  'bionicWorkforce',
  'systemicallyImportantTechs',
  'financialRegionalization',
]);
const ValueChainPosition = z.enum([
  'manufacture',
  'distribute',
  'infrastructure',
  'data',
  'labourAugmentation',
]);
const Capability = z
  .object({
    capabilityId: z.string().regex(/^cap_[0-9A-HJKMNP-TV-Z]{26}$/),
    name: z.string(),
    vendorName: z.string().optional(),
    sourceType: z.enum(['fintech', 'utility', 'internalBuild', 'acquisition']),
    status: z.enum(['intake', 'tagged', 'inPilot', 'scaled', 'killed']),
    forces: z
      .array(
        z.enum([
          'costCommoditization',
          'profitRedistribution',
          'experienceOwnership',
          'platformsRising',
          'dataMonetization',
          'bionicWorkforce',
          'systemicallyImportantTechs',
          'financialRegionalization',
        ])
      )
      .optional(),
    valueChainPosition: z
      .enum([
        'manufacture',
        'distribute',
        'infrastructure',
        'data',
        'labourAugmentation',
      ])
      .optional(),
    economicOwner: z.string(),
    scorecardNotes: z.string().optional(),
    createdAt: z.string().datetime({ offset: true }),
    updatedAt: z.string().datetime({ offset: true }),
  })
  .passthrough();
const CapabilityListData = z
  .object({
    items: z.array(
      z
        .object({
          capabilityId: z.string().regex(/^cap_[0-9A-HJKMNP-TV-Z]{26}$/),
          name: z.string(),
          vendorName: z.string().optional(),
          sourceType: z.enum([
            'fintech',
            'utility',
            'internalBuild',
            'acquisition',
          ]),
          status: z.enum(['intake', 'tagged', 'inPilot', 'scaled', 'killed']),
          forces: z
            .array(
              z.enum([
                'costCommoditization',
                'profitRedistribution',
                'experienceOwnership',
                'platformsRising',
                'dataMonetization',
                'bionicWorkforce',
                'systemicallyImportantTechs',
                'financialRegionalization',
              ])
            )
            .optional(),
          valueChainPosition: z
            .enum([
              'manufacture',
              'distribute',
              'infrastructure',
              'data',
              'labourAugmentation',
            ])
            .optional(),
          economicOwner: z.string(),
          scorecardNotes: z.string().optional(),
          createdAt: z.string().datetime({ offset: true }),
          updatedAt: z.string().datetime({ offset: true }),
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
const CapabilityListResponse = z
  .object({
    data: z
      .object({
        items: z.array(
          z
            .object({
              capabilityId: z.string().regex(/^cap_[0-9A-HJKMNP-TV-Z]{26}$/),
              name: z.string(),
              vendorName: z.string().optional(),
              sourceType: z.enum([
                'fintech',
                'utility',
                'internalBuild',
                'acquisition',
              ]),
              status: z.enum([
                'intake',
                'tagged',
                'inPilot',
                'scaled',
                'killed',
              ]),
              forces: z
                .array(
                  z.enum([
                    'costCommoditization',
                    'profitRedistribution',
                    'experienceOwnership',
                    'platformsRising',
                    'dataMonetization',
                    'bionicWorkforce',
                    'systemicallyImportantTechs',
                    'financialRegionalization',
                  ])
                )
                .optional(),
              valueChainPosition: z
                .enum([
                  'manufacture',
                  'distribute',
                  'infrastructure',
                  'data',
                  'labourAugmentation',
                ])
                .optional(),
              economicOwner: z.string(),
              scorecardNotes: z.string().optional(),
              createdAt: z.string().datetime({ offset: true }),
              updatedAt: z.string().datetime({ offset: true }),
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
const CapabilityCreate = z
  .object({
    name: z.string(),
    sourceType: z.enum(['fintech', 'utility', 'internalBuild', 'acquisition']),
    economicOwner: z.string(),
    vendorName: z.string().optional(),
  })
  .passthrough();
const CapabilityResponse = z
  .object({
    data: z
      .object({
        capabilityId: z.string().regex(/^cap_[0-9A-HJKMNP-TV-Z]{26}$/),
        name: z.string(),
        vendorName: z.string().optional(),
        sourceType: z.enum([
          'fintech',
          'utility',
          'internalBuild',
          'acquisition',
        ]),
        status: z.enum(['intake', 'tagged', 'inPilot', 'scaled', 'killed']),
        forces: z
          .array(
            z.enum([
              'costCommoditization',
              'profitRedistribution',
              'experienceOwnership',
              'platformsRising',
              'dataMonetization',
              'bionicWorkforce',
              'systemicallyImportantTechs',
              'financialRegionalization',
            ])
          )
          .optional(),
        valueChainPosition: z
          .enum([
            'manufacture',
            'distribute',
            'infrastructure',
            'data',
            'labourAugmentation',
          ])
          .optional(),
        economicOwner: z.string(),
        scorecardNotes: z.string().optional(),
        createdAt: z.string().datetime({ offset: true }),
        updatedAt: z.string().datetime({ offset: true }),
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
const CapabilityUpdate = z
  .object({
    name: z.string(),
    vendorName: z.string(),
    economicOwner: z.string(),
    scorecardNotes: z.string(),
    status: z.enum(['intake', 'tagged', 'inPilot', 'scaled', 'killed']),
  })
  .partial()
  .passthrough();
const ForceTagRequest = z
  .object({
    forces: z
      .array(
        z.enum([
          'costCommoditization',
          'profitRedistribution',
          'experienceOwnership',
          'platformsRising',
          'dataMonetization',
          'bionicWorkforce',
          'systemicallyImportantTechs',
          'financialRegionalization',
        ])
      )
      .min(1),
    valueChainPosition: z.enum([
      'manufacture',
      'distribute',
      'infrastructure',
      'data',
      'labourAugmentation',
    ]),
  })
  .passthrough();
const RegionalConstraintId = z.string();
const RegionalConstraint = z
  .object({
    regionalConstraintId: z.string().regex(/^rgn_[0-9A-HJKMNP-TV-Z]{26}$/),
    capabilityId: z.string().regex(/^cap_[0-9A-HJKMNP-TV-Z]{26}$/),
    region: z.string(),
    constraintType: z.enum(['licence', 'dataResidency', 'conduct']),
    blocksCopyPaste: z.boolean().optional(),
    notes: z.string().optional(),
    createdAt: z.string().datetime({ offset: true }),
    updatedAt: z.string().datetime({ offset: true }).optional(),
  })
  .passthrough();
const RegionalConstraintListData = z
  .object({
    items: z.array(
      z
        .object({
          regionalConstraintId: z
            .string()
            .regex(/^rgn_[0-9A-HJKMNP-TV-Z]{26}$/),
          capabilityId: z.string().regex(/^cap_[0-9A-HJKMNP-TV-Z]{26}$/),
          region: z.string(),
          constraintType: z.enum(['licence', 'dataResidency', 'conduct']),
          blocksCopyPaste: z.boolean().optional(),
          notes: z.string().optional(),
          createdAt: z.string().datetime({ offset: true }),
          updatedAt: z.string().datetime({ offset: true }).optional(),
        })
        .passthrough()
    ),
    nextCursor: z.string().optional(),
  })
  .passthrough();
const RegionalConstraintListResponse = z
  .object({
    data: z
      .object({
        items: z.array(
          z
            .object({
              regionalConstraintId: z
                .string()
                .regex(/^rgn_[0-9A-HJKMNP-TV-Z]{26}$/),
              capabilityId: z.string().regex(/^cap_[0-9A-HJKMNP-TV-Z]{26}$/),
              region: z.string(),
              constraintType: z.enum(['licence', 'dataResidency', 'conduct']),
              blocksCopyPaste: z.boolean().optional(),
              notes: z.string().optional(),
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
const RegionalConstraintCreate = z
  .object({
    capabilityId: z.string().regex(/^cap_[0-9A-HJKMNP-TV-Z]{26}$/),
    region: z.string(),
    constraintType: z.enum(['licence', 'dataResidency', 'conduct']),
    blocksCopyPaste: z.boolean().optional(),
    notes: z.string().optional(),
  })
  .passthrough();
const RegionalConstraintResponse = z
  .object({
    data: z
      .object({
        regionalConstraintId: z.string().regex(/^rgn_[0-9A-HJKMNP-TV-Z]{26}$/),
        capabilityId: z.string().regex(/^cap_[0-9A-HJKMNP-TV-Z]{26}$/),
        region: z.string(),
        constraintType: z.enum(['licence', 'dataResidency', 'conduct']),
        blocksCopyPaste: z.boolean().optional(),
        notes: z.string().optional(),
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

export const schemas: any = {
  createCapability_Body,
  updateCapability_Body,
  tagCapabilityForces_Body,
  createRegionalConstraint_Body,
  Problem,
  CapabilityId,
  DisruptiveForce,
  ValueChainPosition,
  Capability,
  CapabilityListData,
  ResponseMeta,
  CapabilityListResponse,
  CapabilityCreate,
  CapabilityResponse,
  CapabilityUpdate,
  ForceTagRequest,
  RegionalConstraintId,
  RegionalConstraint,
  RegionalConstraintListData,
  RegionalConstraintListResponse,
  RegionalConstraintCreate,
  RegionalConstraintResponse,
};

const endpoints = makeApi([
  {
    method: 'get',
    path: '/v1/capabilities',
    alias: 'listCapabilities',
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
        name: 'force',
        type: 'Query',
        schema: z
          .enum([
            'costCommoditization',
            'profitRedistribution',
            'experienceOwnership',
            'platformsRising',
            'dataMonetization',
            'bionicWorkforce',
            'systemicallyImportantTechs',
            'financialRegionalization',
          ])
          .optional(),
      },
      {
        name: 'status',
        type: 'Query',
        schema: z
          .enum(['intake', 'tagged', 'inPilot', 'scaled', 'killed'])
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
                  capabilityId: z
                    .string()
                    .regex(/^cap_[0-9A-HJKMNP-TV-Z]{26}$/),
                  name: z.string(),
                  vendorName: z.string().optional(),
                  sourceType: z.enum([
                    'fintech',
                    'utility',
                    'internalBuild',
                    'acquisition',
                  ]),
                  status: z.enum([
                    'intake',
                    'tagged',
                    'inPilot',
                    'scaled',
                    'killed',
                  ]),
                  forces: z
                    .array(
                      z.enum([
                        'costCommoditization',
                        'profitRedistribution',
                        'experienceOwnership',
                        'platformsRising',
                        'dataMonetization',
                        'bionicWorkforce',
                        'systemicallyImportantTechs',
                        'financialRegionalization',
                      ])
                    )
                    .optional(),
                  valueChainPosition: z
                    .enum([
                      'manufacture',
                      'distribute',
                      'infrastructure',
                      'data',
                      'labourAugmentation',
                    ])
                    .optional(),
                  economicOwner: z.string(),
                  scorecardNotes: z.string().optional(),
                  createdAt: z.string().datetime({ offset: true }),
                  updatedAt: z.string().datetime({ offset: true }),
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
    path: '/v1/capabilities',
    alias: 'createCapability',
    requestFormat: 'json',
    parameters: [
      {
        name: 'body',
        type: 'Body',
        schema: createCapability_Body,
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
            capabilityId: z.string().regex(/^cap_[0-9A-HJKMNP-TV-Z]{26}$/),
            name: z.string(),
            vendorName: z.string().optional(),
            sourceType: z.enum([
              'fintech',
              'utility',
              'internalBuild',
              'acquisition',
            ]),
            status: z.enum(['intake', 'tagged', 'inPilot', 'scaled', 'killed']),
            forces: z
              .array(
                z.enum([
                  'costCommoditization',
                  'profitRedistribution',
                  'experienceOwnership',
                  'platformsRising',
                  'dataMonetization',
                  'bionicWorkforce',
                  'systemicallyImportantTechs',
                  'financialRegionalization',
                ])
              )
              .optional(),
            valueChainPosition: z
              .enum([
                'manufacture',
                'distribute',
                'infrastructure',
                'data',
                'labourAugmentation',
              ])
              .optional(),
            economicOwner: z.string(),
            scorecardNotes: z.string().optional(),
            createdAt: z.string().datetime({ offset: true }),
            updatedAt: z.string().datetime({ offset: true }),
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
        status: 409,
        description: `Idempotency key reuse with different body, or state conflict`,
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
    path: '/v1/capabilities/:capabilityId',
    alias: 'getCapability',
    requestFormat: 'json',
    parameters: [
      {
        name: 'capabilityId',
        type: 'Path',
        schema: z.string().regex(/^cap_[0-9A-HJKMNP-TV-Z]{26}$/),
      },
    ],
    response: z
      .object({
        data: z
          .object({
            capabilityId: z.string().regex(/^cap_[0-9A-HJKMNP-TV-Z]{26}$/),
            name: z.string(),
            vendorName: z.string().optional(),
            sourceType: z.enum([
              'fintech',
              'utility',
              'internalBuild',
              'acquisition',
            ]),
            status: z.enum(['intake', 'tagged', 'inPilot', 'scaled', 'killed']),
            forces: z
              .array(
                z.enum([
                  'costCommoditization',
                  'profitRedistribution',
                  'experienceOwnership',
                  'platformsRising',
                  'dataMonetization',
                  'bionicWorkforce',
                  'systemicallyImportantTechs',
                  'financialRegionalization',
                ])
              )
              .optional(),
            valueChainPosition: z
              .enum([
                'manufacture',
                'distribute',
                'infrastructure',
                'data',
                'labourAugmentation',
              ])
              .optional(),
            economicOwner: z.string(),
            scorecardNotes: z.string().optional(),
            createdAt: z.string().datetime({ offset: true }),
            updatedAt: z.string().datetime({ offset: true }),
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
    method: 'patch',
    path: '/v1/capabilities/:capabilityId',
    alias: 'updateCapability',
    requestFormat: 'json',
    parameters: [
      {
        name: 'body',
        type: 'Body',
        schema: updateCapability_Body,
      },
      {
        name: 'capabilityId',
        type: 'Path',
        schema: z.string().regex(/^cap_[0-9A-HJKMNP-TV-Z]{26}$/),
      },
    ],
    response: z
      .object({
        data: z
          .object({
            capabilityId: z.string().regex(/^cap_[0-9A-HJKMNP-TV-Z]{26}$/),
            name: z.string(),
            vendorName: z.string().optional(),
            sourceType: z.enum([
              'fintech',
              'utility',
              'internalBuild',
              'acquisition',
            ]),
            status: z.enum(['intake', 'tagged', 'inPilot', 'scaled', 'killed']),
            forces: z
              .array(
                z.enum([
                  'costCommoditization',
                  'profitRedistribution',
                  'experienceOwnership',
                  'platformsRising',
                  'dataMonetization',
                  'bionicWorkforce',
                  'systemicallyImportantTechs',
                  'financialRegionalization',
                ])
              )
              .optional(),
            valueChainPosition: z
              .enum([
                'manufacture',
                'distribute',
                'infrastructure',
                'data',
                'labourAugmentation',
              ])
              .optional(),
            economicOwner: z.string(),
            scorecardNotes: z.string().optional(),
            createdAt: z.string().datetime({ offset: true }),
            updatedAt: z.string().datetime({ offset: true }),
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
    path: '/v1/capabilities/:capabilityId/force-tags',
    alias: 'tagCapabilityForces',
    requestFormat: 'json',
    parameters: [
      {
        name: 'body',
        type: 'Body',
        schema: tagCapabilityForces_Body,
      },
      {
        name: 'capabilityId',
        type: 'Path',
        schema: z.string().regex(/^cap_[0-9A-HJKMNP-TV-Z]{26}$/),
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
            capabilityId: z.string().regex(/^cap_[0-9A-HJKMNP-TV-Z]{26}$/),
            name: z.string(),
            vendorName: z.string().optional(),
            sourceType: z.enum([
              'fintech',
              'utility',
              'internalBuild',
              'acquisition',
            ]),
            status: z.enum(['intake', 'tagged', 'inPilot', 'scaled', 'killed']),
            forces: z
              .array(
                z.enum([
                  'costCommoditization',
                  'profitRedistribution',
                  'experienceOwnership',
                  'platformsRising',
                  'dataMonetization',
                  'bionicWorkforce',
                  'systemicallyImportantTechs',
                  'financialRegionalization',
                ])
              )
              .optional(),
            valueChainPosition: z
              .enum([
                'manufacture',
                'distribute',
                'infrastructure',
                'data',
                'labourAugmentation',
              ])
              .optional(),
            economicOwner: z.string(),
            scorecardNotes: z.string().optional(),
            createdAt: z.string().datetime({ offset: true }),
            updatedAt: z.string().datetime({ offset: true }),
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
    path: '/v1/regional-constraints',
    alias: 'listRegionalConstraints',
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
        schema: z
          .string()
          .regex(/^cap_[0-9A-HJKMNP-TV-Z]{26}$/)
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
                  regionalConstraintId: z
                    .string()
                    .regex(/^rgn_[0-9A-HJKMNP-TV-Z]{26}$/),
                  capabilityId: z
                    .string()
                    .regex(/^cap_[0-9A-HJKMNP-TV-Z]{26}$/),
                  region: z.string(),
                  constraintType: z.enum([
                    'licence',
                    'dataResidency',
                    'conduct',
                  ]),
                  blocksCopyPaste: z.boolean().optional(),
                  notes: z.string().optional(),
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
    path: '/v1/regional-constraints',
    alias: 'createRegionalConstraint',
    requestFormat: 'json',
    parameters: [
      {
        name: 'body',
        type: 'Body',
        schema: createRegionalConstraint_Body,
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
            regionalConstraintId: z
              .string()
              .regex(/^rgn_[0-9A-HJKMNP-TV-Z]{26}$/),
            capabilityId: z.string().regex(/^cap_[0-9A-HJKMNP-TV-Z]{26}$/),
            region: z.string(),
            constraintType: z.enum(['licence', 'dataResidency', 'conduct']),
            blocksCopyPaste: z.boolean().optional(),
            notes: z.string().optional(),
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
]);

export const api: any = new Zodios(
  'https://api.ddd-codegen-starter.local/v1',
  endpoints
);

export function createApiClient(baseUrl: string, options?: ZodiosOptions): any {
  return new Zodios(baseUrl, endpoints, options);
}
