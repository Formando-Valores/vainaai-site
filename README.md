# VAINAAI.pt - Site institucional sem Convex

Projeto remodelado para funcionar com:

- React + Vite + TypeScript + Tailwind
- Vercel Functions em `/api`
- Resend para envio dos formulários
- Imagens estáticas em `/public`

## O que foi removido

- Convex React Client
- Convex Auth
- Convex Actions
- Convex Storage
- Variáveis `VITE_CONVEX_URL`, `CONVEX_DEPLOY_KEY` e `CONVEX_RESEND_API_KEY`

## Instalação local

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

## Deploy na Vercel

Configuração sugerida:

```txt
Framework Preset: Vite
Install Command: npm install
Build Command: npm run build
Output Directory: dist
```

## Variáveis de ambiente na Vercel

Obrigatória:

```txt
RESEND_API_KEY=...
```

Opcionais:

```txt
RESEND_FROM_EMAIL=contato@vainaai.pt
RESEND_TO_EMAIL=contato@vainaai.pt
```

> Atenção: o email usado em `RESEND_FROM_EMAIL` precisa pertencer a um domínio verificado no Resend.

## Endpoints criados

- `POST /api/association`
- `POST /api/report`
- `POST /api/volunteer`
- `POST /api/contact`

Todos respondem JSON no formato:

```json
{ "success": true }
```

ou

```json
{ "success": false, "error": "mensagem" }
```

## Imagens estáticas

Foram criados placeholders em SVG para substituir o Convex Storage:

- `/public/logo.svg`
- `/public/background-left.svg`
- `/public/background-right.svg`

Substitua esses arquivos pelos assets oficiais quando tiver as imagens originais.
