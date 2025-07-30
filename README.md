## CNAB CLI

#### Leitor de Arquivos CNAB por Linha de Comando

![CNAB CLI](https://user-images.githubusercontent.com/placeholder/example-cli.gif)

---

## Visão Geral

Aplicação CLI para o teste tecnico da F3 Capital, desenvolvida para leitura, busca e extração de dados de arquivos CNAB (Centro Nacional de Automação Bancária), utilizando Node.js e TypeScript.

---

## Funcionalidades

| Comando  | Descrição                                                               |
| -------- | ----------------------------------------------------------------------- |
| `parse`  | Busca informações com base em posições fixas em linhas de um segmento.  |
| `search` | Pesquisa qualquer nome de empresa no arquivo CNAB e mostra sua posição. |
| `export` | Exporta os dados de empresas (segmento Q) para um arquivo JSON.         |

---

## Tecnologias utilizadas

- [TypeScript](https://www.typescriptlang.org/)
- [Commander](https://github.com/tj/commander.js) — CLI framework
- [Chalk](https://github.com/chalk/chalk) — Cores no terminal
- [Inquirer](https://github.com/SBoudrias/Inquirer.js) — Prompts interativos
- [Ora](https://github.com/sindresorhus/ora) — Indicador de loading
- [Jest + SWC](https://swc.rs/docs/usage/jest) — Testes de unidade

---

## Como rodar o projeto

### 1. Clone o repositório

```bash
git clone https://github.com/seu-usuario/cnab-cli.git
cd cnab-cli
```

### 2. Instale as dependências

```bash
npm install
```

### 3. Execute localmente com `ts-node`

```bash
npx ts-node bin/index.ts [comando] [opções]
```

**Exemplo:**

```bash
npx ts-node bin/index.ts parse --from 35 --to 73 --segment q

// Ou com apenas Javascript:

node dist/bin/index.js parse --from 34 --to 73 --segment p
```

---

## Comandos disponíveis

### `parse`

Extrai dados de um segmento específico, com base em posições fixas.

```bash
npx ts-node bin/index.ts parse --from 35 --to 73 --segment q
```

Caso você não informe os parâmetros, a CLI irá perguntar via prompt interativo.

---

### `search`

Busca um nome ou parte do nome da empresa em qualquer linha do arquivo.

```bash
npx ts-node bin/index.ts search --name "BRASIL COMERCIO E SERVICOS"
```

---

### `export`

Exporta os dados de empresas (nome, endereço, CEP, cidade, estado) do segmento `Q` para um JSON.

```bash
npx ts-node bin/index.ts export --out resultado.json
```

---

## Executar testes unitários

```bash
npm run test
```

> Os testes validam as funções principais de leitura, busca e exportação.

---

## Exemplo de arquivo CNAB

Os testes e execuções manuais usam o arquivo `__mocks__/sample-cnab.txt` como entrada padrão.
