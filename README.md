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
  - [Use Drizzle](#use-drizzle)
  - [Project structure](#project-structure)
    - [app](#app)
    - [components](#components)
    - [enums](#enums)
    - [lib](#lib)
    - [services](#services)
    - [styles](#styles)
    - [types](#types)
    - [utils](#utils)
  - [PostgresSQL naming conventions](#postgressql-naming-conventions)
    - [1. Table Names](#1-table-names)
    - [2. Column Names](#2-column-names)
    - [3. Index Names](#3-index-names)
    - [4. Primary and Foreign Key Names](#4-primary-and-foreign-key-names)
    - [5. Sequence names](#5-sequence-names)
    - [6. View Names](#6-view-names)
    - [7. Functions and Procedures](#7-functions-and-procedures)
  - [Conventional commits](#conventional-commits)
  - [Data standardization](#data-standardization)
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
npx shadcn init
pnpm dlx shadcn init
```

## Install components

```bash
npx shadcn add $component
pnpm dlx shadcn add $component
```

## Use Supabase

```bash
# https://supabase.com/docs/guides/api/rest/generating-types
npx supabase login
pnpm dlx supabase login

npx supabase gen types typescript --project-id "$PROJECT_REF" --schema analytics > /lib/db/database.types.ts
pnpm dlx supabase gen types typescript --project-id "$PROJECT_REF" --schema analytics > /lib/db/database.types.ts
```

## Use Drizzle

```bash
npx drizzle-kit
pnpm dlx drizzle-kit
```

Apply migrations

```bash
# Generate SQL file
npx drizzle-kit generate
pnpm run migrations:generate

# Apply migrations
npx drizzle-kit migrate
pnpm run migrations:migrate

# Drop migrations
npx drizzle-kit drop
pnpm run migrations:drop
```

## Project structure

### app

The `app` directory works alongside the pages directory to allow for incremental adoption. This allows you to opt some routes of your application into the new behavior while keeping other routes in the pages directory for previous behavior.

### components

This folder contains reusable UI components used throughout the application, such as buttons, cards, navigation bars, or form elements.

### enums

The enums folder contains enumerations or constants used across the application. These enumerations can be used to define a set of named constants that represent a set of possible values for a specific property or attribute.

### lib

The lib folder contains utility functions, helper classes, or modules used across the application. These utilities might include custom hooks, data manipulation functions, or third-party libraries that are used globally.

### services

The services folder holds modules or classes responsible for interacting with external services such as APIs, databases, or authentication services. These services encapsulate communication logic and keep it separate from UI components.

### styles

The styles folder contains global styles, theme definitions, or CSS variables used across the application. These styles can be used to define colors, typography, spacing, or other design tokens that are used consistently throughout the app.

### types

The types folder contains TypeScript type definitions used across the application. These types can be used to define custom types, interfaces, or enums that are used to enforce type safety and improve code readability.

### utils

This folder contains utility functions or helper classes used across the application for common tasks such as data manipulation, date formatting, validation, or other operations.

## PostgresSQL naming conventions

In PostgreSQL, naming conventions are important to maintain consistency and clarity in the database. Here are some recommendations and common practices:

### 1. Table Names

- **Singular vs. Plural:** It is preferable to use singular names for tables (e.g., customer instead of clients).
- **Lower case:** Use lower case for names (e.g., customer).
- **Underscores:** Separate words with underscores (e.g., purchase_order).

### 2. Column Names

- **Descriptive:** Use descriptive names that reflect the content of the column (e.g., name, creation_date).
- **Lower case:** As with tables, use lower case.
- **Underscores:** Separate words with underscores (e.g., birth_date).
  
### 3. Index Names

- **Prefixes:** Include a prefix to indicate that it is an index, commonly idx (e.g., idx_client_name).
- **Descriptive:** Include the names of the columns that form the index (e.g., idx_date_order).

### 4. Primary and Foreign Key Names

- **Prefixes:** Use prefixes such as pk for primary keys and fk for foreign keys (e.g., pk_client_id, fk_order_client_id).
- **Descriptive:** Include the table name and related column (e.g., fk_client_order_id).

### 5. Sequence names

- **Prefixes:** Use the prefix seq (e.g., seq_client_id).
- **Descriptive:** Include the table name and associated column (e.g., seq_order_id).

### 6. View Names

- **Prefixes:** Use the prefix vw or view (e.g., vw_active_customers).
- **Descriptive:** Clearly indicate the purpose of the view (e.g., view_sales_per_month).

### 7. Functions and Procedures

- **Prefixes:** Use prefixes that indicate the type, such as fn for functions and sp for stored procedures (e.g., fn_calculate_total, sp_update_customer).
- **Verbs:** Use verbs that describe the action performed by the function or procedure (e.g., calculate, update).

## Conventional commits

A specification for adding human and machine readable meaning to commit messages

- [Extension](https://marketplace.visualstudio.com/items?itemName=vivaxy.vscode-conventional-commits)
- [Docs](https://www.conventionalcommits.org/en/v1.0.0/#specification)

The commit message should be structured as follows:

```text

<type>[optional scope]: <description>

[optional body]

[optional footer(s)]

```

```text
fix: prevent racing of requests

Introduce a request id and a reference to latest request. Dismiss
incoming responses other than from latest request.

Remove timeouts which were used to mitigate the racing issue but are
obsolete now.

Reviewed-by: Z
Refs: #123
```

## Data standardization

- Problems:

Time: Seconds
Memory: Megabytes

- Submissions:
Time: Milliseconds
Memory: Kilobytes
Submit Time: hh:mm:ss

## Docs

[Next.js 14 + @supabase/ssr: authencation, oauth, page protection,CRUD](https://www.youtube.com/watch?v=PdmKlne1gRY)

[VercelGL - Next.js & Puppeteer](https://github.com/vikiival/vercelgl?tab=readme-ov-file)

[Optimize Puppeteer](https://gist.github.com/agungjk/ff542367470d156478f7381af2cf7e60)

[Chromium on Vercel (serverless)](https://gist.github.com/kettanaito/56861aff96e6debc575d522dd03e5725?permalink_comment_id=4640366)

[How to use Puppeteer on Vercel using NextJs](https://www.umuttufanoglu.dev/blog/puppeteer-nextjs)

[Using Puppeteer to read table data](https://javier-lopez.me/blog/puppeteer_read_table/)

[When do I use path params vs. query params in a RESTful API?](https://stackoverflow.com/questions/30967822/when-do-i-use-path-params-vs-query-params-in-a-restful-api)

[Editable Table](https://muhimasri.com/blogs/react-editable-table/)

[ORM](https://orm.drizzle.team/docs/get-started-postgresql#supabase)

[shadcn/ui expansions](https://shadcnui-expansions.typeart.cc/docs)

[Add and Remove Table Rows with React TanStack](https://muhimasri.com/blogs/add-remove-react-table-rows/)
