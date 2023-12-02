import { Customer } from "./customer";
import { Dessert } from "./dessert";
import { Employee } from "./employee";

export interface Order {
    id?: number;
    customer?: Customer;
    employee?: Employee;
    orderDate?: Date;
    orderTotal?: number;
    debitOrCredit?: string;
    cardNumber?: string;
    cvv?: string;
    expiryDate?: string;
    expiryMonth?: string;  // Add this line
  expiryYear?: string;
    pickupMethod?: string;
    timeToPickupOrDeliver?: string;
    specialInstructions?: string;
    lastUpdated?: string;
    orderItems?: OrderItem[];
}

export interface OrderItem {
    dessert?: Dessert;
    quantityOrdered?: number;
    price?: number;
}
