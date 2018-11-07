import React from 'react'

export function TodoView(props) {
    const { badges, text, isSpeaking, onCompleteTodo } = props
    return <div className={`Todo ${isSpeaking ? 'speaking' : ''}`}>
        <h4>
            <i className="material-icons" style={{ position: 'absolute', bottom: 10, right: 20, color: '#99979c' }}>event</i>
            {text}
            <button
                className="float-right btn btn-success btn-sm"
                style={{ marginLeft: 10 }}
                onClick={onCompleteTodo}
            >
                Complete
        </button>
        </h4>
        <p>
            {
                badges.map(
                    ({ color, children }, i) => (
                        <span key={i.toString()} className={`badge badge-${color}`} style={{marginRight:6}}>
                            {children}
                        </span>
                    )
                )
            }
        </p>
    </div>
}
export default TodoView