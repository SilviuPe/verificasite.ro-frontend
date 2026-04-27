import type { AnalyzeResponse } from "../../api";
import {DataStructure} from '../DataStructure';
import {Optimizations} from '../Optimizations';
import {MobileAndBrowser} from '../MobileAndBrowser';
import {Usability} from '../Usability';
import {Technologies} from '../Technologies';
import {SocialMedia} from '../SocialMedia';
import {Marketing} from '../Marketing';
import {GeneralScore} from "../GeneralScore";

type Props = {
    data: AnalyzeResponse;
};

export const WebsiteReport = ({ data }: Props) => {
    const totalVulns = data.vulnerabilities?.total_critical && data.vulnerabilities?.total_high && data.vulnerabilities?.total_low && data.vulnerabilities?.total_medium ? data.vulnerabilities?.total_critical + data.vulnerabilities?.total_high + data.vulnerabilities?.total_low + data.vulnerabilities?.total_medium : 0;
    return (
        <div>
            <GeneralScore data={data}/>
            <Optimizations data={data} />
            <DataStructure data={data}/>
            <MobileAndBrowser data={data}/>
            <Usability data={data}/>
            <Technologies data={data}/>
            <SocialMedia data={data}/>
            <Marketing data={data}/>
            <div className="popup-after-audit">
                Website-ul tău are {totalVulns} vulnerabilități și 5 probleme de performanță.
            </div>
        </div>
    );
};