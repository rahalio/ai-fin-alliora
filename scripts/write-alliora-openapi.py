#!/usr/bin/env python3
"""Write Alliora product OpenAPI domain YAML files."""
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1] / "packages" / "openapi-core" / "src"

FORCE = (
    "costCommoditization, profitRedistribution, experienceOwnership, "
    "platformsRising, dataMonetization, bionicWorkforce, "
    "systemicallyImportantTechs, financialRegionalization"
)
VC = "manufacture, distribute, infrastructure, data, labourAugmentation"
DECISION = "mutualise, externalise, automate, build, invest, decline"


def header(title: str, domain: str, desc: str) -> str:
    return f"""openapi: 3.1.0
info:
  title: Alliora {title}
  version: 0.1.0
  description: |
    {desc}
  license:
    name: Proprietary
  x-domain: {domain}
servers:
  - url: http://127.0.0.1:4000
    description: Local API
security:
  - apiKey: []
  - bearerAuth: []
"""


def comps() -> str:
    return """
components:
  securitySchemes:
    apiKey:
      $ref: ./common/security.yaml#/components/securitySchemes/apiKey
    bearerAuth:
      $ref: ./common/security.yaml#/components/securitySchemes/bearerAuth
"""


def err(codes="401,404"):
    lines = []
    mapping = {
        "400": "BadRequest",
        "401": "Unauthorized",
        "404": "NotFound",
        "409": "Conflict",
        "422": "UnprocessableEntity",
    }
    for c in codes.split(","):
        c = c.strip()
        lines.append(f"        '{c}':")
        lines.append(f"          $ref: ./common/responses.yaml#/components/responses/{mapping[c]}")
    lines.append("        default:")
    lines.append("          $ref: ./common/responses.yaml#/components/responses/Problem")
    return "\n".join(lines)


def xddb(entity: str, id_field: str) -> str:
    et = entity.upper().replace(" ", "_")
    return f"""      x-dynamodb:
        entityType: "{et}"
        pkPatternTemplate: "{et}#${{{id_field}}}"
        skPatternTemplate: "METADATA"
        pkPattern: "entity"
        createdAtField: "createdAt"
        updatedAtField: "updatedAt"
        softDeleteEnabled: false
"""


def envelope(name: str, data_ref: str, list_name: str | None = None) -> str:
    block = f"""    {name}Response:
      type: object
      required: [data]
      properties:
        data:
          $ref: '#/components/schemas/{data_ref}'
        meta:
          $ref: ./common/envelopes.yaml#/components/schemas/ResponseMeta
"""
    if list_name:
        block += f"""    {list_name}ListData:
      type: object
      required: [items]
      properties:
        items:
          type: array
          items:
            $ref: '#/components/schemas/{data_ref}'
        nextCursor:
          type: string
    {list_name}ListResponse:
      type: object
      required: [data]
      properties:
        data:
          $ref: '#/components/schemas/{list_name}ListData'
        meta:
          $ref: ./common/envelopes.yaml#/components/schemas/ResponseMeta
"""
    return block


# --- capabilities ---
capabilities_yaml = header(
    "Capabilities",
    "cap",
    "Capability intake, eight-force taxonomy, value-chain position, and regionalisation constraints.",
) + """tags:
  - name: Capabilities
    description: Capability intake and force taxonomy
  - name: RegionalConstraints
    description: Licence, residency, and conduct blocks (BR-8)
paths:
  /v1/capabilities:
    get:
      operationId: listCapabilities
      tags: [Capabilities]
      summary: List capabilities
      x-repository: Capability
      parameters:
        - $ref: ./common/parameters.yaml#/components/parameters/Cursor
        - $ref: ./common/parameters.yaml#/components/parameters/Limit
        - name: force
          in: query
          schema:
            type: string
            enum: [""" + FORCE + """]
        - name: status
          in: query
          schema:
            type: string
            enum: [intake, tagged, inPilot, scaled, killed]
      responses:
        '200':
          description: Capabilities page
          content:
            application/json:
              schema:
                $ref: ./capabilities.schemas.yaml#/components/schemas/CapabilityListResponse
""" + err("401") + """
    post:
      operationId: createCapability
      tags: [Capabilities]
      summary: Intake a capability (fintech, utility, internal build, acquisition)
      x-repository: Capability
      parameters:
        - $ref: ./common/parameters.yaml#/components/parameters/IdempotencyKey
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: ./capabilities.schemas.yaml#/components/schemas/CapabilityCreate
      responses:
        '201':
          description: Created
          content:
            application/json:
              schema:
                $ref: ./capabilities.schemas.yaml#/components/schemas/CapabilityResponse
""" + err("400,401,409,422") + """
  /v1/capabilities/{capabilityId}:
    parameters:
      - name: capabilityId
        in: path
        required: true
        schema:
          $ref: ./capabilities.schemas.yaml#/components/schemas/CapabilityId
    get:
      operationId: getCapability
      tags: [Capabilities]
      summary: Get capability scorecard
      x-repository: Capability
      responses:
        '200':
          description: Capability
          content:
            application/json:
              schema:
                $ref: ./capabilities.schemas.yaml#/components/schemas/CapabilityResponse
""" + err("401,404") + """
    patch:
      operationId: updateCapability
      tags: [Capabilities]
      summary: Update capability metadata
      x-repository: Capability
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: ./capabilities.schemas.yaml#/components/schemas/CapabilityUpdate
      responses:
        '200':
          description: Updated
          content:
            application/json:
              schema:
                $ref: ./capabilities.schemas.yaml#/components/schemas/CapabilityResponse
""" + err("400,401,404,422") + """
  /v1/capabilities/{capabilityId}/force-tags:
    parameters:
      - name: capabilityId
        in: path
        required: true
        schema:
          $ref: ./capabilities.schemas.yaml#/components/schemas/CapabilityId
    post:
      operationId: tagCapabilityForces
      tags: [Capabilities]
      summary: Tag eight forces and primary value-chain position (BR-1)
      x-repository: Capability
      parameters:
        - $ref: ./common/parameters.yaml#/components/parameters/IdempotencyKey
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: ./capabilities.schemas.yaml#/components/schemas/ForceTagRequest
      responses:
        '200':
          description: Tagged
          content:
            application/json:
              schema:
                $ref: ./capabilities.schemas.yaml#/components/schemas/CapabilityResponse
""" + err("400,401,404,422") + """
  /v1/regional-constraints:
    get:
      operationId: listRegionalConstraints
      tags: [RegionalConstraints]
      summary: List regionalisation constraints
      x-repository: RegionalConstraint
      parameters:
        - $ref: ./common/parameters.yaml#/components/parameters/Cursor
        - $ref: ./common/parameters.yaml#/components/parameters/Limit
        - name: capabilityId
          in: query
          schema:
            $ref: ./capabilities.schemas.yaml#/components/schemas/CapabilityId
      responses:
        '200':
          description: Constraints
          content:
            application/json:
              schema:
                $ref: ./capabilities.schemas.yaml#/components/schemas/RegionalConstraintListResponse
""" + err("401") + """
    post:
      operationId: createRegionalConstraint
      tags: [RegionalConstraints]
      summary: Record licence, residency, or conduct constraint (BR-8)
      x-repository: RegionalConstraint
      parameters:
        - $ref: ./common/parameters.yaml#/components/parameters/IdempotencyKey
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: ./capabilities.schemas.yaml#/components/schemas/RegionalConstraintCreate
      responses:
        '201':
          description: Saved
          content:
            application/json:
              schema:
                $ref: ./capabilities.schemas.yaml#/components/schemas/RegionalConstraintResponse
""" + err("400,401,422") + """
""" + comps()

capabilities_schemas = f"""openapi: 3.1.0
info:
  title: Alliora capability schemas
  version: 0.1.0
paths: {{}}
components:
  schemas:
    CapabilityId:
      type: string
      pattern: '^cap_[0-9A-HJKMNP-TV-Z]{{26}}$'
    DisruptiveForce:
      type: string
      enum: [{FORCE}]
    ValueChainPosition:
      type: string
      enum: [{VC}]
    Capability:
      type: object
      required: [capabilityId, name, sourceType, status, economicOwner, createdAt, updatedAt]
      properties:
        capabilityId:
          $ref: '#/components/schemas/CapabilityId'
        name:
          type: string
        vendorName:
          type: string
        sourceType:
          type: string
          enum: [fintech, utility, internalBuild, acquisition]
        status:
          type: string
          enum: [intake, tagged, inPilot, scaled, killed]
        forces:
          type: array
          items:
            $ref: '#/components/schemas/DisruptiveForce'
        valueChainPosition:
          $ref: '#/components/schemas/ValueChainPosition'
        economicOwner:
          type: string
        scorecardNotes:
          type: string
        createdAt:
          type: string
          format: date-time
        updatedAt:
          type: string
          format: date-time
{xddb('Capability', 'capabilityId')}
    CapabilityCreate:
      type: object
      required: [name, sourceType, economicOwner]
      properties:
        name:
          type: string
        sourceType:
          type: string
          enum: [fintech, utility, internalBuild, acquisition]
        economicOwner:
          type: string
        vendorName:
          type: string
    CapabilityUpdate:
      type: object
      properties:
        name:
          type: string
        vendorName:
          type: string
        economicOwner:
          type: string
        scorecardNotes:
          type: string
        status:
          type: string
          enum: [intake, tagged, inPilot, scaled, killed]
    ForceTagRequest:
      type: object
      required: [forces, valueChainPosition]
      properties:
        forces:
          type: array
          minItems: 1
          items:
            $ref: '#/components/schemas/DisruptiveForce'
        valueChainPosition:
          $ref: '#/components/schemas/ValueChainPosition'
    RegionalConstraintId:
      type: string
      pattern: '^rgn_[0-9A-HJKMNP-TV-Z]{{26}}$'
    RegionalConstraint:
      type: object
      required: [regionalConstraintId, capabilityId, region, constraintType, createdAt]
      properties:
        regionalConstraintId:
          $ref: '#/components/schemas/RegionalConstraintId'
        capabilityId:
          $ref: '#/components/schemas/CapabilityId'
        region:
          type: string
        constraintType:
          type: string
          enum: [licence, dataResidency, conduct]
        blocksCopyPaste:
          type: boolean
        notes:
          type: string
        createdAt:
          type: string
          format: date-time
        updatedAt:
          type: string
          format: date-time
{xddb('RegionalConstraint', 'regionalConstraintId')}
    RegionalConstraintCreate:
      type: object
      required: [capabilityId, region, constraintType]
      properties:
        capabilityId:
          $ref: '#/components/schemas/CapabilityId'
        region:
          type: string
        constraintType:
          type: string
          enum: [licence, dataResidency, conduct]
        blocksCopyPaste:
          type: boolean
        notes:
          type: string
{envelope('Capability', 'Capability', 'Capability')}
{envelope('RegionalConstraint', 'RegionalConstraint', 'RegionalConstraint')}
"""

# --- decisions ---
decisions_yaml = header(
    "Decisions",
    "dcs",
    "Decision-class workflow, profit-pool hypotheses, cost-commoditisation compares, partnership contracts.",
) + """tags:
  - name: Decisions
    description: Mutualise, externalise, automate, build, invest, decline
  - name: ProfitPools
    description: Margin-shift hypotheses (BR-4)
  - name: CostCompares
    description: Mutualise vs duplicate spend (BR-7)
  - name: PartnershipContracts
    description: Contract status bound to experience maps
paths:
  /v1/decisions:
    get:
      operationId: listDecisionClasses
      tags: [Decisions]
      x-repository: DecisionClass
      parameters:
        - $ref: ./common/parameters.yaml#/components/parameters/Cursor
        - $ref: ./common/parameters.yaml#/components/parameters/Limit
        - name: capabilityId
          in: query
          schema:
            type: string
      responses:
        '200':
          description: Decisions
          content:
            application/json:
              schema:
                $ref: ./decisions.schemas.yaml#/components/schemas/DecisionClassListResponse
""" + err("401") + """
    post:
      operationId: recordDecisionClass
      tags: [Decisions]
      summary: Stamp decision class with named economic owner (BR-2)
      x-repository: DecisionClass
      parameters:
        - $ref: ./common/parameters.yaml#/components/parameters/IdempotencyKey
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: ./decisions.schemas.yaml#/components/schemas/DecisionClassCreate
      responses:
        '201':
          description: Recorded
          content:
            application/json:
              schema:
                $ref: ./decisions.schemas.yaml#/components/schemas/DecisionClassResponse
""" + err("400,401,422") + """
  /v1/decisions/{decisionId}:
    get:
      operationId: getDecisionClass
      tags: [Decisions]
      x-repository: DecisionClass
      parameters:
        - name: decisionId
          in: path
          required: true
          schema:
            $ref: ./decisions.schemas.yaml#/components/schemas/DecisionId
      responses:
        '200':
          description: Decision
          content:
            application/json:
              schema:
                $ref: ./decisions.schemas.yaml#/components/schemas/DecisionClassResponse
""" + err("401,404") + """
  /v1/profit-pool-hypotheses:
    get:
      operationId: listProfitPoolHypotheses
      tags: [ProfitPools]
      x-repository: ProfitPoolHypothesis
      parameters:
        - $ref: ./common/parameters.yaml#/components/parameters/Cursor
        - $ref: ./common/parameters.yaml#/components/parameters/Limit
        - name: capabilityId
          in: query
          schema:
            type: string
      responses:
        '200':
          description: Hypotheses
          content:
            application/json:
              schema:
                $ref: ./decisions.schemas.yaml#/components/schemas/ProfitPoolHypothesisListResponse
""" + err("401") + """
    post:
      operationId: createProfitPoolHypothesis
      tags: [ProfitPools]
      summary: State who gains/loses margin before funding (BR-4)
      x-repository: ProfitPoolHypothesis
      parameters:
        - $ref: ./common/parameters.yaml#/components/parameters/IdempotencyKey
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: ./decisions.schemas.yaml#/components/schemas/ProfitPoolHypothesisCreate
      responses:
        '201':
          description: Recorded
          content:
            application/json:
              schema:
                $ref: ./decisions.schemas.yaml#/components/schemas/ProfitPoolHypothesisResponse
""" + err("400,401,422") + """
  /v1/profit-pool-hypotheses/{hypothesisId}/test:
    post:
      operationId: attachProfitPoolTest
      tags: [ProfitPools]
      summary: Attach post-gate test result
      x-repository: ProfitPoolHypothesis
      parameters:
        - name: hypothesisId
          in: path
          required: true
          schema:
            $ref: ./decisions.schemas.yaml#/components/schemas/ProfitPoolId
        - $ref: ./common/parameters.yaml#/components/parameters/IdempotencyKey
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: ./decisions.schemas.yaml#/components/schemas/ProfitPoolTestAttach
      responses:
        '200':
          description: Updated
          content:
            application/json:
              schema:
                $ref: ./decisions.schemas.yaml#/components/schemas/ProfitPoolHypothesisResponse
""" + err("400,401,404") + """
  /v1/cost-compares:
    get:
      operationId: listCostCompares
      tags: [CostCompares]
      x-repository: CostCompare
      parameters:
        - $ref: ./common/parameters.yaml#/components/parameters/Cursor
        - $ref: ./common/parameters.yaml#/components/parameters/Limit
        - name: capabilityId
          in: query
          schema:
            type: string
      responses:
        '200':
          description: Compares
          content:
            application/json:
              schema:
                $ref: ./decisions.schemas.yaml#/components/schemas/CostCompareListResponse
""" + err("401") + """
    post:
      operationId: createCostCompare
      tags: [CostCompares]
      summary: Compare mutualise vs duplicate internal spend (BR-7)
      x-repository: CostCompare
      parameters:
        - $ref: ./common/parameters.yaml#/components/parameters/IdempotencyKey
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: ./decisions.schemas.yaml#/components/schemas/CostCompareCreate
      responses:
        '201':
          description: Created
          content:
            application/json:
              schema:
                $ref: ./decisions.schemas.yaml#/components/schemas/CostCompareResponse
""" + err("400,401,422") + """
  /v1/partnership-contracts:
    get:
      operationId: listPartnershipContracts
      tags: [PartnershipContracts]
      x-repository: PartnershipContract
      parameters:
        - $ref: ./common/parameters.yaml#/components/parameters/Cursor
        - $ref: ./common/parameters.yaml#/components/parameters/Limit
      responses:
        '200':
          description: Contracts
          content:
            application/json:
              schema:
                $ref: ./decisions.schemas.yaml#/components/schemas/PartnershipContractListResponse
""" + err("401") + """
    post:
      operationId: createPartnershipContract
      tags: [PartnershipContracts]
      x-repository: PartnershipContract
      parameters:
        - $ref: ./common/parameters.yaml#/components/parameters/IdempotencyKey
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: ./decisions.schemas.yaml#/components/schemas/PartnershipContractCreate
      responses:
        '201':
          description: Created
          content:
            application/json:
              schema:
                $ref: ./decisions.schemas.yaml#/components/schemas/PartnershipContractResponse
""" + err("400,401,422") + """
  /v1/partnership-contracts/{contractId}:
    patch:
      operationId: updatePartnershipContract
      tags: [PartnershipContracts]
      x-repository: PartnershipContract
      parameters:
        - name: contractId
          in: path
          required: true
          schema:
            $ref: ./decisions.schemas.yaml#/components/schemas/PartnershipContractId
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: ./decisions.schemas.yaml#/components/schemas/PartnershipContractUpdate
      responses:
        '200':
          description: Updated
          content:
            application/json:
              schema:
                $ref: ./decisions.schemas.yaml#/components/schemas/PartnershipContractResponse
""" + err("400,401,404,422") + """
""" + comps()

decisions_schemas = f"""openapi: 3.1.0
info:
  title: Alliora decision schemas
  version: 0.1.0
paths: {{}}
components:
  schemas:
    DecisionId:
      type: string
      pattern: '^dcs_[0-9A-HJKMNP-TV-Z]{{26}}$'
    ProfitPoolId:
      type: string
      pattern: '^pph_[0-9A-HJKMNP-TV-Z]{{26}}$'
    CostCompareId:
      type: string
      pattern: '^ccc_[0-9A-HJKMNP-TV-Z]{{26}}$'
    PartnershipContractId:
      type: string
      pattern: '^pct_[0-9A-HJKMNP-TV-Z]{{26}}$'
    DecisionClass:
      type: object
      required: [decisionId, capabilityId, decision, economicOwner, decidedAt]
      properties:
        decisionId:
          $ref: '#/components/schemas/DecisionId'
        capabilityId:
          type: string
        decision:
          type: string
          enum: [{DECISION}]
        economicOwner:
          type: string
        rationale:
          type: string
        decidedAt:
          type: string
          format: date-time
        createdAt:
          type: string
          format: date-time
        updatedAt:
          type: string
          format: date-time
{xddb('DecisionClass', 'decisionId')}
    DecisionClassCreate:
      type: object
      required: [capabilityId, decision, economicOwner]
      properties:
        capabilityId:
          type: string
        decision:
          type: string
          enum: [{DECISION}]
        economicOwner:
          type: string
        rationale:
          type: string
    ProfitPoolHypothesis:
      type: object
      required: [hypothesisId, capabilityId, whoGains, whoLoses, createdAt]
      properties:
        hypothesisId:
          $ref: '#/components/schemas/ProfitPoolId'
        capabilityId:
          type: string
        whoGains:
          type: string
        whoLoses:
          type: string
        manufacturerMarginNote:
          type: string
        distributorMarginNote:
          type: string
        tested:
          type: boolean
        resultNotes:
          type: string
        createdAt:
          type: string
          format: date-time
        updatedAt:
          type: string
          format: date-time
{xddb('ProfitPoolHypothesis', 'hypothesisId')}
    ProfitPoolHypothesisCreate:
      type: object
      required: [capabilityId, whoGains, whoLoses]
      properties:
        capabilityId:
          type: string
        whoGains:
          type: string
        whoLoses:
          type: string
        manufacturerMarginNote:
          type: string
        distributorMarginNote:
          type: string
    ProfitPoolTestAttach:
      type: object
      required: [tested, resultNotes]
      properties:
        tested:
          type: boolean
        resultNotes:
          type: string
    CostCompare:
      type: object
      required: [costCompareId, capabilityId, duplicateSpendAmount, mutualiseSpendAmount, createdAt]
      properties:
        costCompareId:
          $ref: '#/components/schemas/CostCompareId'
        capabilityId:
          type: string
        duplicateSpendAmount:
          $ref: ./common/primitives.yaml#/components/schemas/Money
        mutualiseSpendAmount:
          $ref: ./common/primitives.yaml#/components/schemas/Money
        chosenPath:
          type: string
          enum: [mutualise, keepBuild, undecided]
        estimateOnly:
          type: boolean
        rationale:
          type: string
        createdAt:
          type: string
          format: date-time
        updatedAt:
          type: string
          format: date-time
{xddb('CostCompare', 'costCompareId')}
    CostCompareCreate:
      type: object
      required: [capabilityId, duplicateSpendAmount, mutualiseSpendAmount]
      properties:
        capabilityId:
          type: string
        duplicateSpendAmount:
          $ref: ./common/primitives.yaml#/components/schemas/Money
        mutualiseSpendAmount:
          $ref: ./common/primitives.yaml#/components/schemas/Money
        chosenPath:
          type: string
          enum: [mutualise, keepBuild, undecided]
        estimateOnly:
          type: boolean
        rationale:
          type: string
    PartnershipContract:
      type: object
      required: [contractId, capabilityId, status, createdAt]
      properties:
        contractId:
          $ref: '#/components/schemas/PartnershipContractId'
        capabilityId:
          type: string
        experienceMapId:
          type: string
        status:
          type: string
          enum: [draft, executed, terminated, blockedGoLive]
        createdAt:
          type: string
          format: date-time
        updatedAt:
          type: string
          format: date-time
{xddb('PartnershipContract', 'contractId')}
    PartnershipContractCreate:
      type: object
      required: [capabilityId]
      properties:
        capabilityId:
          type: string
        experienceMapId:
          type: string
        status:
          type: string
          enum: [draft, executed, terminated, blockedGoLive]
    PartnershipContractUpdate:
      type: object
      properties:
        experienceMapId:
          type: string
        status:
          type: string
          enum: [draft, executed, terminated, blockedGoLive]
{envelope('DecisionClass', 'DecisionClass', 'DecisionClass')}
{envelope('ProfitPoolHypothesis', 'ProfitPoolHypothesis', 'ProfitPoolHypothesis')}
{envelope('CostCompare', 'CostCompare', 'CostCompare')}
{envelope('PartnershipContract', 'PartnershipContract', 'PartnershipContract')}
"""

stagegates_yaml = header(
    "Stage gates",
    "gat",
    "Day-30/90/180 evidence gates. Pilots cannot renew on narrative alone (BR-5).",
) + """tags:
  - name: StageGates
    description: Evidence gates and kill or scale outcomes
  - name: EvidencePacks
    description: Materiality, economics, operational risk
paths:
  /v1/stage-gates:
    get:
      operationId: listStageGates
      tags: [StageGates]
      x-repository: StageGate
      parameters:
        - $ref: ./common/parameters.yaml#/components/parameters/Cursor
        - $ref: ./common/parameters.yaml#/components/parameters/Limit
        - name: capabilityId
          in: query
          schema:
            type: string
        - name: status
          in: query
          schema:
            type: string
            enum: [pending, pass, kill, scale, extend]
      responses:
        '200':
          description: Gates
          content:
            application/json:
              schema:
                $ref: ./stagegates.schemas.yaml#/components/schemas/StageGateListResponse
""" + err("401") + """
    post:
      operationId: createStageGate
      tags: [StageGates]
      x-repository: StageGate
      parameters:
        - $ref: ./common/parameters.yaml#/components/parameters/IdempotencyKey
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: ./stagegates.schemas.yaml#/components/schemas/StageGateCreate
      responses:
        '201':
          description: Created
          content:
            application/json:
              schema:
                $ref: ./stagegates.schemas.yaml#/components/schemas/StageGateResponse
""" + err("400,401,422") + """
  /v1/stage-gates/{gateId}:
    get:
      operationId: getStageGate
      tags: [StageGates]
      x-repository: StageGate
      parameters:
        - name: gateId
          in: path
          required: true
          schema:
            $ref: ./stagegates.schemas.yaml#/components/schemas/StageGateId
      responses:
        '200':
          description: Gate
          content:
            application/json:
              schema:
                $ref: ./stagegates.schemas.yaml#/components/schemas/StageGateResponse
""" + err("401,404") + """
  /v1/stage-gates/{gateId}/evidence:
    get:
      operationId: getEvidencePack
      tags: [EvidencePacks]
      x-repository: EvidencePack
      parameters:
        - name: gateId
          in: path
          required: true
          schema:
            $ref: ./stagegates.schemas.yaml#/components/schemas/StageGateId
      responses:
        '200':
          description: Evidence
          content:
            application/json:
              schema:
                $ref: ./stagegates.schemas.yaml#/components/schemas/EvidencePackResponse
""" + err("401,404") + """
    post:
      operationId: submitEvidencePack
      tags: [EvidencePacks]
      summary: Submit switching materiality, unit economics, operational risk
      x-repository: EvidencePack
      parameters:
        - name: gateId
          in: path
          required: true
          schema:
            $ref: ./stagegates.schemas.yaml#/components/schemas/StageGateId
        - $ref: ./common/parameters.yaml#/components/parameters/IdempotencyKey
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: ./stagegates.schemas.yaml#/components/schemas/EvidencePackCreate
      responses:
        '201':
          description: Attached
          content:
            application/json:
              schema:
                $ref: ./stagegates.schemas.yaml#/components/schemas/EvidencePackResponse
""" + err("400,401,404,422") + """
  /v1/stage-gates/{gateId}/outcome:
    post:
      operationId: decideStageGateOutcome
      tags: [StageGates]
      summary: Pass, kill, scale, or extend — blocked without evidence pack
      x-repository: StageGate
      parameters:
        - name: gateId
          in: path
          required: true
          schema:
            $ref: ./stagegates.schemas.yaml#/components/schemas/StageGateId
        - $ref: ./common/parameters.yaml#/components/parameters/IdempotencyKey
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: ./stagegates.schemas.yaml#/components/schemas/StageGateOutcomeRequest
      responses:
        '200':
          description: Outcome recorded
          content:
            application/json:
              schema:
                $ref: ./stagegates.schemas.yaml#/components/schemas/StageGateResponse
""" + err("400,401,404,422") + """
""" + comps()

stagegates_schemas = f"""openapi: 3.1.0
info:
  title: Alliora stage-gate schemas
  version: 0.1.0
paths: {{}}
components:
  schemas:
    StageGateId:
      type: string
      pattern: '^gat_[0-9A-HJKMNP-TV-Z]{{26}}$'
    EvidencePackId:
      type: string
      pattern: '^evi_[0-9A-HJKMNP-TV-Z]{{26}}$'
    StageGate:
      type: object
      required: [gateId, capabilityId, dayMarker, status, createdAt]
      properties:
        gateId:
          $ref: '#/components/schemas/StageGateId'
        capabilityId:
          type: string
        dayMarker:
          type: integer
          enum: [30, 90, 180]
        status:
          type: string
          enum: [pending, pass, kill, scale, extend]
        evidencePackId:
          type: string
        outcomeRationale:
          type: string
        createdAt:
          type: string
          format: date-time
        updatedAt:
          type: string
          format: date-time
{xddb('StageGate', 'gateId')}
    StageGateCreate:
      type: object
      required: [capabilityId, dayMarker]
      properties:
        capabilityId:
          type: string
        dayMarker:
          type: integer
          enum: [30, 90, 180]
    StageGateOutcomeRequest:
      type: object
      required: [outcome]
      properties:
        outcome:
          type: string
          enum: [pass, kill, scale, extend]
        rationale:
          type: string
    EvidencePack:
      type: object
      required: [evidencePackId, gateId, switchingMateriality, unitEconomicsPass, attachedAt]
      properties:
        evidencePackId:
          $ref: '#/components/schemas/EvidencePackId'
        gateId:
          $ref: '#/components/schemas/StageGateId'
        switchingMateriality:
          type: boolean
        unitEconomicsPass:
          type: boolean
        operationalRiskNotes:
          type: string
        attachedAt:
          type: string
          format: date-time
        createdAt:
          type: string
          format: date-time
        updatedAt:
          type: string
          format: date-time
{xddb('EvidencePack', 'evidencePackId')}
    EvidencePackCreate:
      type: object
      required: [switchingMateriality, unitEconomicsPass]
      properties:
        switchingMateriality:
          type: boolean
        unitEconomicsPass:
          type: boolean
        operationalRiskNotes:
          type: string
{envelope('StageGate', 'StageGate', 'StageGate')}
{envelope('EvidencePack', 'EvidencePack', 'EvidencePack')}
"""

experience_yaml = header(
    "Experience",
    "exp",
    "Experience-ownership maps and structured manufacturer/distributor liability (BR-3, BR-11).",
) + """tags:
  - name: ExperienceMaps
    description: UX, brand, data, complaints, liability owners
  - name: LiabilityTerms
    description: Structured liability terms (not PDF-only)
paths:
  /v1/experience-maps:
    get:
      operationId: listExperienceOwnershipMaps
      tags: [ExperienceMaps]
      x-repository: ExperienceOwnershipMap
      parameters:
        - $ref: ./common/parameters.yaml#/components/parameters/Cursor
        - $ref: ./common/parameters.yaml#/components/parameters/Limit
        - name: capabilityId
          in: query
          schema:
            type: string
      responses:
        '200':
          description: Maps
          content:
            application/json:
              schema:
                $ref: ./experience.schemas.yaml#/components/schemas/ExperienceOwnershipMapListResponse
""" + err("401") + """
    post:
      operationId: createExperienceOwnershipMap
      tags: [ExperienceMaps]
      x-repository: ExperienceOwnershipMap
      parameters:
        - $ref: ./common/parameters.yaml#/components/parameters/IdempotencyKey
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: ./experience.schemas.yaml#/components/schemas/ExperienceOwnershipMapCreate
      responses:
        '201':
          description: Created
          content:
            application/json:
              schema:
                $ref: ./experience.schemas.yaml#/components/schemas/ExperienceOwnershipMapResponse
""" + err("400,401,422") + """
  /v1/experience-maps/{mapId}:
    get:
      operationId: getExperienceOwnershipMap
      tags: [ExperienceMaps]
      x-repository: ExperienceOwnershipMap
      parameters:
        - name: mapId
          in: path
          required: true
          schema:
            $ref: ./experience.schemas.yaml#/components/schemas/ExperienceMapId
      responses:
        '200':
          description: Map
          content:
            application/json:
              schema:
                $ref: ./experience.schemas.yaml#/components/schemas/ExperienceOwnershipMapResponse
""" + err("401,404") + """
  /v1/experience-maps/{mapId}/liability:
    post:
      operationId: attachLiabilityTerms
      tags: [LiabilityTerms]
      summary: Attach structured liability; unsigned blocks go-live
      x-repository: ExperienceOwnershipMap
      parameters:
        - name: mapId
          in: path
          required: true
          schema:
            $ref: ./experience.schemas.yaml#/components/schemas/ExperienceMapId
        - $ref: ./common/parameters.yaml#/components/parameters/IdempotencyKey
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: ./experience.schemas.yaml#/components/schemas/LiabilityTermsCreate
      responses:
        '200':
          description: Attached
          content:
            application/json:
              schema:
                $ref: ./experience.schemas.yaml#/components/schemas/ExperienceOwnershipMapResponse
""" + err("400,401,404,422") + """
  /v1/liability-terms/{liabilityId}/sign:
    post:
      operationId: signLiabilityTerms
      tags: [LiabilityTerms]
      x-repository: LiabilityTerms
      parameters:
        - name: liabilityId
          in: path
          required: true
          schema:
            $ref: ./experience.schemas.yaml#/components/schemas/LiabilityTermsId
        - $ref: ./common/parameters.yaml#/components/parameters/IdempotencyKey
      responses:
        '200':
          description: Signed
          content:
            application/json:
              schema:
                $ref: ./experience.schemas.yaml#/components/schemas/LiabilityTermsResponse
""" + err("401,404,422") + """
""" + comps()

experience_schemas = f"""openapi: 3.1.0
info:
  title: Alliora experience schemas
  version: 0.1.0
paths: {{}}
components:
  schemas:
    ExperienceMapId:
      type: string
      pattern: '^exp_[0-9A-HJKMNP-TV-Z]{{26}}$'
    LiabilityTermsId:
      type: string
      pattern: '^lia_[0-9A-HJKMNP-TV-Z]{{26}}$'
    OwnerParty:
      type: string
      enum: [bank, partner, coBrand, shared]
    ExperienceOwnershipMap:
      type: object
      required: [mapId, capabilityId, journeyName, uxOwner, brandOwner, dataOwner, complaintsOwner, goLiveBlocked, createdAt]
      properties:
        mapId:
          $ref: '#/components/schemas/ExperienceMapId'
        capabilityId:
          type: string
        journeyName:
          type: string
        uxOwner:
          $ref: '#/components/schemas/OwnerParty'
        brandOwner:
          $ref: '#/components/schemas/OwnerParty'
        dataOwner:
          $ref: '#/components/schemas/OwnerParty'
        complaintsOwner:
          $ref: '#/components/schemas/OwnerParty'
        liabilityOwner:
          $ref: '#/components/schemas/OwnerParty'
        liabilityTermsId:
          type: string
        goLiveBlocked:
          type: boolean
        createdAt:
          type: string
          format: date-time
        updatedAt:
          type: string
          format: date-time
{xddb('ExperienceOwnershipMap', 'mapId')}
    ExperienceOwnershipMapCreate:
      type: object
      required: [capabilityId, journeyName, uxOwner, brandOwner, dataOwner, complaintsOwner]
      properties:
        capabilityId:
          type: string
        journeyName:
          type: string
        uxOwner:
          $ref: '#/components/schemas/OwnerParty'
        brandOwner:
          $ref: '#/components/schemas/OwnerParty'
        dataOwner:
          $ref: '#/components/schemas/OwnerParty'
        complaintsOwner:
          $ref: '#/components/schemas/OwnerParty'
        liabilityOwner:
          $ref: '#/components/schemas/OwnerParty'
    LiabilityTerms:
      type: object
      required: [liabilityId, mapId, manufacturerLiability, distributorLiability, signed]
      properties:
        liabilityId:
          $ref: '#/components/schemas/LiabilityTermsId'
        mapId:
          $ref: '#/components/schemas/ExperienceMapId'
        manufacturerLiability:
          type: string
        distributorLiability:
          type: string
        signed:
          type: boolean
        signedAt:
          type: string
          format: date-time
        createdAt:
          type: string
          format: date-time
        updatedAt:
          type: string
          format: date-time
{xddb('LiabilityTerms', 'liabilityId')}
    LiabilityTermsCreate:
      type: object
      required: [manufacturerLiability, distributorLiability]
      properties:
        manufacturerLiability:
          type: string
        distributorLiability:
          type: string
{envelope('ExperienceOwnershipMap', 'ExperienceOwnershipMap', 'ExperienceOwnershipMap')}
{envelope('LiabilityTerms', 'LiabilityTerms', 'LiabilityTerms')}
"""

dependencies_yaml = header(
    "Dependencies",
    "sit",
    "Systemically important tech inventory, concentration limits, exit plans, spend blocks (BR-6).",
) + """tags:
  - name: Dependencies
    description: SIT inventory
  - name: SitExceptions
    description: Concentration limit exceptions
paths:
  /v1/dependencies:
    get:
      operationId: listSitDependencies
      tags: [Dependencies]
      x-repository: SitDependency
      parameters:
        - $ref: ./common/parameters.yaml#/components/parameters/Cursor
        - $ref: ./common/parameters.yaml#/components/parameters/Limit
      responses:
        '200':
          description: Dependencies
          content:
            application/json:
              schema:
                $ref: ./dependencies.schemas.yaml#/components/schemas/SitDependencyListResponse
""" + err("401") + """
    post:
      operationId: registerSitDependency
      tags: [Dependencies]
      x-repository: SitDependency
      parameters:
        - $ref: ./common/parameters.yaml#/components/parameters/IdempotencyKey
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: ./dependencies.schemas.yaml#/components/schemas/SitDependencyCreate
      responses:
        '201':
          description: Registered
          content:
            application/json:
              schema:
                $ref: ./dependencies.schemas.yaml#/components/schemas/SitDependencyResponse
""" + err("400,401,422") + """
  /v1/dependencies/{dependencyId}:
    get:
      operationId: getSitDependency
      tags: [Dependencies]
      x-repository: SitDependency
      parameters:
        - name: dependencyId
          in: path
          required: true
          schema:
            $ref: ./dependencies.schemas.yaml#/components/schemas/SitDependencyId
      responses:
        '200':
          description: Dependency
          content:
            application/json:
              schema:
                $ref: ./dependencies.schemas.yaml#/components/schemas/SitDependencyResponse
""" + err("401,404") + """
    patch:
      operationId: updateSitDependency
      tags: [Dependencies]
      x-repository: SitDependency
      parameters:
        - name: dependencyId
          in: path
          required: true
          schema:
            $ref: ./dependencies.schemas.yaml#/components/schemas/SitDependencyId
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: ./dependencies.schemas.yaml#/components/schemas/SitDependencyUpdate
      responses:
        '200':
          description: Updated
          content:
            application/json:
              schema:
                $ref: ./dependencies.schemas.yaml#/components/schemas/SitDependencyResponse
""" + err("400,401,404") + """
  /v1/dependencies/{dependencyId}/spend-block:
    get:
      operationId: getSitSpendBlock
      tags: [Dependencies]
      summary: Whether new spend is blocked (missing exit plan or limit breach)
      x-repository: SitDependency
      parameters:
        - name: dependencyId
          in: path
          required: true
          schema:
            $ref: ./dependencies.schemas.yaml#/components/schemas/SitDependencyId
      responses:
        '200':
          description: Spend-block status
          content:
            application/json:
              schema:
                $ref: ./dependencies.schemas.yaml#/components/schemas/SitSpendBlockResponse
""" + err("401,404") + """
  /v1/sit-exceptions:
    get:
      operationId: listSitLimitExceptions
      tags: [SitExceptions]
      x-repository: SitLimitException
      parameters:
        - $ref: ./common/parameters.yaml#/components/parameters/Cursor
        - $ref: ./common/parameters.yaml#/components/parameters/Limit
      responses:
        '200':
          description: Exceptions
          content:
            application/json:
              schema:
                $ref: ./dependencies.schemas.yaml#/components/schemas/SitLimitExceptionListResponse
""" + err("401") + """
    post:
      operationId: requestSitLimitException
      tags: [SitExceptions]
      x-repository: SitLimitException
      parameters:
        - $ref: ./common/parameters.yaml#/components/parameters/IdempotencyKey
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: ./dependencies.schemas.yaml#/components/schemas/SitLimitExceptionCreate
      responses:
        '201':
          description: Requested
          content:
            application/json:
              schema:
                $ref: ./dependencies.schemas.yaml#/components/schemas/SitLimitExceptionResponse
""" + err("400,401,422") + """
""" + comps()

dependencies_schemas = f"""openapi: 3.1.0
info:
  title: Alliora SIT schemas
  version: 0.1.0
paths: {{}}
components:
  schemas:
    SitDependencyId:
      type: string
      pattern: '^sit_[0-9A-HJKMNP-TV-Z]{{26}}$'
    SitLimitExceptionId:
      type: string
      pattern: '^lim_[0-9A-HJKMNP-TV-Z]{{26}}$'
    SitDependency:
      type: object
      required: [dependencyId, vendorName, capabilityArea, concentrationScore, exitPlanPresent, spendBlocked, createdAt]
      properties:
        dependencyId:
          $ref: '#/components/schemas/SitDependencyId'
        vendorName:
          type: string
        capabilityArea:
          type: string
          enum: [cloud, data, model, payments, kyc, other]
        concentrationScore:
          type: number
          format: float
        concentrationLimit:
          type: number
          format: float
        exitPlanPresent:
          type: boolean
        exitPlanSummary:
          type: string
        boardVisible:
          type: boolean
        spendBlocked:
          type: boolean
        createdAt:
          type: string
          format: date-time
        updatedAt:
          type: string
          format: date-time
{xddb('SitDependency', 'dependencyId')}
    SitDependencyCreate:
      type: object
      required: [vendorName, capabilityArea, concentrationScore, exitPlanPresent]
      properties:
        vendorName:
          type: string
        capabilityArea:
          type: string
          enum: [cloud, data, model, payments, kyc, other]
        concentrationScore:
          type: number
          format: float
        concentrationLimit:
          type: number
          format: float
        exitPlanPresent:
          type: boolean
        exitPlanSummary:
          type: string
        boardVisible:
          type: boolean
    SitDependencyUpdate:
      type: object
      properties:
        concentrationScore:
          type: number
          format: float
        exitPlanPresent:
          type: boolean
        exitPlanSummary:
          type: string
        boardVisible:
          type: boolean
    SitSpendBlock:
      type: object
      required: [dependencyId, spendBlocked, reasons]
      properties:
        dependencyId:
          $ref: '#/components/schemas/SitDependencyId'
        spendBlocked:
          type: boolean
        reasons:
          type: array
          items:
            type: string
    SitLimitException:
      type: object
      required: [exceptionId, dependencyId, status, rationale, createdAt]
      properties:
        exceptionId:
          $ref: '#/components/schemas/SitLimitExceptionId'
        dependencyId:
          $ref: '#/components/schemas/SitDependencyId'
        status:
          type: string
          enum: [requested, approved, denied]
        rationale:
          type: string
        createdAt:
          type: string
          format: date-time
        updatedAt:
          type: string
          format: date-time
{xddb('SitLimitException', 'exceptionId')}
    SitLimitExceptionCreate:
      type: object
      required: [dependencyId, rationale]
      properties:
        dependencyId:
          $ref: '#/components/schemas/SitDependencyId'
        rationale:
          type: string
{envelope('SitDependency', 'SitDependency', 'SitDependency')}
{envelope('SitSpendBlock', 'SitSpendBlock')}
{envelope('SitLimitException', 'SitLimitException', 'SitLimitException')}
"""

alerts_yaml = header(
    "Alerts",
    "alt",
    "Platform-risk alerts when a distributor captures interface power (BR-9).",
) + """tags:
  - name: Alerts
    description: Platform-risk queue
paths:
  /v1/alerts:
    get:
      operationId: listPlatformRiskAlerts
      tags: [Alerts]
      x-repository: PlatformRiskAlert
      parameters:
        - $ref: ./common/parameters.yaml#/components/parameters/Cursor
        - $ref: ./common/parameters.yaml#/components/parameters/Limit
        - name: status
          in: query
          schema:
            type: string
            enum: [open, acknowledged, escalated, closed]
      responses:
        '200':
          description: Alerts
          content:
            application/json:
              schema:
                $ref: ./alerts.schemas.yaml#/components/schemas/PlatformRiskAlertListResponse
""" + err("401") + """
    post:
      operationId: raisePlatformRiskAlert
      tags: [Alerts]
      x-repository: PlatformRiskAlert
      parameters:
        - $ref: ./common/parameters.yaml#/components/parameters/IdempotencyKey
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: ./alerts.schemas.yaml#/components/schemas/PlatformRiskAlertCreate
      responses:
        '201':
          description: Raised
          content:
            application/json:
              schema:
                $ref: ./alerts.schemas.yaml#/components/schemas/PlatformRiskAlertResponse
""" + err("400,401,422") + """
  /v1/alerts/{alertId}:
    get:
      operationId: getPlatformRiskAlert
      tags: [Alerts]
      x-repository: PlatformRiskAlert
      parameters:
        - name: alertId
          in: path
          required: true
          schema:
            $ref: ./alerts.schemas.yaml#/components/schemas/PlatformRiskAlertId
      responses:
        '200':
          description: Alert
          content:
            application/json:
              schema:
                $ref: ./alerts.schemas.yaml#/components/schemas/PlatformRiskAlertResponse
""" + err("401,404") + """
  /v1/alerts/{alertId}/acknowledge:
    post:
      operationId: acknowledgePlatformRiskAlert
      tags: [Alerts]
      x-repository: PlatformRiskAlert
      parameters:
        - name: alertId
          in: path
          required: true
          schema:
            $ref: ./alerts.schemas.yaml#/components/schemas/PlatformRiskAlertId
        - $ref: ./common/parameters.yaml#/components/parameters/IdempotencyKey
      responses:
        '200':
          description: Acknowledged
          content:
            application/json:
              schema:
                $ref: ./alerts.schemas.yaml#/components/schemas/PlatformRiskAlertResponse
""" + err("401,404") + """
  /v1/alerts/{alertId}/escalate:
    post:
      operationId: escalatePlatformRiskAlert
      tags: [Alerts]
      summary: Escalate to CSO / renegotiation
      x-repository: PlatformRiskAlert
      parameters:
        - name: alertId
          in: path
          required: true
          schema:
            $ref: ./alerts.schemas.yaml#/components/schemas/PlatformRiskAlertId
        - $ref: ./common/parameters.yaml#/components/parameters/IdempotencyKey
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: ./alerts.schemas.yaml#/components/schemas/PlatformRiskAlertEscalate
      responses:
        '200':
          description: Escalated
          content:
            application/json:
              schema:
                $ref: ./alerts.schemas.yaml#/components/schemas/PlatformRiskAlertResponse
""" + err("400,401,404") + """
""" + comps()

alerts_schemas = f"""openapi: 3.1.0
info:
  title: Alliora alert schemas
  version: 0.1.0
paths: {{}}
components:
  schemas:
    PlatformRiskAlertId:
      type: string
      pattern: '^alt_[0-9A-HJKMNP-TV-Z]{{26}}$'
    PlatformRiskAlert:
      type: object
      required: [alertId, capabilityId, severity, status, detail, raisedAt]
      properties:
        alertId:
          $ref: '#/components/schemas/PlatformRiskAlertId'
        capabilityId:
          type: string
        severity:
          type: string
          enum: [low, medium, high, critical]
        status:
          type: string
          enum: [open, acknowledged, escalated, closed]
        detail:
          type: string
        interfacePowerSignal:
          type: string
        raisedAt:
          type: string
          format: date-time
        createdAt:
          type: string
          format: date-time
        updatedAt:
          type: string
          format: date-time
{xddb('PlatformRiskAlert', 'alertId')}
    PlatformRiskAlertCreate:
      type: object
      required: [capabilityId, severity, detail]
      properties:
        capabilityId:
          type: string
        severity:
          type: string
          enum: [low, medium, high, critical]
        detail:
          type: string
        interfacePowerSignal:
          type: string
    PlatformRiskAlertEscalate:
      type: object
      required: [note]
      properties:
        note:
          type: string
{envelope('PlatformRiskAlert', 'PlatformRiskAlert', 'PlatformRiskAlert')}
"""

workforce_yaml = header(
    "Workforce",
    "bio",
    "Bionic workforce role maps; HR/conduct sign-off before automation scale (BR-10).",
) + """tags:
  - name: Workforce
    description: Augment vs replace role maps
paths:
  /v1/workforce-maps:
    get:
      operationId: listBionicRoleMaps
      tags: [Workforce]
      x-repository: BionicRoleMap
      parameters:
        - $ref: ./common/parameters.yaml#/components/parameters/Cursor
        - $ref: ./common/parameters.yaml#/components/parameters/Limit
        - name: capabilityId
          in: query
          schema:
            type: string
      responses:
        '200':
          description: Maps
          content:
            application/json:
              schema:
                $ref: ./workforce.schemas.yaml#/components/schemas/BionicRoleMapListResponse
""" + err("401") + """
    post:
      operationId: createBionicRoleMap
      tags: [Workforce]
      x-repository: BionicRoleMap
      parameters:
        - $ref: ./common/parameters.yaml#/components/parameters/IdempotencyKey
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: ./workforce.schemas.yaml#/components/schemas/BionicRoleMapCreate
      responses:
        '201':
          description: Created
          content:
            application/json:
              schema:
                $ref: ./workforce.schemas.yaml#/components/schemas/BionicRoleMapResponse
""" + err("400,401,422") + """
  /v1/workforce-maps/{mapId}:
    get:
      operationId: getBionicRoleMap
      tags: [Workforce]
      x-repository: BionicRoleMap
      parameters:
        - name: mapId
          in: path
          required: true
          schema:
            $ref: ./workforce.schemas.yaml#/components/schemas/BionicRoleMapId
      responses:
        '200':
          description: Map
          content:
            application/json:
              schema:
                $ref: ./workforce.schemas.yaml#/components/schemas/BionicRoleMapResponse
""" + err("401,404") + """
  /v1/workforce-maps/{mapId}/hr-signoff:
    post:
      operationId: signBionicRoleMap
      tags: [Workforce]
      summary: HR/conduct sign-off; unsigned blocks automation scale
      x-repository: BionicRoleMap
      parameters:
        - name: mapId
          in: path
          required: true
          schema:
            $ref: ./workforce.schemas.yaml#/components/schemas/BionicRoleMapId
        - $ref: ./common/parameters.yaml#/components/parameters/IdempotencyKey
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: ./workforce.schemas.yaml#/components/schemas/BionicRoleMapSignoff
      responses:
        '200':
          description: Signed
          content:
            application/json:
              schema:
                $ref: ./workforce.schemas.yaml#/components/schemas/BionicRoleMapResponse
""" + err("400,401,404,422") + """
""" + comps()

workforce_schemas = f"""openapi: 3.1.0
info:
  title: Alliora workforce schemas
  version: 0.1.0
paths: {{}}
components:
  schemas:
    BionicRoleMapId:
      type: string
      pattern: '^bio_[0-9A-HJKMNP-TV-Z]{{26}}$'
    BionicRoleMap:
      type: object
      required: [mapId, capabilityId, roleName, treatment, hrSigned, scaleBlocked, createdAt]
      properties:
        mapId:
          $ref: '#/components/schemas/BionicRoleMapId'
        capabilityId:
          type: string
        roleName:
          type: string
        treatment:
          type: string
          enum: [augment, replace]
        transitionFundingNote:
          type: string
        hrSigned:
          type: boolean
        conductSigned:
          type: boolean
        scaleBlocked:
          type: boolean
        signedAt:
          type: string
          format: date-time
        createdAt:
          type: string
          format: date-time
        updatedAt:
          type: string
          format: date-time
{xddb('BionicRoleMap', 'mapId')}
    BionicRoleMapCreate:
      type: object
      required: [capabilityId, roleName, treatment]
      properties:
        capabilityId:
          type: string
        roleName:
          type: string
        treatment:
          type: string
          enum: [augment, replace]
        transitionFundingNote:
          type: string
    BionicRoleMapSignoff:
      type: object
      required: [hrSigned]
      properties:
        hrSigned:
          type: boolean
        conductSigned:
          type: boolean
{envelope('BionicRoleMap', 'BionicRoleMap', 'BionicRoleMap')}
"""

reports_yaml = header(
    "Reports",
    "rpt",
    "Executive portfolio reporting: force coverage, kill rate, SIT — not logo vanity (BR-12).",
) + """tags:
  - name: Reports
    description: Exco / board packs
paths:
  /v1/reports/portfolio:
    get:
      operationId: getPortfolioReport
      tags: [Reports]
      x-repository: PortfolioReport
      parameters:
        - name: period
          in: query
          schema:
            type: string
            example: "2026-Q3"
      responses:
        '200':
          description: Latest or period report
          content:
            application/json:
              schema:
                $ref: ./reports.schemas.yaml#/components/schemas/PortfolioReportResponse
""" + err("401,404") + """
  /v1/reports:
    get:
      operationId: listPortfolioReports
      tags: [Reports]
      x-repository: PortfolioReport
      parameters:
        - $ref: ./common/parameters.yaml#/components/parameters/Cursor
        - $ref: ./common/parameters.yaml#/components/parameters/Limit
      responses:
        '200':
          description: Published reports
          content:
            application/json:
              schema:
                $ref: ./reports.schemas.yaml#/components/schemas/PortfolioReportListResponse
""" + err("401") + """
    post:
      operationId: generatePortfolioReport
      tags: [Reports]
      summary: Generate draft pack (force coverage, kill rate, SIT)
      x-repository: PortfolioReport
      parameters:
        - $ref: ./common/parameters.yaml#/components/parameters/IdempotencyKey
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: ./reports.schemas.yaml#/components/schemas/PortfolioReportGenerate
      responses:
        '201':
          description: Draft generated
          content:
            application/json:
              schema:
                $ref: ./reports.schemas.yaml#/components/schemas/PortfolioReportResponse
""" + err("400,401") + """
  /v1/reports/{reportId}/publish:
    post:
      operationId: publishPortfolioReport
      tags: [Reports]
      x-repository: PortfolioReport
      parameters:
        - name: reportId
          in: path
          required: true
          schema:
            $ref: ./reports.schemas.yaml#/components/schemas/PortfolioReportId
        - $ref: ./common/parameters.yaml#/components/parameters/IdempotencyKey
      responses:
        '200':
          description: Published
          content:
            application/json:
              schema:
                $ref: ./reports.schemas.yaml#/components/schemas/PortfolioReportResponse
""" + err("401,404") + """
""" + comps()

reports_schemas = f"""openapi: 3.1.0
info:
  title: Alliora report schemas
  version: 0.1.0
paths: {{}}
components:
  schemas:
    PortfolioReportId:
      type: string
      pattern: '^rpt_[0-9A-HJKMNP-TV-Z]{{26}}$'
    PortfolioReport:
      type: object
      required: [reportId, period, status, capabilityCount, killRate, sitConcentrationIndex, createdAt]
      properties:
        reportId:
          $ref: '#/components/schemas/PortfolioReportId'
        period:
          type: string
        status:
          type: string
          enum: [draft, published]
        capabilityCount:
          type: integer
        killRate:
          type: number
          format: float
        scaleRate:
          type: number
          format: float
        forceCoverage:
          type: object
          additionalProperties:
            type: integer
        sitConcentrationIndex:
          type: number
          format: float
        sitBreachCount:
          type: integer
        openPlatformAlerts:
          type: integer
        publishedAt:
          type: string
          format: date-time
        createdAt:
          type: string
          format: date-time
        updatedAt:
          type: string
          format: date-time
{xddb('PortfolioReport', 'reportId')}
    PortfolioReportGenerate:
      type: object
      required: [period]
      properties:
        period:
          type: string
{envelope('PortfolioReport', 'PortfolioReport', 'PortfolioReport')}
"""

FILES = {
    "capabilities.yaml": capabilities_yaml,
    "capabilities.schemas.yaml": capabilities_schemas,
    "decisions.yaml": decisions_yaml,
    "decisions.schemas.yaml": decisions_schemas,
    "stagegates.yaml": stagegates_yaml,
    "stagegates.schemas.yaml": stagegates_schemas,
    "experience.yaml": experience_yaml,
    "experience.schemas.yaml": experience_schemas,
    "dependencies.yaml": dependencies_yaml,
    "dependencies.schemas.yaml": dependencies_schemas,
    "alerts.yaml": alerts_yaml,
    "alerts.schemas.yaml": alerts_schemas,
    "workforce.yaml": workforce_yaml,
    "workforce.schemas.yaml": workforce_schemas,
    "reports.yaml": reports_yaml,
    "reports.schemas.yaml": reports_schemas,
}


def main() -> None:
    ROOT.mkdir(parents=True, exist_ok=True)
    for name, body in FILES.items():
        path = ROOT / name
        path.write_text(body.rstrip() + "\n", encoding="utf-8")
        print("wrote", path)


if __name__ == "__main__":
    main()
