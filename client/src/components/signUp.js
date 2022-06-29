import { useState } from 'react'

export function SignUp({ off, success }) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [cpassword, setCpassword] = useState('')
    const [error, setError] = useState(null)

    const onCancel = () => {
        setEmail('')
        setPassword('')
        setCpassword('')
        off()
    }
    const registerUser = async (event) => {
        event.preventDefault()
        const response = await fetch('https://ancient-scrubland-28193.herokuapp.com/signup', {
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
            success()
        } else {
            setError(response.error)
        }
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
                    <h2 className="headText">Sign Up</h2>
                </div>
                <div className="formContainer">
                    <form onSubmit={registerUser}>
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
                        <div>
                            <input
                                required
                                value={cpassword}
                                onChange={(e) => setCpassword(e.target.value)}
                                type="password"
                                placeholder="confirm password"
                            />
                        </div>
                        <button type="button" onClick={onCancel}>
                            Cancel
                        </button>
                        {password ? (
                            password === cpassword ? (
                                <button type="submit">Sign Up</button>
                            ) : null
                        ) : null}
                    </form>
                </div>
            </div>
        </div>
    )
}
