import { useState } from "react"
import { Center } from '@chakra-ui/react'
import Login from "../auth/Login"
import Register from "../auth/Register"

const Home = () => {

    const [isLogin, setIsLogin] = useState(true)

    return (
        <Center 
            w='100vw' 
            h='100vh'
            backgroundImage="url(/bg.gif)"
            style={{
                // opacity: 0.5,
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
            }}>

            {
                isLogin? <Login changeComp={() => setIsLogin(!isLogin)}/>: <Register changeComp={() => setIsLogin(!isLogin)}/>
            }
        </Center>
    )
}

export default Home;