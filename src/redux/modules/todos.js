import stringHash from "string-hash";
import { format, differenceInMinutes, isAfter, distanceInWordsToNow } from "date-fns";
import { PRIORITY_COLOR, PRIORITY, DATETIME_COLOR } from "../../constants";
import { START_TIMER, STOP_TIMER } from 'redux-timer-middleware';

// ACTIONS
export const UPDATE_TIME_FIELDS = 'UPDATE_TIME_FIELDS' // selectTodos changes based on time so dispatching any other action would work too

// SELECTORS
export const priorityDesc = (ta, tb) => tb.priority - ta.priority
export const isPending = t => !t.hasOwnProperty('completed') || !t.completed
export const isPast = t => isAfter(new Date(), t.datetime)
export const isTodo = t => t !== null
    && t.hasOwnProperty('id')
    && t.hasOwnProperty('text')
    && t.hasOwnProperty('datetime')
    && t.hasOwnProperty('priority')
export const shouldNotify = t => {
    const dfrc = differenceInMinutes(t.datetime, new Date())
    return dfrc < 5 && dfrc > 0
}
export const selectPrioritycolor = t => PRIORITY_COLOR[t.priority]
export const selectPrioritytext = t => PRIORITY[t.priority]
export const selectTodoDatetimecolor = t => DATETIME_COLOR[selectTodoDatetimecolorIndex(t)]
export const selectTodoDatetimecolorIndex = t => isPast(t)
    ? 0
    : (
        shouldNotify(t)
            ? 1
            : 2
    )
export const selectTodoDateHumanReadable = t => distanceInWordsToNow(t.datetime, { includeSeconds: true, addSuffix: true })
export function selectTodos(todos, uid) {
    if (!todos.hasOwnProperty(uid) || !todos[uid]) return [];
    return Object.values(todos[uid])
        .filter(isTodo)
        .filter(isPending)
        .sort(priorityDesc)
        .map(createTodoTimeFields)
}


/// CREATORS
export const createTodo = t => ({
    ...t,
    id: stringHash(t.text),
    datetime: format(t.datetime)
})
export const createTodoTimeFields = t => ({
    ...t,
    prioritycolor: selectPrioritycolor(t),
    prioritytext: selectPrioritytext(t),
    datetimecolor: selectTodoDatetimecolor(t),
    datetimetext: selectTodoDateHumanReadable(t)
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
