export const TOKEN_KEY = 'alliora.accessToken';

function idempotencyKey() {
  return crypto.randomUUID();
}

export async function api<T>(
  path: string,
  init: RequestInit = {},
): Promise<T> {
  const token = localStorage.getItem(TOKEN_KEY);
  const headers = new Headers(init.headers);
  headers.set('Content-Type', 'application/json');
  if (token) headers.set('Authorization', `Bearer ${token}`);
  if (init.method && init.method !== 'GET') {
    headers.set('Idempotency-Key', idempotencyKey());
  }
  const res = await fetch(path, { ...init, headers });
  if (res.status === 204) return undefined as T;
  const body = await res.json().catch(() => ({}));
  if (!res.ok) {
    const err = new Error(body.detail || body.title || body.message || res.statusText);
    throw err;
  }
  return body as T;
}

export const AllioraApi = {
  login: (email: string, password: string) =>
    api<{ data: { accessToken: string; operator: { displayName: string; role: string; email: string } } }>(
      '/v0/auth/login',
      { method: 'POST', body: JSON.stringify({ email, password }) },
    ),
  me: () => api<{ data: { operator: { displayName: string; role: string; email: string } } }>('/v0/auth/me'),
  listCapabilities: () => api<{ data: { items: any[] } }>('/v1/capabilities'),
  createCapability: (body: object) =>
    api<{ data: any }>('/v1/capabilities', { method: 'POST', body: JSON.stringify(body) }),
  getCapability: (id: string) => api<{ data: any }>(`/v1/capabilities/${id}`),
  tagForces: (id: string, body: object) =>
    api<{ data: any }>(`/v1/capabilities/${id}/force-tags`, { method: 'POST', body: JSON.stringify(body) }),
  listRegional: (capabilityId?: string) =>
    api<{ data: { items: any[] } }>(`/v1/regional-constraints${capabilityId ? `?capabilityId=${capabilityId}` : ''}`),
  createRegional: (body: object) =>
    api<{ data: any }>('/v1/regional-constraints', { method: 'POST', body: JSON.stringify(body) }),
  listDecisions: (capabilityId?: string) =>
    api<{ data: { items: any[] } }>(`/v1/decisions${capabilityId ? `?capabilityId=${capabilityId}` : ''}`),
  stampDecision: (body: object) =>
    api<{ data: any }>('/v1/decisions', { method: 'POST', body: JSON.stringify(body) }),
  listProfit: (capabilityId?: string) =>
    api<{ data: { items: any[] } }>(`/v1/profit-pool-hypotheses${capabilityId ? `?capabilityId=${capabilityId}` : ''}`),
  createProfit: (body: object) =>
    api<{ data: any }>('/v1/profit-pool-hypotheses', { method: 'POST', body: JSON.stringify(body) }),
  listCost: (capabilityId?: string) =>
    api<{ data: { items: any[] } }>(`/v1/cost-compares${capabilityId ? `?capabilityId=${capabilityId}` : ''}`),
  createCost: (body: object) =>
    api<{ data: any }>('/v1/cost-compares', { method: 'POST', body: JSON.stringify(body) }),
  listGates: (capabilityId?: string) =>
    api<{ data: { items: any[] } }>(`/v1/stage-gates${capabilityId ? `?capabilityId=${capabilityId}` : ''}`),
  createGate: (body: object) =>
    api<{ data: any }>('/v1/stage-gates', { method: 'POST', body: JSON.stringify(body) }),
  submitEvidence: (gateId: string, body: object) =>
    api<{ data: any }>(`/v1/stage-gates/${gateId}/evidence`, { method: 'POST', body: JSON.stringify(body) }),
  decideGate: (gateId: string, body: object) =>
    api<{ data: any }>(`/v1/stage-gates/${gateId}/outcome`, { method: 'POST', body: JSON.stringify(body) }),
  listMaps: (capabilityId?: string) =>
    api<{ data: { items: any[] } }>(`/v1/experience-maps${capabilityId ? `?capabilityId=${capabilityId}` : ''}`),
  createMap: (body: object) =>
    api<{ data: any }>('/v1/experience-maps', { method: 'POST', body: JSON.stringify(body) }),
  attachLiability: (mapId: string, body: object) =>
    api<{ data: any }>(`/v1/experience-maps/${mapId}/liability`, { method: 'POST', body: JSON.stringify(body) }),
  signLiability: (liabilityId: string) =>
    api<{ data: any }>(`/v1/liability-terms/${liabilityId}/sign`, { method: 'POST', body: '{}' }),
  listSit: () => api<{ data: { items: any[] } }>('/v1/dependencies'),
  registerSit: (body: object) =>
    api<{ data: any }>('/v1/dependencies', { method: 'POST', body: JSON.stringify(body) }),
  spendBlock: (id: string) => api<{ data: any }>(`/v1/dependencies/${id}/spend-block`),
  listAlerts: () => api<{ data: { items: any[] } }>('/v1/alerts'),
  raiseAlert: (body: object) =>
    api<{ data: any }>('/v1/alerts', { method: 'POST', body: JSON.stringify(body) }),
  ackAlert: (id: string) =>
    api<{ data: any }>(`/v1/alerts/${id}/acknowledge`, { method: 'POST', body: '{}' }),
  escalateAlert: (id: string, note: string) =>
    api<{ data: any }>(`/v1/alerts/${id}/escalate`, { method: 'POST', body: JSON.stringify({ note }) }),
  listWorkforce: () => api<{ data: { items: any[] } }>('/v1/workforce-maps'),
  createWorkforce: (body: object) =>
    api<{ data: any }>('/v1/workforce-maps', { method: 'POST', body: JSON.stringify(body) }),
  signWorkforce: (id: string) =>
    api<{ data: any }>(`/v1/workforce-maps/${id}/hr-signoff`, {
      method: 'POST',
      body: JSON.stringify({ hrSigned: true, conductSigned: true }),
    }),
  getReport: (period?: string) =>
    api<{ data: any }>(`/v1/reports/portfolio${period ? `?period=${period}` : ''}`),
  generateReport: (period: string) =>
    api<{ data: any }>('/v1/reports', { method: 'POST', body: JSON.stringify({ period }) }),
  publishReport: (id: string) =>
    api<{ data: any }>(`/v1/reports/${id}/publish`, { method: 'POST', body: '{}' }),
};
