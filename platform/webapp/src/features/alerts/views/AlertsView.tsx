import { useEffect, useState } from 'react';
import { AllioraApi } from '../../../lib/api';

export function AlertsView() {
  const [items, setItems] = useState<any[]>([]);
  const [caps, setCaps] = useState<any[]>([]);
  async function reload() {
    const r = await AllioraApi.listAlerts();
    setItems(r.data.items ?? []);
  }
  useEffect(() => {
    AllioraApi.listCapabilities().then((r) => setCaps(r.data.items ?? []));
    reload();
  }, []);
  return (
    <div>
      <h1>Platform-risk alerts</h1>
      <p className="muted">Distributor interface power — renegotiate before the interface is lost.</p>
      <div className="panel">
        <button
          className="primary"
          onClick={async () => {
            const cap = caps[0];
            if (!cap) return;
            await AllioraApi.raiseAlert({
              capabilityId: cap.capabilityId,
              severity: 'high',
              detail: 'Partner steering customers off-brand',
              interfacePowerSignal: 'share_of_originations > 40%',
            });
            await reload();
          }}
        >
          Raise alert
        </button>
      </div>
      {items.length === 0 ? <p className="ok">No open interface-power alerts.</p> : null}
      {items.map((a) => (
        <div className="panel" key={a.alertId}>
          <span className="ticket">{a.status}</span> {a.severity}
          <p>{a.detail}</p>
          <button onClick={async () => { await AllioraApi.ackAlert(a.alertId); await reload(); }}>Acknowledge</button>
          <button onClick={async () => { await AllioraApi.escalateAlert(a.alertId, 'CSO renegotiation'); await reload(); }}>
            Escalate to CSO
          </button>
        </div>
      ))}
    </div>
  );
}
