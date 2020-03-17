const BASE = `
class Main {
  public static void main(String[] args) {
    testCase1();
    testCase2();
    testCase3();
    return;
  }

  private static void testCase1() {
    int input = 4;
    int expected = 3;
    int output = new Solution().fib(input);
    // check if output matches expected
    if (output == expected) {
      System.out.println("TEST CASE 1 PASSED");
    } else {
      System.out.println("TEST CASE 1 FAILED");
    }
  }

  private static void testCase2() {
    int input = 2;
    int expected = 1;
    int output = new Solution().fib(input);
    // check if output matches expected
    if (output == expected) {
      System.out.println("TEST CASE 2 PASSED");
    } else {
      System.out.println("TEST CASE 2 FAILED");
    }
  }

  private static void testCase3() {
    int input = 3;
    int expected = 2;
    int output = new Solution().fib(input);
    // check if output matches expected
    if (output == expected) {
      System.out.println("TEST CASE 3 PASSED");
    } else {
      System.out.println("TEST CASE 3 FAILED");
    }
  }
}
`

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
	testcases.forEach((val, idx) => {
		base.push(`private static void testCase${idx}() {
      int input = ${val.input};
      int expected = ${val.output};
      int output = new Solution().${methodName}(${val.input});
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

const PLACEHOLDER = 'PLACEHOLDER'

module.exports = { BASE, PLACEHOLDER, getBaseFromTestCases }
