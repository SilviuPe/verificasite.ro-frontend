import type { AnalyzeResponse } from "../../api";
import {Overview} from '../Overview';
import {SeoBasics} from '../SeoBasics';
import {ContentStructure} from '../ContentStructure';
import {Images} from '../Images';
import {Links} from '../Links';
import {Technical} from '../Technical';
import {Indexing} from '../Indexing';
import {Platform} from '../Platform';

type Props = {
    data: AnalyzeResponse;
};

export const WebsiteReport = ({ data }: Props) => {
    return (
        <div>
            <ContentStructure data={data} />
            <div className="report">
                <Overview data={data} />
                <SeoBasics data={data} />
                <Images data={data} />
                <Links data={data} />
                <Technical data={data} />
                <Indexing data={data} />
                <Platform data={data} />
            </div>
        </div>
    );
};