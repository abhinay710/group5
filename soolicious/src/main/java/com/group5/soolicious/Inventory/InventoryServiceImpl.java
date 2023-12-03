package com.group5.soolicious.Inventory;

import java.util.ArrayList;
import java.util.List;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.group5.soolicious.employees.Employee;
import com.group5.soolicious.employees.EmployeeService;

@Service
public class InventoryServiceImpl implements InventoryService {
    @Autowired
    private InventoryRepo inventoryRepo;
    @Autowired
    private IngredientRepo ingredientRepo;
    @Autowired
    private EmployeeService employeeService;
    @Autowired
    private ModelMapper mapper;

    @Override
    public List<Inventory> getInventories() {
        Iterable<InventoryEntity> iterable = inventoryRepo.findAllByOrderByIdDesc();
        List<Inventory> inventories = new ArrayList<>();

        iterable.forEach(inventory -> {
            inventories.add(mapper.map(inventory, Inventory.class));
        });
        return inventories;
    }

    @Override
    public Inventory saveInventory(Inventory inventory) throws Exception {
        Employee employee = inventory.getEmployee();

        if (inventory.getId() == null) {
            employee = employeeService.getById(inventory.getEmployee().getId());
        }
        InventoryEntity inventoryEntity = mapper.map(inventory, InventoryEntity.class);
        inventoryEntity = inventoryRepo.save(inventoryEntity);

        inventory = mapper.map(inventoryEntity, Inventory.class);
        inventory.setEmployee(employee);

        return inventory;
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
