import "./App.css";
import React, { useEffect, useState } from "react";

interface Todo {
  id: string;
  text: string;
  completed: boolean;
}

function App() {
  const [todos, setTodos] = useState<Todo[]>(() => {
    const savedTodos = JSON.parse(
      localStorage.getItem("todos") || "[]"
    ) as Todo[];
    return savedTodos;
  });
  const [newTodo, setNewTodo] = useState("");
  const [updateTodo, setUpdateTodo] = useState("");
  const [currentTodo, setCurrentTodo] = useState("");

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  });

  const addTodo = () => {
    if (!newTodo.trim()) return;
    setTodos([
      ...todos,
      { id: "" + Date.now(), text: newTodo, completed: false },
    ]);
    setNewTodo("");
  };

  const deleteTodo = (id: string) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const editTodo = () => {
    setTodos(
      todos.map((todo) => {
        return todo.id === currentTodo ? { ...todo, text: updateTodo } : todo;
      })
    );
    setCurrentTodo("");
  };

  const toggleTodo = (id: string) => {
    setTodos(
      todos.map((todo) => {
        return todo.id === id ? { ...todo, completed: !todo.completed } : todo;
      })
    );
  };

  return (
    <div>
      <input
        type="text"
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
      />
      <button onClick={addTodo}>add</button>

      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => toggleTodo(todo.id)}
            ></input>
            {currentTodo === todo.id ? (
              <input
                type="text"
                value={updateTodo}
                onChange={(e) => setUpdateTodo(e.target.value)}
              />
            ) : (
              <span
                style={{
                  textDecoration: todo.completed ? "line-through" : "none",
                }}
              >
                {todo.text}
              </span>
            )}

            <button onClick={() => deleteTodo(todo.id)}>delete</button>
            {currentTodo === todo.id ? (
              <button onClick={() => editTodo()}>confirm</button>
            ) : (
              <button
                onClick={() => {
                  setCurrentTodo(todo.id);
                  setUpdateTodo(todo.text);
                }}
              >
                edit
              </button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
