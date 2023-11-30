import { Ingredient } from "./inventory";

export interface Dessert {
    id?: number;
    name?: string;
    glutenFreeYN?: string;
    sugarFreeYN?: string;
    price?: number;
    calories?: number;
    timeToPrepare?: string;
    dessertPreps?: DessertPrep[];
}

export interface DessertPrep {
    ingredient?: Ingredient;
    ingredientQuantity?: number;
}