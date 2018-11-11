
// ACTION TYPES
const ADD_NOTIFICATION = 'ADD_NOTIFICATION'
const REMOVE_NOTIFICATION = 'REMOVE_NOTIFICATION'

// SELECTORS
export const selectNotifications = (notifications)=>{
    if(!notifications) return []
    return Object.keys(notifications).filter(token => notifications[token])
}

// ACTION CREATORS
export function createRemoveNotification(id) {
    return {
        type: REMOVE_NOTIFICATION,
        payload: id
    }
}
export function createNotification(fbPayload) {
    return {
        type: ADD_NOTIFICATION,
        payload: {
            id: fbPayload.from,
            type: 'warning',
            message: fbPayload.data.title
        }
    }
}

// REDUCER
export function notifications(state = [], action = {}) {
    switch (action.type) {
        case ADD_NOTIFICATION:
            return [...state, action.payload]
        case REMOVE_NOTIFICATION:
            return state.filter(v => v.id !== action.payload)
        default:
            return state;
    }
}
export default notifications