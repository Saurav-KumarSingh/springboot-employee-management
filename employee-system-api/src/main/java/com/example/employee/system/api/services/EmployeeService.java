package com.example.employee.system.api.services;

import com.example.employee.system.api.entity.Employee;
import com.example.employee.system.api.repository.EmployeeRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;
import java.util.Optional;

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

    public Employee updateEmployeeById(Long id, Employee employee) {
        return employeeRepository.findById(id)
                .map(existingEmployee -> {
                    // Only update fields if they are not null
                    if (employee.getName() != null) existingEmployee.setName(employee.getName());
                    if (employee.getEmail() != null) existingEmployee.setEmail(employee.getEmail());
                    if (employee.getPhone() != null) existingEmployee.setPhone(employee.getPhone());
                    if (employee.getDepartment() != null) existingEmployee.setDepartment(employee.getDepartment());

                    return employeeRepository.save(existingEmployee);
                })
                .orElseThrow(() -> new EntityNotFoundException("Employee with ID " + id + " not found"));
    }


}
