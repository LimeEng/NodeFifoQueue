![](https://github.com/LimeEng/NodeFifoQueue/actions/workflows/ci.yaml/badge.svg)
[![npm (scoped)](https://img.shields.io/npm/v/@limeeng/fifo-queue.svg)](https://www.npmjs.com/package/@limeeng/fifo-queue)

# FIFO queue

This package provides a simple and efficient FIFO queue implemented using a circular buffer. Most operations run in O(1), while some require *amortized* O(1) due to occasional resizing of the internal array.

 - [Sample Code](#sample-code)
    - [API](#api)
    - [Benchmarks](#benchmarks)

# Sample Code
 
## API

- [`new FifoQueue()`](#new-fifoqueue---fifoqueue)
- [`offer(item)`](#offeritem---void)
- [`push(item)`](#pushitem---void)
- [`poll()`](#poll---any)
- [`shift()`](#shift---any)
- [`peek()`](#peek---any)
- [`size`](#size---int)
- [`isEmpty`](#isempty---boolean)
- [`clear()`](#clear---void)

### `new FifoQueue()` -> `FifoQueue`

Creates a new FIFO queue.

 ```js
const FifoQueue = require('@limeeng/fifo-queue')
const queue = new FifoQueue()
```

#### `offer(item)` -> `void`

Offer an item to the queue. Will throw an error if offered with undefined.

Complexity: `O(1) (amortized)`

```js
const FifoQueue = require('@limeeng/fifo-queue')
const queue = new FifoQueue()
queue.offer(1)
queue.offer('Hey!')
```

#### `push(item)` -> `void`

Alias for offer(item).

#### `poll()` -> `any`

Retrieves and removes the head of the queue, or returns `undefined` if the queue is empty.

Complexity: `O(1) (amortized)`

```js
const FifoQueue = require('@limeeng/fifo-queue')
const queue = new FifoQueue()
queue.offer('Hello World!')
console.log(queue.poll()) // Prints "Hello World!"
```

#### `shift()` -> `any`

Alias for poll().

#### `peek()` -> `any`

Retrieves the head of the queue, or `undefined` if the queue is empty.
Does *not* remove the element from the queue.

Complexity: `O(1)`

```js
const FifoQueue = require('@limeeng/fifo-queue')
const queue = new FifoQueue()
queue.offer(1)
console.log(queue.peek())
console.log(queue.peek()) // Prints "1" both times
```

#### `size` -> `int`

Returns the number of items stored in this queue.

Complexity: `O(1)`

```js
const FifoQueue = require('@limeeng/fifo-queue')
const queue = new FifoQueue()
queue.offer(1)
queue.offer(2)
console.log(queue.size) // Prints "2"
```

#### `isEmpty` -> `boolean`

Is `true` if the queue is empty, `false` otherwise.

Complexity: `O(1)`

```js
const FifoQueue = require('@limeeng/fifo-queue')
const queue = new FifoQueue()
console.log(queue.isEmpty) // Prints "true"
queue.offer(1)
console.log(queue.isEmpty) // Prints "false"
```

#### `clear()` -> `void`

Removes all items from the queue.

Complexity: `O(1)`

```js
const FifoQueue = require('@limeeng/fifo-queue')
const queue = new FifoQueue()
queue.offer(1)
queue.clear()
console.log(queue.peek()) // Prints "undefined"
```

## Benchmarks

``` 
Platform info:

Windows_NT 10.0.17134 x64
Node.js 10.5.0
V8 6.7.288.46-node.8
Intel(R) Core(TM) i7-7700K CPU @ 4.20GHz x 8

┌───────────────────────────────────────────────────────────────────────┐
│   Initialize queue with 10000000 elements then 3x shift and 3x push   │
├─────────────────────┬────────────────────┬──────────────┬─────────────┤
│ name                │ ops/sec            │ runs sampled │ performance │
├─────────────────────┼────────────────────┼──────────────┼─────────────┤
│ @limeeng/fifo-queue │ 76,616,024 ± 0.06% │ 97           │ fastest     │
├─────────────────────┼────────────────────┼──────────────┼─────────────┤
│ native array        │ 26.49 ± 0.17%      │ 48           │ -100.00%    │
└─────────────────────┴────────────────────┴──────────────┴─────────────┘

┌───────────────────────────────────────────────────────────────────────┐
│          Push until size is 10000 then shift until empty              │
├─────────────────────┬───────────────────┬───────────────┬─────────────┤
│ name                │ ops/sec           │ runs sampled  │ performance │
├─────────────────────┼───────────────────┼───────────────┼─────────────┤
│ @limeeng/fifo-queue │ 8,767 ± 0.08%     │ 97            │ fastest     │
├─────────────────────┼───────────────────┼───────────────┼─────────────┤
│ native array        │ 1,739 ± 1.88%     │ 97            │ -80.16%     │
└─────────────────────┴───────────────────┴───────────────┴─────────────┘
```
