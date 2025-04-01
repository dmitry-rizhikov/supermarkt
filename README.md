# Supermarket application

This is nitropack/nodejs app attempts to simulate a supermarket cashier device.
It starts a web server which receives a shopping cart (list of products to be scanned) as a query parameter i.e. `scan=banana,apple,kiwi` and calculates the total prices according to the specified offers (see [data.json](./data/data.json)). 

Nitro KV Storage is used as persistence layer for the offer information.

Also `vitest` is used as testing framework and `biomejs` as linter/formatter

## Quick setup

1. `npm install`
2. `npm run dev`
3. `curl 'http://localhost:3000?scan=apple,apple,apple'`
