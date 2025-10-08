package com.example.employee.system.api.services;

import com.example.employee.system.api.entity.Employee;
import com.example.employee.system.api.repository.EmployeeRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;

@Service
@RequiredArgsConstructor
public class EmployeeService {

    private final EmployeeRepository employeeRepository;

    public Employee addEmployee(Employee employee){
        return employeeRepository.save(employee);
    }

    public List<Employee> getAllEmployees(){
        return employeeRepository.findAll();
    }

    public void deleteEmployee(Long id){
        if(!employeeRepository.existsById(id)){
            throw new EntityNotFoundException("Employee with id: "+id+" not found!");
        }
        employeeRepository.deleteById(id);
    }

    public Employee getEmployeeById(Long id){

        return employeeRepository.findById(id).orElseThrow(() -> new EntityNotFoundException("Employee Not Found! with ID: " + id));

    }
}
