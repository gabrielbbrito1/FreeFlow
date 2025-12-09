import { useEffect } from "react";


function Login() {
    useEffect(() => {
        async function fetchData() {
        const url = 'https://freeflow-ju2q.onrender.com/home';
        try {
            const response = await fetch(url);
            const data = await response.json();
            console.log(data);
        } catch (error) {
            console.error('Error:', error);
        }
    }
    fetchData();
    }, []);
    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-300">
            <h1 className="text-2xl font-bold">data</h1>
        </div>
    )
}

export default Login;
