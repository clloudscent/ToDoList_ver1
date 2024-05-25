package com.example.todolist_ver1.service;


import com.example.todolist_ver1.entity.Todo;
import com.example.todolist_ver1.repository.TodoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class TodoService {

    @Autowired
    private TodoRepository todoRepository;

    public List<Todo> getAllTodos() {
        return todoRepository.findAll();
    }

    public Todo createTodo(Todo todo) {
        todo.setCreatedAt(LocalDateTime.now());
        return todoRepository.save(todo);
    }

    public Todo updateTodo(Long id, Todo todoDetails) {
        Optional<Todo> todoOptional = todoRepository.findById(id);
        if (todoOptional.isPresent()) {
            Todo todo = todoOptional.get();
            todo.setTask(todoDetails.getTask());
            todo.setCompleted(todoDetails.isCompleted());
            if (todoDetails.isCompleted()) {
                todo.setCompletedAt(LocalDateTime.now());
            } else {
                todo.setCompletedAt(null);
            }
            return todoRepository.save(todo);
        } else {
            throw new RuntimeException("Todo not found with id " + id);
        }
    }

    public void deleteTodo(Long id) {
        todoRepository.deleteById(id);
    }
}
