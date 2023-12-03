package com.group5.soolicious.Inventory;

import org.springframework.data.repository.CrudRepository;


public interface InventoryRepo extends CrudRepository<InventoryEntity, Integer> {
    Iterable<InventoryEntity> findAllByOrderByIdDesc();

}
