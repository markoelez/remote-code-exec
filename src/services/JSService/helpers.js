const BASE = `
PLACEHOLDER
const testCase1 = () => {
  const input = 3
  const expected = 2
  const output = fib(input)
  if (output === expected) {
    console.log('TEST CASE 1 PASSED')
  } else {
    console.log('TEST CASE 1 FAILED')
  }
}
testCase1()
`

const PLACEHOLDER = 'PLACEHOLDER'

module.exports = { BASE, PLACEHOLDER }
