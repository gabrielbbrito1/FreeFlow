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
import logo from '../assets/freeflow_logo.png';
import React, { useState, type FormEvent } from "react"

export function SignupForm({
    className,
    ...props
}: React.ComponentProps<"div">) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('') 
    const [phone, setPhone] = useState('')

    const handleRegister = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        if (password !== confirmPassword) {
            alert("As senhas não coincidem!")
            return
        }

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
                // Clear form fields on success
                setEmail('')
                setPassword('')
                setConfirmPassword('')  // Clear confirmPassword field as well
                setPhone('')
            }
        } catch (error) {
            alert('Erro ao registrar usuário:' + (error instanceof Error ? ' ' + error.message : ''))
        }
    }

    return (
        <div className={cn("flex flex-col gap-6", className)} {...props}>
            <Card className="overflow-hidden p-0">
                <CardContent className="grid p-0 md:grid-cols-2">
                    <form className="p-6 md:p-8" autoComplete="off" onSubmit={handleRegister}>
                        <FieldGroup>
                            <div className="flex flex-col items-center gap-2 text-center">
                                <h1 className="text-2xl font-bold">Crie sua conta</h1>
                            </div>
                            <Field>
                                <FieldLabel htmlFor="email">Email</FieldLabel>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="exemplo@example.com"
                                    required
                                    autoComplete="new-password"
                                    value={email}  // Bind the state
                                    onChange={(e) => setEmail(e.target.value)}  // Update state on change
                                />
                            </Field>
                            <Field>
                                <Field className="grid grid-cols-2 gap-4">
                                    <Field>
                                        <FieldLabel htmlFor="password">Senha</FieldLabel>
                                        <Input
                                            id="password"
                                            type="password"
                                            required
                                            autoComplete="new-password"
                                            minLength={8}
                                            value={password}  // Bind the state
                                            onChange={(e) => setPassword(e.target.value)}  // Update state on change
                                        />
                                    </Field>
                                    <Field>
                                        <FieldLabel htmlFor="confirm-password">
                                            Confirme a senha
                                        </FieldLabel>
                                        <Input
                                            id="confirm-password"
                                            type="password"
                                            required
                                            autoComplete="new-password"
                                            minLength={8}
                                            value={confirmPassword}  // Bind the state
                                            onChange={(e) => setConfirmPassword(e.target.value)}  // Update state on change
                                        />
                                    </Field>
                                </Field>
                                <FieldDescription>
                                    As senhas devem conter ao menos 8 caracteres.
                                </FieldDescription>
                            </Field>
                            <Field>
                                <Button type="submit">Criar conta</Button>
                            </Field>
                            <FieldSeparator className="*:data-[slot=field-separator-content]:bg-card">
                                Ou continue com
                            </FieldSeparator>
                            <Field className="grid grid-cols-1 gap-4">
                                <Button variant="outline" type="button">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                        <path
                                            d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                                            fill="currentColor"
                                        />
                                    </svg>
                                    <span className="sr-only">Criar conta com Google</span>
                                </Button>
                            </Field>
                            <FieldDescription className="text-center">
                                Já possui uma conta? <a href="/">Logar</a>
                            </FieldDescription>
                        </FieldGroup>
                    </form>
                    <div className="bg-muted relative hidden md:block">
                        <img
                            src={logo}
                            alt="Image"
                            className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
                        />
                    </div>
                </CardContent>
            </Card>
            <FieldDescription className="px-6 text-center">
                Ao clicar você concorda com nossos <a href="#">Termos de serviço</a>{" "}
            </FieldDescription>
        </div>
    )
}
