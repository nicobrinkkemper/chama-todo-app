import React, { useState } from "react";
import { TodoFormView } from "./TodoFormView/TodoFormView";
import { defaultTodo } from "../../redux/app";

export const TodoFormController = ({ addTodo, uid, firebase }) => {
  const [todo, setTodo] = useState(defaultTodo);

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
    if (todo.text === "") return;
    let r = addTodo(todo, uid, firebase)
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