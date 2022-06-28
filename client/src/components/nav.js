import { useState } from 'react'

export function Nav({ onLogin, onSignUp, onDrop, onLogout, isLogin }) {
    return (
        <nav>
            <div className="left">
                <h1>ANFT</h1>
            </div>
            {isLogin ? (
                <>
                    <div className="mid">
                        <button onClick={onDrop}>+</button>
                    </div>
                    <div className="right">
                        <button onClick={onLogout}>Logout</button>
                    </div>
                </>
            ) : (
                <div className="right">
                    <button onClick={onSignUp}>Sign Up</button>
                    <button onClick={onLogin}>Login</button>
                </div>
            )}
        </nav>
    )
}
