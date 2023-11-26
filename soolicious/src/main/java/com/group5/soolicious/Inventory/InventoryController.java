package com.group5.soolicious.Inventory;


import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("inventory")
public class InventoryController {
    @Autowired
    private InventoryService inventoryService;

    @GetMapping("/")
    public List<Inventory> getInventories() {
        return inventoryService.getInventories();
    }

    @PostMapping(value = "/save")
    public Inventory save(@RequestBody Inventory inventory) {
        return inventoryService.saveInventory(inventory);
    }

    @GetMapping("/ingredients")
    public List<Ingredient> getIngredients() {
        return inventoryService.getIngredients();
    }

    @PostMapping("ingredient/save")
    public Ingredient saveIngredient(@RequestBody Ingredient ingredient) {
        return inventoryService.saveIngredient(ingredient);
    }
}
