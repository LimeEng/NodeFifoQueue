'use strict'

const Benchmark = require('benchmark')
const FifoQueue = require('../../lib/fifo-queue.js')
const printPlatform = require('./print-platform.js')

printPlatform()

const bounds = [10, 100, 1000, 10000, 100000, 1000000, 5000000, 10000000]
bounds.forEach(bound => runPushShiftBenchMarkWithInitialSize(bound))

function runPushShiftBenchMarkWithInitialSize(bound) {
  const info = '3x shift + 3x push per op, initial size of ' + bound
  console.log()
  console.log(info)
  console.log('-'.repeat(info.length))
  createBasicPerfSuite(bound)
    .on('cycle', function (e) {
      console.log(String(e.target))
    })
    .run()
}

function createBasicPerfSuite(bound) {
  let suite = new Benchmark.Suite()
  const zeroTo = bound => [...Array(bound).keys()]
  function createFuncWithQueue(queue) {
    return () => {
      const a = queue.shift()
      const b = queue.shift()
      const c = queue.shift()

      queue.push(a)
      queue.push(b)
      queue.push(c)
    }
  }

  const queues = []

  queues.push({ name: '@limeeng/fifo-queue', queue: new FifoQueue() })
  queues.push({ name: 'native array', queue: [] })

  zeroTo(bound).forEach(item => queues.forEach(obj => obj.queue.push(item)))

  queues.forEach(obj => {
    suite = suite.add(obj.name, createFuncWithQueue(obj.queue))
  })
  return suite
}
