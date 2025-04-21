import { Position } from "./position"

export interface softSalary {
    ID: number;
    id_position: number;
    position: Position;
    care_part_1: number;
    target_1: number;
    care_part_2 : number;
    target_2: number;
    care_part_3: number;
 }

 export interface getallsoftSalary {
    data: softSalary[];
 }

 export interface CreateSoftSalary {
    ID: number;
    id_position: number;
    care_part_1: number;
    target_1: number;
    care_part_2 : number;
    target_2: number;
    care_part_3: number;
 }