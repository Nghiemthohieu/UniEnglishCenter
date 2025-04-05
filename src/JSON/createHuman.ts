export interface Team {
    ID: number;
    name: string;  // Nếu bạn muốn lưu tên team
}

export interface Human {
    ID: number;
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

export interface HumanNIC {
    nic: string;
 }

export interface createHumanResponse {
    human: Human;
    human_nic: HumanNIC[];
}