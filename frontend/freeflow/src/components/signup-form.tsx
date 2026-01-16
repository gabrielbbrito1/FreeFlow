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
import React, { useState, type FormEvent } from "react"

export function SignupForm({
    className,
    ...props
}: React.ComponentProps<"div">) {

    const [email, setEmail] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const [confirmPassword, setConfirmPassword] = useState<string>("")
    const [phone, setPhone] = useState<string>("")
    const [passwordError, setPasswordError] = useState<boolean>(false)
    const [confirmPasswordError, setConfirmPasswordError] = useState<boolean>(false)
    const [firstName, setFirstName] = useState<string>("")
    const [lastName, setLastName] = useState<string>("")
    const [emailError, setEmailError] = useState<boolean>(false)
    const [phoneError, setPhoneError] = useState<boolean>(false)
    const [firstNameError, setFirstNameError] = useState<boolean>(false)
    const [lastNameError, setLastNameError] = useState<boolean>(false)

    function formatPhone(value: string): string {
        // Remove tudo que não for número
        const numbers = value.replace(/\D/g, "")

        // (XX) XXXXX-XXXX
        if (numbers.length <= 10) {
            return numbers
                .replace(/^(\d{2})(\d)/, "($1) $2")
                .replace(/(\d{4})(\d)/, "$1-$2")
        }

        return numbers
            .replace(/^(\d{2})(\d)/, "($1) $2")
            .replace(/(\d{5})(\d)/, "$1-$2")
    }


    function validatePassword(value: string) {
        setPasswordError(value.length < 8)
    }

    function validateConfirmPassword(value: string) {
        setConfirmPasswordError(value !== password)
    }
    function validateEmail(value: string) {
        setEmailError(value.includes("@"))
    }
    function validatePhone(value: string) {
        const numbers = value.replace(/\D/g, "")
        setPhoneError(numbers.length < 10)
    }
    function validateFirstName(value: string) {
        setFirstNameError(value.length < 1)
    }
    function validateLastName(value: string) {
        setLastNameError(value.length < 1)
    }

    const handleRegister = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        if (password.length < 8) {
            setPasswordError(true)
            return
        }

        if (password !== confirmPassword) {
            setConfirmPasswordError(true)
            return
        }

        const url = "http://127.0.0.1:8000/auth/register/"
        const phoneClean = phone.replace(/\D/g, "")

        try {
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email,
                    password,
                    phone: phoneClean,
                    firstName,
                    lastName
                }),
            })

            if (response.ok) {
                alert("Registro criado com sucesso!")
                setEmail("")
                setPassword("")
                setConfirmPassword("")
                setPhone("")
                setFirstName("")
                setLastName("")
            }
            if (!response.ok) {
                const data = await response.json()

                if (data.password) {
                    setPasswordError(true)
                    return
                }
                if (data.confirmPassword) {
                    setConfirmPasswordError(true)
                    return
                }
                if (data.email) {
                    setEmailError(true)
                    return
                }
                if (data.phone) {
                    setPhoneError(true)
                    return
                }
                if (data.firstName) {
                    setFirstNameError(true)
                }
                if (data.lastName) {
                    setLastNameError(true)
                    return
                }
            }
        }
        catch (error) {
            alert(
                "Erro ao registrar usuário:" +
                (error instanceof Error ? " " + error.message : "")
            )
        }
    }

    return (
        <div className={cn("flex flex-col gap-6", className)} {...props}>
            <Card className="overflow-hidden p-0">
                <CardContent className="grid p-0 md:grid-cols-[1fr_1.3fr]">
                    <form
                        className="p-6 md:p-8"
                        autoComplete="off"
                        onSubmit={handleRegister}
                    >
                        {/* Nome e sobrenome */}
                        <FieldGroup>
                            <div className="flex flex-col items-center gap-2 text-center">
                                <h1 className="text-2xl font-bold">Crie sua conta</h1>
                            </div>
                            <Field>
                                <FieldLabel>Nome</FieldLabel>
                                <Input
                                    type="first_name"
                                    value={firstName}
                                    onChange={(e) => setFirstName(e.target.value)}
                                    onBlur={() => validateFirstName(firstName)}
                                    className={
                                        firstNameError
                                            ? "border-red-500 focus-visible:ring-red-500"
                                            : ""
                                    }
                                    required
                                />
                                {firstNameError && (
                                    <p className="text-sm text-red-500">
                                        Nome inválido
                                    </p>
                                )}

                                <FieldLabel>Sobrenome</FieldLabel>
                                <Input
                                    type="last_name"
                                    value={lastName}
                                    onChange={(e) => setLastName(e.target.value)}
                                    onBlur={() => validateLastName(lastName)}
                                    className={
                                        lastNameError
                                            ? "border-red-500 focus-visible:ring-red-500"
                                            : ""
                                    }
                                    required
                                />
                                {lastNameError && (
                                    <p className="text-sm text-red-500">
                                        Sobrenome inválido
                                    </p>
                                )}

                            </Field>
                            <Field>
                                <FieldLabel>Phone</FieldLabel>
                                <Input
                                    type="tel"
                                    value={phone}
                                    onChange={(e) => {
                                        const formatted = formatPhone(e.target.value)
                                        setPhone(formatted)
                                    }}
                                    onBlur={() => validatePhone(phone)}
                                    placeholder="(11) 91234-5678"
                                    className={
                                        phoneError
                                            ? "border-red-500 focus-visible:ring-red-500"
                                            : ""
                                    }
                                    required
                                />

                                {phoneError && (
                                    <p className="text-sm text-red-500">
                                        Telefone inválido
                                    </p>
                                )}
                            </Field>


                            {/* EMAIL */}
                            <Field>
                                <FieldLabel>Email</FieldLabel>
                                <Input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    onBlur={() => validateEmail(email)}
                                    className={
                                        emailError
                                            ? "border-red-500 focus-visible:ring-red-500"
                                            : ""
                                    }
                                    required
                                />
                                {emailError && (
                                    <p className="text-sm text-red-500">
                                        Email inválido
                                    </p>
                                )}
                            </Field>

                            {/* SENHAS */}
                            <Field>
                                <Field className="grid grid-cols-2 gap-4">
                                    <Field>
                                        <FieldLabel>Senha</FieldLabel>
                                        <Input
                                            type="password"
                                            value={password}
                                            onChange={(e) => {
                                                setPassword(e.target.value)
                                                validatePassword(e.target.value)
                                            }}
                                            className={
                                                passwordError
                                                    ? "border-red-500 focus-visible:ring-red-500"
                                                    : ""
                                            }
                                        />
                                        {passwordError && (
                                            <p className="text-sm text-red-500">
                                                A senha deve ter pelo menos 8 caracteres
                                            </p>
                                        )}
                                    </Field>

                                    <Field>
                                        <FieldLabel>Confirme a senha</FieldLabel>
                                        <Input
                                            type="password"
                                            value={confirmPassword}
                                            onChange={(e) => {
                                                setConfirmPassword(e.target.value)
                                                validateConfirmPassword(e.target.value)
                                            }}
                                            className={
                                                confirmPasswordError
                                                    ? "border-red-500 focus-visible:ring-red-500"
                                                    : ""
                                            }
                                        />
                                        {confirmPasswordError && (
                                            <p className="text-sm text-red-500">
                                                As senhas não coincidem
                                            </p>
                                        )}
                                    </Field>
                                </Field>
                            </Field>

                            <Field>
                                <Button type="submit">Criar conta</Button>
                            </Field>

                            <FieldSeparator>Ou continue com</FieldSeparator>

                            <Field className="grid grid-cols-1 gap-4">
                                <Button variant="outline" type="button">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                        <path d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z" fill="currentColor" />
                                    </svg>
                                    <span className="sr-only">
                                        Criar conta com Google
                                    </span>
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
                            alt="Imagem"
                            className="absolute inset-0 h-full w-full object-cover"
                        />
                    </div>
                </CardContent>
            </Card>
        </div>
    )

}
