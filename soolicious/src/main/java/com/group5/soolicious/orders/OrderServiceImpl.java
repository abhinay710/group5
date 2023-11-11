package com.group5.soolicious.orders;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class OrderServiceImpl implements OrderService {
    @Autowired
    private OrderRepo orderRepo;
    @Autowired
    private ModelMapper mapper;

    @Override
    public List<Order> getOrders() {
        Iterable<OrderEntity> iterable = orderRepo.findAll();
        List<Order> orders = new ArrayList<>();

        iterable.forEach(order -> {
            orders.add(mapper.map(order, Order.class));
        });
        return orders;
    }

    @Override
    public Order saveOrder(Order order) {
        OrderEntity orderEntity = mapper.map(order, OrderEntity.class);
        orderEntity = orderRepo.save(orderEntity);

        return mapper.map(orderEntity, Order.class);
    }

    @Override
    public Order getById(Integer id) throws Exception {
        Optional<OrderEntity> order = orderRepo.findById(id);

        if (!order.isPresent()) {
            throw new Exception("order with " + id + " does not exist");
        }

        return mapper.map(order.get(), Order.class);
    }
}
