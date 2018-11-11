import stringHash from "string-hash";
import { format, isFuture as _isFuture, differenceInMinutes, isAfter, distanceInWordsToNow } from "date-fns";
import { PRIORITY_COLOR, PRIORITY } from "../../constants";
import { START_TIMER, STOP_TIMER } from 'redux-timer-middleware';

// ACTIONS
export const UPDATE_TIME_FIELDS = 'UPDATE_TIME_FIELDS' // selectTodos changes based on time so dispatching any other action would work too

// SELECTORS
export const priorityDesc = (ta, tb) => tb.priority - ta.priority
export const isCompleted = t => t.hasOwnProperty('completed') && t.completed
export const isPending = t => !t.hasOwnProperty('completed') || !t.completed
export const isTodo = t => t !== null && t.hasOwnProperty('id') && t.hasOwnProperty('text') && t.hasOwnProperty('datetime')
export const isFuture = t => _isFuture(t.datetime)
export const isDanger = t => differenceInMinutes(Date.now(), t.datetime) < 5
export const selectPrioritycolor = t => PRIORITY_COLOR[t.priority]
export const selectPrioritytext = t => PRIORITY[t.priority]
export const selectTodoDatecolor = t => isAfter(Date.now(), t.datetime)
    ? 'danger'
    : (
        differenceInMinutes(t.datetime, Date.now()) < 5
            ? 'warning'
            : 'success'
    )
export const selectTodoDateHumanReadable = t => distanceInWordsToNow(t.datetime, { includeSeconds: true, addSuffix: true })
export function selectTodos(todos, uid) {
    if (!todos.hasOwnProperty(uid) || !todos[uid]) return [];
    return Object.values(todos[uid])
        .filter(isTodo)
        .filter(isPending)
        .sort(priorityDesc)
        .map(
            t => ({
                ...t,
                prioritycolor: selectPrioritycolor(t),
                prioritytext: selectPrioritytext(t),
                datetimecolor: selectTodoDatecolor(t),
                datetimetext: selectTodoDateHumanReadable(t)
            })
        )
}


/// CREATORS
export const createTodo = payload => ({
    ...payload,
    id: stringHash(payload.text),
    datetime: format(payload.datetime)
})

// ACTION CREATORS
export const createUpdateTimeFields = () => ({
    type: UPDATE_TIME_FIELDS
})
export const createStartUpdateTimeFields = () => ({
    type: START_TIMER,
    payload: {
        actionName: UPDATE_TIME_FIELDS,
        timerName: 'updateTimeFields',
        timerInterval: 10000
    }
})
export const createStopUpdateTimeFields = () => ({
    type: STOP_TIMER,
    payload: {
        timerName: 'updateTimeFields',
    }
})
