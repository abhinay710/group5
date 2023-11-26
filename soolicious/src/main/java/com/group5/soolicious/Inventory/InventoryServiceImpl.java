package com.group5.soolicious.Inventory;

import java.util.ArrayList;
import java.util.List;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class InventoryServiceImpl implements InventoryService {
    @Autowired
    private InventoryRepo inventoryRepo;
    @Autowired
    private IngredientRepo ingredientRepo;
    @Autowired
    private ModelMapper mapper;

    @Override
    public List<Inventory> getInventories() {
        Iterable<InventoryEntity> iterable = inventoryRepo.findAll();
        List<Inventory> inventories = new ArrayList<>();

        iterable.forEach(inventory -> {
            inventories.add(mapper.map(inventory, Inventory.class));
        });
        return inventories;
    }

    @Override
    public Inventory saveInventory(Inventory inventory) {
        InventoryEntity inventoryEntity = mapper.map(inventory, InventoryEntity.class);
        inventoryEntity = inventoryRepo.save(inventoryEntity);

        return mapper.map(inventoryEntity, Inventory.class);
    }

    @Override
    public List<Ingredient> getIngredients() {
        Iterable<IngredientEntity> iterable = ingredientRepo.findAll();
        List<Ingredient> ingredients = new ArrayList<>();

        iterable.forEach(ingredient -> {
            ingredients.add(mapper.map(ingredient, Ingredient.class));
        });
        return ingredients;
    }

    @Override
    public Ingredient saveIngredient(Ingredient ingredient) {
        IngredientEntity ingredientEntity = mapper.map(ingredient, IngredientEntity.class);
        ingredientEntity = ingredientRepo.save(ingredientEntity);

        return mapper.map(ingredientEntity, Ingredient.class);
    }
}
