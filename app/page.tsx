const capabilities = [
  {
    code: "01",
    title: "Secure delivery",
    text: "CI/CD guardrails, dependency and image scanning, secret detection, reproducible builds, and deployment safety.",
  },
  {
    code: "02",
    title: "Cloud & edge platforms",
    text: "Kubernetes and Rancher operations, Flux GitOps, containerized workloads, observability, and constrained edge environments.",
  },
  {
    code: "03",
    title: "Infrastructure as code",
    text: "OpenTofu-driven infrastructure, Proxmox virtualization, environment configuration, and pragmatic automation.",
  },
  {
    code: "04",
    title: "Application engineering",
    text: "Rust services and React applications—useful context for designing platforms developers can actually ship on.",
  },
];

const contributions = [
  {
    eyebrow: "Collaborative professional work",
    title: "GitOps delivery for distributed edge systems",
    text: "Contributed deployment controls, image policies, configuration-change rollouts, diagnostic jobs, and rollback paths across multi-contributor Flux and Kubernetes environments.",
    stack: ["Flux", "Kubernetes", "Kustomize", "GitLab CI", "Containers"],
  },
  {
    eyebrow: "Collaborative professional work",
    title: "Embedded Linux and OTA release pipelines",
    text: "Contributed CI validation and boot-path fixes for Toradex-based Linux images, including Yocto layers, Mender artifacts, flash-bundle checks, and ARM platform bring-up.",
    stack: ["Yocto", "Toradex", "Mender", "Linux", "ARM64"],
  },
  {
    eyebrow: "Collaborative professional work",
    title: "Security built into delivery",
    text: "Added and repaired vulnerability, dependency, image, and secret-scanning stages while keeping build checks reproducible and usable for application teams.",
    stack: ["DevSecOps", "Trivy", "CI/CD", "Docker", "Supply chain"],
  },
  {
    eyebrow: "Collaborative product work",
    title: "Full-stack systems with operational context",
    text: "Worked across Rust backends and React frontends, contributing deployment workflows, runtime hardening, environment templates, and reliable build checks.",
    stack: ["Rust", "Actix Web", "React", "PostgreSQL", "Redis"],
  },
];

const principles = [
  "Automate the repeatable; document the exceptional.",
  "Security checks belong in the delivery path, not in a separate ceremony.",
  "Prefer observable, reversible changes over clever one-way migrations.",
  "Treat application teams as platform customers.",
];

export default function Home() {
  return (
    <main>
      <nav className="nav shell" aria-label="Primary navigation">
        <a className="brand" href="#top" aria-label="Shafwan T.A., home">
          <span className="brand-mark" aria-hidden="true">ST</span>
          <span>Shafwan T.A.</span>
        </a>
        <div className="nav-links">
          <a href="#work">Work</a>
          <a href="#about">About</a>
          <a className="nav-cta" href="https://github.com/WaannAlter" target="_blank" rel="noreferrer">GitHub ↗</a>
        </div>
      </nav>

      <section className="hero shell" id="top">
        <div className="hero-copy">
          <p className="kicker"><span className="status-dot" aria-hidden="true" /> DevSecOps · Infrastructure · Full-stack</p>
          <h1>I help teams ship <em>secure, reliable systems</em>—from commit to edge.</h1>
          <p className="hero-lede">
            DevSecOps and Infrastructure Engineer working across secure CI/CD, GitOps,
            cloud and edge platforms, infrastructure as code, and embedded Linux delivery.
          </p>
          <div className="hero-actions">
            <a className="button primary" href="#work">Explore contributions</a>
            <a className="button secondary" href="https://github.com/WaannAlter" target="_blank" rel="noreferrer">View GitHub <span aria-hidden="true">↗</span></a>
          </div>
        </div>
        <aside className="signal-card" aria-label="Engineering focus">
          <div className="signal-head"><span>engineering.focus</span><span className="live">ACTIVE</span></div>
          <div className="terminal-line"><span>$</span> delivery --secure --repeatable</div>
          <dl>
            <div><dt>Platform</dt><dd>Kubernetes · Edge · Linux</dd></div>
            <div><dt>Delivery</dt><dd>GitOps · CI/CD · OTA</dd></div>
            <div><dt>Automation</dt><dd>OpenTofu · Containers</dd></div>
            <div><dt>Build</dt><dd>Rust · React · Go</dd></div>
          </dl>
          <div className="signal-foot"><span>Jakarta, Indonesia / UTC+7</span><span>●</span></div>
        </aside>
      </section>

      <section className="capabilities shell" aria-labelledby="capability-title">
        <div className="section-heading">
          <p className="section-label">Capabilities</p>
          <h2 id="capability-title">Infrastructure depth.<br />Application empathy.</h2>
        </div>
        <div className="capability-grid">
          {capabilities.map((item) => (
            <article className="capability" key={item.code}>
              <span className="capability-code">/{item.code}</span>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="work-section" id="work" aria-labelledby="work-title">
        <div className="shell">
          <div className="section-heading split">
            <div>
              <p className="section-label">Selected contribution areas</p>
              <h2 id="work-title">Work I&apos;ve contributed to.</h2>
            </div>
            <p className="disclosure">Professional systems are multi-contributor and mostly private. The summaries below describe my contribution areas without claiming sole ownership or exposing client details.</p>
          </div>
          <div className="work-list">
            {contributions.map((item, index) => (
              <article className="work-card" key={item.title}>
                <div className="work-number">0{index + 1}</div>
                <div className="work-copy">
                  <p className="work-eyebrow">{item.eyebrow}</p>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                  <ul className="tag-list" aria-label="Technologies">
                    {item.stack.map((tag) => <li key={tag}>{tag}</li>)}
                  </ul>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="about shell" id="about" aria-labelledby="about-title">
        <div>
          <p className="section-label">How I work</p>
          <h2 id="about-title">Production-minded,<br />security-aware,<br />still hands-on.</h2>
          <p className="about-copy">I work at the boundary between software and operations: understanding how an application behaves, shaping how it is built and deployed, and making the path to production safer for the whole team.</p>
        </div>
        <ol className="principles">
          {principles.map((principle, index) => (
            <li key={principle}><span>0{index + 1}</span><p>{principle}</p></li>
          ))}
        </ol>
      </section>

      <section className="contact shell" aria-labelledby="contact-title">
        <p className="section-label">Let&apos;s build dependable systems</p>
        <h2 id="contact-title">Looking for a DevSecOps engineer who can see the whole delivery path?</h2>
        <p>I&apos;m open to infrastructure, platform, DevSecOps, and edge engineering conversations.</p>
        <a className="button primary" href="https://github.com/WaannAlter" target="_blank" rel="noreferrer">Start a conversation on GitHub ↗</a>
      </section>

      <footer className="footer shell">
        <span>© {new Date().getFullYear()} Shafwan T.A.</span>
        <span>Designed for clarity. Built to be reversible.</span>
      </footer>
    </main>
  );
}
