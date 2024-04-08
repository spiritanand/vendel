# Vendel React SDK

This is the official React SDK for integrating Vendel checkouts. It provides a simple way to integrate Vendel into your
React application.

## Installation

To install the SDK, run the following command:

```bash
npm i @spiritanandio/vendel-react

or

yarn add @spiritanandio/vendel-react
  
or

pnpm add @spiritanandio/vendel-react 
```

## Usage

```jsx
import VendelCheckout from '@spiritanandio/vendel-react';

function Main() {
  return (
    <App
    >
      <VendelCheckout productId = {yourProductId} />
      <OtherComponents />
    </App>
  );
}
```
