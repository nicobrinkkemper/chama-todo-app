import React from 'react'
import DateTimePicker from 'react-datetime-picker';
import { PRIORITY } from '../../../constants';

export function TodoFormView(props) {
    const { todo, onSubmit, onDatetimeChange, onPriorityChange, onTextChange, onAdd } = props
    return (
        <div className="row">
            <div className="col-md-12">
                <br />
                <div className="input-group">
                    <input
                        className="form-control text"
                        type="text"
                        required={true}
                        value={todo.text}
                        autoFocus={true}
                        placeholder="Write a todo"
                        onKeyUp={onSubmit}
                        onChange={onTextChange}
                    />
                    <DateTimePicker
                        locale="nl-NL"
                        minDate={new Date()}
                        onChange={onDatetimeChange}
                        value={todo.datetime}
                    />
                    <select
                        className="form-control priority"
                        value={todo.priority || 0}
                        onChange={onPriorityChange}
                    >
                        <option value={0}>{PRIORITY[0]}</option>
                        <option value={1}>{PRIORITY[1]}</option>
                        <option value={2}>{PRIORITY[2]}</option>
                    </select>
                    <div className="input-group-append">
                        <button className="btn btn-primary" onClick={onAdd}>
                            Add
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TodoFormView