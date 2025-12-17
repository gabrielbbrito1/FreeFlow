import React, { useState, type FormEvent } from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
    Field,
    FieldDescription,
    FieldGroup,
    FieldLabel,
    FieldSeparator,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import logo from "../assets/freeflow_logo.png"
import { useNavigate } from "react-router-dom"

export function LoginForm({
    className,
    ...props
}: React.ComponentProps<"div">) {

    const [email, setEmail] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const [error, setError] = useState<string>("")

    const navigate = useNavigate()

    async function handleLogin(e: FormEvent<HTMLFormElement>) {
        e.preventDefault()
        setError("")

        try {
            const response = await fetch("http://127.0.0.1:8000/auth/login/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password }),
            })
            if (!response.ok) {
                setError("Email ou senha incorretos")
                return
            }

            const data = await response.json()
            // 🔹 Salva tokens corretamente
            localStorage.setItem("accessToken", data.access)
            localStorage.setItem("refreshToken", data.refresh)
            navigate("/dashboard")

        } catch {
            setError("Erro ao conectar com o servidor")
        }
    }

    return (
        <div className={cn("flex flex-col gap-6", className)} {...props}>
            <Card>
                <CardContent className="grid md:grid-cols-2">
                    <form onSubmit={handleLogin} className="p-6 space-y-4">

                        <FieldGroup>
                            <h1 className="text-2xl font-bold text-center">Login</h1>

                            <Field>
                                <FieldLabel>Email</FieldLabel>
                                <Input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </Field>

                            <Field>
                                <FieldLabel>Senha</FieldLabel>
                                <Input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                            </Field>

                            {error && (
                                <FieldDescription className="text-red-500 text-center">
                                    {error}
                                </FieldDescription>
                            )}

                            <Button type="submit" className="w-full">
                                Login
                            </Button>

                            <FieldSeparator>Ou faça login com </FieldSeparator>

                            <Field className="grid grid-cols-1 gap-4">
                                <Button variant="outline" type="button">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                        <path d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z" fill="currentColor" />
                                    </svg>
                                    <span className="sr-only">
                                        Logar com a conta do Google
                                    </span>
                                </Button>
                            </Field>

                            <FieldDescription className="text-center">
                                Não possui conta? <a href="/register">Criar conta</a>
                            </FieldDescription>

                        </FieldGroup>
                    </form>

                    <div className="hidden md:block">
                        <img src={logo} className="h-full w-full object-cover" />
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
