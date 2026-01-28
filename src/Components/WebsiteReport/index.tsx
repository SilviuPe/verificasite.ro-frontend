import type { AnalyzeResponse } from "../../api";
import {DataStructure} from '../DataStructure';
import {Optimizations} from '../Optimizations';
import {MobileAndBrowser} from '../MobileAndBrowser';
import {Usability} from '../Usability';
import {Technologies} from '../Technologies';
import {SocialMedia} from '../SocialMedia';
import {Marketing} from '../Marketing';

type Props = {
    data: AnalyzeResponse;
};

export const WebsiteReport = ({ data }: Props) => {
    return (
        <div>
            <Optimizations data={data} />
            <DataStructure data={data}/>
            <MobileAndBrowser data={data}/>
            <Usability data={data}/>
            <Technologies data={data}/>
            <SocialMedia data={data}/>
            <Marketing data={data}/>
        </div>
    );
};