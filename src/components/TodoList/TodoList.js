import { TodoListController } from './TodoListController';
import { firebaseConnect } from 'react-redux-firebase';
import { connect } from 'react-redux'
import { compose } from 'redux';

export const TodoList = compose(
    firebaseConnect(['todos']),
    connect(
        state => {
            return {
                firebaseTodos: state.firebase.data.todos
            }
        }
    )
)(TodoListController)

export default TodoList;