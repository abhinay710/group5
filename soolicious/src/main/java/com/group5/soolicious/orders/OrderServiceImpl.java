package com.group5.soolicious.orders;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.group5.soolicious.desserts.Dessert;
import com.group5.soolicious.desserts.DessertEntity;

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
        mapper.getConfiguration().setAmbiguityIgnored(true);
        iterable.forEach(order -> {
            orders.add(mapper.map(order, Order.class));
        });
        return orders;
    }

    @Override
    public Order saveOrder(Order order) {
        OrderEntity orderEntity = mapper.map(order, OrderEntity.class);

        for(OrderItemEntity orderItemEntity :orderEntity.getOrderItems()) {
            orderItemEntity.setOrder(orderEntity);
        }

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

    @Override
    public List<Order> getByCustomerId(Integer id) {
        List<OrderEntity> orderEntities = orderRepo.findByCustomerId(id);
        List<Order> orders = new ArrayList<>();

        orderEntities.forEach(order -> {
            orders.add(mapper.map(order, Order.class));
        });

        return orders;
    }
}
