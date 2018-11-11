import React from "react";
import TodoListView from "./TodoListView/TodoListView";
import Todo from "../Todo/Todo";
import Spinner from 'react-spinkit';

export const TodoListController = (props) => {
    const { toggleTodo, todos, uid, notify } = props
    if(!todos) return null;
    const Todos = todos.map(
        (_props) => <Todo
            {..._props}
            notify={() => notify(_props)}
            onCompleteTodo={() => toggleTodo(_props, uid)}
        />
    )
    return (
        <TodoListView
            todos={Todos}
        />
    )
}
export default TodoListController;