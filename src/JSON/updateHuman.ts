export interface Team {
    id: number;
}

export interface Humanupdate {
    id: number;
    name: string;
    id_position: number;
    id_office: number;
    id_status: number;
    start_word: string;
    hometown: string;
    phone_number: string;
    birth_day: string;
    gender: string;
    email: string;
    team: Team[];  // Thay đổi thành mảng Team[]
}

export interface HumanNICupdate {
    nic: string;
 }

 export interface createHumanResponse {
     human: Humanupdate;
     human_nic: HumanNICupdate[];
 }