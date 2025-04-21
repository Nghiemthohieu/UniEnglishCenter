export interface TeamCreate {
    id: number;
}

export interface HumanCreate {
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
    team: TeamCreate[];  // Thay đổi thành mảng Team[]
}

export interface HumanNICCreate {
    nic: string;
 }

export interface createHumanResponse {
    human: HumanCreate;
    human_nic: HumanNICCreate[];
}