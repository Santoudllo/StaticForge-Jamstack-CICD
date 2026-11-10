export default function PageCard({ page }) {
  return (
    <article className="content-card">
      <div className="card-topline"><span className="dot" /> Markdown source</div>
      <h3>{page.title}</h3>
      <p>{page.description}</p>
      <div className="card-footer">
        <span>{page.date || 'Sans date'}</span>
        <code>{page.slug}.md</code>
      </div>
    </article>
  );
}
