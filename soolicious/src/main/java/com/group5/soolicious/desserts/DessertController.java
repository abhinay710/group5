package com.group5.soolicious.desserts;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequestMapping("dessert")
public class DessertController {
    @Autowired
    private DessertService dessertService;

    @GetMapping("/")
    public List<Dessert> getDesserts() {
        return dessertService.getDesserts();
    }

    @PostMapping(value = "/save")
    public Dessert save(@RequestBody Dessert dessert) {
        return dessertService.save(dessert);
    }
}
