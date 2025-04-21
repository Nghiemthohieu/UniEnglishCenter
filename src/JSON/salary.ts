import { Human } from "./getAllHuman";
import { Position } from "./position";

export interface Salary {
    ID: number;
    human: Human;
    positon: Position;
    personal_sales: number;
    team_sales: number;
    personal_sales_salary: number;
    team_sales_salary: number;
    total_salary: number;
}

export interface getallSalary {
    data: Salary[]
}