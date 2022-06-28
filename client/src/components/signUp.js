import { useState } from 'react'

export function SignUp({ off }) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [cpassword, setCpassword] = useState('')

    const onCancel = () => {
        setEmail('')
        setPassword('')
        setCpassword('')
        off()
    }
    return (
        <div className="popUpContainer">
            <div>
                <div>
                    <h2 className="headText">Sign Up</h2>
                </div>
                <div className="formContainer">
                    <form>
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
                        <button type="submit">Sign Up</button>
                    </form>
                </div>
            </div>
        </div>
    )
}
