import { useEffect, useState } from 'react';
import { AllioraApi } from '../../../lib/api';

const FORCES = [
  'costCommoditization',
  'profitRedistribution',
  'experienceOwnership',
  'platformsRising',
  'dataMonetization',
  'bionicWorkforce',
  'systemicallyImportantTechs',
  'financialRegionalization',
];

export function CapabilitiesView() {
  const [items, setItems] = useState<any[]>([]);
  const [name, setName] = useState('Distributor lending app');
  const [owner, setOwner] = useState('Corp-dev');
  const [selected, setSelected] = useState<any>(null);
  const [msg, setMsg] = useState('');
  async function reload() {
    const res = await AllioraApi.listCapabilities();
    setItems(res.data.items ?? []);
  }
  useEffect(() => {
    reload().catch((e) => setMsg(e.message));
  }, []);
  return (
    <div>
      <h1>Capability intake</h1>
      <p className="muted">Force-tag and value-chain position before funding.</p>
      <div className="panel gap">
        <input value={name} onChange={(e) => setName(e.target.value)} />
        <input value={owner} onChange={(e) => setOwner(e.target.value)} />
        <button
          className="primary"
          onClick={async () => {
            try {
              await AllioraApi.createCapability({ name, sourceType: 'fintech', economicOwner: owner });
              await reload();
              setMsg('Capability submitted');
            } catch (e) {
              setMsg((e as Error).message);
            }
          }}
        >
          Submit intake
        </button>
      </div>
      <div className="panel">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Status</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {items.map((c) => (
              <tr key={c.capabilityId}>
                <td>{c.name}</td>
                <td>{c.status}</td>
                <td>
                  <button onClick={() => setSelected(c)}>Scorecard</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {selected ? (
        <div className="panel gap">
          <h3>{selected.name}</h3>
          <p className="mono">{selected.capabilityId}</p>
          <button
            className="primary"
            onClick={async () => {
              const updated = await AllioraApi.tagForces(selected.capabilityId, {
                forces: ['costCommoditization', 'experienceOwnership'],
                valueChainPosition: 'distribute',
              });
              setSelected(updated.data);
              await reload();
              setMsg('Force tags applied (BR-1)');
            }}
          >
            Tag forces + distribute
          </button>
          <button
            onClick={async () => {
              await AllioraApi.createRegional({
                capabilityId: selected.capabilityId,
                region: 'EU',
                constraintType: 'dataResidency',
                blocksCopyPaste: true,
              });
              setMsg('Regionalisation constraint saved (BR-8)');
            }}
          >
            Add EU residency block
          </button>
          <div className="heat">
            {FORCES.map((f) => (
              <span key={f} className={(selected.forces ?? []).includes(f) ? 'on' : ''}>
                {f}
              </span>
            ))}
          </div>
        </div>
      ) : null}
      {msg ? <p className="ok">{msg}</p> : null}
    </div>
  );
}
