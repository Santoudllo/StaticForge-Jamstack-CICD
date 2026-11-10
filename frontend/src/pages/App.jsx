import { useEffect, useState } from 'react';
import { generateSite, getBuildStatus, getHealth, getPages } from '../services/api';
import StatCard from '../components/StatCard';
import PageCard from '../components/PageCard';

export default function App() {
  const [pages, setPages] = useState([]);
  const [health, setHealth] = useState('checking');
  const [build, setBuild] = useState({ status: 'never-run', pages: 0 });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  async function refresh() {
    try {
      const [pageData, healthData, buildData] = await Promise.all([
        getPages(), getHealth(), getBuildStatus()
      ]);
      setPages(pageData);
      setHealth(healthData.status);
      setBuild(buildData);
    } catch (error) {
      setHealth('offline');
      setMessage(error.message);
    }
  }

  useEffect(() => { refresh(); }, []);

  async function handleBuild() {
    setLoading(true);
    setMessage('');
    try {
      const result = await generateSite();
      setBuild(result);
      setMessage(`Build terminé : ${result.pages} page(s) générée(s).`);
    } catch (error) {
      setMessage(`Échec du build : ${error.message}`);
    } finally {
      setLoading(false);
    }
  }

  const formattedDate = build.generatedAt
    ? new Date(build.generatedAt).toLocaleString('fr-FR')
    : 'Aucun build exécuté';

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="brand"><span className="brand-mark">S</span><span>StaticForge</span></div>
        <div className="workspace-label">WORKSPACE</div>
        <a className="nav-item active" href="#overview"><span>◫</span> Vue d'ensemble</a>
        <a className="nav-item" href="#content"><span>▤</span> Contenus Markdown</a>
        <a className="nav-item" href="#pipeline"><span>⌁</span> Génération du site</a>
        <div className="sidebar-bottom"><span className="status-light" /> Atelier Jamstack<br /><small>Projet pédagogique CI/CD</small></div>
      </aside>

      <main className="main-content">
        <header className="topbar">
          <div><span className="breadcrumb">Workspace /</span> Overview</div>
          <div className="api-status"><span className={`status-light ${health === 'ok' ? '' : 'status-error'}`} /> API {health}</div>
        </header>

        <section className="hero" id="overview">
          <div>
            <p className="eyebrow">JAMSTACK WORKSPACE</p>
            <h1>Build something<br /><span>static.</span></h1>
            <p className="hero-copy">Gérez vos contenus Markdown, générez votre site et préparez sa publication.</p>
            <button className="primary-button" onClick={handleBuild} disabled={loading || health !== 'ok'}>
              {loading ? 'Génération en cours…' : '▶  Générer le site'}
            </button>
          </div>
          <div className="hero-visual" aria-hidden="true">
            <div className="orbit orbit-one" /><div className="orbit orbit-two" />
            <div className="visual-core"><span>HTML</span><strong>↗</strong><small>STATIC</small></div>
            <div className="floating-tag tag-md">.md</div><div className="floating-tag tag-css">CSS</div><div className="floating-tag tag-html">HTML</div>
          </div>
        </section>

        {message && <div className="notice" role="status">{message}</div>}

        <section className="stats-grid">
          <StatCard label="Pages disponibles" value={pages.length} detail="Fichiers Markdown détectés" />
          <StatCard label="Dernier build" value={build.status === 'success' ? 'Réussi' : 'En attente'} detail={formattedDate} />
          <StatCard label="Pages générées" value={build.pages || 0} detail="Dans le dossier public/generated" />
        </section>

        <section className="section-block" id="content">
          <div className="section-heading"><div><p className="eyebrow">CONTENT MANAGER</p><h2>Vos contenus</h2></div><span className="counter">{pages.length} fichiers</span></div>
          <div className="content-grid">
            {pages.map((page) => <PageCard key={page.slug} page={page} />)}
            {pages.length === 0 && <p className="muted">Aucun contenu trouvé dans backend/content.</p>}
          </div>
        </section>

        <section className="pipeline-panel" id="pipeline">
          <div><p className="eyebrow">WORKFLOW</p><h2>De Markdown à la production</h2><p>Le générateur transforme les sources en fichiers HTML autonomes.</p></div>
          <div className="pipeline-steps">
            <span><b>01</b> Markdown</span><i>→</i><span><b>02</b> Parser</span><i>→</i><span><b>03</b> HTML</span><i>→</i><span><b>04</b> Deploy</span>
          </div>
          <p className="output-path">Output directory <code>public/generated/</code></p>
        </section>

        <footer className="footer">StaticForge Studio <span>Master Développement · CI/CD Lab</span></footer>
      </main>
    </div>
  );
}
