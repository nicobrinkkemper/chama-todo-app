import React, { useEffect } from 'react'
import TodoView from './TodoView/TodoView'

export function TodoController(props) {
    const { notify, onCompleteTodo, id } = props;
    useEffect(
        () => {
            if (props.datetimecolor === 'warning') notify()
        },
        [props.datetimetext]
    )
    const badges = [
        {
            children: props.datetimetext,
            color: props.datetimecolor
        },
        {
            children: props.prioritytext,
            color: props.prioritycolor
        }
    ]
    return <TodoView
        badges={badges}
        onCompleteTodo={() => onCompleteTodo(id)}
        text={props.text}
    />
}