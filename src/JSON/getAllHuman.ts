// types.ts
export interface Position {
    ID: number;
    name: string;
    acronym: string;
}

export interface Office {
    ID: number;
    name: string;
    acronym: string;
}

export interface Status {
    ID: number;
    name: string;
}

export interface Team {
    ID: number;
}

export interface Human {
    ID: number;
    name: string;
    position: Position;
    office: Office;
    status: Status;
    start_word: string;
    hometown: string;
    phone_number: string;
    birth_day: string;
    gender: string;
    email: string;
    Team?: Team[];  // Thay đổi thành mảng Team[]
}

export interface ApiResponse {
    data: Human[];
}
