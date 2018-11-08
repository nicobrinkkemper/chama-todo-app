import React from 'react';
import { AlertList } from "react-bs-notifier";

export const BottomNav = ({ logout, login, uid, app, removeNotification }) => {
    return (
        <div className="row">
            <div className="col-md-12"><hr /></div>
            <div className="col-md-12">
                <div className="row">
                    <div className="col-md-12">
                        {
                            !uid
                                ? (
                                    <button className="btn btn-success" onClick={() => login()}>Login</button>
                                ) : (
                                    <button className="btn btn-danger" onClick={() => logout()}>Logout {app.user.displayName}</button>
                                )
                        }
                    </div>
                </div>
            </div>
            <AlertList position={'bottom-right'} timeout={3000} alerts={app.notifications} onDismiss={(alert)=>removeNotification(alert.id)} />
        </div>
    )
}
export default BottomNav