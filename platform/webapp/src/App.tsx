import { NavLink, Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { AllioraApi, TOKEN_KEY } from './lib/api';
import { CapabilitiesView } from './features/capabilities/views/CapabilitiesView';
import { DecisionsView } from './features/decisions/views/DecisionsView';
import { StagegatesView } from './features/stagegates/views/StagegatesView';
import { ExperienceView } from './features/experience/views/ExperienceView';
import { DependenciesView } from './features/dependencies/views/DependenciesView';
import { AlertsView } from './features/alerts/views/AlertsView';
import { WorkforceView } from './features/workforce/views/WorkforceView';
import { ReportsView } from './features/reports/views/ReportsView';
import { PortfolioHome } from './pages/PortfolioHome';

function Login() {
  const nav = useNavigate();
  const [email, setEmail] = useState('admin@demo.local');
  const [password, setPassword] = useState('sandbox-admin-8');
  const [error, setError] = useState('');
  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    try {
      const res = await AllioraApi.login(email, password);
      localStorage.setItem(TOKEN_KEY, res.data.accessToken);
      nav('/');
    } catch (err) {
      setError((err as Error).message);
    }
  }
  return (
    <div className="login panel">
      <div className="stamp" style={{ color: 'var(--color-cyan)', fontFamily: 'var(--font-display)', fontWeight: 700 }}>
        ALLIORA
      </div>
      <h1>Shop capabilities; keep the strategy receipt</h1>
      <p className="muted">Operator login for the alliance-and-capability ledger.</p>
      <form className="gap" onSubmit={submit} autoComplete="off">
        <input
          autoComplete="username"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          autoComplete="current-password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {error ? <div className="error">{error}</div> : null}
        <button className="primary" type="submit">Enter portfolio</button>
      </form>
    </div>
  );
}

function Shell() {
  const nav = useNavigate();
  const [me, setMe] = useState<string>('');
  useEffect(() => {
    AllioraApi.me()
      .then((r) => setMe(`${r.data.operator.displayName} · ${r.data.operator.role}`))
      .catch(() => {
        localStorage.removeItem(TOKEN_KEY);
        nav('/login');
      });
  }, [nav]);
  return (
    <div className="shell">
      <aside className="nav">
        <div className="stamp">ALLIORA</div>
        <NavLink to="/" end>Portfolio</NavLink>
        <NavLink to="/capabilities">Capabilities</NavLink>
        <NavLink to="/decisions">Decisions</NavLink>
        <NavLink to="/gates">Stage gates</NavLink>
        <NavLink to="/experience">Experience</NavLink>
        <NavLink to="/sit">SIT risk</NavLink>
        <NavLink to="/alerts">Platform risk</NavLink>
        <NavLink to="/workforce">Workforce</NavLink>
        <NavLink to="/reports">Exco reports</NavLink>
        <p className="muted" style={{ marginTop: 24 }}>{me}</p>
        <button
          onClick={() => {
            localStorage.removeItem(TOKEN_KEY);
            nav('/login');
          }}
        >
          Sign out
        </button>
      </aside>
      <main className="main">
        <Routes>
          <Route path="/" element={<PortfolioHome />} />
          <Route path="/capabilities" element={<CapabilitiesView />} />
          <Route path="/decisions" element={<DecisionsView />} />
          <Route path="/gates" element={<StagegatesView />} />
          <Route path="/experience" element={<ExperienceView />} />
          <Route path="/sit" element={<DependenciesView />} />
          <Route path="/alerts" element={<AlertsView />} />
          <Route path="/workforce" element={<WorkforceView />} />
          <Route path="/reports" element={<ReportsView />} />
        </Routes>
      </main>
    </div>
  );
}

export function App() {
  const token = localStorage.getItem(TOKEN_KEY);
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/*" element={token ? <Shell /> : <Navigate to="/login" replace />} />
    </Routes>
  );
}
