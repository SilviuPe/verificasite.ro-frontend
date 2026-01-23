import type {AnalyzeResponse} from "../../api.ts";

const SeoBasics = ({ data }: { data: AnalyzeResponse }) => {
    const titleLen = data.seo.title?.length;
    const descLen = data.seo.meta_description?.length;

    return (
        <section className="card">
            <h2>SEO basics</h2>

            <div className="row">
                <div>
                    <strong>Title</strong>
                    <p>{data.seo.title?.value || "Missing"}</p>
                    {
                        typeof titleLen === "number" && typeof descLen === "number" ? <span className={titleLen >= 30 && titleLen <= 60 ? "ok" : "warn"}>{titleLen} characters</span> : null
                    }

                </div>

                <div>
                    <strong>Meta description</strong>
                    <p>{data.seo.meta_description?.value || "Missing"}</p>
                    {
                        typeof titleLen === "number" && typeof descLen === "number" ?
                        <span className={descLen >= 70 && descLen <= 160 ? "ok" : "warn"}>
                        {descLen} characters
                    </span> : null
                    }
                </div>
            </div>
        </section>
    );
};

export {SeoBasics};
