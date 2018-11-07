import React from "react";
import TodoListView from "./TodoListView/TodoListView";
import Todo from "../Todo/Todo";
export const TodoListController = (props) => {
    const { toggleTodo, todos, uid, userFieldId, notify } = props

    const Todos = todos.map(
        (_props) => <Todo
            {..._props}
            notify={() => notify({
                ..._props,
                userFieldId,
                text: _props.text + ' ' + _props.datetimetext
            })}
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