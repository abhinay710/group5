package com.group5.soolicious.desserts;

import org.springframework.data.repository.CrudRepository;


public interface DessertRepo extends CrudRepository<DessertEntity, Integer> {
    Iterable<DessertEntity> findAllByOrderByIdDesc();

}
