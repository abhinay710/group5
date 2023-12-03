package com.group5.soolicious.customers;

import org.springframework.data.repository.CrudRepository;


public interface CustomerRepo extends CrudRepository<CustomerEntity, Integer> {
        CustomerEntity findByEmailIDAndPassword(String loginId, String password);
        Boolean existsByEmailID(String loginId);

        Iterable<CustomerEntity> findAllByOrderByIdDesc();

}
