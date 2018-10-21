'use strict'

// Must be power of two
const initialCapacity = 16

class FifoQueue {

  constructor() {
    this._read = 0
    this._write = 0
    this._contents = new Array(initialCapacity)
  }

  offer(value) {
    if (value === undefined) {
      throw new TypeError('Undefined values are not permitted')
    }
    this._contents[this._write] = value
    this._write = (this._write + 1) & (this._contents.length - 1)
    if (this._read == this._write) {
      growArray(this)
    }
  }

  push(value) {
    this.offer(value)
  }

  poll() {
    // TODO: Where and when should we shrink the array?
    const result = this._contents[this._read]
    if (result === undefined) {
      return undefined
    }
    // Remove the element
    this._contents[this._read] = undefined
    this._read = (this._read + 1) & (this._contents.length - 1)
    return result
  }

  shift() {
    return this.poll()
  }

  peek() {
    return this.isEmpty ? undefined : this._contents[this._read]
  }

  clear() {
    this._read = 0
    this._write = 0
    this._contents = new Array(initialCapacity)
  }

  get size() {
    return (this._write - this._read) & (this._contents.length - 1)
  }

  get isEmpty() {
    return this._read === this._write
  }
}

// Doubles the capacity
function growArray(queue) {
  if (queue._read !== queue._write) {
    throw new RangeError('Array must be full before expanding')
  }
  const oldLength = queue._contents.length
  const newSize = oldLength * 2
  const newContents = new Array(newSize)
  for (let i = queue._read; i < oldLength; i++) {
    newContents[i - queue._read] = queue._contents[i]
  }
  for (let i = 0; i < queue._read; i++) {
    newContents[oldLength - queue._read + i] = queue._contents[i]
  }
  queue._contents = newContents
  queue._read = 0
  queue._write = oldLength
}

// Halves the capacity
function shrinkArray(queue) {

}

module.exports = FifoQueue
