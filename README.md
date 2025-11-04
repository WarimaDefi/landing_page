# Warima Platform - Landing Page

[![Licence: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](License)
[![Build Status](https://img.shields.io/github/actions/workflow/status/WarimaDefi/landing_page/deploy.yml?branch=main)](https://github.com/WarimaDefi/landing_page/actions)
[![Vercel Deployment](https://vercelbadge.vercel.app/api/WarimaDefi/landing_page)](https://vercel.com)
[![Foundry](https://img.shields.io/badge/Powered%20by-Foundry-orange)](https://book.getfoundry.sh/)
[![Solidity](https://img.shields.io/badge/Solidity-%5E0.8.x-blue)](https://soliditylang.org/)

---

## Overview
**Warima** is an African-born **fintech & DeFi ecosystem** that merges *stokvel*-style community savings with **DAO governance**, **AI**, and **blockchain technology**.
It empowers members to collectively fund, own, and benefit from off-chain projects like **hydroponic farming**, **livestock rearing**, **logistics**, and **property development**, through **smart contracts** and **tokenized participation**.

This repository hosts both:
- The **Landing Page** - built with modern web technologies (TypeScript + Vite + Tailwind CSS)
- The **Smart Contracts** - written in **Solidity** and tested/deployed via **Foundry** on **Anvil testnet**

---

## Tech Stack

### Frontend
- **Typescript** - core logic and component structure
- **Tailwind CSS** - Styling and responsive design
-- **Node.js / nom** - package management and scripting
-- **Vite** - build and development tool
-- **Vercel** - deployment and hosting

### Blockchain / Smart Contracts
- **Solidity (v0.8.19)** - contract development
- **Foundry (Forge)** - testing and development
- **Openzeppelin** - secure and modular contract base
- **wagmi** - wallet connect
- **Anvil** - local test network
- **Ethereum / EVM-compatible networks** - main deployment targets

---

## Features
### Web App
- Responsive design for mobile and desktop
- Fast static rendering with Vite
- Connects to on-chain data and smart contracts (coming soon)
- Optimized for performance and SEO (coming soon)

### Smart Contracts
- DAO token & governance modules
- Trasury and contribution pool management
- Member reward distribution
- Stokvel-inspired group saving and payout automation

---

## Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) v16+
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com)
- [Foundry](https://book.getfoundry.sh) (for solidity development)

## Clone the Repository
```bash
git clone https://github.com/WarimaDefi/landing_page.git
cd landing_page

npm install
# or
yarn install

npm run dev
# or
yarn dev

Visit http://localhost:3000

npm run build

### Smart Contracts
If you do not have Foundry installed:
curl -L https://foundry.paradigm.xyz | bash
foundryup

### Build Contracts
forge build
forge test

**Foundry is a blazing fast, portable and modular toolkit for Ethereum application development written in Rust.**

Foundry consists of:

- **Forge**: Ethereum testing framework (like Truffle, Hardhat and DappTools).
- **Cast**: Swiss army knife for interacting with EVM smart contracts, sending transactions and getting chain data.
- **Anvil**: Local Ethereum node, akin to Ganache, Hardhat Network.
- **Chisel**: Fast, utilitarian, and verbose solidity REPL.

## Documentation

https://book.getfoundry.sh/

## Usage

### Build

```shell
$ forge build
```

### Test

```shell
$ forge test
```

### Format

```shell
$ forge fmt
```

### Gas Snapshots

```shell
$ forge snapshot
```

### Anvil

```shell
$ anvil
```

### Deploy

```shell
$ forge script script/Counter.s.sol:CounterScript --rpc-url <your_rpc_url> --private-key <your_private_key>
```

### Cast

```shell
$ cast <subcommand>
```

### Help

```shell
$ forge --help
$ anvil --help
$ cast --help
```
