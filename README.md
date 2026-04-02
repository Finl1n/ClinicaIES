# ClinicaIES — Sistema de Controle de Atendimento da Clínica Médica

**Front-end moderno em Angular 17 com TypeScript** | Projeto acadêmico para gerenciar atendimentos clínicos em instituições de ensino superior.

---

## 🎯 O que o projeto faz?

Um sistema web para **administradores** e **profissionais de saúde** gerenciarem:

- 👥 **Pacientes**: cadastro, prontuários e histórico de atendimentos
- 🏥 **Atendimentos**: registrar consultas, urgências e emergências
- 💊 **Medicações**: controlar estoque e requisições
- 📋 **Escolas e Unidades**: organizar estrutura institucional

---

## 🚀 Como Rodar

### Pré-requisitos

- Node.js 18+
- npm ou yarn

### Passos

```bash
# 1. Instalar dependências
npm install

# 2. Iniciar servidor de desenvolvimento
npm start

# 3. Abrir no navegador
# http://localhost:4200
```

---

## 🔑 Acesso ao Sistema (Credenciais de Teste)

```
┌──────────────────┬────────────┬───────────┐
│ Perfil           │ Usuário    │ Senha     │
├──────────────────┼────────────┼───────────┤
│ Administrador    │ admin      │ admin123  │
│ Profissional     │ profissional│ prof123  │
└──────────────────┴────────────┴───────────┘
```

**Dica**: Na tela de login há botões para preencher automaticamente as credenciais.

---

## 🏗️ Arquitetura do Projeto

```
clinica-angular/
├── src/app/
│
├─── core/                    # Lógica compartilhada (Guards, Services, Models)
│    ├── guards/
│    │   └── auth.guard.ts    # Proteção de rotas (Admin vs Profissional)
│    ├── models/
│    │   └── models.ts        # Interfaces TypeScript centralizadas
│    └── services/
│        ├── auth.service.ts  # Autenticação e sessão
│        └── data.service.ts  # CRUD de dados + regras de negócio
│
├─── features/                # Componentes específicos por funcionalidade
│    ├── auth/
│    │   └── login.component  # Tela de login com validação
│    │
│    ├── admin/               # Painel de Administração
│    │   ├── dashboard/       # KPIs e estatísticas
│    │   ├── escolas/         # Gerenciar escolas
│    │   ├── unidades/        # Gerenciar unidades
│    │   ├── profissionais/   # Gerenciar profissionais
│    │   ├── medicacoes/      # Inventário de medicações
│    │   └── relatorios/      # Relatórios administrativos
│    │
│    └── profissional/        # Painel do Profissional de Saúde
│        ├── cadastro/        # Completar dados cadastrais
│        ├── pacientes/       # Gerenciar pacientes
│        ├── atendimentos/    # Registrar atendimentos
│        ├── prontuarios/     # Consultar prontuários
│        └── requisicoes/     # Solicitar medicações
│
├─── shared/                  # Componentes reutilizáveis
│    └── components/
│        ├── shell.component  # Layout principal (sidebar + topbar)
│        ├── modal.component  # Modal customizável
│        └── ui.components    # Botões, badges, headers
│
└─── assets/                  # Imagens, fontes, estilos globais
```

---

## 🔄 Fluxos Principais

### 1. Fluxo de Autenticação

```
Login (username/password)
    ↓
authService.login()
    ↓
localStorage.setItem() [Persistência de sessão]
    ↓
Router.navigate() [Redireciona conforme role]
    ├─ Admin    → /admin/dashboard
    └─ Profissional → /profissional/pacientes
```

### 2. Fluxo de Atendimento

```
Profissional cadastra Paciente
    ↓
dataService.savePaciente()
    ↓
Prontuário criado AUTOMATICAMENTE (RN007)
    ↓
Profissional registra Atendimento
    ↓
Medicações validadas e estoque atualizado (RN010, RN011)
    ↓
Atendimento vinculado ao Prontuário
```

### 3. Fluxo de Requisição de Medicação

```
Profissional solicita medicação
    ↓
dataService.saveRequisicao()
    ↓
Classificação: URGENTE | CRÍTICO | PREVENTIVO
    ↓
Admin recebe requisição no relatório/dashboard
```

---

## 📊 Modelo de Dados

### Relacionamentos Principais

```
Usuario (Login)
  ├─ role: ADMINISTRADOR | PROFISSIONAL_SAUDE
  │
Profissional de Saúde
  ├─ status: ATIVO | INATIVO
  ├─ cadastroCompleto: boolean
  │
Paciente
  ├─ categoria: ALUNO | COLABORADOR_UNIDADE | COLABORADOR_ESCOLA | EXTERNO
  ├─ prontuarioId (1:1)
  │
Prontuário
  ├─ atendimentos[] (1:N)
  │
Atendimento
  ├─ medicacoesUsadas[] (N:M com Medicação)
  │
Medicação
  ├─ estoque (decrementado em cada uso)
  ├─ validade (validação antes de usar)
  │
Escola / Unidade
  ├─ status: ATIVO | INATIVO
```

---

## ✅ Funcionalidades Implementadas

### Para Administradores

| Tela              | O que faz                                                     |
| ----------------- | ------------------------------------------------------------- |
| **Dashboard**     | Visualiza KPIs: pacientes ativos, atendimentos, estoque baixo |
| **Escolas**       | Cadastra/edita/inativa escolas e coordenadores                |
| **Unidades**      | Cadastra/edita/inativa unidades responsáveis                  |
| **Profissionais** | Cadastra/edita/inativa profissionais de saúde                 |
| **Medicações**    | Gerencia inventário e validade                                |
| **Relatórios**    | Acessa dados consolidados (todo em Frontend por enquanto)     |

### Para Profissionais de Saúde

| Tela             | O que faz                                                          |
| ---------------- | ------------------------------------------------------------------ |
| **Meu Cadastro** | Completa dados pessoais e profissionais                            |
| **Pacientes**    | Cadastra novos pacientes (cria prontuário automático)              |
| **Atendimentos** | Registra consultas/urgências com sintomas, diagnóstico, medicações |
| **Prontuários**  | Consulta histórico completo do paciente                            |
| **Requisições**  | Solicita medicações com prioridade (urgente/crítico/preventivo)    |

---

## 🔒 Regras de Negócio Implementadas

| Regra     | Descrição                                                      |
| --------- | -------------------------------------------------------------- |
| **RN001** | Escolas não são excluídas, apenas **inativadas**               |
| **RN002** | Unidades não são excluídas, apenas **inativadas**              |
| **RN003** | Cada escola tem apenas **um coordenador único**                |
| **RN004** | Cada unidade tem apenas **um responsável único**               |
| **RN005** | Profissionais não são excluídos, apenas **inativados**         |
| **RN006** | Pacientes não são excluídos, apenas **inativados**             |
| **RN007** | Prontuário é criado **automaticamente** ao cadastrar paciente  |
| **RN008** | Prontuário não existe sem paciente vinculado                   |
| **RN009** | Medicações não são excluídas, apenas **inativadas**            |
| **RN010** | Medicação deve estar **ativa, válida e com estoque** para usar |
| **RN011** | Estoque é **decrementado automaticamente** ao registrar uso    |
| **RN012** | Horário de encerramento deve ser **posterior ao início**       |
| **RN013** | Profissional só pode atender após **completar cadastro**       |

---

## 🎨 Design & Tecnologias

| Item          | Detalhes                                |
| ------------- | --------------------------------------- |
| **Framework** | Angular 17.3.0 (Standalone Components)  |
| **Linguagem** | TypeScript 5.4                          |
| **Estilo**    | SCSS customizado + Tema Dark Moderno    |
| **Rotas**     | Lazy loading com componentes standalone |
| **Estado**    | RxJS + BehaviorSubject (sem NGRX/NgRx)  |
| **Validação** | Angular Forms (Reactive)                |

### Paleta de Cores

- **Primária**: Azul `#3b82f6`
- **Fundo**: Escuro `#0d1117`
- **Surface**: Cartão `#161b27`
- **Sucesso**: Verde `#10b981`
- **Erro**: Vermelho `#ef4444`
- **Aviso**: Laranja `#f59e0b`

---

## 📝 Observações Importantes

### ⚠️ Escopo do Projeto

- **Esta é uma SIMULAÇÃO Frontend**: Todos os dados estão em memória (BehaviorSubject)
- **Sem conexão com Backend**: Use este projeto como prototipo
- **Guards locais apenas**: A segurança real deve ser implementada no Backend

### 🔧 Para Desenvolvimento

- Componentes **standalone** (sem NgModule)
- **Lazy loading** automático nas rotas
- Serviços injetados com `providedIn: 'root'`
- **@angular/router** com preloading

### 🚀 Próximos Passos (Integração Real)

1. Substituir `DataService` por chamadas HTTP
2. Implementar JWT/OAuth no Backend
3. Validações no Backend (regras de negócio)
4. Persistência em banco de dados (PostgreSQL/MongoDB)
5. Tratamento de erros com retry logic

---

## 💡 Resumo para Apresentação

**Em 30 segundos:**

> "O projeto é um sistema web para gerenciar atendimentos clínicos em instituições de ensino. Tem dois perfis: Administrador (gerencia escolas, unidades, profissionais e medicações) e Profissional de Saúde (gerencia pacientes, atendimentos e prontuários). Foi desenvolvido com Angular 17 em componentes standalone, com mock de dados em memória para demonstrar as regras de negócio."

---

## 📚 Stack Tecnológico

```
Frontend (Este Projeto)
├── Angular 17.3
├── TypeScript 5.4
├── RxJS 7.8
├── Angular Router (Lazy Loading)
├── Angular Forms (Reactive)
└── SCSS Customizado

Backend (A implementar)
├── Node.js / Java / Python
├── RESTful API
├── JWT Authentication
├── Database (SQL/NoSQL)
└── Deployment (Docker/Kubernetes)
```

---

**Desenvolvido como projeto acadêmico** | IES v1.0
