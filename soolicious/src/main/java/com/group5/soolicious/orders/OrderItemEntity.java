package com.group5.soolicious.orders;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

import com.group5.soolicious.desserts.DessertEntity;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "OrderItem")
public class OrderItemEntity {
    @Id
    @ManyToOne
    @JoinColumn(name = "OrderID")
    private OrderEntity order;

    @Id
    @ManyToOne
    @JoinColumn(name = "dessertID")
    private DessertEntity dessert;

    @Column(name = "quantityOrdered")
    private int quantityOrdered;

    @Column(name = "price")
    private Double price;
}
