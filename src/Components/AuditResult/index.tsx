import type {defaultDataPropsI} from "../../api.ts";

import {CustomBox} from "../CustomBox";
import {WebsiteCongratulationBox} from '../WebsiteCongratulationBox';
import {GeneralScore} from "../GeneralScore";
import {Optimizations} from "../Optimizations";
import {StructuredData} from "../StructuredData";
const AuditResult = (props: defaultDataPropsI) => {

    const {data} = props;

    return (
        <div className="audit-result-component">
            <div className="audit-result-horizontal-container">
                <div className="audit-result-vertical-container left">
                    <CustomBox content={<WebsiteCongratulationBox data={data}/>}/>
                    <CustomBox content={<GeneralScore data={data}/>}/>
                </div>
                <div className="audit-result-vertical-container right">
                    <CustomBox content={<Optimizations data={data}/>}/>
                    <CustomBox content={<StructuredData data={data}/>}/>
                </div>
            </div>
        </div>
    )
}

export {AuditResult}