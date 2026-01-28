import type {ReactElement} from "react";

type row_types = 'error' | 'success' | 'warning';

interface AuditRowStateI {
    dropdownInfo: {
        open: boolean;
    }
}

interface AuditRowPropsI {
    row_type: row_types;
    key_: string;
    value: ReactElement;
    info: string;
}

export type {AuditRowPropsI, AuditRowStateI, row_types};