FROM node:12-slim as build

# faz da pasta 'app' o diretório atual para trabalho
WORKDIR /app

# copia os arquivos 'package.json' e 'package-lock.json' (se disponível)
COPY package*.json ./
COPY yarn* ./

# instala dependências da api
RUN yarn install

# copia arquivos e pastas para o diretório atual de trabalho (pasta 'app')
COPY . .

# define como processo principal a execução do projeto
CMD ["yarn", "dev"]