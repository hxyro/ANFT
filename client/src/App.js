import { Canvas } from '@react-three/fiber'
import { OrbitControls, Stars } from '@react-three/drei'
import { Suspense } from 'react'
import { SignUp } from './components/signUp'
import { Login } from './components/login'

function App() {
    return (
        <div>
            <div className="Container">
                <Login />
            </div>
            <div className="CanvasContainer">
                <Canvas>
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
                </Canvas>
            </div>
        </div>
    )
}

export default App
