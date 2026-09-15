import { useEffect, useState } from 'react';
import { AllioraApi } from '../../../lib/api';

export function ExperienceView() {
  const [caps, setCaps] = useState<any[]>([]);
  const [maps, setMaps] = useState<any[]>([]);
  const [msg, setMsg] = useState('');
  const [capId, setCapId] = useState('');
  async function reload(id: string) {
    const r = await AllioraApi.listMaps(id);
    setMaps(r.data.items ?? []);
  }
  useEffect(() => {
    AllioraApi.listCapabilities().then(async (r) => {
      const items = r.data.items ?? [];
      setCaps(items);
      if (items[0]) {
        setCapId(items[0].capabilityId);
        await reload(items[0].capabilityId);
      }
    });
  }, []);
  return (
    <div>
      <h1>Experience ownership</h1>
      <p className="muted">Unsigned manufacturer/distributor liability blocks go-live.</p>
      <div className="panel gap">
        <select
          value={capId}
          onChange={async (e) => {
            setCapId(e.target.value);
            await reload(e.target.value);
          }}
        >
          {caps.map((c) => (
            <option key={c.capabilityId} value={c.capabilityId}>
              {c.name}
            </option>
          ))}
        </select>
        <button
          className="primary"
          onClick={async () => {
            await AllioraApi.createMap({
              capabilityId: capId,
              journeyName: 'Onboarding',
              uxOwner: 'partner',
              brandOwner: 'bank',
              dataOwner: 'shared',
              complaintsOwner: 'bank',
              liabilityOwner: 'bank',
            });
            await reload(capId);
          }}
        >
          Create ownership map
        </button>
      </div>
      {maps.map((m) => (
        <div className="panel" key={m.mapId}>
          <h3>{m.journeyName}</h3>
          <p>
            UX {m.uxOwner} · brand {m.brandOwner} · data {m.dataOwner} · complaints {m.complaintsOwner}
          </p>
          <p className={m.goLiveBlocked ? 'fuse' : 'ok'}>
            {m.goLiveBlocked ? 'Go-live blocked' : 'Liability signed — go-live unlocked'}
          </p>
          <button
            onClick={async () => {
              const attached = await AllioraApi.attachLiability(m.mapId, {
                manufacturerLiability: 'Bank retains product liability',
                distributorLiability: 'Partner owns interface complaints',
              });
              const lid = attached.data.liabilityTermsId;
              if (lid) await AllioraApi.signLiability(lid);
              await reload(capId);
              setMsg('Liability executed');
            }}
          >
            Attach + sign liability
          </button>
        </div>
      ))}
      {msg ? <p className="ok">{msg}</p> : null}
    </div>
  );
}
