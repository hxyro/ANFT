import { Canvas } from '@react-three/fiber'
import { OrbitControls, Stars } from '@react-three/drei'
import { Suspense, useEffect, useState } from 'react'
import { SignUp } from './components/signUp'
import { Login } from './components/login'
import { Nav } from './components/nav'
import { Loading } from './components/loading'
import { Drop } from './components/drop'
import { Nft } from './components/nft'
import axios from 'axios'

const api = axios.create({
    baseURL: 'http://localhost:8080/',
})

function App() {
    const [showSignUp, setShowSignUp] = useState(false)
    const [showLogin, setShowLogin] = useState(false)
    const [isLogin, setIsLogin] = useState(null)
    const [showDrop, setShowDrop] = useState(false)
    const [data, setData] = useState([])

    const toggleOff = () => {
        setShowLogin(false)
        setShowSignUp(false)
        setShowDrop(false)
    }
    const signUpSuccess = () => {
        setShowDrop(false)
        setShowSignUp(false)
        setShowLogin(true)
    }
    const loginSuccess = () => {
        setShowLogin(false)
        setShowSignUp(false)
        setShowDrop(false)
        setIsLogin(true)
    }
    const dropSuccess = () => {
        setShowLogin(false)
        setShowSignUp(false)
        setShowDrop(false)
        setIsLogin(true)
    }
    const toggleOnSignUp = () => {
        setShowLogin(false)
        setShowSignUp(true)
    }
    const toggleOnLogin = () => {
        setShowSignUp(false)
        setShowLogin(true)
    }
    const toggleOnDrop = () => {
        setShowDrop(true)
    }
    const onLogout = () => {
        setShowLogin(false)
        setShowSignUp(false)
        setShowDrop(false)
        setIsLogin(false)
    }

    function getData() {
        const response = fetch('http://localhost:8080/', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then(async (res) => res.json())
            .then((res) => setData(res.data))
    }

    useEffect(() => {
        api.get('/').then(({ data }) => {
            const { anft } = data
            console.log(anft)
            setData(anft)
        })
    }, [])

    return (
        <div>
            <Nav
                onLogin={toggleOnLogin}
                onSignUp={toggleOnSignUp}
                onDrop={toggleOnDrop}
                onLogout={onLogout}
                isLogin={isLogin}
            />
            {showSignUp ? (
                <div className="Container">
                    <SignUp off={toggleOff} success={signUpSuccess} />
                </div>
            ) : null}
            {showLogin ? (
                <div className="Container">
                    <Login off={toggleOff} success={loginSuccess} />
                </div>
            ) : null}
            {showDrop ? (
                <div className="Container">
                    <Drop off={toggleOff} success={dropSuccess} />
                </div>
            ) : null}

            <div className="Container2">
                {data.map(({ imageUrl, name, price, user, _id }) => (
                    <Nft
                        imageSrc={imageUrl}
                        user={user}
                        price={price}
                        key={_id}
                        name={name}
                        id={_id}
                    />
                ))}
            </div>

            <div className="CanvasContainer">
                <Canvas>
                    <Suspense fallback={Loading}>
                        <Stars
                            radius={150}
                            depth={10}
                            count={10000}
                            factor={9}
                            saturation={10}
                            fade={true}
                        />
                        <Stars
                            radius={200}
                            depth={20}
                            count={10000}
                            factor={9}
                            saturation={0}
                            fade={true}
                        />
                        <OrbitControls
                            enablePan={false}
                            enableZoom={true}
                            enableRotate={true}
                            rotateSpeed={0.32}
                            autoRotate={true}
                            autoRotateSpeed={0.9}
                        />
                    </Suspense>
                </Canvas>
            </div>
        </div>
    )
}

export default App
