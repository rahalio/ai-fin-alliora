/**
 * IdGeneratorService Port — starter prefixes (extend in consumer repos).
 */

import type { DomainCode } from '@alliora/core/_shared/helpers';

export interface IdGeneratorService {
  tntId(): string;
  keyId(): string;
  idnId(): string;
  autId(): string;
  capId(): string;
  dcsId(): string;
  gatId(): string;
  expId(): string;
  sitId(): string;
  altId(): string;
  bioId(): string;
  rptId(): string;
  generateIdForDomain(domainCode: DomainCode): string;
}
