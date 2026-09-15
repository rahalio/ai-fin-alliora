import { useEffect, useState } from 'react';
import { AllioraApi } from '../../../lib/api';

export function DependenciesView() {
  const [items, setItems] = useState<any[]>([]);
  const [block, setBlock] = useState<any>(null);
  const [msg, setMsg] = useState('');
  async function reload() {
    const r = await AllioraApi.listSit();
    setItems(r.data.items ?? []);
  }
  useEffect(() => {
    reload().catch((e) => setMsg(e.message));
  }, []);
  return (
    <div>
      <h1>SIT concentration</h1>
      <p className="muted">Missing exit plans block new spend.</p>
      <div className="panel gap">
        <button
          className="primary"
          onClick={async () => {
            await AllioraApi.registerSit({
              vendorName: 'Model fabric vendor',
              capabilityArea: 'model',
              concentrationScore: 0.81,
              concentrationLimit: 0.4,
              exitPlanPresent: false,
              boardVisible: true,
            });
            await reload();
          }}
        >
          Register critical vendor
        </button>
      </div>
      {items.map((s) => (
        <div className="panel" key={s.dependencyId}>
          <strong>{s.vendorName}</strong> · {s.capabilityArea}
          <p className={s.spendBlocked ? 'fuse' : 'ok'}>
            {s.spendBlocked ? 'SPEND BLOCKED' : 'Spend open'} · concentration {s.concentrationScore}
          </p>
          <button
            onClick={async () => {
              const b = await AllioraApi.spendBlock(s.dependencyId);
              setBlock(b.data);
            }}
          >
            Check spend-block
          </button>
        </div>
      ))}
      {block ? (
        <div className="panel fuse">
          Blocked: {String(block.spendBlocked)} · {(block.reasons ?? []).join(', ')}
        </div>
      ) : null}
      {msg ? <p className="error">{msg}</p> : null}
    </div>
  );
}
