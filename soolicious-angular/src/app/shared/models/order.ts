import { Customer } from "./customer";

export interface Order {
    id?: number;
    customer?: Customer;
    orderTotal?: number;
    pickupMethod?: string;
    orderDate?: Date;
}