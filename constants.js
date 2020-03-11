const BASE_CLASS = `
class tmp {
  public static void main(String[] args) {
    PLACEHOLDER
  }
}
`

const PLACEHOLDER = 'PLACEHOLDER'

const COMPILE_PROG =
	'docker run --rm -v $PWD:/app -w /app java:8 javac tmp.java'

const EXEC_PROG = 'docker run --rm -v $PWD:/app -w /app java:8 java tmp'

// const COMPILE_PROG = 'docker run --rm -v  java:8 javac tmp.java'

// const EXEC_PROG = 'docker run --rm -v java:8 java tmp'

module.exports = {
	BASE_CLASS,
	COMPILE_PROG,
	EXEC_PROG,
	PLACEHOLDER
}
