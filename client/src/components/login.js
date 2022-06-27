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
                    <h2 className="headText">Login</h2>
                </div>
                <div className="formContainer">
                    <form>
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
                            Login
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}
