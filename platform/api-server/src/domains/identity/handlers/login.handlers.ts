/**
 * Handlers for Login / session me — hand-extended.
 */

import type { FastifyRequest, FastifyReply } from 'fastify';
import type { IdentityDomainModule } from '../dependencies/identity-ddd.dependencies.js';
import type {
  OperatorLoginInput,
  UpdateOperatorMeInput,
} from '@alliora/services/identity';

export async function operatorLogin(
  request: FastifyRequest,
  reply: FastifyReply,
  deps: IdentityDomainModule
): Promise<void> {
  const input: any = {
    ...((request.body ?? {}) as object),
  };
  const result = await deps.useCases.logins.get.execute(input as any);
  return reply.code(200).send(result);
}

export async function getOperatorMe(
  request: FastifyRequest,
  reply: FastifyReply,
  deps: IdentityDomainModule
): Promise<void> {
  const result = await deps.useCases.logins.getMe.execute({} as any);
  return reply.code(200).send(result);
}

export async function updateOperatorMe(
  request: FastifyRequest,
  reply: FastifyReply,
  deps: IdentityDomainModule
): Promise<void> {
  const input = {
    ...(request.body as object),
  } as UpdateOperatorMeInput;
  const result = await deps.useCases.logins.updateMe.execute(input as any);
  return reply.code(200).send(result);
}
