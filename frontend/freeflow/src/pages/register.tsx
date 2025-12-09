import React, { useEffect, useState, type ChangeEvent, type FormEvent } from "react"

function Register() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [phone, setPhone] = useState('')

    const handleRegister = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        const url = "http://127.0.0.1:8000/auth/register/"

        try {
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email,
                    password,
                    phone,
                }),
            });
            const data = await response.json()
            if (response.ok) {
                alert('Registro criado com sucesso!')
                setEmail('')
                setPassword('')
                setPhone('')
            }
        } catch (error) {
            alert('Erro ao registrar usuário:' + (error instanceof Error ? ' ' + error.message : ''))
        }
    }

    const handleInputChange = (set: React.Dispatch<React.SetStateAction<string>>) => (e: ChangeEvent<HTMLInputElement>) => { set(e.target.value) }

    return (
        <form onSubmit={handleRegister} className="w-full max-w-sm bg-white p-8 rounded-lg shadow-xl">

            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">E-mail</label>
                <input
                    type="email"
                    value={email}
                    onChange={handleInputChange(setEmail)}
                    className="shadow border rounded w-full py-2 px-3 text-gray-700"
                    required
                    
                />
            </div>

            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">Senha</label>
                <input
                    type="password"
                    value={password}
                    onChange={handleInputChange(setPassword)}
                    className="shadow border rounded w-full py-2 px-3 text-gray-700"
                    required
                />
            </div>

            <div className="mb-6">
                <label className="block text-gray-700 text-sm font-bold mb-2">Telefone</label>
                <input
                    type="tel"
                    value={phone}
                    onChange={handleInputChange(setPhone)}
                    className="shadow border rounded w-full py-2 px-3 text-gray-700"
                    required
                />
            </div>
            <button type="submit">Registrar</button>
        </form>
    )

}


export default Register