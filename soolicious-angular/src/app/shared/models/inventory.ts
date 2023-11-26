import { Employee } from "./employee";

export interface Inventory {

    id?: number;
    ingredient?: Ingredient;
    datePurchased?: Date;
    quantity?: number;
    expiryDate?: Date;
    price?: number;
    employee?: Employee;
}

export interface Ingredient {
    id?: number;
    name?: string;
    description?: string;
    quantity?: number;
    measurementUnit?: number;
}