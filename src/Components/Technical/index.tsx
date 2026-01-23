import type { AnalyzeResponse } from "../../api";

const Technical = ({ data }: { data: AnalyzeResponse }) => {
    return (
        <section className="card">
            <h2>Technical</h2>

            <ul className="kv">
                <li>
                    <span>WWW redirect</span>
                    <strong>{data.seo.www_resolve?.supported ? "OK" : "Issue"}</strong>
                </li>
                <li>
                    <span>Custom 404</span>
                    <strong>{data.seo.custom_404?.has_404 ? "OK" : "Missing"}</strong>
                </li>
                <li>
                    <span>Mobile viewport</span>
                    <strong>{data.seo.mobile?.has_viewport_meta ? "OK" : "Missing"}</strong>
                </li>
            </ul>
        </section>
    );
};

export { Technical };