import type {AnalyzeResponse} from "../../api.ts";

const Links = ({ data }: { data: AnalyzeResponse }) => {
    const broken = data.seo.links?.broken_links;

    return (
        <section className="card">
            <h2>Links</h2>

            <ul className="kv">
                <li><span>Checked</span><strong>{broken?.checked}</strong></li>
                <li><span>Broken</span><strong className={broken?.broken === 0 ? "ok" : "warn"}>{broken?.broken}</strong></li>
            </ul>

            {broken && broken.broken && broken.broken > 0 && (
                <ul className="list">
                    {broken?.broken_samples.map((l, i) => (
                        <li key={i}>{l.url}</li>
                    ))}
                </ul>
            )}
        </section>
    );
};

export {Links};