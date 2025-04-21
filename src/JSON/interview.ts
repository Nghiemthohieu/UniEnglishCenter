import { Human } from "./getAllHuman";

export interface interview {
    ID: number;
    name: string;
    phone_number: string;
    email: string;
    id_human: number;
    school: string;
    birt_year: number;
    date_interview: string;
    time_interview: string;
    form_inter: string;
    result : string;
    notes: string;
}

export interface getInterview {
    ID: number;
    name: string;
    phone_number: string;
    email: string;
    id_human: number;
    human: Human;
    school: string;
    birt_year: number;
    date_interview: string;
    time_interview: string;
    form_inter: string;
    result : string;
    notes: string;
}

export interface CountInterviewResult {
    result: string;
    count: interview;
}

export interface CountInterviewHuman {
    IDHuman: number;
    Name: string;
    Total: number;
    fill: string;
}
export interface CountDateInterviewOut {
    id_human: number;
    count: number;
}
export interface CountDateInterviewIn {
    id: number;
    date: string;
}