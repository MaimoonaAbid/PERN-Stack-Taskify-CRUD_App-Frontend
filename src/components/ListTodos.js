import React, { Fragment, useEffect, useState } from "react";
import "../components/custom-icons.css"; 
import "bootstrap-icons/font/bootstrap-icons.css";
import EditTodo from "./EditTodo";

const ListTodos = () => {
  const [todos, setTodos] = useState([]);

  //delete todo function

  const deleteTodo = async id => {
    try {
      const deleteTodo = await fetch(`http://localhost:8000/todos/${id}`, {
        method: "DELETE"
      });

      setTodos(todos.filter(todo => todo.todo_id !== id));
    } catch (err) {
      console.error(err.message);
    }
  };

  const getTodos = async () => {
    try {
      console.log("Fetching todos...");
      const response = await fetch("http://localhost:8000/todos");
      console.log("Response Status:", response.status);
      const jsonData = await response.json();
      console.log("Todos Data:", jsonData);
      setTodos(jsonData);
    } catch (err) {
      console.error("Error fetching todos:", err);
    }
  };

  useEffect(() => {
    getTodos();
  }, []);

  console.log("Todos:", todos); // Add this log

  return (
    <Fragment>
      {" "}
      <table className="table mt-5 text-center">
        <thead>
          <tr>
            <th>Task Description</th>
            <th>
            <i className="bi bi-pencil-square bi-lg"></i>
              </th>
            <th> 
            <i className="bi bi-trash bi-lg"></i>
              </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            {/* <td>Maimoona</td>
            <td>Abid</td>
            <td>maimoona@gmail.com</td> */}
          </tr>
          {todos.map(todo => (
            <tr key={todo.todo_id}>
              <td>{todo.description}</td>
              <td>
                <EditTodo todo={todo} />
              </td>
              <td>
                <button
                  className="btn btn-danger"
                  onClick={() => deleteTodo(todo.todo_id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Fragment>
  );
};

export default ListTodos;
