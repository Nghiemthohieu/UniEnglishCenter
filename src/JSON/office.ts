export interface Office {
    ID: number;
    name: string;
    acronym: string;
}

export interface OfficeCreate {
    name: string;
    acronym: string;
}

export interface getallOffice {
    data: Office[];
}