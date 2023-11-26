import { Customer } from "./customer";
import { Dessert } from "./dessert";

export interface Order {
    id?: number;
    customer?: Customer;
    orderTotal?: number;
    pickupMethod?: string;
    orderDate?: Date;
    orderItems?: OrderItem[];
}

export interface OrderItem {
    dessert?: Dessert;
    quantityOrdered?: number;
    price?: number;
}
