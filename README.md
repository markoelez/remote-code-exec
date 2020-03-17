# remote-code-exec API

## API Reference

Base URL: `/api/tasks`

| URL | Method | Description | Parameters |
|:-------------------------------:|:------:|:---------------------------------------:|:-----------------------------------:|
| /java | POST | Test Java program against provided testcases. | data & testCaseData |
| /javascript | POST | Test JavaScript program against provided testcases. | data & testCaseData |

## Format

Inputs should follow the convention below:

The `data` param should be the function-to-test in string format.

example.

```java
public class Solution {
    public int fib(int N) {
        if (N <= 1) {
            return N;
        }
        return fib(N-1) + fib(N-2);
    }
}
```

The `testCaseData` param should be an object containing the name of the method to test, and the inputs/expected outputs to be tested.

example.

```javascript
{
  baseMethod: 'fib',
  data: [
    { input: 4, output: 3 },
    { input: 2, output: 1 },
    { input: 3, output: 2 },
    { input: 10, output: 55 }
  ]
  }
```

The API will return a list of passed/failed testcases.
