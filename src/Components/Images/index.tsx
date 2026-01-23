import type { AnalyzeResponse } from "../../api";

const Images = ({ data }: { data: AnalyzeResponse }) => {
    const images = data.seo.images;

    if (!images) {
        return (
            <section className="card">
                <h2>Images</h2>
                <p className="note">No image data available.</p>
            </section>
        );
    }

    const { total, missing_alt } = images;

    return (
        <section className="card">
            <h2>Images</h2>

            <ul className="kv">
                <li><span>Total images</span><strong>{total}</strong></li>
                <li>
                    <span>Missing alt</span>
                    <strong className={missing_alt === 0 ? "ok" : "warn"}>
                        {missing_alt}
                    </strong>
                </li>
            </ul>

            {missing_alt > 0 && (
                <p className="note">
                    Images without alt attributes reduce accessibility and SEO.
                </p>
            )}
        </section>
    );
};

export { Images };
