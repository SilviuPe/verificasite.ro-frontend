import type {AnalyzeResponse} from "../../api.ts";

const Indexing = ({ data }: { data: AnalyzeResponse }) => {
    return (
        <section className="card">
            <h2>Indexing</h2>

            <ul className="kv">
                <li><span>robots.txt</span><strong>{data.seo.robots_txt?.present ? "Present" : "Missing"}</strong></li>
                <li><span>Sitemap</span><strong>{data.seo.sitemap?.present ? "Present" : "Missing"}</strong></li>
            </ul>
        </section>
    );
};

export { Indexing };