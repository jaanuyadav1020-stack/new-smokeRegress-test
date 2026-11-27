
# Playwright Flakiness Report

## Test Name
Flaky test using hard-coded wait

## Test Configuration
- Repeat count: 20
- Workers: 1
- Hard-coded wait: 500ms
- Assertion timeout: 300ms

## Initial Results
- Total runs: 20
- Passed: 0
- Failed: 20
- Failure rate: 100%

## Root Cause
The test uses a hard-coded wait and checks
the button before it is guaranteed to appear.
This creates a race condition.

## Solution
Replace waitForTimeout with a web-first
assertion using expect(locator).toBeVisible().


## Fixed Test Results

- Total runs: 20
- Passed: 20
- Failed: 0
- Failure rate: 0%

## Comparison

| Metric | Before Fix | After Fix |
|---|---:|---:|
| Total runs | 20 | 20 |
| Passed | Actual | 20 |
| Failed | Actual | 0 |
| Failure rate | Actual % | 0% |

## Conclusion

The initial test was unreliable because it
used a hard-coded wait and suffered from a
race condition.

After replacing waitForTimeout() with
expect().toBeVisible(), Playwright waited
automatically for the element.

The fixed test passed all 20 executions,
improving test stability and reliability.
