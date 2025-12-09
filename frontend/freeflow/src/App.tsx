import Login from "@/pages/login"
import Register from "./pages/register"
import { Routes, Route } from "react-router"

    function App() {
        
        return (
           <Routes>
                <Route path="/" element={<Login/>}></Route>
                <Route path="/register" element={<Register/>}/>
           </Routes>
        )
    }

    export default App
