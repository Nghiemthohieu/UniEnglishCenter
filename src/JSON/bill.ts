import { Human } from "./getAllHuman";
import { Office } from "./office";

export interface getBill {
    ID: number;
    id_human: number;
    human: Human;
    registration_date: string;
    name: string;
    phone_number: string;
    birth_day: string;
    invoice_code: number;
    pay_money: number;
    total_tuition: number;
    id_office: number;
    office: Office;
    id_customer_source: number;
    customer_source: CustomerSource;
    id_payment_form: number;
    payment_form: PaymentForm;
    payment_num: number;
    email: string;
    note: string;
    courses: Courses[];
}

export interface Bill {
    ID: number;
    id_human: number;
    registration_date: string;
    name: string;
    phone_number: string;
    birth_day: string;
    invoice_code: number;
    pay_money: number;
    total_tuition: number;
    id_office: number;
    id_customer_source: number;
    id_payment_form: number;
    payment_num: number;
    email: string;
    note: string;
    courses: CoursesId[];
}

export interface CustomerSource {
    ID: number;
    name: string;
}

export interface PaymentForm {
    ID: number;
    name: string;
}

export interface Courses {
    ID: number;
    name: string;
}

export interface CoursesId {
    ID: number;
}

export interface BillIMG {
    img: string;
 }

export interface createBillResponse {
    bill: Bill;
    bill_img: BillIMG[];
}

export interface getBillResponse {
    data: getBill[];
}
