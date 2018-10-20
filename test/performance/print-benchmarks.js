'use strict'

const Table = require('cli-table3');

function printBenchmarks(benchmarks) {
  const longestTitle = Math.max(...(benchmarks
    .map(item => item.title)
    .map(title => title.length)))
  benchmarks.forEach(benchmark => printAsTable(benchmark, longestTitle))
}

function printAsTable(benchmark, longestTitle) {

  var table = new Table({ style: { head: [], border: [] } })

  const arrays = benchmark.results.map(item => {
    return [
      item.name,
      formatNumber(item.hz.toFixed(item.hz < 100 ? 2 : 0)) + ' \xb1 ' + item.stats.rme.toFixed(2) + '%',
      item.stats.sample.length
    ]
  })

  table.push(
    [{ hAlign:'center', colSpan: 3, content: padTitle(benchmark.title, longestTitle) }],
    ['name', 'ops/sec', 'runs sampled'],
  )
  arrays.forEach(row => table.push(row))
  console.log(table.toString())
}

function formatNumber(number) {
  return Intl.NumberFormat('en-US').format(number)
}

function padTitle(title, targetLength) {
  let end = true
  while (title.length < targetLength) {
    title = end ? title + ' ' : ' ' + title
    end = !end
  }
  return title
}

module.exports = printBenchmarks
