export interface IRootState {
    phoneBook: {
        contacts: Icontact[];
        labels:[];
    }
}

export interface IcontactCreate {
    id?:string | null;
    first_name: string;
    last_name: string;
    email: string;
    phone_number: string;
    address: string;
    dob: string | Date;
    note: string;
    label_ids: string[];
}

export interface Icontact {
    _id: {$oid :string};
    address: string;
    dob: Date;
    email: string;
    first_name: string;
    is_delete: boolean;
    label_ids: string[];
    last_name: string;
    note: string;
    phone_number: string
}

export interface Ilabel {
    _id: {"$oid": string};
    title:string;
}