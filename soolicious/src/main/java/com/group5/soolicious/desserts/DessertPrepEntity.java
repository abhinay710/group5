package com.group5.soolicious.desserts;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

import com.group5.soolicious.Inventory.IngredientEntity;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "DessertPrep")
public class DessertPrepEntity {
    @Id
    @ManyToOne
    @JoinColumn(name = "dessertID")
    private DessertEntity dessert;

    @Id
    @ManyToOne
    @JoinColumn(name = "ingredientID")
    private IngredientEntity ingredient;

    @Column(name = "ingredientQuantity")
    private Double ingredientQuantity;
}
