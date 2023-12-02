package com.group5.soolicious.employees;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import org.modelmapper.ModelMapper;

import com.group5.soolicious.login.Login;

@Service
public class EmployeeServiceImpl implements EmployeeService {
    @Autowired
    private EmpRepo empRepo;
    @Autowired
    private ModelMapper mapper;

    @Override
    public List<Employee> getEmployees() {
        Iterable<EmployeeEntity> iterable = empRepo.findAll();
        List<Employee> employees = new ArrayList<>();

        iterable.forEach(employee -> {
            employees.add(mapper.map(employee, Employee.class));
        });
        return employees;
    }

    @Override
    public Employee saveEmployee(Employee employee) throws Exception {
        if (employee.getId() == null && empRepo.existsByEmailID(employee.getEmailID())) {
            throw new Exception("Employee with user name already exists");
        }
        EmployeeEntity employeeEntity = mapper.map(employee, EmployeeEntity.class);
        employeeEntity = empRepo.save(employeeEntity);

        return mapper.map(employeeEntity, Employee.class);
    }

    @Override
    public Employee getById(Integer id) throws Exception {
        Optional<EmployeeEntity> employee = empRepo.findById(id);

        if (!employee.isPresent()) {
            throw new Exception("Employee with " + id + " does not exist");
        }

        return mapper.map(employee.get(), Employee.class);
    }

    @Override
    public Login login(Login login) throws Exception {
        EmployeeEntity employeeEntity = empRepo.findByEmailIDAndPassword(login.getEmailID(), login.getPassword());

        if (employeeEntity == null) {
            throw new Exception("employee not found");
        }

        login.setDesignation(employeeEntity.getDesignation());
        login.setPassword(null);
        login.setUserId(employeeEntity.getId());
        return login;
    }
}
