type FooterSection = {
    title: string;
    links: Array<{ label: string; href: string }>;
};

const sections: FooterSection[] = [
    {
        title: "PRODUSE",
        links: [
            { label: "Plugin", href: "/plugin" },
            { label: "Crawlers", href: "/crawlers" },
            { label: "API", href: "/api" },
        ],
    },
    {
        title: "POPULAR TOPICS",
        links: [
            { label: "Backlink Analysis", href: "/topics/backlink-analysis" },
            { label: "eCommerce Ranking", href: "/topics/ecommerce-ranking" },
            { label: "SEO Content", href: "/topics/seo-content" },
            { label: "Data Meets Creativity", href: "/topics/data-meets-creativity" },
            { label: "OnPage Search Engine Optimization", href: "/topics/onpage-seo" },
            { label: "SEO Software", href: "/topics/seo-software" },
        ],
    },
    {
        title: "RESURSE",
        links: [
            { label: "Glosar de termeni", href: "/glosar" },
            { label: "Blog", href: "/blog" },
        ],
    },
];

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-inner">
                <div className="footer-top">
                    <div className="footer-brand">
                        <a className="footer-logo" href="/" aria-label="Home">
                            {/* Foloseste ce ai deja in public/ */}
                            <img src="/full_logo.svg" alt="Verifica Site" />
                        </a>
                    </div>

                    <nav className="footer-nav" aria-label="Footer navigation">
                        {sections.map((s) => (
                            <div className="footer-col" key={s.title}>
                                <div className="footer-title">{s.title}</div>
                                <ul className="footer-links">
                                    {s.links.map((l) => (
                                        <li key={l.href}>
                                            <a href={l.href}>{l.label}</a>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </nav>
                </div>

                <div className="footer-bottom">
                    <div className="footer-copy">
                        Copyright {new Date().getFullYear()} verificasite.ro - Toate drepturile rezervate.
                        <span className="footer-sep">|</span>
                        <a href="/termeni-si-conditii">Termeni si conditii</a>
                    </div>

                    <div className="footer-credit">
                        HEAD INNOVATION AGENCY
                    </div>
                </div>
            </div>
        </footer>
    );
};

export { Footer };
