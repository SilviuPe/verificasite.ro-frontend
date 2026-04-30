interface leadItemI {
    website: string,
    date: string,
    company_name: string,
}

interface LeadPopupPropsI {
    isOpen : boolean,
    onClose : () => void,
    onSubmit : (lead: leadItemI) => void
}


export type {leadItemI, LeadPopupPropsI};