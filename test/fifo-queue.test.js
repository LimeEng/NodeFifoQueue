'use strict'

const assert = require('assert').strict
const Queue = require('../lib/fifo-queue.js')

describe('Fifo Queue', function () {
  describe('constructor', function () {

  })

  describe('.offer(value)', function () {

  })

  describe('.poll()', function () {

  })

  describe('.peek()', function () {

  })

  describe('.clear()', function () {

  })

  describe('.size and isEmpty', function () {

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
