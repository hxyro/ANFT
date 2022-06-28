import { Canvas } from '@react-three/fiber'
import { OrbitControls, Stars } from '@react-three/drei'
import { Suspense, useState } from 'react'
import { SignUp } from './components/signUp'
import { Login } from './components/login'
import { Nav } from './components/nav'
import { Loading } from './components/loading'
import { Drop } from './components/drop'

function App() {
    const [showSignUp, setShowSignUp] = useState(false)
    const [showLogin, setShowLogin] = useState(false)
    const [isLogin, setIsLogin] = useState(true)
    const [showDrop, setShowDrop] = useState(false)
    const toggleOff = () => {
        setShowLogin(false)
        setShowSignUp(false)
        setShowDrop(false)
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
                    <SignUp off={toggleOff} />
                </div>
            ) : null}
            {showLogin ? (
                <div className="Container">
                    <Login off={toggleOff} />
                </div>
            ) : null}
            {showDrop ? (
                <div className="Container">
                    <Drop off={toggleOff} />
                </div>
            ) : null}

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
