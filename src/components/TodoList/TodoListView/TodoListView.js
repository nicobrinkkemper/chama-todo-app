import React from 'react'

export function TodoListView(props) {
    const { todos } = props
    return (
        <div className="row">
            <div className="col-md-12">
                <div className="row">
                    <div className="col-md-12">
                        <br />
                        {
                            todos.length === 0
                                ? (
                                    <h1>All done</h1>
                                ) : (
                                    <div className="row">
                                        <div className="col-md-8">
                                            <h5>Todo List</h5>
                                        </div>
                                        <div className="col-md-4 text-right">
                                            <h5>{todos.length} todos left</h5>
                                        </div>
                                    </div>
                                )
                        }
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12">
                        <ul className="list-group">
                            {
                                todos.map((todo, i) => (
                                    <li key={i.toString()} className="list-group-item" >
                                        {todo}
                                    </li>
                                ))
                            }
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TodoListView;