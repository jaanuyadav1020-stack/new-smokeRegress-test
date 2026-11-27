## Flaky Test Detection
### New Read mee for smoke testing 
### Objective
To identify flaky Playwright tests by executing them repeatedly and detecting intermittent failures.

### Commands Used

**1. Run tests 20 times:**
```bash
npx playwright test tests/flaky.spec.ts --repeat-each=20
```

**2. Run tests with flaky test detection:**
```bash
npx playwright test tests/flaky.spec.ts --repeat-each=20 --fail-on-flaky-tests
```

### Configuration
The following retry configuration is used in `playwright.config.ts`:

```typescript
retries: 1,
```

### Explanation
- `--repeat-each=20`: Executes each test 20 times.
- `--fail-on-flaky-tests`: Fails the overall test run if any test is identified as flaky.
- `retries: 1`: Retries a failed test once to identify intermittent failures.

### Result
The repeated test execution helps identify inconsistent test behavior and detect flaky tests before CI execution.

### Evidence
Screenshots of the repeated test execution and flaky test detection are included in the project documentation.