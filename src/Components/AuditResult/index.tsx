import type {defaultDataPropsI} from "../../api.ts";

import {CustomBox} from "../CustomBox";
import {WebsiteCongratulationBox} from '../WebsiteCongratulationBox';
import {GeneralScore} from "../GeneralScore";
import {Optimizations} from "../Optimizations";
import {StructuredData} from "../StructuredData";
import {TestMobileAndBrowser} from "../TestMobileAndBrowser";
import {Usability} from "../Usability";
const AuditResult = (props: defaultDataPropsI) => {

    const {data} = props;

    return (
        <div className="audit-result-component">
            <div className="audit-result-horizontal-container">
                <div className="audit-result-vertical-section left">
                    <CustomBox content={<WebsiteCongratulationBox data={data}/>}/>
                    <CustomBox content={<GeneralScore data={data}/>}/>
                </div>
                <div className="audit-result-vertical-section right">
                    <CustomBox content={<Optimizations data={data}/>}/>
                    <CustomBox content={<StructuredData data={data}/>}/>
                </div>
            </div>
            <div className="audit-result-horizontal-container" style={{width: "100%"}}>
                <div className="audit-result-vertical-container">
                    <div className="left" style={{display:"flex"}}>
                        <CustomBox content={<TestMobileAndBrowser data={data}/>}/>
                    </div>
                    <div className="right" style={{display:"flex"}}>
                        <CustomBox content={<Usability data={data}/>}/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export {AuditResult}