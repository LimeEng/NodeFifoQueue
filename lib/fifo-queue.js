'use strict'

// Must be power of two
const initialCapacity = 16

class FifoQueue {

  constructor() {
    this.read = 0
    this.write = 0
    this.contents = new Array(initialCapacity)
  }

  offer(value) {
    if (value === undefined) {
      throw new TypeError('Undefined values are not permitted')
    }
    this.contents[this.write] = value
    this.write = (this.write + 1) & (this.contents.length - 1)
    if (this.read == this.write) {
      growArray(this)
    }
  }

  push(value) {
    this.offer(value)
  }

  poll() {
    // TODO: Where and when should we shrink the array?
    const result = this.contents[this.read]
    if (result === undefined) {
      return undefined
    }
    // Remove the element
    this.contents[this.read] = undefined
    this.read = (this.read + 1) & (this.contents.length - 1)
    return result
  }

  shift() {
    return this.poll()
  }

  peek() {
    return this.isEmpty ? undefined : this.contents[this.read]
  }

  clear() {
    this.read = 0
    this.write = 0
    this.contents = new Array(initialCapacity)
  }

  get size() {
    return (this.write - this.read) & (this.contents.length - 1)
  }

  get isEmpty() {
    return this.read === this.write
  }
}

// Doubles the capacity
function growArray(queue) {
  if (queue.read !== queue.write) {
    throw new RangeError('Array must be full before expanding')
  }
  const oldLength = queue.contents.length
  const newSize = oldLength * 2
  const newContents = new Array(newSize)
  for (let i = queue.read; i < oldLength; i++) {
    newContents[i - queue.read] = queue.contents[i]
  }
  for (let i = 0; i < queue.read; i++) {
    newContents[oldLength - queue.read + i] = queue.contents[i]
  }
  queue.contents = newContents
  queue.read = 0
  queue.write = oldLength
}

// Halves the capacity
function shrinkArray(queue) {

}

module.exports = FifoQueue
