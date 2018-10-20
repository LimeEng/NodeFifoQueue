'use strict'

const Benchmark = require('benchmark')
const FifoQueue = require('../../lib/fifo-queue.js')
const printPlatform = require('./print-platform.js')
const printBenchmarks = require('./print-benchmarks.js')

printPlatform()

const benchmarks1 = [10, 100, 1000, 10000, 100000, 1000000, 5000000, 10000000]
  .map(bound => runPushShift(bound))
const benchmarks2 = [10, 100, 1000, 10000]
  .map(bound => runPushToBoundThenShiftUntilEmpty(bound))

printBenchmarks(benchmarks1.concat(benchmarks2))

function runPushShift(bound) {
  const info = 'Initialize queue with ' + bound + ' elements then 3x shift and 3x push'
  return runSuite(info, () => createPushShift(bound))
}

function runPushToBoundThenShiftUntilEmpty(bound) {
  const info = 'Push until size is ' + bound + ' then shift until empty'
  return runSuite(info, () => createPushToBoundThenShiftUntilEmpty(bound))
}

function runSuite(info, suiteFactory) {
  console.log()
  console.log(info)
  console.log('-'.repeat(info.length))
  const obj = {
    title: info,
    results: []
  }
  suiteFactory()
    .on('cycle', function (e) {
      console.log(String(e.target))
    })
    .on('complete', function () {
      for (var i = 0; i < this.length; i++) {
        obj.results.push(this[i])
      }
    })
    .run()

  return obj
}

function createPushToBoundThenShiftUntilEmpty(bound) {
  return createBasicPerfSuite(queue => {
    return () => {
      for (let i = 0; i < bound; i++) {
        queue.push(i)
      }
      for (let i = bound - 1; i >= 0; i--) {
        queue.shift()
      }
    }
  })
}

function createPushShift(bound) {
  const zeroTo = bound => [...Array(bound).keys()]
  return createBasicPerfSuite(queue => {
    zeroTo(bound).forEach(item => queue.push(item))
    return () => {
      const a = queue.shift()
      const b = queue.shift()
      const c = queue.shift()

      queue.push(a)
      queue.push(b)
      queue.push(c)
    }
  })
}

function createBasicPerfSuite(createTestFunc) {
  let suite = new Benchmark.Suite()
  const queues = getDataStructures()

  queues.forEach(obj => {
    suite = suite.add(obj.name, createTestFunc(obj.queue))
  })
  return suite
}

function getDataStructures() {
  const queues = []

  queues.push({ name: '@limeeng/fifo-queue', queue: new FifoQueue() })
  queues.push({ name: 'native array', queue: [] })

  return queues
}
