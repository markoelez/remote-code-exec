const getBaseFromTestCases = (methodName, testcases) => {
	// class header
	let base = ['class Main { public static void main(String[] args) {']
	const numCases = testcases.length
	// call tests
	for (let i = 0; i < numCases; ++i) {
		base.push('testCase', i, '();')
	}
	// main method footer
	base.push('return; }')
	// test case implementations
	console.log('implementing test cases', base.join(''))
	testcases.forEach((test, idx) => {
		base.push(`private static void testCase${idx}() {
      int input = ${test.input};
      int expected = ${test.output};
      int output = new Solution().${methodName}(${test.input});
      // check if output matches expected
      if (output == expected) {
        System.out.println("TEST CASE ${idx} PASSED");
      } else {
        System.out.println("TEST CASE ${idx} FAILED");
      }
    }`)
	})
	// class footer
	base.push('}')
	return base.join('')
}

module.exports = { getBaseFromTestCases }
