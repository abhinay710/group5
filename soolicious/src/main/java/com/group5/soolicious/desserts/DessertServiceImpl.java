package com.group5.soolicious.desserts;

import java.util.ArrayList;
import java.util.List;

import org.modelmapper.ModelMapper;
import org.modelmapper.convention.MatchingStrategies;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class DessertServiceImpl implements DessertService {
    @Autowired
    private DessertRepo dessertRepo;
    @Autowired
    private ModelMapper mapper;

    @Override
    public List<Dessert> getDesserts() {
        Iterable<DessertEntity> iterable = dessertRepo.findAll();
        List<Dessert> desserts = new ArrayList<>();
        mapper.getConfiguration().setMatchingStrategy(MatchingStrategies.STRICT);
        iterable.forEach(dessert -> {
            desserts.add(mapper.map(dessert, Dessert.class));
        });

        return desserts;
    }

    @Override
    public Dessert save(Dessert dessert) {
        mapper.getConfiguration().setMatchingStrategy(MatchingStrategies.STRICT);
        DessertEntity dessertEntity = mapper.map(dessert, DessertEntity.class);

        for (DessertPrepEntity dessertPrepEntity: dessertEntity.getDessertPreps()) {
            dessertPrepEntity.setDessert(dessertEntity);
        }

        dessertEntity = dessertRepo.save(dessertEntity);

        return mapper.map(dessertEntity, Dessert.class);
    }

}
