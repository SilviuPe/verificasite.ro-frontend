import {useEffect} from "react";

import type {TermsAndConditionsPropsI} from './types';

const TermsAndConditions = (props: TermsAndConditionsPropsI) => {
    const {title} = props;

    useEffect(()=>{
        if (title) {
            document.title = title;
        } else {
            document.title = 'Termeni & Conditii';
        }
    },[title])

    return <div>
        Termeni Si Conditii
    </div>;
}

export {TermsAndConditions};