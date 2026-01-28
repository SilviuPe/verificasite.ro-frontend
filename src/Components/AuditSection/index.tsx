import {AuditRow} from '../AuditRow';

import type {AuditSectionPropsI} from "./types";

const AuditSection = (props: AuditSectionPropsI) => {

    const {image, title, rows} = props;

    return <div className='section-container'>
        <div className='section-content'>
            <div className='section-header-container'>
                <img className='image' src={image} alt=''/>
                <h2>{title}</h2>
            </div>
            <div className='section-rows-container'>
                {
                    rows.map((row, index) => (
                        <div key={`${row} -- ${index}`}>
                            <AuditRow row_type={row.row_type} key_={row.key_} value={row.value} info={row.info} />
                        </div>
                    ))
                }
            </div>
        </div>
    </div>
}

export {AuditSection};