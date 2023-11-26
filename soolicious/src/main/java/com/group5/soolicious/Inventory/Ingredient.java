package com.group5.soolicious.Inventory;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class Ingredient {
    private Integer id;
    private String name;
    private String description;
    private Double quantity;
    private String measurementUnit;
}
