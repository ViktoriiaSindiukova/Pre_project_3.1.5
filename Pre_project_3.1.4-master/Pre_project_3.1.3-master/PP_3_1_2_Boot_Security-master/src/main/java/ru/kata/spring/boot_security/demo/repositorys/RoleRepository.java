package ru.kata.spring.boot_security.demo.repositorys;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import ru.kata.spring.boot_security.demo.entitis.Role;

@Repository
public interface RoleRepository extends JpaRepository<Role, Integer> {
}