/**
 * Scope preHandler: tenant | public from route config or path heuristics.
 */

import type { FastifyRequest, FastifyReply } from 'fastify';
import type { RouteScope } from '../types/fastify-types.js';

interface RouteConfig {
  scope?: RouteScope;
}

export async function scopePreHandler(
  request: FastifyRequest,
  _reply: FastifyReply
): Promise<void> {
  const config = request.routeOptions?.config as RouteConfig | undefined;
  if (config?.scope) {
    request.routeScope = config.scope;
    return;
  }
  const path = request.routeOptions?.url ?? request.url;
  if (
    path.startsWith('/v0/auth/login') ||
    path.startsWith('/v0/auth/refresh')
  ) {
    request.routeScope = 'public';
    return;
  }
  if (path.startsWith('/v0/') || path.startsWith('/v1/')) {
    request.routeScope = 'tenant';
    return;
  }
  request.routeScope = 'public';
}
