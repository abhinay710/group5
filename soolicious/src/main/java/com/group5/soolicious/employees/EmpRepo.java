package com.group5.soolicious.employees;

import org.springframework.data.repository.CrudRepository;

public interface EmpRepo extends CrudRepository<EmployeeEntity, Integer> {
    EmployeeEntity findByEmailIDAndPassword(String loginId, String password);
}
