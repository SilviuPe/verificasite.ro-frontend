import type {defaultDataPropsI} from "../../api.ts";
import DiagnosticIcon from "../../assets/DiagnosticIcon.svg";

import "../../Styles/TestMobileAndBrowser.css";

const TestMobileAndBrowser = (props: defaultDataPropsI) => {

    const {data} = props;

    return (
        <div className="text-mobile-and-browser-component">
            <div className="header-wrapper">
                <img src={DiagnosticIcon} alt="Diagnostic icon" width={72}/>
                <h2>Test Mobile & Browser</h2>
            </div>
            <div className="images-wrapper">
                <div className="image-block">
                    <h2>Mobile</h2>
                    <div className="image-container mobile">
                        <img
                            src={`data:image/png;base64,${data?.screenshots.mobile}`}
                            alt="mobile"
                        />
                    </div>
                </div>

                <div className="image-block">
                    <h2>Browser</h2>
                    <div className="image-container desktop">
                        <img
                            src={`data:image/png;base64,${data?.screenshots.desktop}`}
                            alt="desktop"
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export {TestMobileAndBrowser};