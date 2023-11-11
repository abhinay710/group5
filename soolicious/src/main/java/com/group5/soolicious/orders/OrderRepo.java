package com.group5.soolicious.orders;

import org.springframework.data.repository.CrudRepository;

public interface OrderRepo  extends CrudRepository<OrderEntity, Integer> {
}
