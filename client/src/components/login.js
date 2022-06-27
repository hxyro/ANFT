import { useState } from 'react'

export function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const onSubmit = () => {}
    const cancel = () => {
        setEmail('')
        setPassword('')
    }
    return (
        <div className="popUpContainer">
            <div>
                <div>
                    <h1>Login</h1>
                </div>
                <div>
                    <form>
                        <h3>Error</h3>
                        <div>
                            <input
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                type="email"
                                placeholder="you@email.com"
                            />
                        </div>
                        <div>
                            <input
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                type="password"
                                placeholder="password"
                            />
                        </div>
                        <button type="button" onClick={cancel}>
                            Cancel
                        </button>
                        <button type="button" onClick={onSubmit}>
                            Sign Up
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}
