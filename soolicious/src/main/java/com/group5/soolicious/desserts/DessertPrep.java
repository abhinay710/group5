package com.group5.soolicious.desserts;

import com.group5.soolicious.Inventory.Ingredient;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class DessertPrep {
    private Ingredient ingredient;
    private Double ingredientQuantity;
}
