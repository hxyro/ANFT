import { useState } from 'react'

export function Login({ off, success, loginDetails }) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState(null)

    const onSubmit = () => {}
    const cancel = () => {
        setEmail('')
        setPassword('')
        off()
    }
    const loginUser = async (event) => {
        event.preventDefault()
        const response = await fetch('https://ancient-scrubland-28193.herokuapp.com/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email,
                password,
            }),
        }).then(async (res) => await res.json())
        if (response.success) {
            loginDetails(email)
            success()
        } else {
            setError(response.error)
        }
        console.log(response)
    }
    return (
        <div className="popUpContainer">
            <div>
                <div>
                    {error ? (
                        <div className="errorContainer">
                            <p>{error}</p>
                        </div>
                    ) : null}

                    <h2 className="headText">Login</h2>
                </div>
                <div className="formContainer">
                    <form onSubmit={loginUser}>
                        <div>
                            <input
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                type="email"
                                placeholder="you@email.com"
                            />
                        </div>
                        <div>
                            <input
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                type="password"
                                placeholder="password"
                            />
                        </div>
                        <button type="button" onClick={cancel}>
                            Cancel
                        </button>
                        <button type="submit">Login</button>
                    </form>
                </div>
            </div>
        </div>
    )
}
