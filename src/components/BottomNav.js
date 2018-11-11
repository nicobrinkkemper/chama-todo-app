import React from 'react';
import { AlertList } from "react-bs-notifier";

export const BottomNav = ({ logout, login, uid, notifications, displayName, removeNotification, profile }) => {
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
                                    <button className="btn btn-danger" onClick={() => logout()}>Logout {profile.displayName}</button>
                                )
                        }
                    </div>
                </div>
            </div>
            <AlertList position={'bottom-right'} timeout={3000} alerts={notifications || []} onDismiss={(alert) => removeNotification(alert.id)} />
        </div>
    )
}
export default BottomNav