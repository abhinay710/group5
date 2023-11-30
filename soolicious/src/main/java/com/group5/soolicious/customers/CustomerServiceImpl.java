package com.group5.soolicious.customers;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.group5.soolicious.login.Login;

@Service
public class CustomerServiceImpl implements CustomerService {
    @Autowired
    private CustomerRepo customerRepo;
    @Autowired
    private ModelMapper mapper;

    @Override
    public List<Customer> getCustomers() {
        Iterable<CustomerEntity> iterable = customerRepo.findAll();
        List<Customer> customers = new ArrayList<>();

        iterable.forEach(customer -> {
            customers.add(mapper.map(customer, Customer.class));
        });
        return customers;
    }

    @Override
    public Customer saveCustomer(Customer customer) throws Exception {
        if (customer.getId() == null && customerRepo.existsByEmailID(customer.getEmailID())) {
            throw new Exception("User name already exists");
        }
        CustomerEntity customerEntity = mapper.map(customer, CustomerEntity.class);
        customerEntity = customerRepo.save(customerEntity);

        return mapper.map(customerEntity, Customer.class);
    }

    @Override
    public Customer getById(Integer id) throws Exception {
        Optional<CustomerEntity> customer = customerRepo.findById(id);

        if (!customer.isPresent()) {
            throw new Exception("Customer with " + id + " does not exist");
        }

        return mapper.map(customer.get(), Customer.class);
    }

    @Override
    public Login login(Login login) throws Exception {
        CustomerEntity customer = customerRepo.findByEmailIDAndPassword(login.getEmailID(), login.getPassword());

        if (customer == null) {
            throw new Exception("user not found");
        }

        login.setPassword(null);
        login.setUserId(customer.getId());
        return login;
    }
}
