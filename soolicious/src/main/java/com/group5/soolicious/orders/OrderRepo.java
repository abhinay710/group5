package com.group5.soolicious.orders;

import java.util.List;

import org.springframework.data.repository.CrudRepository;

public interface OrderRepo  extends CrudRepository<OrderEntity, Integer> {
    List<OrderEntity> findByCustomerId(Integer id);

    Iterable<OrderEntity> findAllByOrderByIdDesc();
}
