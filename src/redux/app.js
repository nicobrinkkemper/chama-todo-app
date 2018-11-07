import stringHash from "string-hash";
import { format, isPassed as _isPassed, isFuture as _isFuture, differenceInMinutes, isAfter, parse, distanceInWordsToNow } from "date-fns";
import { actionTypes } from 'react-redux-firebase'
import { PRIORITY_COLOR, PRIORITY } from "../constants";
import { START_TIMER, STOP_TIMER } from 'redux-timer-middleware';
// ACTION TYPES
const UPDATE_TIME_FIELDS = 'UPDATE_TIME_FIELDS'

// SELECTORS
export const sortPriority = (a, b) => b.priority - a.priority
export const isCompleted = (a) => a.completed
export const notCompleted = (a) => !a.completed
export const userHasUid = (user, uid) => user.providerData[0].uid === uid
export const isTodo = (todo) => todo !== null && todo.hasOwnProperty('id') && todo.hasOwnProperty('text') && todo.hasOwnProperty('datetime')
export const isUser = (user) => user !== null && user.hasOwnProperty('email')
export const isPassed = (a) => _isPassed(a.datetime)
export const isFuture = (a) => _isFuture(a.datetime)
export const isDanger = (a) => differenceInMinutes(Date.now(), a.datetime) < 5
export const selectUid = (profile) => profile.providerData[0].uid
export const selectTodos = (state = {}) => {
    return Object.values(state.todos)
        .filter(notCompleted)
        .sort(sortPriority)
}
export const selectMostImportantTodos = (state = {}) => {
    return state
        .filter(isFuture)
        .filter(isDanger)
        .slice(0, 1)
}
export const selectTodoDatecolor = (todo = {}) => {
    const datetime = parse(todo.datetime)
    return isAfter(Date.now(), datetime)
        ? 'danger'
        : (
            differenceInMinutes(datetime, Date.now()) < 5
                ? 'warning'
                : 'success'
        )
}
export const selectTodoDateHumanReadable = (todo = {}) => {
    const datetime = parse(todo.datetime)
    return distanceInWordsToNow(datetime, { includeSeconds: true, addSuffix: true })
}

/// CREATORS
export function createTimer() {
    return {
        type: START_TIMER,
        payload: {
            actionName: UPDATE_TIME_FIELDS,
            timerName: 'updateTimeFields',
            timerPeriod: 20000
        }
    }
}
export function createStopTimer() {
    return {
        type: STOP_TIMER,
        payload: {
            timerName: 'updateTimeFields',
        }
    }
}
export function createTodo(payload) {
    const id = stringHash(payload.text);
    const datetime = format(payload.datetime)
    return {
        ...payload,
        id,
        datetime
    }
}
export const defaultTodo = (text = "", priority = 0, datetime = new Date()) => ({
    text,
    priority,
    datetime
})


// REDUCERS
function todo(state = undefined, action = {}) {
    switch (action.type) {
        case actionTypes.SET:
            if (!isTodo(action.todo)) return state;
            return todo({
                ...action.todo,
                prioritycolor: PRIORITY_COLOR[action.todo.priority],
                prioritytext: PRIORITY[action.todo.priority],
            }, { type: UPDATE_TIME_FIELDS })
        case UPDATE_TIME_FIELDS:
            return {
                ...state,
                datetimecolor: selectTodoDatecolor(state),
                datetimetext: selectTodoDateHumanReadable(state),
            }
        default:
            return state;
    }
}

function todos(state = undefined, action = {}) {
    switch (action.type) {
        case UPDATE_TIME_FIELDS:
        case actionTypes.SET:
            return Object.keys(action.todos).reduce((prev, key) => ({
                ...prev,
                [key]: todo(state[key], {
                    ...action,
                    todo: action.todos[key]
                })
            }), state)
        default:
            return state;
    }
}

function path(state, action) {
    if (!action.hasOwnProperty('data') || action.data === null) {
        console.warn('ignored action', action)
        return state;
    }
    switch (action.path) {
        case 'todos':
            if(!action.data.hasOwnProperty(state.uid)){
                return state;
            }
            return {
                ...state,
                todos: todos(state.todos, { ...action, todos: action.data[state.uid] })
            }
        case 'users':
            return {
                ...state,
                userFieldId: Object.keys(action.data)
                    .reduce(
                        (prev, key) => userHasUid(action.data[key], state.uid)
                            ? key
                            : prev
                        , state.userFieldId
                    )
            };
        default:
            return state
    }
}


export function app(state = {
    uid: undefined,
    userFieldId: undefined,
    todos: {},
    currentTime: Date.now()
}, action = {}) {
    switch (action.type) {
        case UPDATE_TIME_FIELDS:
            return {
                ...state,
                currentTime: Date.now(),
                todos: todos(state.todos, { ...action, todos: state.todos })
            }
        case actionTypes.LOGOUT:
            return {
                ...state,
                uid: undefined,
                userFieldId: undefined,
                todos: {}
            }
        case actionTypes.SET_PROFILE:
            if (!isUser(action.profile)) return state;
            return {
                ...state,
                uid: selectUid(action.profile),
                user: action.profile
            };
        case actionTypes.SET:
            if (!action) return state;
            if(!action.path) return state;
            return path(state, action)
        default:
            return state;
    }
}

export default app;