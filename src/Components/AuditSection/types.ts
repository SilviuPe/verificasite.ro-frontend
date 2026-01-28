import type {AuditRowPropsI} from '../AuditRow/types';

interface AuditSectionPropsI {
    image: string;
    title: string;
    rows: AuditRowPropsI[];
}

export type {AuditSectionPropsI};