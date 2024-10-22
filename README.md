# Vendel

Vendel is a checkout system that allows users to make payments using Solana (SOL) tokens. It simplifies the integration of Solana payments into web applications by providing essential tools and an SDK.

## Features

- **Solana Token Checkout**: Facilitate payments using SOL tokens.
- **React SDK**: Easy-to-use SDK for integration with React applications.

## Tech Stack
- **Next.js & Tailwind CSS**: Built with modern technologies to ensure performance and ease of customization.
- **Monorepo**: Organized with Turborepo for managing multiple apps and packages.

## Project Structure

- **apps**: Contains the main applications.
  - **web**: Main frontend application built with Next.js.
  - **webhooks**: (WIP) Webhook server to send payment events.
- **packages**: Shared components and configurations.
- **sdk**: Contains all the SDKs.
  - **react**: React SDK to integrate Vendel into any react project with ease (for embedded checkouts)
