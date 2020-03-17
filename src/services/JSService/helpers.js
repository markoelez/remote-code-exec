const getBaseFromTestCases = (methodName, testcases, methodToTest) => {
	let base = ['PLACEHOLDER']
	testcases.forEach((test, idx) => {
		base.push(`const testCase${idx} = () => {
      const input = ${test.input}
      const expected = ${test.output}
      const output = ${methodName}(${test.input})
      if (output === expected) {
        console.log('TEST CASE ${idx} PASSED')
      } else {
        console.log('TEST CASE ${idx} FAILED')
      }
    }
    testCase${idx}()
    `)
	})
	return base.join('').replace('PLACEHOLDER', methodToTest)
}

module.exports = { getBaseFromTestCases }
