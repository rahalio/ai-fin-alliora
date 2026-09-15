import { useEffect, useState } from 'react';
import { AllioraApi } from '../../../lib/api';

export function StagegatesView() {
  const [caps, setCaps] = useState<any[]>([]);
  const [capId, setCapId] = useState('');
  const [gates, setGates] = useState<any[]>([]);
  const [msg, setMsg] = useState('');
  async function reload(id: string) {
    const g = await AllioraApi.listGates(id);
    setGates(g.data.items ?? []);
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
      <h1>Stage-gate evidence</h1>
      <p className="muted">Day-30/90/180. Narrative-only renewals are blocked.</p>
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
            await AllioraApi.createGate({ capabilityId: capId, dayMarker: 90 });
            await reload(capId);
          }}
        >
          Open day-90 gate
        </button>
      </div>
      {gates.map((g) => (
        <div className="panel" key={g.gateId}>
          <strong>Day {g.dayMarker}</strong> <span className="ticket">{g.status}</span>
          <p className="mono">{g.gateId}</p>
          <button
            onClick={async () => {
              try {
                await AllioraApi.submitEvidence(g.gateId, {
                  switchingMateriality: true,
                  unitEconomicsPass: true,
                  operationalRiskNotes: 'Ops review attached',
                });
                setMsg('Evidence pack attached');
                await reload(capId);
              } catch (e) {
                setMsg((e as Error).message);
              }
            }}
          >
            Submit evidence
          </button>
          <button
            onClick={async () => {
              try {
                await AllioraApi.decideGate(g.gateId, { outcome: 'kill', rationale: 'Failed materiality' });
                setMsg('Kill recorded');
                await reload(capId);
              } catch (e) {
                setMsg((e as Error).message);
              }
            }}
          >
            Kill
          </button>
          <button
            onClick={async () => {
              try {
                await AllioraApi.decideGate(g.gateId, { outcome: 'scale', rationale: 'Economics hold' });
                setMsg('Scale recorded');
                await reload(capId);
              } catch (e) {
                setMsg((e as Error).message);
              }
            }}
          >
            Scale
          </button>
        </div>
      ))}
      {msg ? <p className="warn">{msg}</p> : null}
    </div>
  );
}
