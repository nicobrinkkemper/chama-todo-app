import { TodoListController } from './TodoListController';
import { firebaseConnect } from 'react-redux-firebase';
import { connect } from 'react-redux'
import { compose } from 'redux';
import { selectTodos } from '../../redux/modules/todos';

export const TodoList = compose(
    firebaseConnect(({ uid }) => {
        return [
            {
                path: `todos/${uid}`
            }
        ]
    }),
    connect(
        (state, props) => {
            if (!state.firebase.data.todos) return state
            return {
                todos: selectTodos(state.firebase.data.todos, props.uid)
            }
        }
    )
)(TodoListController)

export default TodoList;