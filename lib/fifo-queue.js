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
      throw new Error('Undefined values are not permitted')
    }
    this.contents[this.write] = value
    this.write = (this.write + 1) % this.contents.length
    if (this.read == this.write) {
      // TODO: Implement
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
    this.read = (this.read + 1) % this.contents.length
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
    this.contents = new Array(16)
  }

  get size() {
    return (this.write - this.read) % this.contents.length
  }

  get isEmpty() {
    return this.read === this.write
  }
}

function growArray(queue) {

}

function shrinkArray(queue) {

}

module.exports = FifoQueue
