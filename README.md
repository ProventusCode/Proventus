# Proventus

Analytics Platform for Competitive Programming

```text
  _____  _____   ______      ________ _   _ _______ _    _  _____
 |  __ \|  __ \ / __ \ \    / /  ____| \ | |__   __| |  | |/ ____|
 | |__) | |__) | |  | \ \  / /| |__  |  \| |  | |  | |  | | (___
 |  ___/|  _  /| |  | |\ \/ / |  __| | . ` |  | |  | |  | |\___ \
 | |    | | \ \| |__| | \  /  | |____| |\  |  | |  | |__| |____) |
 |_|    |_|  \_\\____/   \/   |______|_| \_|  |_|   \____/|_____/
```

## Table of Contents

- [Proventus](#proventus)
  - [Table of Contents](#table-of-contents)
  - [Technologies Used](#technologies-used)
  - [Setup](#setup)
  - [Usage](#usage)
  - [Install shadcn CLI](#install-shadcn-cli)
  - [Install components](#install-components)
  - [Use Supabase](#use-supabase)
  - [Docs](#docs)

## Technologies Used

![Node](https://img.shields.io/badge/Node%20js%2020.7.0-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![pnpm](https://img.shields.io/badge/pnpm%208.12.1-yellow?style=for-the-badge&logo=pnpm&logoColor=white)
![Next JS](https://img.shields.io/badge/next%20js%2014-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)

## Setup

```bash
pnpm install
# or
npm install
# or
yarn install
```

## Usage

```bash
pnpm run dev
# or
npm run dev
# or
yarn dev
```

## Install shadcn CLI

```bash
npx shadcn-ui@latest init
pnpm dlx shadcn-ui@latest init
```

## Install components

```bash
npx shadcn-ui@latest add $component
pnpm dlx shadcn-ui@latest add $component
```

## Use Supabase

```bash
# https://supabase.com/docs/guides/api/rest/generating-types
npx supabase login
pnpm dlx supabase login

npx supabase gen types typescript --project-id "$PROJECT_REF" --schema public > types/supabase.ts
pnpm dlx supabase gen types typescript --project-id "$PROJECT_REF" --schema public > types/supabase.ts
```

## Docs

[Next.js 14 + @supabase/ssr: authencation, oauth, page protection,CRUD](https://www.youtube.com/watch?v=PdmKlne1gRY)

[VercelGL - Next.js & Puppeteer](https://github.com/vikiival/vercelgl?tab=readme-ov-file)

[Optimize Puppeteer](https://gist.github.com/agungjk/ff542367470d156478f7381af2cf7e60)

[Chromium on Vercel (serverless)](https://gist.github.com/kettanaito/56861aff96e6debc575d522dd03e5725?permalink_comment_id=4640366)

[How to use Puppeteer on Vercel using NextJs](https://www.umuttufanoglu.dev/blog/puppeteer-nextjs)

[Using Puppeteer to read table data](https://javier-lopez.me/blog/puppeteer_read_table/)

[When do I use path params vs. query params in a RESTful API?](https://stackoverflow.com/questions/30967822/when-do-i-use-path-params-vs-query-params-in-a-restful-api)

[Table](https://muhimasri.com/blogs/react-editable-table/)
