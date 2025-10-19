# 🎬 Movies DB  

Aplicação **React + TypeScript + Vite** para explorar filmes, buscar títulos e adicionar os melhores filmes aos favoritos.

<img width="2860" height="3617" alt="image" src="https://github.com/user-attachments/assets/6dd08694-12ef-47ad-99fb-1d14fe829170" />

O projeto consome a API pública do **The Movie Database (TMDB)** para exibir conteúdos atualizados e populares do cinema.

🔗 **Demo:** [yasminlopes-movies-app.vercel.app](https://yasminlopes-movies-app.vercel.app/)

---

## Tecnologias

- **React 19** + **TypeScript**
- **Vite**
- **Tailwind CSS**
- **React Router v7**
- **Axios**
- **Context API** (estado global)
- **Jest + React Testing Library**
- **Lucide React** (ícones)

## Configuraçoes

1. Crie uma conta em [TheMovieDB](https://www.themoviedb.org/)  
2. Gere sua **API Key** em: [Configurações → API](https://www.themoviedb.org/settings/api)  
3. Crie um arquivo `.env` na raiz com base no exemplo abaixo:

```bash
# .env.sample
VITE_TMDB_BASE_URL='https://api.themoviedb.org'
VITE_TMDB_IMAGE_BASE_URL='https://image.tmdb.org/t/p'
VITE_TMDB_API_KEY='sua_chave_aqui'
``` 

## Estrutura do Projeto

A arquitetura foi organizada por responsabilidade, separando o núcleo, as funcionalidades e os recursos compartilhados.


```bash
src/
├── core/        # Núcleo da aplicação
├── features/    # Funcionalidades principais
├── shared/      # Recursos reutilizáveis
``` 

### Core

Tudo que é essencial para o funcionamento da aplicação.
Contém layouts, rotas e componentes estruturais (ex: Header)

### Features

As funcionalidades principais da aplicação.
Cada feature representa um módulo do sistema:

- movies/ → página inicial (filmes populares)

- movies-details/ → detalhes do filme

- favorites/ → lista de favoritos

### Shared

Tudo que é compartilhado entre as features:
componentes genéricos, hooks reutilizáveis, serviços (API), utilitários e tipos globais.

### Como Rodar o Projeto

1. Clonar o repositório
```bash 
git clone https://github.com/yasminlopes/movies-app.git
cd movies-app
```

2. Instalar dependências com ```npm install```

3. Configurar variáveis de ambiente

Crie o arquivo .env conforme o exemplo (env.sample)

4. Rodar o servidor de desenvolvimento com ```npm run dev```

## Testes

O projeto usa Jest + React Testing Library com suporte a TypeScript

<img width="1186" height="698" alt="image" src="https://github.com/user-attachments/assets/0cbd9daa-12a0-4c5c-92e6-1a26688e1857" />


Os testes foram escritos para garantir que os componentes se comportem como o usuário espera, validando

- Renderização correta de elementos (inputs, botões, cards, ícones)

- Reações a eventos (cliques, digitação, favoritar, busca)

- Interações entre componentes e hooks

Rode os testes com ```npm run test```
Rode as cobertura dos testes com ```npm run test:coverage```

<img width="1794" height="1394" alt="image" src="https://github.com/user-attachments/assets/988ac765-5e37-43b7-9243-46a20510a893" />


---

Desenvolvido por Yasmin Lopes 💚
