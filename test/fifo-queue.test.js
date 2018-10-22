'use strict'

const assert = require('assert').strict
const Queue = require('../lib/fifo-queue.js')

describe('Fifo Queue', function () {
  describe('constructor', function () {
    it('should be empty when instantiated', function () {
      const queue = new Queue()
      assert.deepStrictEqual(queue.size, 0)
      assert.deepStrictEqual(queue.isEmpty, true)
      assert.deepStrictEqual(queue.peek(), undefined)
      assert.deepStrictEqual(queue.poll(), undefined)
    })
  })

  describe('.offer(value)', function () {
    it('should update size and isEmpty', function () {
      const queue = new Queue()
      for (let i = 1; i < 10; i++) {
        queue.offer(i)
        assert.deepStrictEqual(queue.size, i)
        assert.deepStrictEqual(queue.isEmpty, false)
        assert.deepStrictEqual(queue.peek(), 1)
      }
    })

    it('should not break down arrays', function () {
      const queue = new Queue()
      const data = [1, 2, 3, 4, 5]
      queue.offer(data)
      assert.deepStrictEqual(queue.size, 1)
      assert.deepStrictEqual(queue.isEmpty, false)
      assert.deepStrictEqual(queue.peek(), data)
    })

    it('should throw an error if offered undefined', function () {
      const queue = new Queue()
      const errorThrown = shouldThrow(() => queue.offer(undefined))
      assert.deepStrictEqual(errorThrown, true)
    })
  })

  describe('.push(value)', function () {
    it('should update size and isEmpty', function () {
      const queue = new Queue()
      for (let i = 1; i < 10; i++) {
        queue.push(i)
        assert.deepStrictEqual(queue.size, i)
        assert.deepStrictEqual(queue.isEmpty, false)
        assert.deepStrictEqual(queue.peek(), 1)
      }
    })

    it('should not break down arrays', function () {
      const queue = new Queue()
      const data = [1, 2, 3, 4, 5]
      queue.push(data)
      assert.deepStrictEqual(queue.size, 1)
      assert.deepStrictEqual(queue.isEmpty, false)
      assert.deepStrictEqual(queue.peek(), data)
    })

    it('should throw an error if offered undefined', function () {
      const queue = new Queue()
      const errorThrown = shouldThrow(() => queue.push(undefined))
      assert.deepStrictEqual(errorThrown, true)
    })
  })

  describe('.poll()', function () {
    it('should return undefined if called on an empty queue', function () {
      const queue = new Queue()
      assert.deepStrictEqual(queue.poll(), undefined)
    })

    it('should return the right element and remove it', function () {
      const queue = new Queue()
      queue.offer(1)
      queue.offer(2)
      queue.offer(3)
      assert.deepStrictEqual(queue.size, 3)
      assert.deepStrictEqual(queue.isEmpty, false)
      assert.deepStrictEqual(queue.poll(), 1)
      assert.deepStrictEqual(queue.size, 2)
      assert.deepStrictEqual(queue.isEmpty, false)
    })

    it('should empty the queue when called enough times', function () {
      const queue = new Queue()
      for (let i = 0; i < 10; i++) {
        queue.offer(i)
      }
      for (let i = 0; i < 10; i++) {
        assert.deepStrictEqual(queue.poll(), i)
      }
      assert.deepStrictEqual(queue.peek(), undefined)
      assert.deepStrictEqual(queue.poll(), undefined)
      assert.deepStrictEqual(queue.size, 0)
      assert.deepStrictEqual(queue.isEmpty, true)
    })
  })

  describe('.shift()', function () {
    it('should return undefined if called on an empty queue', function () {
      const queue = new Queue()
      assert.deepStrictEqual(queue.shift(), undefined)
    })

    it('should return the right element and remove it', function () {
      const queue = new Queue()
      queue.offer(1)
      queue.offer(2)
      queue.offer(3)
      assert.deepStrictEqual(queue.size, 3)
      assert.deepStrictEqual(queue.isEmpty, false)
      assert.deepStrictEqual(queue.shift(), 1)
      assert.deepStrictEqual(queue.size, 2)
      assert.deepStrictEqual(queue.isEmpty, false)
    })

    it('should empty the queue when called enough times', function () {
      const queue = new Queue()
      for (let i = 0; i < 10; i++) {
        queue.offer(i)
      }
      for (let i = 0; i < 10; i++) {
        assert.deepStrictEqual(queue.shift(), i)
      }
      assert.deepStrictEqual(queue.peek(), undefined)
      assert.deepStrictEqual(queue.shift(), undefined)
      assert.deepStrictEqual(queue.size, 0)
      assert.deepStrictEqual(queue.isEmpty, true)
    })
  })

  describe('.peek()', function () {
    it('should return undefined if called on an empty queue', function () {
      const queue = new Queue()
      assert.deepStrictEqual(queue.peek(), undefined)
    })

    it('should return the right element, but not remove it', function () {
      const queue = new Queue()
      queue.offer(1)
      queue.offer(2)
      queue.offer(3)
      assert.deepStrictEqual(queue.size, 3)
      assert.deepStrictEqual(queue.isEmpty, false)
      assert.deepStrictEqual(queue.peek(), 1)
      assert.deepStrictEqual(queue.size, 3)
      assert.deepStrictEqual(queue.isEmpty, false)
    })
  })

  describe('.clear()', function () {
    it('should clear the queue', function () {
      const queue = new Queue()
      for (let i = 0; i < 10; i++) {
        queue.offer(i)
      }
      assert.deepStrictEqual(queue.size, 10)
      assert.deepStrictEqual(queue.isEmpty, false)
      queue.clear()
      assert.deepStrictEqual(queue.size, 0)
      assert.deepStrictEqual(queue.isEmpty, true)
      assert.deepStrictEqual(queue.peek(), undefined)
    })

    it('should do nothing on an empty queue', function () {
      const queue = new Queue()
      assert.deepStrictEqual(queue.size, 0)
      assert.deepStrictEqual(queue.isEmpty, true)
      assert.deepStrictEqual(queue.peek(), undefined)
      assert.deepStrictEqual(queue.poll(), undefined)
      queue.clear()
      assert.deepStrictEqual(queue.size, 0)
      assert.deepStrictEqual(queue.isEmpty, true)
      assert.deepStrictEqual(queue.peek(), undefined)
      assert.deepStrictEqual(queue.poll(), undefined)
    })
  })

  describe('.isEmpty', function () {
    it('should return true on newly instantiated queue', function () {
      const queue = new Queue()
      assert.deepStrictEqual(queue.isEmpty, true)
      assert.deepStrictEqual(queue.size, 0)
      assert.deepStrictEqual(queue.peek(), undefined)
      assert.deepStrictEqual(queue.poll(), undefined)
    })

    it('should return false on non-empty queue', function () {
      const queue = new Queue()
      queue.offer(1)
      assert.deepStrictEqual(queue.isEmpty, false)
      assert.deepStrictEqual(queue.size, 1)
      assert.deepStrictEqual(queue.peek(), 1)
      assert.deepStrictEqual(queue.poll(), 1)
      assert.deepStrictEqual(queue.isEmpty, true)
      assert.deepStrictEqual(queue.size, 0)
    })
  })

  describe('stress testing', function () {
    it('should resize the internal array when needed', function () {
      const queue = new Queue()
      let externalSizeCounter = 0
      // NOTE! This is purely for testing.
      // The internal attributes should never be touched or relied upon.
      let lastArraySize = queue._contents.length
      for (let i = 0; i < 1000000; i++) {
        queue.offer(i)
        externalSizeCounter += 1
        assert.deepStrictEqual(queue.size, externalSizeCounter)
        assert.deepStrictEqual(queue.isEmpty, externalSizeCounter === 0)
        assert.deepStrictEqual(queue.peek(), 0)
        if (i >= lastArraySize) {
          const currentSize = queue._contents.length
          assert.deepStrictEqual(queue.isEmpty, externalSizeCounter === 0)
          assert.notDeepStrictEqual(lastArraySize, currentSize)
          lastArraySize = currentSize
        }
      }
      for (let i = 0; i < 1000000; i++) {
        assert.deepStrictEqual(queue.poll(), i)
        externalSizeCounter -= 1
        assert.deepStrictEqual(queue.size, externalSizeCounter)
        assert.deepStrictEqual(queue.isEmpty, externalSizeCounter === 0)
        // TODO: Add some sorts of tests to test that the size is changing here too. But when?
      }
      assert.notDeepStrictEqual(lastArraySize, queue._contents.length)
      assert.deepStrictEqual(queue.size, 0)
      assert.deepStrictEqual(queue.isEmpty, true)
      assert.deepStrictEqual(queue.peek(), undefined)
      assert.deepStrictEqual(queue.poll(), undefined)
      assert.deepStrictEqual(queue.size, 0)
      assert.deepStrictEqual(queue.isEmpty, true)
    })

    it('should be able to handle a large amount of elements', function () {
      // TODO: What a mess
      const queue = new Queue()
      let externalSizeCounter = 0
      let latestPolled = 0
      for (let i = 0; i < 100000; i++) {
        queue.offer(i)
        externalSizeCounter += 1
        assert.deepStrictEqual(queue.size, externalSizeCounter)
        assert.deepStrictEqual(queue.isEmpty, externalSizeCounter === 0)
        assert.deepStrictEqual(queue.peek(), 0)
      }
      for (let i = 0; i < 100000 / 2; i++) {
        latestPolled = queue.poll()
        externalSizeCounter -= 1
        assert.deepStrictEqual(latestPolled, i)
        assert.deepStrictEqual(queue.size, externalSizeCounter)
        assert.deepStrictEqual(queue.isEmpty, externalSizeCounter === 0)
      }
      for (let i = 0; i < 100000; i++) {
        queue.offer(i)
        externalSizeCounter += 1
        assert.deepStrictEqual(queue.size, externalSizeCounter)
        assert.deepStrictEqual(queue.isEmpty, externalSizeCounter === 0)
        assert.deepStrictEqual(queue.peek(), latestPolled + 1)
      }
      for (let i = 0; i < 100000 / 2; i++) {
        latestPolled = queue.poll()
        externalSizeCounter -= 1
        assert.deepStrictEqual(latestPolled, (100000 / 2) + i)
        assert.deepStrictEqual(queue.size, externalSizeCounter)
        assert.deepStrictEqual(queue.isEmpty, externalSizeCounter === 0)
      }
      for (let i = 0; i < 100000; i++) {
        latestPolled = queue.poll()
        externalSizeCounter -= 1
        assert.deepStrictEqual(latestPolled, i)
        assert.deepStrictEqual(queue.size, externalSizeCounter)
        assert.deepStrictEqual(queue.isEmpty, externalSizeCounter === 0)
      }
      assert.deepStrictEqual(queue.size, externalSizeCounter)
      assert.deepStrictEqual(queue.isEmpty, externalSizeCounter === 0)
      for (let i = 0; i < 100000; i++) {
        queue.offer(i)
        externalSizeCounter += 1
        assert.deepStrictEqual(queue.size, externalSizeCounter)
        assert.deepStrictEqual(queue.isEmpty, externalSizeCounter === 0)
        assert.deepStrictEqual(queue.peek(), 0)
      }
      queue.clear()
      assert.deepStrictEqual(queue.size, 0)
      assert.deepStrictEqual(queue.isEmpty, true)
      assert.deepStrictEqual(queue.peek(), undefined)
      assert.deepStrictEqual(queue.poll(), undefined)
      assert.deepStrictEqual(queue.size, 0)
      assert.deepStrictEqual(queue.isEmpty, true)
    })
  })
})

function shouldThrow(func) {
  try {
    func()
    return false
  } catch (err) {
    return true
  }
}

const shouldNotThrow = func => !shouldThrow(func)

const zeroTo = bound => [...Array(bound).keys()]
