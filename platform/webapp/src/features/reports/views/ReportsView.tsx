import { useState } from 'react';
import { AllioraApi } from '../../../lib/api';

export function ReportsView() {
  const [report, setReport] = useState<any>(null);
  const [period, setPeriod] = useState('2026-Q3');
  const [msg, setMsg] = useState('');
  return (
    <div>
      <h1>Exco portfolio report</h1>
      <p className="muted">Force coverage, kill rate, SIT — not a logo count.</p>
      <div className="panel gap">
        <input value={period} onChange={(e) => setPeriod(e.target.value)} />
        <button
          className="primary"
          onClick={async () => {
            const g = await AllioraApi.generateReport(period);
            setReport(g.data);
            setMsg('Draft generated');
          }}
        >
          Generate
        </button>
        {report?.reportId ? (
          <button
            onClick={async () => {
              const p = await AllioraApi.publishReport(report.reportId);
              setReport(p.data);
              setMsg('Published');
            }}
          >
            Publish
          </button>
        ) : null}
      </div>
      {report ? (
        <div className="panel">
          <h3>
            {report.period} · {report.status}
          </h3>
          <p>Capabilities {report.capabilityCount}</p>
          <p>Kill rate {(report.killRate * 100).toFixed(0)}%</p>
          <p className={report.sitBreachCount ? 'fuse' : 'ok'}>SIT breaches {report.sitBreachCount}</p>
          <p>Open platform alerts {report.openPlatformAlerts}</p>
          <div className="heat">
            {Object.entries(report.forceCoverage ?? {}).map(([k, v]) => (
              <span key={k} className="on">
                {k}: {String(v)}
              </span>
            ))}
          </div>
        </div>
      ) : null}
      {msg ? <p className="ok">{msg}</p> : null}
    </div>
  );
}
