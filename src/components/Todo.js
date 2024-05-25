import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Todo = () => {
    const [todos, setTodos] = useState([]);
    const [task, setTask] = useState('');

    useEffect(() => {
        fetchTodos();
    }, []);

    const fetchTodos = async () => {
        const response = await axios.get('http://localhost:8080/api/todos');
        setTodos(response.data);
    };

    const createTodo = async () => {
        if (task) {
            const newTodo = { task, completed: false };
            await axios.post('http://localhost:8080/api/todos', newTodo);
            setTask('');
            fetchTodos();
        }
    };

    const updateTodo = async (id, updatedTodo) => {
        await axios.put(`http://localhost:8080/api/todos/${id}`, updatedTodo);
        fetchTodos();
    };

    const deleteTodo = async (id) => {
        await axios.delete(`http://localhost:8080/api/todos/${id}`);
        fetchTodos();
    };

    return (
        <div>
            <h1>To Do List</h1>
            <input
                type="text"
                value={task}
                onChange={(e) => setTask(e.target.value)}
                placeholder="Enter task"
            />
            <button onClick={createTodo}>Add Task</button>
            <ul>
                {todos.map(todo => (
                    <li key={todo.id}>
                        <input
                            type="checkbox"
                            checked={todo.completed}
                            onChange={() => updateTodo(todo.id, { ...todo, completed: !todo.completed })}
                        />
                        {todo.task}
                        <button onClick={() => deleteTodo(todo.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Todo;
