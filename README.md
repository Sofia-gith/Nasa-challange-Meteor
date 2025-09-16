# Desafio - Meteor Madness (Nasa)

## Participantes

- Ernesto Floriano Amorim
- Israel de Souza Lima
- Sofia Floriano Amorim

## Plano do Projeto: Meteor Madness (NASA)

| Etapa                        | Ações Principais                                                                 | Ferramentas Recomendadas                                                                                           |
|------------------------------|----------------------------------------------------------------------------------|-------------------------------------------------------------------------------------------------------------------|
| **1. Coleta de Dados**       | **Back-end:** Obter dados de asteroides e de localização para a simulação.       | **API:** JPL Small-Body Database (NASA), Google Maps Platform - Elevation API.<br>**Tecnologia:** Node.js, Axios ou Node-fetch. |
| **2. Modelagem do Impacto**  | **Back-end:** Criar a lógica para calcular os efeitos do impacto com base nos dados. | **Cálculos:** Fórmulas de física (*E = 0.5 × massa × velocidade²*) e dados de estudos científicos.                |
| **3. Visualização e Interface** | **Front-end:** Criar a interface interativa e exibir a simulação de forma visual no mapa. | **Front-end:** React.<br>**Visualização:** Mapbox GL JS (mapa interativo), D3.js (controles e animações).          |

## Instalação e configurações

### 1. Clone o repositório

```bash
git clone https://github.com/israelsouza/Nasa-challange-Meteor.git
cd Nasa-challange-Meteor
```

### 2. Instale as dependências na raiz

```bash
npm install
```

### 3. Configure os arquivos de ambiente

Se for inserir uma API de 3os, inserir o nome usado no codigo dentro da .env.example e subir a chave no gerenciador de senhas

#### Web

Na raiz do projeto, digite no terminal:

```bash
cd web

# Windows
copy .env.example .env

# Linux/Mac
cp .env.example .env
```

#### API

Em sequência, digite no terminal

```bash
cd ../api

# Windows
copy .env.example .env

# Linux/Mac
cp .env.example .env
```

### 4. Iniciar o projeto.

Va para a raiz do projeto e digite:

```bash
npm run dev
```

## Alinhamentos

### 1. Credenciais
Preencha o arquivo `.env` com as variáveis necessárias, conforme o modelo `.env.example`.  
As credenciais devem ser obtidas pelo gerenciador seguro utilizado pela equipe, conforme instruído.

### 2. Fluxo de Branches

- O branch principal de produção é o `main`.
- O branch de homologação é o `develop`.
- Evite commits diretamente nos branches `main` e `develop`.
- Novas funcionalidades ou correções devem ser desenvolvidas a partir do `develop`, seguindo o padrão:  
  `feature/nome-da-feature` ou `fix/nome-da-correção`
- A integração e validação dos desenvolvimentos será feita manualmente, utilizando o painel de deploy da Vercel.
- Para cada commit ou Pull Request, a Vercel gera um ambiente de preview.  
- Antes de realizar o merge para a branch `develop`, verifique se o preview está funcionando corretamente (sem erros ou falhas).
- Se o painel indicar sucesso (verde), pode prosseguir com o merge.  
- Se houver falhas (vermelho), corrija antes de avançar.
- Quando tudo estiver validado e funcionando, faça o merge do `develop` para o `main` para atualizar a produção.

**Exemplo de fluxo:**
1. `git checkout develop`
2. `git pull`
3. `git checkout -b feature/nova-funcionalidade`
4. Desenvolva e faça commits
5. `git push origin feature/nova-funcionalidade`
6. Abra um PR para o `develop` e aguarde revisão
7. Após validação, faça o merge do `develop` para o `main`

