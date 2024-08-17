export type Customer = {
    id: string;
    name: string;
    phone_number: string;
    tax_payer_id: string;
    reason_code_for_reg: string;
    checking_account: string;
    adrs_city: string;
    adrs_street: string;
    adrs_house: number;
    mail_index: string;
    created_at: Date;
    is_active: boolean;
};
