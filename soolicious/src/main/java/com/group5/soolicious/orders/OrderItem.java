package com.group5.soolicious.orders;


import com.group5.soolicious.desserts.Dessert;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class OrderItem {
    private Dessert dessert;

    private int quantityOrdered;

    private Double price;
}
