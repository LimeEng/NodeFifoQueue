'use strict'

class FifoQueue {

  constructor() {
    this.read = 0
    this.write = 0
    this.contents = new Array(16)
  }

  offer(value) {
    if (value === undefined) {
      throw new Error('Undefined values are not permitted')
    }
    this.contents.push(value)
  }

  push(value) {
    this.offer(value)
  }

  poll() {
    return this.contents.shift()
  }

  shift() {
    return this.poll()
  }

  peek() {
    return this.contents[0]
  }

  clear() {
    this.contents = []
  }

  get size() {
    return this.contents.length
  }

  get isEmpty() {
    return this.read === this.head
  }
}

function growArray(queue) {

}

function shrinkArray(queue) {

}

module.exports = FifoQueue
