package com.group5.soolicious.orders;

import java.util.List;

public interface OrderService {
    List<Order> getOrders();

    Order saveOrder(Order order);

    Order getById(Integer id) throws Exception;
}
