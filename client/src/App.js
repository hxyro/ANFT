import { Canvas } from '@react-three/fiber'
import { OrbitControls, Stars } from '@react-three/drei'
import { Suspense, useEffect, useRef, useState } from 'react'
import { SignUp } from './components/signUp'
import { Login } from './components/login'
import { Nav } from './components/nav'
import { Loading } from './components/loading'
import { Drop } from './components/drop'
import { Nft } from './components/anft'
import axios from 'axios'

const api = axios.create({
    baseURL: 'http://ec2-54-189-18-6.us-west-2.compute.amazonaws.com:3000/',
})

function App() {
    const bidPrice = useRef([])
    const [showSignUp, setShowSignUp] = useState(false)
    const [showLogin, setShowLogin] = useState(false)
    const [isLogin, setIsLogin] = useState(null)
    const [showDrop, setShowDrop] = useState(false)
    const [data, setData] = useState([])
    const [user, setuser] = useState('')

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
    const sleep = (milliseconds) => {
        return new Promise((resolve) => setTimeout(resolve, milliseconds))
    }
    const dropSuccess = async () => {
        setShowLogin(false)
        setShowSignUp(false)
        setShowDrop(false)
        setIsLogin(true)
        await sleep(5000)
        api.get('/').then(({ data }) => {
            const { anft } = data
            bidPrice.current = []
            anft.map(({ price, _id }) => bidPrice.current.push({ price: price, id: _id }))
            setData(anft)
        })
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

    useEffect(() => {
        api.get('/').then(({ data }) => {
            const { anft } = data
            bidPrice.current = []
            anft.map(({ price, _id }) => bidPrice.current.push({ price: price, id: _id }))
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
                    <Login off={toggleOff} success={loginSuccess} loginDetails={setuser} />
                </div>
            ) : null}
            {showDrop ? (
                <div className="Container">
                    <Drop off={toggleOff} success={dropSuccess} user={user} />
                </div>
            ) : null}

            <div className="Container2">
                {data.map(({ imageUrl, name, user, _id }, index) => (
                    <Nft
                        index={index}
                        priceref={bidPrice}
                        imageSrc={imageUrl}
                        user={user}
                        key={_id}
                        name={name}
                        id={_id}
                        log={isLogin}
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
                            enableZoom={false}
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
