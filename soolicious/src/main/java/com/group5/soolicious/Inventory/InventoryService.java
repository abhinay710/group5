package com.group5.soolicious.Inventory;

import java.util.List;

public interface InventoryService {
    List<Inventory> getInventories();

    Inventory saveInventory(Inventory inventory);
    List<Ingredient> getIngredients();

    Ingredient saveIngredient(Ingredient ingredient);
}
