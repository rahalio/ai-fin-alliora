import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AllioraApi } from '../lib/api';

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

export function PortfolioHome() {
  const [caps, setCaps] = useState<any[]>([]);
  const [sits, setSits] = useState<any[]>([]);
  const [alerts, setAlerts] = useState<any[]>([]);
  const [error, setError] = useState('');
  useEffect(() => {
    Promise.all([AllioraApi.listCapabilities(), AllioraApi.listSit(), AllioraApi.listAlerts()])
      .then(([c, s, a]) => {
        setCaps(c.data.items ?? []);
        setSits(s.data.items ?? []);
        setAlerts(a.data.items ?? []);
      })
      .catch((e) => setError(e.message));
  }, []);
  const killed = caps.filter((c) => c.status === 'killed').length;
  const tagged = new Set(caps.flatMap((c) => c.forces ?? []));
  const sitBreaches = sits.filter((s) => s.spendBlocked).length;
  return (
    <div>
      <h1>Portfolio</h1>
      <p className="muted">Are we shopping capabilities with strategy, or collecting fintech logos?</p>
      {error ? <p className="error">{error}</p> : null}
      <div className="row">
        <div className="panel">
          <div className="muted">Kill rate</div>
          <h2>{caps.length ? Math.round((killed / caps.length) * 100) : 0}%</h2>
        </div>
        <div className="panel">
          <div className="muted">SIT breaches</div>
          <h2 className={sitBreaches ? 'fuse' : 'ok'}>{sitBreaches}</h2>
        </div>
        <div className="panel">
          <div className="muted">Open platform alerts</div>
          <h2>{alerts.filter((a) => a.status === 'open').length}</h2>
        </div>
      </div>
      <div className="panel heat">
        <h3>Eight-force coverage</h3>
        {FORCES.map((f) => (
          <span key={f} className={tagged.has(f) ? 'on' : ''}>
            {f}
          </span>
        ))}
      </div>
      <div className="panel">
        <h3>Capabilities</h3>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Status</th>
              <th>Owner</th>
              <th>Forces</th>
            </tr>
          </thead>
          <tbody>
            {caps.map((c) => (
              <tr key={c.capabilityId}>
                <td>
                  <Link to="/capabilities">{c.name}</Link>
                </td>
                <td>{c.status}</td>
                <td>{c.economicOwner}</td>
                <td className="mono">{(c.forces ?? []).join(', ') || '—'}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {caps.length === 0 ? <p className="muted">Intake the first capability with force tags.</p> : null}
        <p>
          <Link to="/reports">Publish exco report</Link>
          {' · '}
          <Link to="/gates">Open overdue gates</Link>
        </p>
      </div>
    </div>
  );
}
