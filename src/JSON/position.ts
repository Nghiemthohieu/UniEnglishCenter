export interface Position {
    ID: number;
    name: string;
    acronym: string;
}

export interface PositionCreated {
    name: string;
    acronym: string;
}

export interface getallPosition {
    data: Position[];
}