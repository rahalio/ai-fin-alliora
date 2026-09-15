import { useEffect, useState } from 'react';
import { AllioraApi } from '../../../lib/api';

export function DecisionsView() {
  const [caps, setCaps] = useState<any[]>([]);
  const [capId, setCapId] = useState('');
  const [decisions, setDecisions] = useState<any[]>([]);
  const [msg, setMsg] = useState('');
  useEffect(() => {
    AllioraApi.listCapabilities().then((r) => {
      const items = r.data.items ?? [];
      setCaps(items);
      if (items[0]) setCapId(items[0].capabilityId);
    });
  }, []);
  useEffect(() => {
    if (!capId) return;
    AllioraApi.listDecisions(capId).then((r) => setDecisions(r.data.items ?? []));
  }, [capId]);
  return (
    <div>
      <h1>Decision class</h1>
      <p className="muted">Stamp mutualise / externalise / automate / build / invest / decline with a named owner.</p>
      <div className="panel gap">
        <select value={capId} onChange={(e) => setCapId(e.target.value)}>
          {caps.map((c) => (
            <option key={c.capabilityId} value={c.capabilityId}>
              {c.name}
            </option>
          ))}
        </select>
        {['mutualise', 'externalise', 'automate', 'build', 'invest', 'decline'].map((d) => (
          <button
            key={d}
            className="ticket"
            onClick={async () => {
              await AllioraApi.stampDecision({
                capabilityId: capId,
                decision: d,
                economicOwner: 'CSO office',
                rationale: `Stamped ${d}`,
              });
              const list = await AllioraApi.listDecisions(capId);
              setDecisions(list.data.items ?? []);
              setMsg(`Stamped ${d}`);
            }}
          >
            {d}
          </button>
        ))}
        <button
          onClick={async () => {
            await AllioraApi.createProfit({
              capabilityId: capId,
              whoGains: 'Distributor',
              whoLoses: 'Manufacturer bank',
            });
            setMsg('Profit-pool hypothesis recorded (BR-4)');
          }}
        >
          State profit-pool hypothesis
        </button>
        <button
          onClick={async () => {
            await AllioraApi.createCost({
              capabilityId: capId,
              duplicateSpendAmount: { amount: '5000000', currency: 'USD' },
              mutualiseSpendAmount: { amount: '1200000', currency: 'USD' },
              chosenPath: 'mutualise',
            });
            setMsg('Mutualise vs duplicate compare saved (BR-7)');
          }}
        >
          Cost-commoditisation compare
        </button>
      </div>
      <div className="panel">
        {decisions.map((d) => (
          <div key={d.decisionId} className="ticket">
            {d.decision} · {d.economicOwner}
          </div>
        ))}
      </div>
      {msg ? <p className="ok">{msg}</p> : null}
    </div>
  );
}
