package com.group5.soolicious.desserts;

import java.util.List;

public interface DessertService {
    List<Dessert> getDesserts();

    Dessert save(Dessert dessert);
}
