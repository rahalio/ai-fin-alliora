import { useEffect, useState } from 'react';
import { AllioraApi } from '../../../lib/api';

export function WorkforceView() {
  const [items, setItems] = useState<any[]>([]);
  const [caps, setCaps] = useState<any[]>([]);
  async function reload() {
    const r = await AllioraApi.listWorkforce();
    setItems(r.data.items ?? []);
  }
  useEffect(() => {
    AllioraApi.listCapabilities().then((r) => setCaps(r.data.items ?? []));
    reload();
  }, []);
  return (
    <div>
      <h1>Bionic workforce</h1>
      <p className="muted">HR/conduct sign-off required before automation scale.</p>
      <button
        className="primary"
        onClick={async () => {
          const cap = caps[0];
          if (!cap) return;
          await AllioraApi.createWorkforce({
            capabilityId: cap.capabilityId,
            roleName: 'KYC analyst',
            treatment: 'augment',
            transitionFundingNote: 'Retraining fund requested',
          });
          await reload();
        }}
      >
        Add role map
      </button>
      {items.map((m) => (
        <div className="panel" key={m.mapId}>
          <strong>{m.roleName}</strong> · {m.treatment}
          <p className={m.scaleBlocked ? 'fuse' : 'ok'}>{m.scaleBlocked ? 'Scale blocked' : 'HR signed'}</p>
          <button onClick={async () => { await AllioraApi.signWorkforce(m.mapId); await reload(); }}>
            HR / conduct sign-off
          </button>
        </div>
      ))}
    </div>
  );
}
