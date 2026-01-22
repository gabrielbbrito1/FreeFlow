# Freeflow

Freeflow é um CRM para freelancers focado na gestão de clientes, projetos e demandas.  
O projeto é utilizado como estudo prático de desenvolvimento fullstack, aplicando tecnologias e padrões comuns em aplicações reais.

---

## Stack

**Backend**
- Python
- Django
- Django REST Framework
- JWT (JSON Web Token)
- PostgreSQL

**Frontend**
- React
- TypeScript
- Vite
- npm

---

## Autenticação

A autenticação é baseada em JWT, com controle de acesso via tokens de acesso e refresh.  
O backend expõe uma API REST protegida, consumida pelo frontend.

---

## Estrutura

Backend e frontend estão no mesmo repositório, porém são executados separadamente.

freeflow/  
├── backend/  
├── frontend/freeflow/  
└── README.md  

---

## Como rodar o projeto

Clone o repositório e entre na pasta raiz:

git clone https://github.com/seu-usuario/freeflow.git  
cd freeflow  

Crie e ative o ambiente virtual, instale as dependências do backend, aplique as migrações e inicie o servidor:

python -m venv venv  
source venv/bin/activate  
pip install -r backend/requirements.txt  
cd backend  
python manage.py migrate  
python manage.py runserver  

O backend ficará disponível em:  
http://localhost:8000

Em outro terminal, acesse o frontend, instale as dependências e inicie a aplicação:

cd frontend/freeflow  
npm install  
npm run dev  

O frontend ficará disponível em:  
http://localhost:5173

---

## Objetivo

- Desenvolver um CRM funcional para freelancers
- Consolidar conhecimentos em Django REST Framework
- Implementar autenticação JWT em um cenário real
- Trabalhar frontend e backend no mesmo projeto

---

## Licença

MIT License

---

## Autor

Gabriel Brito  
Desenvolvedor Fullstack
