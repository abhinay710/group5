package com.group5.soolicious.orders;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("order")
public class OrderController {
    @Autowired
    private OrderService orderService;

    @GetMapping("/")
    public List<Order> getOrders() {
        return orderService.getOrders();
    }

    @GetMapping("/{id}")
    public Order getById(@PathVariable Integer id) throws Exception {
        return orderService.getById(id);
    }

    @GetMapping("customer/{id}")
    public List<Order> getByCustomer(@PathVariable Integer id) {
        return orderService.getByCustomerId(id);
    }

    @PostMapping(value = "/save")
    public Order save(@RequestBody Order order) {
        return orderService.saveOrder(order);
    }
}
