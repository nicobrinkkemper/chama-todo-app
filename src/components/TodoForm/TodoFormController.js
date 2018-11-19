import React, { useState } from "react";
import { TodoFormView } from "./TodoFormView/TodoFormView";

export const TodoFormController = ({ addTodo, profile, login, uid }) => {
  const [todo, setTodo] = useState({
    text:'',
    priority: 0,
    datetime: new Date()
  });

  function onTextChange(e) {
    setTodo({
      ...todo,
      text: e.target.value
    });
  }
  function onDatetimeChange(value) {
    setTodo({
      ...todo,
      datetime: value
    });
  }
  function onPriorityChange(e) {
    setTodo({
      ...todo,
      priority: e.target.value
    });
  }

  function onAdd() {
    if (todo.text === "" || !profile.isLoaded) return;
    if(profile.isEmpty){
      login()
      return;
    }
    let r = addTodo(todo, uid)
    if (!r) return;
    setTodo({
      ...todo,
      text: ""
    });
  }

  function onSubmit(event) {
    if (event.keyCode === 13) onAdd();
  }

  return <div>
    <TodoFormView
      todo={todo}
      onSubmit={onSubmit}
      onAdd={onAdd}
      onPriorityChange={onPriorityChange}
      onDatetimeChange={onDatetimeChange}
      onTextChange={onTextChange}
    />
  </div>
}


export default TodoFormController;