/**
 * In-memory Alliora product store (sandbox). Identity remains in sandbox-store.ts.
 */

import { nowIso, responseMeta, sandboxId } from './sandbox-store.js';

type Rec = Record<string, unknown>;

export const capabilities = new Map<string, Rec>();
export const regionalConstraints = new Map<string, Rec>();
export const decisions = new Map<string, Rec>();
export const profitPools = new Map<string, Rec>();
export const costCompares = new Map<string, Rec>();
export const contracts = new Map<string, Rec>();
export const stageGates = new Map<string, Rec>();
export const evidencePacks = new Map<string, Rec>();
export const evidenceByGate = new Map<string, string>();
export const experienceMaps = new Map<string, Rec>();
export const liabilityTerms = new Map<string, Rec>();
export const sitDeps = new Map<string, Rec>();
export const sitExceptions = new Map<string, Rec>();
export const alerts = new Map<string, Rec>();
export const workforceMaps = new Map<string, Rec>();
export const reports = new Map<string, Rec>();

function envelope(data: unknown, correlationId?: string) {
  return { data, ...responseMeta(correlationId) };
}

function listEnvelope(items: unknown[], correlationId?: string) {
  return { data: { items }, ...responseMeta(correlationId) };
}

function cid(input: Rec): string {
  return String(input.correlationId ?? '');
}

function pickId(input: Rec, keys: string[]): string {
  for (const k of keys) {
    if (input[k]) return String(input[k]);
  }
  if (input.id) return String(input.id);
  return '';
}

function money(input: unknown) {
  if (input && typeof input === 'object') return input;
  return { amount: '0', currency: 'USD' };
}

export function seedProductDemo(): void {
  if (capabilities.size > 0) return;
  const now = nowIso();
  const capId = 'cap_01j0alliorademocap000000001';
  capabilities.set(capId, {
    capabilityId: capId,
    name: 'Shared KYC utility (pilot)',
    vendorName: 'National KYC Co',
    sourceType: 'utility',
    status: 'inPilot',
    forces: ['costCommoditization', 'systemicallyImportantTechs'],
    valueChainPosition: 'infrastructure',
    economicOwner: 'CSO office',
    scorecardNotes: 'Seeded demo capability',
    createdAt: now,
    updatedAt: now,
  });
  const sitId = sandboxId('sit');
  sitDeps.set(sitId, {
    dependencyId: sitId,
    vendorName: 'Hyperscale Cloud X',
    capabilityArea: 'cloud',
    concentrationScore: 0.72,
    concentrationLimit: 0.4,
    exitPlanPresent: false,
    boardVisible: true,
    spendBlocked: true,
    createdAt: now,
    updatedAt: now,
  });
}

seedProductDemo();

export const ProductSandbox = {
  listCapabilities(input: Rec) {
    let items = [...capabilities.values()];
    if (input.force) items = items.filter((c) => (c.forces as string[] | undefined)?.includes(String(input.force)));
    if (input.status) items = items.filter((c) => c.status === input.status);
    return listEnvelope(items, cid(input));
  },
  createCapability(input: Rec) {
    const capabilityId = pickId(input, ['capabilityId']) || sandboxId('cap');
    const now = nowIso();
    const rec = {
      capabilityId,
      name: String(input.name ?? ''),
      vendorName: input.vendorName,
      sourceType: input.sourceType,
      status: 'intake',
      forces: [],
      economicOwner: String(input.economicOwner ?? ''),
      createdAt: now,
      updatedAt: now,
    };
    capabilities.set(capabilityId, rec);
    return envelope(rec, cid(input));
  },
  getCapability(input: Rec) {
    const id = pickId(input, ['capabilityId']);
    return envelope(capabilities.get(id) ?? null, cid(input));
  },
  updateCapability(input: Rec) {
    const id = pickId(input, ['capabilityId']);
    const prev = capabilities.get(id);
    if (!prev) return envelope(null, cid(input));
    const next = { ...prev, ...input, capabilityId: id, updatedAt: nowIso() };
    capabilities.set(id, next);
    return envelope(next, cid(input));
  },
  tagCapabilityForces(input: Rec) {
    const id = pickId(input, ['capabilityId']);
    const prev = capabilities.get(id);
    if (!prev) return envelope(null, cid(input));
    const next = {
      ...prev,
      forces: input.forces,
      valueChainPosition: input.valueChainPosition,
      status: prev.status === 'intake' ? 'tagged' : prev.status,
      updatedAt: nowIso(),
    };
    capabilities.set(id, next);
    return envelope(next, cid(input));
  },
  listRegionalConstraints(input: Rec) {
    let items = [...regionalConstraints.values()];
    if (input.capabilityId) items = items.filter((r) => r.capabilityId === input.capabilityId);
    return listEnvelope(items, cid(input));
  },
  createRegionalConstraint(input: Rec) {
    const regionalConstraintId = sandboxId('rgn');
    const rec = {
      regionalConstraintId,
      capabilityId: input.capabilityId,
      region: input.region,
      constraintType: input.constraintType,
      blocksCopyPaste: Boolean(input.blocksCopyPaste ?? true),
      notes: input.notes,
      createdAt: nowIso(),
      updatedAt: nowIso(),
    };
    regionalConstraints.set(regionalConstraintId, rec);
    return envelope(rec, cid(input));
  },
  listDecisionClasses(input: Rec) {
    let items = [...decisions.values()];
    if (input.capabilityId) items = items.filter((d) => d.capabilityId === input.capabilityId);
    return listEnvelope(items, cid(input));
  },
  recordDecisionClass(input: Rec) {
    if (!input.economicOwner) throw new Error('economicOwner is required');
    const decisionId = sandboxId('dcs');
    const rec = {
      decisionId,
      capabilityId: input.capabilityId,
      decision: input.decision,
      economicOwner: input.economicOwner,
      rationale: input.rationale,
      decidedAt: nowIso(),
      createdAt: nowIso(),
      updatedAt: nowIso(),
    };
    decisions.set(decisionId, rec);
    return envelope(rec, cid(input));
  },
  getDecisionClass(input: Rec) {
    return envelope(decisions.get(pickId(input, ['decisionId'])) ?? null, cid(input));
  },
  listProfitPoolHypotheses(input: Rec) {
    let items = [...profitPools.values()];
    if (input.capabilityId) items = items.filter((d) => d.capabilityId === input.capabilityId);
    return listEnvelope(items, cid(input));
  },
  createProfitPoolHypothesis(input: Rec) {
    const hypothesisId = sandboxId('pph');
    const rec = {
      hypothesisId,
      capabilityId: input.capabilityId,
      whoGains: input.whoGains,
      whoLoses: input.whoLoses,
      manufacturerMarginNote: input.manufacturerMarginNote,
      distributorMarginNote: input.distributorMarginNote,
      tested: false,
      createdAt: nowIso(),
      updatedAt: nowIso(),
    };
    profitPools.set(hypothesisId, rec);
    return envelope(rec, cid(input));
  },
  attachProfitPoolTest(input: Rec) {
    const id = pickId(input, ['hypothesisId']);
    const prev = profitPools.get(id);
    if (!prev) return envelope(null, cid(input));
    const next = { ...prev, tested: Boolean(input.tested), resultNotes: input.resultNotes, updatedAt: nowIso() };
    profitPools.set(id, next);
    return envelope(next, cid(input));
  },
  listCostCompares(input: Rec) {
    let items = [...costCompares.values()];
    if (input.capabilityId) items = items.filter((d) => d.capabilityId === input.capabilityId);
    return listEnvelope(items, cid(input));
  },
  createCostCompare(input: Rec) {
    const costCompareId = sandboxId('ccc');
    const rec = {
      costCompareId,
      capabilityId: input.capabilityId,
      duplicateSpendAmount: money(input.duplicateSpendAmount),
      mutualiseSpendAmount: money(input.mutualiseSpendAmount),
      chosenPath: input.chosenPath ?? 'undecided',
      estimateOnly: Boolean(input.estimateOnly),
      rationale: input.rationale,
      createdAt: nowIso(),
      updatedAt: nowIso(),
    };
    costCompares.set(costCompareId, rec);
    return envelope(rec, cid(input));
  },
  listPartnershipContracts(_input: Rec) {
    return listEnvelope([...contracts.values()], cid(_input));
  },
  createPartnershipContract(input: Rec) {
    const contractId = sandboxId('pct');
    const rec = {
      contractId,
      capabilityId: input.capabilityId,
      experienceMapId: input.experienceMapId,
      status: input.status ?? 'draft',
      createdAt: nowIso(),
      updatedAt: nowIso(),
    };
    contracts.set(contractId, rec);
    return envelope(rec, cid(input));
  },
  updatePartnershipContract(input: Rec) {
    const id = pickId(input, ['contractId']);
    const prev = contracts.get(id);
    if (!prev) return envelope(null, cid(input));
    const next = { ...prev, ...input, contractId: id, updatedAt: nowIso() };
    contracts.set(id, next);
    return envelope(next, cid(input));
  },
  listStageGates(input: Rec) {
    let items = [...stageGates.values()];
    if (input.capabilityId) items = items.filter((d) => d.capabilityId === input.capabilityId);
    if (input.status) items = items.filter((d) => d.status === input.status);
    return listEnvelope(items, cid(input));
  },
  createStageGate(input: Rec) {
    const gateId = sandboxId('gat');
    const rec = {
      gateId,
      capabilityId: input.capabilityId,
      dayMarker: input.dayMarker,
      status: 'pending',
      createdAt: nowIso(),
      updatedAt: nowIso(),
    };
    stageGates.set(gateId, rec);
    return envelope(rec, cid(input));
  },
  getStageGate(input: Rec) {
    return envelope(stageGates.get(pickId(input, ['gateId'])) ?? null, cid(input));
  },
  getEvidencePack(input: Rec) {
    const gateId = pickId(input, ['gateId']);
    const eviId = evidenceByGate.get(gateId);
    return envelope(eviId ? evidencePacks.get(eviId) ?? null : null, cid(input));
  },
  submitEvidencePack(input: Rec) {
    const gateId = pickId(input, ['gateId']);
    const evidencePackId = sandboxId('evi');
    const rec = {
      evidencePackId,
      gateId,
      switchingMateriality: Boolean(input.switchingMateriality),
      unitEconomicsPass: Boolean(input.unitEconomicsPass),
      operationalRiskNotes: input.operationalRiskNotes,
      attachedAt: nowIso(),
      createdAt: nowIso(),
      updatedAt: nowIso(),
    };
    evidencePacks.set(evidencePackId, rec);
    evidenceByGate.set(gateId, evidencePackId);
    const gate = stageGates.get(gateId);
    if (gate) {
      stageGates.set(gateId, { ...gate, evidencePackId, updatedAt: nowIso() });
    }
    return envelope(rec, cid(input));
  },
  decideStageGateOutcome(input: Rec) {
    const gateId = pickId(input, ['gateId']);
    const gate = stageGates.get(gateId);
    if (!gate) return envelope(null, cid(input));
    if (!evidenceByGate.get(gateId)) {
      throw new Error('Evidence pack required before gate outcome (BR-5)');
    }
    const next = {
      ...gate,
      status: input.outcome,
      outcomeRationale: input.rationale,
      updatedAt: nowIso(),
    };
    stageGates.set(gateId, next);
    const cap = capabilities.get(String(gate.capabilityId));
    if (cap && input.outcome === 'kill') {
      capabilities.set(String(cap.capabilityId), { ...cap, status: 'killed', updatedAt: nowIso() });
    }
    if (cap && input.outcome === 'scale') {
      capabilities.set(String(cap.capabilityId), { ...cap, status: 'scaled', updatedAt: nowIso() });
    }
    return envelope(next, cid(input));
  },
  listExperienceOwnershipMaps(input: Rec) {
    let items = [...experienceMaps.values()];
    if (input.capabilityId) items = items.filter((d) => d.capabilityId === input.capabilityId);
    return listEnvelope(items, cid(input));
  },
  createExperienceOwnershipMap(input: Rec) {
    const mapId = sandboxId('exp');
    const rec = {
      mapId,
      capabilityId: input.capabilityId,
      journeyName: input.journeyName,
      uxOwner: input.uxOwner,
      brandOwner: input.brandOwner,
      dataOwner: input.dataOwner,
      complaintsOwner: input.complaintsOwner,
      liabilityOwner: input.liabilityOwner,
      goLiveBlocked: true,
      createdAt: nowIso(),
      updatedAt: nowIso(),
    };
    experienceMaps.set(mapId, rec);
    return envelope(rec, cid(input));
  },
  getExperienceOwnershipMap(input: Rec) {
    return envelope(experienceMaps.get(pickId(input, ['mapId'])) ?? null, cid(input));
  },
  attachLiabilityTerms(input: Rec) {
    const mapId = pickId(input, ['mapId']);
    const map = experienceMaps.get(mapId);
    if (!map) return envelope(null, cid(input));
    const liabilityId = sandboxId('lia');
    const terms = {
      liabilityId,
      mapId,
      manufacturerLiability: input.manufacturerLiability,
      distributorLiability: input.distributorLiability,
      signed: false,
      createdAt: nowIso(),
      updatedAt: nowIso(),
    };
    liabilityTerms.set(liabilityId, terms);
    const next = { ...map, liabilityTermsId: liabilityId, goLiveBlocked: true, updatedAt: nowIso() };
    experienceMaps.set(mapId, next);
    return envelope(next, cid(input));
  },
  signLiabilityTerms(input: Rec) {
    const id = pickId(input, ['liabilityId']);
    const terms = liabilityTerms.get(id);
    if (!terms) return envelope(null, cid(input));
    const next = { ...terms, signed: true, signedAt: nowIso(), updatedAt: nowIso() };
    liabilityTerms.set(id, next);
    const map = experienceMaps.get(String(terms.mapId));
    if (map) {
      experienceMaps.set(String(map.mapId), { ...map, goLiveBlocked: false, updatedAt: nowIso() });
    }
    return envelope(next, cid(input));
  },
  listSitDependencies(input: Rec) {
    return listEnvelope([...sitDeps.values()], cid(input));
  },
  registerSitDependency(input: Rec) {
    const dependencyId = sandboxId('sit');
    const exitPlanPresent = Boolean(input.exitPlanPresent);
    const score = Number(input.concentrationScore ?? 0);
    const limit = Number(input.concentrationLimit ?? 0.5);
    const rec = {
      dependencyId,
      vendorName: input.vendorName,
      capabilityArea: input.capabilityArea,
      concentrationScore: score,
      concentrationLimit: limit,
      exitPlanPresent,
      exitPlanSummary: input.exitPlanSummary,
      boardVisible: Boolean(input.boardVisible),
      spendBlocked: !exitPlanPresent || score > limit,
      createdAt: nowIso(),
      updatedAt: nowIso(),
    };
    sitDeps.set(dependencyId, rec);
    return envelope(rec, cid(input));
  },
  getSitDependency(input: Rec) {
    return envelope(sitDeps.get(pickId(input, ['dependencyId'])) ?? null, cid(input));
  },
  updateSitDependency(input: Rec) {
    const id = pickId(input, ['dependencyId']);
    const prev = sitDeps.get(id);
    if (!prev) return envelope(null, cid(input));
    const next: Rec = { ...prev, ...input, dependencyId: id, updatedAt: nowIso() };
    const score = Number(next.concentrationScore ?? 0);
    const limit = Number(next.concentrationLimit ?? 0.5);
    next.spendBlocked = !Boolean(next.exitPlanPresent) || score > limit;
    sitDeps.set(id, next);
    return envelope(next, cid(input));
  },
  getSitSpendBlock(input: Rec) {
    const id = pickId(input, ['dependencyId']);
    const dep = sitDeps.get(id);
    const reasons: string[] = [];
    if (!dep) return envelope({ dependencyId: id, spendBlocked: true, reasons: ['not_found'] }, cid(input));
    if (!dep.exitPlanPresent) reasons.push('missing_exit_plan');
    if (Number(dep.concentrationScore) > Number(dep.concentrationLimit ?? 0.5)) reasons.push('concentration_limit');
    return envelope({ dependencyId: id, spendBlocked: reasons.length > 0, reasons }, cid(input));
  },
  listSitLimitExceptions(input: Rec) {
    return listEnvelope([...sitExceptions.values()], cid(input));
  },
  requestSitLimitException(input: Rec) {
    const exceptionId = sandboxId('lim');
    const rec = {
      exceptionId,
      dependencyId: input.dependencyId,
      status: 'requested',
      rationale: input.rationale,
      createdAt: nowIso(),
      updatedAt: nowIso(),
    };
    sitExceptions.set(exceptionId, rec);
    return envelope(rec, cid(input));
  },
  listPlatformRiskAlerts(input: Rec) {
    let items = [...alerts.values()];
    if (input.status) items = items.filter((a) => a.status === input.status);
    return listEnvelope(items, cid(input));
  },
  raisePlatformRiskAlert(input: Rec) {
    const alertId = sandboxId('alt');
    const rec = {
      alertId,
      capabilityId: input.capabilityId,
      severity: input.severity,
      status: 'open',
      detail: input.detail,
      interfacePowerSignal: input.interfacePowerSignal,
      raisedAt: nowIso(),
      createdAt: nowIso(),
      updatedAt: nowIso(),
    };
    alerts.set(alertId, rec);
    return envelope(rec, cid(input));
  },
  getPlatformRiskAlert(input: Rec) {
    return envelope(alerts.get(pickId(input, ['alertId'])) ?? null, cid(input));
  },
  acknowledgePlatformRiskAlert(input: Rec) {
    const id = pickId(input, ['alertId']);
    const prev = alerts.get(id);
    if (!prev) return envelope(null, cid(input));
    const next = { ...prev, status: 'acknowledged', updatedAt: nowIso() };
    alerts.set(id, next);
    return envelope(next, cid(input));
  },
  escalatePlatformRiskAlert(input: Rec) {
    const id = pickId(input, ['alertId']);
    const prev = alerts.get(id);
    if (!prev) return envelope(null, cid(input));
    const next = { ...prev, status: 'escalated', detail: `${prev.detail} | ${input.note ?? ''}`, updatedAt: nowIso() };
    alerts.set(id, next);
    return envelope(next, cid(input));
  },
  listBionicRoleMaps(input: Rec) {
    let items = [...workforceMaps.values()];
    if (input.capabilityId) items = items.filter((d) => d.capabilityId === input.capabilityId);
    return listEnvelope(items, cid(input));
  },
  createBionicRoleMap(input: Rec) {
    const mapId = sandboxId('bio');
    const rec = {
      mapId,
      capabilityId: input.capabilityId,
      roleName: input.roleName,
      treatment: input.treatment,
      transitionFundingNote: input.transitionFundingNote,
      hrSigned: false,
      conductSigned: false,
      scaleBlocked: true,
      createdAt: nowIso(),
      updatedAt: nowIso(),
    };
    workforceMaps.set(mapId, rec);
    return envelope(rec, cid(input));
  },
  getBionicRoleMap(input: Rec) {
    return envelope(workforceMaps.get(pickId(input, ['mapId'])) ?? null, cid(input));
  },
  signBionicRoleMap(input: Rec) {
    const id = pickId(input, ['mapId']);
    const prev = workforceMaps.get(id);
    if (!prev) return envelope(null, cid(input));
    const hrSigned = Boolean(input.hrSigned);
    const next = {
      ...prev,
      hrSigned,
      conductSigned: Boolean(input.conductSigned),
      scaleBlocked: !hrSigned,
      signedAt: hrSigned ? nowIso() : undefined,
      updatedAt: nowIso(),
    };
    workforceMaps.set(id, next);
    return envelope(next, cid(input));
  },
  listPortfolioReports(input: Rec) {
    return listEnvelope([...reports.values()], cid(input));
  },
  generatePortfolioReport(input: Rec) {
    const reportId = sandboxId('rpt');
    const caps = [...capabilities.values()];
    const killed = caps.filter((c) => c.status === 'killed').length;
    const scaled = caps.filter((c) => c.status === 'scaled').length;
    const forceCoverage: Record<string, number> = {};
    for (const c of caps) {
      for (const f of (c.forces as string[] | undefined) ?? []) {
        forceCoverage[f] = (forceCoverage[f] ?? 0) + 1;
      }
    }
    const sitBreachCount = [...sitDeps.values()].filter((s) => s.spendBlocked).length;
    const rec = {
      reportId,
      period: input.period,
      status: 'draft',
      capabilityCount: caps.length,
      killRate: caps.length ? killed / caps.length : 0,
      scaleRate: caps.length ? scaled / caps.length : 0,
      forceCoverage,
      sitConcentrationIndex: sitDeps.size ? sitBreachCount / sitDeps.size : 0,
      sitBreachCount,
      openPlatformAlerts: [...alerts.values()].filter((a) => a.status === 'open').length,
      createdAt: nowIso(),
      updatedAt: nowIso(),
    };
    reports.set(reportId, rec);
    return envelope(rec, cid(input));
  },
  getPortfolioReport(input: Rec) {
    const period = input.period ? String(input.period) : undefined;
    if (period) {
      const match = [...reports.values()].find((r) => r.period === period);
      if (match) return envelope(match, cid(input));
    }
    const last = [...reports.values()].at(-1);
    return envelope(last ?? null, cid(input));
  },
  publishPortfolioReport(input: Rec) {
    const id = pickId(input, ['reportId']);
    const prev = reports.get(id);
    if (!prev) return envelope(null, cid(input));
    const next = { ...prev, status: 'published', publishedAt: nowIso(), updatedAt: nowIso() };
    reports.set(id, next);
    return envelope(next, cid(input));
  },
};
