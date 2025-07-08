# VueTruncateHtml Performance Testing System

## Overview

The performance testing system provides comprehensive assessment of the speed and efficiency of the `VueTruncateHtml` component. The system includes automatic execution time measurement, memory usage tracking, report generation, and performance monitoring.

## File Structure

```
src/
├── performance.config.ts      # Test configuration and thresholds
├── performance-multi.test.ts  # Multi-run tests with enhanced statistics
scripts/
├── performance-multi-report.js # Multi-run test report
├── performance-delta-report.js # HTML report generator for performance delta
docs/
└── performance-testing.md     # This documentation
```

## Available Commands

### Main Performance Testing Commands
- `npm run test:performance` - Run performance tests with verbose output
- `npm run test:performance:quiet` - Quiet mode for performance tests
- `npm run test:performance:report` - Detailed report with reliability analysis

### Regular Tests (excluded from performance)
- `npm test` - Run only functional tests (without performance)
- `npm run test:watch` - Watch mode for changes
- `npm run test:coverage` - Tests with code coverage

### HTML Performance Delta Reports
- `node scripts/performance-delta-report.js` - Generate HTML report with change visualization

### Test Separation
The testing system is divided into two types:
- **Functional tests** (`npm test`) - fast functionality tests
- **Performance tests** (`npm run test:performance`) - slow performance tests

## Test Categories

### PROCESSING
- **Large HTML content processing** - Processing large HTML documents
- **Large text content processing** - Processing large text blocks
- **Concurrent component creation** - Simultaneous component creation
- **Complex HTML structure** - Complex nested HTML structures

### REACTIVITY
- **Multiple re-renders** - Multiple re-renders
- **Computed properties reactivity** - Computed properties reactivity

### SANITIZATION
- **HTML sanitization overhead** - HTML sanitization overhead

### MEMORY
- **Memory usage** - Memory usage when creating multiple components

### EDGE-CASE
- **Edge case: extremely long word** - Processing extremely long words

## Threshold Values

| Test | Threshold | Description |
|------|-----------|-------------|
| Large HTML content processing | 100ms | Processing large HTML documents |
| Large text content processing | 50ms | Processing text blocks |
| Multiple re-renders | 200ms | Multiple re-renders |
| Computed properties reactivity | 100ms | Properties reactivity |
| HTML sanitization overhead | 150ms | HTML sanitization |
| Memory usage | 500ms | Memory usage |
| Edge case: extremely long word | 50ms | Edge cases |
| Concurrent component creation | 500ms | Simultaneous creation |
| Complex HTML structure | 200ms | Complex structures |

## Reports and Monitoring

### JSON Reports
- `performance-multi-report.json` - Multi-run test report with statistics
- `performance-delta.json` - Comparison with previous runs

### HTML Reports
- `performance-delta.html` - Visual performance change report with color coding

### Beautiful Reports
- `npm run test:performance:multi:report` - Report with reliability analysis

### Real-time Monitoring
- `npm run test:performance:monitor` - Continuous performance monitoring

## New Multi-run Testing System

### Features
- **Multiple runs**: Each test is executed 5 times for more accurate results
- **Statistical analysis**: Calculation of mean, median, standard deviation
- **Reliability analysis**: Coefficient of variation (CV) for stability assessment
- **Outlier exclusion**: Automatic exclusion of anomalous results
- **Stability assessment**: Test classification by reliability (HIGH/MEDIUM/LOW)

### Reliability Metrics
- **CV < 15%**: High reliability (🟢)
- **CV 15-30%**: Medium reliability (🟡)
- **CV > 30%**: Low reliability (🔴)

### Multi-run Test Configuration
```typescript
export const PERFORMANCE_CONFIG = {
  RUNS_COUNT: 5,           // Number of runs for averaging
  MIN_RUNS: 3,             // Minimum number of runs
  MAX_DEVIATION: 30,       // Maximum deviation between runs (%)
  EXCLUDE_OUTLIERS: true,  // Exclude outliers
  OUTLIER_PERCENTAGE: 0.1  // Percentage of outliers to exclude
};
```

## New HTML Performance Delta Report System

### HTML Report Features
- **Multilingual interface** - Russian localized interface
- **Modern design** - Responsive layout with gradients and shadows
- **Color coding**:
  - 🟢 Green - performance improvements
  - 🔴 Red - performance degradation
  - ⚪ Gray - no changes
- **Status icons**:
  - 📈 Improved
  - 📉 Degraded
  - ➡️ Unchanged

### HTML Report Structure
1. **Overall change summary** - Performance scores and duration metrics
2. **Change statistics** - Count of improved/degraded/unchanged tests
3. **Detailed test breakdown** - Comparison of previous and current values
4. **Performance metrics** - Execution time, percentage changes

### HTML Report Generation
```bash
# Run performance tests (generates performance-delta.json)
npm run test:performance

# Generate HTML report
node scripts/performance-delta-report.js
```

### Automatic Notifications
After running performance tests, the system automatically:
- Generates `performance-delta.json`
- Shows hint about HTML report generation
- Displays brief change summary in console

## Results Analysis

### Performance Statuses
- **EXCELLENT** - Execution time < 20% of threshold
- **GOOD** - Execution time 20-50% of threshold
- **WARNING** - Execution time 50-80% of threshold
- **SLOW** - Execution time 80-100% of threshold
- **CRITICAL** - Execution time > 100% of threshold

### Reliability Statuses
- **STABLE** - All tests have high reliability
- **MEDIUM** - Some tests have medium reliability
- **UNSTABLE** - There are tests with low reliability

### Delta Change Statuses (NEW!)
- **IMPROVED** - Performance improved (execution time decreased)
- **DEGRADED** - Performance degraded (execution time increased)
- **SAME** - Performance unchanged (difference < 1ms)

### Metrics
- **Processing time** - Average test execution time
- **Threshold percentage** - Ratio of execution time to threshold value
- **Data size** - Volume of processed data
- **Coefficient of variation** - Measure of result stability
- **Time delta** - Change in execution time between runs
- **Percentage change** - Relative performance change

## Configuration and Setup

### Changing Threshold Values
Edit the `src/performance.config.ts` file:

```typescript
export const PERFORMANCE_THRESHOLDS = {
  'Large HTML content processing': 100, // ms
  'Large text content processing': 50,  // ms
  // ... other tests
};
```

### Ignoring HTML Reports
HTML reports are automatically added to `.gitignore`:
```gitignore
performance-delta.html
performance-multi-report.html
```

### Adding New Tests
1. Add test to `src/performance-multi.test.ts`
2. Set threshold value in `src/performance.config.ts`
3. Add description to category

## Recommendations

1. **Regular monitoring**: Run tests after each change
2. **Performance tests**: Use `npm run test:performance` for critical changes
3. **HTML reports**: Use HTML reports for visual change analysis
4. **Trend analysis**: Track performance changes over time
5. **Optimization**: Pay attention to tests with low reliability
6. **CI/CD integration**: Include tests in deployment pipeline
7. **Visual analysis**: Use HTML reports for team result presentations

## Workflow Recommendations

### Typical Workflow
```bash
# 1. Run basic tests
npm run test:performance

# 2. Generate HTML report
node scripts/performance-delta-report.js

# 3. Analyze results in browser
# Open performance-delta.html in browser

# 4. For detailed analysis if needed
npm run test:performance:report
```

### CI/CD Integration
```yaml
# Example for GitHub Actions
- name: Run performance tests
  run: npm run test:performance

- name: Generate HTML report
  run: node scripts/performance-delta-report.js

- name: Archive performance reports
  uses: actions/upload-artifact@v3
  with:
    name: performance-reports
    path: |
      performance-delta.html
      performance-delta.json
```

## Support

For performance testing issues:

1. Check configuration correctness in `performance.config.ts`
2. Ensure all dependencies are installed
3. Check logs for errors
4. Use `npm run test:performance` for more detailed analysis
5. Check file permissions for `scripts/performance-delta-report.js`

## Versioning

The performance testing system is versioned together with the main component. When changing the component API, corresponding tests must be updated. 
