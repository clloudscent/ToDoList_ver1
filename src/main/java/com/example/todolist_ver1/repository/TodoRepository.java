package com.example.todolist_ver1.repository;


import com.example.todolist_ver1.entity.Todo;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TodoRepository extends JpaRepository<Todo, Long> {
}
