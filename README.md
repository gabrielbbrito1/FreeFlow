# FreeFlow

**FreeFlow** é um CRM (Customer Relationship Management) voltado para **freelancers** e **pequenos empresários**. Ele ajuda a organizar clientes, produtos/serviços e pedidos em um único lugar, com autenticação segura, dashboard e interface moderna.

## O que é o FreeFlow?

O FreeFlow permite que você:

- **Cadastre clientes** — nome, contato, endereço e dados de contato
- **Gerencie produtos/serviços** — cadastre o que você vende ou oferece
- **Controle pedidos** — associe clientes a produtos, defina valores e status (pendente, concluído, cancelado etc.)
- **Acesse um dashboard** — visão geral do seu negócio
- **Tenha dados isolados por usuário** — cada conta enxerga apenas seus próprios clientes, produtos e pedidos

A aplicação é composta por **backend** (API em Django REST + PostgreSQL) e **frontend** (React + TypeScript + Vite).

---

## Pré-requisitos

Antes de começar, você precisa ter instalado:

- **Python** 3.10 ou superior  
- **Node.js** 18+ e **npm** (ou yarn/pnpm)  
- **PostgreSQL** (para o banco de dados)  
- **Git**

---

## Como rodar o projeto do zero

### 1. Clonar o repositório

```bash
git clone https://github.com/gabrielbbrito1/FreeFlow.git
cd FreeFlow
```

---

### 2. Backend (Django)

#### 2.1. Criar ambiente virtual (recomendado)

```bash
# Windows
python -m venv venv
venv\Scripts\activate

# Linux / macOS
python3 -m venv venv
source venv/bin/activate
```

#### 2.2. Instalar dependências do backend

As dependências estão em `requirements.txt` na raiz do projeto:

```bash
pip install -r requirements.txt
```


#### 2.3. Variáveis de ambiente

Crie um arquivo `.env` na **raiz do projeto** com o conteúdo abaixo. O Django carrega com `python-dotenv`, então o caminho deve bater com onde está o `manage.py` (ou ajuste o `load_dotenv()` no `settings.py`).

Exemplo de `.env` na raiz:

```env
SECRET_KEY=sua-chave-secreta-aqui-mude-em-producao
DEBUG=True
DATABASE_URL=postgresql://usuario:senha@localhost:5432/nome_do_banco
```

- **SECRET_KEY**: uma string aleatória longa (em produção use uma chave forte)
- **DEBUG**: `True` em desenvolvimento, `False` em produção
- **DATABASE_URL**: URL de conexão do PostgreSQL, no formato  
  `postgresql://USER:PASSWORD@HOST:PORT/DATABASE`

Crie o banco no PostgreSQL antes (por exemplo: `createdb freeflow`).

#### 2.4. Rodar migrações

Se você estiver na raiz:

```bash
cd backend
python manage.py migrate
```

#### 2.5. (Opcional) Criar um superusuário

```bash
cd backend
python manage.py createsuperuser
```

Siga as perguntas (email e senha) para acessar o `/admin`.

#### 2.6. Subir o servidor Django

```bash
cd backend
python manage.py runserver
```

A API ficará em **http://127.0.0.1:8000/**.

---

### 3. Frontend (React + Vite)

Abra **outro terminal** (mantenha o backend rodando).

#### 3.1. Entrar na pasta do frontend

```bash
Partindo da raiz:

cd FreeFlow/frontend/
```

#### 3.2. Instalar dependências

```bash
npm install
```

#### 3.3. Rodar em modo desenvolvimento

```bash
npm run dev
```

O frontend deve abrir em **http://localhost:5173/** (ou a porta que o Vite mostrar).

O app já está configurado para chamar a API em **http://127.0.0.1:8000**. Se a API estiver em outra URL ou porta, você precisará alterar essa base URL nos arquivos que fazem `fetch` (por exemplo em `login-form.tsx`, `signup-form.tsx`, `dashboard.tsx`, `app-sidebar.tsx`).

---

## Resumo dos comandos

| Etapa            | Onde              | Comando                             |
|------------------|-------------------|-------------------------------------|
| Backend – deps   | Raiz              | `pip install -r requirements.txt`   |
| Backend – migra  | `backend/`        | `python manage.py migrate`          |
| Backend – rodar  | `backend/`        | `python manage.py runserver`       |
| Frontend – deps  | `frontend/freeflow/` | `npm install`                    |
| Frontend – rodar | `frontend/freeflow/` | `npm run dev`                    |

---

## Estrutura do projeto

```
FreeFlow/
├── backend/              # API Django
│   ├── core/             # app principal (models, views, serializers, urls)
│   ├── freeflow/         # settings, urls, wsgi
│   ├── manage.py
│   └── requirements.txt  # (ou na raiz)
├── frontend/
│   └── freeflow/         # app React (Vite + TypeScript)
│       ├── src/
│       ├── package.json
│       └── vite.config.ts
├── requirements.txt      # dependências Python
├── .env                  # variáveis de ambiente (não versionado)
└── README.md
```

---

## Endpoints principais da API

| Método | Rota                     | Descrição                |
|--------|--------------------------|--------------------------|
| POST   | `/auth/login/`           | Login                    |
| POST   | `/auth/register/`        | Cadastro de usuário      |
| GET    | `/user/get_user_data/`   | Dados do usuário logado  |
| *      | `/api/customers/`        | CRUD de clientes         |
| *      | `/api/products/`         | CRUD de produtos         |
| *      | `/api/orders/`           | CRUD de pedidos          |

Rotas em `/api/` exigem autenticação via **JWT** (Bearer token).

---

## Problemas comuns

- **Erro ao conectar no banco**  
  Confira `DATABASE_URL`, se o PostgreSQL está ligado e se o banco existe.

- **CORS no frontend**  
  O backend usa `django-cors-headers`. Em desenvolvimento, `CORS_ALLOW_ALL_ORIGINS = True` costuma ser suficiente. Se mudar a origem do frontend, verifique as configurações de CORS no `settings.py`.

- **Frontend não acha a API**  
  As chamadas estão configuradas para `http://127.0.0.1:8000`. Backend e frontend precisam estar rodando e a URL da API precisa coincidir com a que o Django está servindo.

---

## Licença

Este projeto está sob a licença que constar no repositório (MIT, etc.). Consulte o arquivo de licença no repo.
