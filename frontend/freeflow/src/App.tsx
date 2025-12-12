import Login from "@/pages/login"
import Register from "./pages/register"
import Dashboard from "./pages/dashboard"
import { Routes, Route } from "react-router"

    function App() {
        
        return (
                <Routes>
                    <Route path="/" element={<Login/>}></Route>
                    <Route path="/register" element={<Register/>}/>
                    <Route path="/dashboard" element={<Dashboard/>}></Route>
                </Routes>
        )
    }

    export default App
