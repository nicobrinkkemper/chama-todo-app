import React from 'react';

export const BottomNav = ({ logout, login, uid, app }) => {
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
        </div>
    )
}
export default BottomNav