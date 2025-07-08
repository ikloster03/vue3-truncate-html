import { mount } from '@vue/test-utils';
import { nextTick } from 'vue';
import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import VueTruncateHtml from './VueTruncateHtml.vue';
import { PERFORMANCE_CONFIG, getThreshold } from './performance.config';

function generateHtmlReport(): void {
  try {
    execSync('node scripts/performance-delta-report.js', { stdio: 'inherit' });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log('⚠️  Failed to generate HTML delta report:', error);
  }
}

interface PerformanceRun {
  runNumber: number;
  processingTime: number;
  timestamp: string;
}

interface PerformanceMetrics {
  testName: string;
  runs: PerformanceRun[];
  averageTime: number;
  minTime: number;
  maxTime: number;
  standardDeviation: number;
  coefficient: number;
  threshold: number;
  status: 'PASS' | 'FAIL' | 'UNSTABLE';
  percentage: number;
  dataSize: string;
  details: string;
  category: string;
  description: string;
  reliability: 'HIGH' | 'MEDIUM' | 'LOW';
}

interface ReportResult {
  name: string;
  averageTime: number;
  minTime: number;
  maxTime: number;
  standardDeviation: number;
  coefficient: number;
  threshold: number;
  status: 'PASS' | 'FAIL' | 'UNSTABLE';
  category: string;
  description: string;
  dataSize: string;
  details: string;
  score: number;
  reliability: 'HIGH' | 'MEDIUM' | 'LOW';
  runs: PerformanceRun[];
}

interface MultiRunReport {
  summary: {
    totalTests: number;
    passed: number;
    failed: number;
    unstable: number;
    overallStatus: 'PASS' | 'FAIL' | 'UNSTABLE';
    timestamp: string;
    totalDuration: number;
    averageDuration: number;
    score: number;
    reliability: 'HIGH' | 'MEDIUM' | 'LOW';
    runsPerTest: number;
  };
  results: ReportResult[];
}

interface PerformanceDelta {
  summary: {
    previousScore: number;
    currentScore: number;
    scoreDelta: number;
    previousDuration: number;
    currentDuration: number;
    durationDelta: number;
    timestamp: string;
  };
  testDeltas: {
    testName: string;
    category: string;
    previousTime: number;
    currentTime: number;
    timeDelta: number;
    previousPercentage: number;
    currentPercentage: number;
    percentageDelta: number;
    status: 'IMPROVED' | 'DEGRADED' | 'SAME';
  }[];
}

function calculateStatistics(times: number[]): {
  average: number;
  median: number;
  min: number;
  max: number;
  standardDeviation: number;
  coefficient: number;
} {
  const sortedTimes = [...times].sort((a, b) => a - b);
  const average = times.reduce((sum, time) => sum + time, 0) / times.length;
  const median = sortedTimes.length % 2 === 0
    ? (sortedTimes[sortedTimes.length / 2 - 1] + sortedTimes[sortedTimes.length / 2]) / 2
    : sortedTimes[Math.floor(sortedTimes.length / 2)];

  const min = Math.min(...times);
  const max = Math.max(...times);

  const variance = times.reduce((sum, time) => sum + (time - average) ** 2, 0) / times.length;
  const standardDeviation = Math.sqrt(variance);
  const coefficient = (standardDeviation / average) * 100;

  return {
    average, median, min, max, standardDeviation, coefficient,
  };
}

function removeOutliers(times: number[]): number[] {
  if (!PERFORMANCE_CONFIG.EXCLUDE_OUTLIERS || times.length < 3) {
    return times;
  }

  const sortedTimes = [...times].sort((a, b) => a - b);
  const outlierCount = Math.floor(times.length * PERFORMANCE_CONFIG.OUTLIER_PERCENTAGE);

  if (outlierCount === 0) {
    return times;
  }

  return sortedTimes.slice(outlierCount, -outlierCount);
}

function assessReliability(coefficient: number, percentage: number): 'HIGH' | 'MEDIUM' | 'LOW' {
  if (coefficient < 0.1 && percentage < 70) return 'HIGH';
  if (coefficient < 0.2 && percentage < 85) return 'MEDIUM';

  return 'LOW';
}

function generateTestContent(size: number): string {
  return 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. '.repeat(Math.ceil(size / 56));
}

function generateHtmlContent(tagCount: number): string {
  let html = '<div>';

  for (let i = 0; i < tagCount; i += 1) {
    const tag = i % 2 === 0 ? 'p' : 'span';

    html += `<${tag}>Content ${i}</${tag}>`;
  }
  html += '</div>';

  return html;
}

async function runMultipleTests(
  testName: string,
  testFunction: () => Promise<number>,
  threshold: number,
  category: string,
  description: string,
  dataSize: string,
  details: string,
): Promise<PerformanceMetrics> {
  const runs: PerformanceRun[] = [];

  // eslint-disable-next-line no-await-in-loop
  for (let i = 0; i < PERFORMANCE_CONFIG.RUNS_COUNT; i += 1) {
    // eslint-disable-next-line no-await-in-loop
    const processingTime = await testFunction();

    runs.push({
      runNumber: i + 1,
      processingTime,
      timestamp: new Date().toISOString(),
    });

    // Small delay between runs
    // eslint-disable-next-line no-await-in-loop
    await new Promise<void>((resolve) => {
      setTimeout(resolve, 10);
    });
  }

  const times = runs.map((run) => run.processingTime);
  const cleanTimes = removeOutliers(times);
  const stats = calculateStatistics(cleanTimes);

  const percentage = Math.round((stats.average / threshold) * 100);
  let status: 'PASS' | 'FAIL' | 'UNSTABLE' = 'PASS';

  if (stats.average > threshold) {
    status = 'FAIL';
  } else if (stats.coefficient > PERFORMANCE_CONFIG.MAX_DEVIATION) {
    status = 'UNSTABLE';
  }

  const reliability = assessReliability(stats.coefficient, percentage);

  return {
    testName,
    runs,
    averageTime: stats.average,
    minTime: stats.min,
    maxTime: stats.max,
    standardDeviation: stats.standardDeviation,
    coefficient: stats.coefficient,
    threshold,
    status,
    percentage,
    dataSize,
    details,
    category,
    description,
    reliability,
  };
}

function generateSummary(results: PerformanceMetrics[]): MultiRunReport['summary'] {
  const totalScore = results.reduce((sum, r) => sum + (100 - r.percentage), 0);
  const averageScore = totalScore / results.length;

  const passedCount = results.filter((r) => r.status === 'PASS').length;
  const failedCount = results.filter((r) => r.status === 'FAIL').length;
  const unstableCount = results.filter((r) => r.status === 'UNSTABLE').length;

  let overallStatus: 'PASS' | 'FAIL' | 'UNSTABLE' = 'PASS';

  if (failedCount > 0) {
    overallStatus = 'FAIL';
  } else if (unstableCount > 0) {
    overallStatus = 'UNSTABLE';
  }

  const highReliabilityCount = results.filter((r) => r.reliability === 'HIGH').length;
  const mediumReliabilityCount = results.filter((r) => r.reliability === 'MEDIUM').length;

  let reliability: 'HIGH' | 'MEDIUM' | 'LOW' = 'LOW';

  if (highReliabilityCount >= results.length * 0.8) {
    reliability = 'HIGH';
  } else if (mediumReliabilityCount >= results.length * 0.6) {
    reliability = 'MEDIUM';
  }

  return {
    totalTests: results.length,
    passed: passedCount,
    failed: failedCount,
    unstable: unstableCount,
    overallStatus,
    timestamp: new Date().toISOString(),
    totalDuration: results.reduce((sum, r) => sum + r.averageTime, 0),
    averageDuration: results.reduce((sum, r) => sum + r.averageTime, 0) / results.length,
    score: Math.round(averageScore),
    reliability,
    runsPerTest: PERFORMANCE_CONFIG.RUNS_COUNT,
  };
}

function calculatePerformanceDelta(currentResults: PerformanceMetrics[]): void {
  const previousReportPath = path.join(process.cwd(), 'performance-multi-report.json');
  const deltaReportPath = path.join(process.cwd(), 'performance-delta.json');

  if (!fs.existsSync(previousReportPath)) {
    // eslint-disable-next-line no-console
    console.log('⚠️  No previous performance report found. Delta calculation skipped.');

    return;
  }

  let previousReport: MultiRunReport;

  try {
    const previousData = fs.readFileSync(previousReportPath, 'utf8');

    previousReport = JSON.parse(previousData);
  } catch {
    // eslint-disable-next-line no-console
    console.log('⚠️  Failed to read previous performance report. Delta calculation skipped.');

    return;
  }

  const currentSummary = generateSummary(currentResults);
  const testDeltas: PerformanceDelta['testDeltas'] = [];

  // Calculate deltas for each test
  currentResults.forEach((currentResult) => {
    const previousResult = previousReport.results.find(
      (prev) => prev.name === currentResult.testName,
    );

    if (!previousResult) {
      return; // Skip if no previous result found
    }

    const timeDelta = currentResult.averageTime - previousResult.averageTime;
    const percentageDelta = currentResult.percentage - previousResult.score;

    let status: 'IMPROVED' | 'DEGRADED' | 'SAME' = 'SAME';

    if (Math.abs(timeDelta) > 1) { // Only consider significant changes (>1ms)
      status = timeDelta < 0 ? 'IMPROVED' : 'DEGRADED';
    }

    testDeltas.push({
      testName: currentResult.testName,
      category: currentResult.category,
      previousTime: previousResult.averageTime,
      currentTime: currentResult.averageTime,
      timeDelta,
      previousPercentage: previousResult.score,
      currentPercentage: currentResult.percentage,
      percentageDelta,
      status,
    });
  });

  const delta: PerformanceDelta = {
    summary: {
      previousScore: previousReport.summary.score,
      currentScore: currentSummary.score,
      scoreDelta: currentSummary.score - previousReport.summary.score,
      previousDuration: previousReport.summary.averageDuration,
      currentDuration: currentSummary.averageDuration,
      durationDelta: currentSummary.averageDuration - previousReport.summary.averageDuration,
      timestamp: new Date().toISOString(),
    },
    testDeltas,
  };

  try {
    fs.writeFileSync(deltaReportPath, JSON.stringify(delta, null, 2));
    // eslint-disable-next-line no-console
    console.log('📊 Performance delta report generated: performance-delta.json');
    // eslint-disable-next-line no-console
    console.log('💡 To generate HTML delta report, run: node scripts/performance-delta-report.js');

    // Log summary of changes
    const improved = testDeltas.filter((d) => d.status === 'IMPROVED').length;
    const degraded = testDeltas.filter((d) => d.status === 'DEGRADED').length;
    const same = testDeltas.filter((d) => d.status === 'SAME').length;

    // eslint-disable-next-line no-console
    console.log(`🔄 Performance changes: ${improved} improved, ${degraded} degraded, ${same} same`);
    // eslint-disable-next-line no-console
    console.log(`📈 Score change: ${delta.summary.scoreDelta > 0 ? '+' : ''}${delta.summary.scoreDelta}`);
    // eslint-disable-next-line no-console
    console.log(`⏱️  Duration change: ${delta.summary.durationDelta > 0 ? '+' : ''}${delta.summary.durationDelta.toFixed(2)}ms`);
  } catch {
    // eslint-disable-next-line no-console
    console.log('⚠️  Failed to write performance delta report.');
  }
}

function generateReport(results: PerformanceMetrics[]): void {
  const summary = generateSummary(results);

  const report = {
    summary,
    results: results.map((r) => ({
      name: r.testName,
      averageTime: r.averageTime,
      minTime: r.minTime,
      maxTime: r.maxTime,
      standardDeviation: r.standardDeviation,
      coefficient: r.coefficient,
      threshold: r.threshold,
      status: r.status,
      category: r.category,
      description: r.description,
      dataSize: r.dataSize,
      details: r.details,
      score: r.percentage,
      reliability: r.reliability,
      runs: r.runs,
    })),
  };

  // Calculate and generate delta report BEFORE writing new report
  calculatePerformanceDelta(results);

  // Generate HTML delta report automatically
  generateHtmlReport();

  try {
    fs.writeFileSync(
      path.join(process.cwd(), 'performance-multi-report.json'),
      JSON.stringify(report, null, 2),
    );
    // eslint-disable-next-line no-console
    console.log('📊 Performance report generated: performance-multi-report.json');
  } catch {
    // eslint-disable-next-line no-console
    console.log('⚠️  Failed to write performance report.');
  }
}

// Test implementations
describe('VueTruncateHtml Multi-Run Performance Tests', () => {
  const results: PerformanceMetrics[] = [];

  beforeAll(() => {
    // Setup if needed
  });

  afterAll(() => {
    if (results.length > 0) {
      generateReport(results);
    }
  });

  test('Large HTML content processing', async () => {
    const htmlContent = generateHtmlContent(400);
    const dataSize = `${(htmlContent.length / 1024).toFixed(1)}KB`;

    const testFunction = async (): Promise<number> => {
      const startTime = performance.now();
      const wrapper = mount(VueTruncateHtml, {
        props: {
          text: htmlContent,
          type: 'html',
          length: 200,
          modelValue: true,
        },
      });

      await nextTick();
      wrapper.unmount();

      return performance.now() - startTime;
    };

    const result = await runMultipleTests(
      'Large HTML content processing',
      testFunction,
      getThreshold('Large HTML content processing'),
      'processing',
      'Processing large HTML content should be fast',
      dataSize,
      `Processing ${dataSize} of HTML content with 400 HTML tags`,
    );

    results.push(result);
    expect(result.status).not.toBe('FAIL');
  });

  test('Large text content processing', async () => {
    const textContent = generateTestContent(124000);
    const dataSize = `${(textContent.length / 1024).toFixed(1)}KB`;

    const testFunction = async (): Promise<number> => {
      const startTime = performance.now();
      const wrapper = mount(VueTruncateHtml, {
        props: {
          text: textContent,
          type: 'text',
          length: 500,
          modelValue: true,
        },
      });

      await nextTick();
      wrapper.unmount();

      return performance.now() - startTime;
    };

    const result = await runMultipleTests(
      'Large text content processing',
      testFunction,
      getThreshold('Large text content processing'),
      'processing',
      'Text processing should be faster than HTML',
      dataSize,
      `Processing ${dataSize} of plain text with 19000 words`,
    );

    results.push(result);
    expect(result.status).not.toBe('FAIL');
  });

  test('Multiple re-renders (10 toggles)', async () => {
    const htmlContent = generateHtmlContent(200);
    const dataSize = `${(htmlContent.length / 1024).toFixed(1)}KB`;

    const testFunction = async (): Promise<number> => {
      const wrapper = mount(VueTruncateHtml, {
        props: {
          text: htmlContent,
          type: 'html',
          length: 100,
          modelValue: true,
        },
      });

      const startTime = performance.now();

      const promises = [];

      for (let i = 0; i < 10; i += 1) {
        wrapper.setProps({ length: i % 2 === 0 ? 100 : 200 });
        promises.push(nextTick());
      }
      await Promise.all(promises);
      const endTime = performance.now();

      wrapper.unmount();

      return endTime - startTime;
    };

    const result = await runMultipleTests(
      'Multiple re-renders (10 toggles)',
      testFunction,
      getThreshold('Multiple re-renders (10 toggles)'),
      'reactivity',
      'Multiple state changes should be efficient',
      dataSize,
      `Testing reactivity with ${dataSize} content through 10 state toggles`,
    );

    results.push(result);
    expect(result.status).not.toBe('FAIL');
  });

  test('Computed properties reactivity', async () => {
    const htmlContent = generateHtmlContent(300);
    const dataSize = `${(htmlContent.length / 1024).toFixed(1)}KB`;

    const testFunction = async (): Promise<number> => {
      const wrapper = mount(VueTruncateHtml, {
        props: {
          text: htmlContent,
          type: 'html',
          length: 150,
          modelValue: true,
        },
      });

      const startTime = performance.now();

      wrapper.setProps({ length: 200 });
      await nextTick();
      wrapper.setProps({ type: 'text' });
      await nextTick();
      wrapper.setProps({ modelValue: false });
      await nextTick();
      const endTime = performance.now();

      wrapper.unmount();

      return endTime - startTime;
    };

    const result = await runMultipleTests(
      'Computed properties reactivity',
      testFunction,
      getThreshold('Computed properties reactivity'),
      'reactivity',
      'Reactive property updates should be fast',
      dataSize,
      `Testing reactive updates with ${dataSize} content across 3 property changes`,
    );

    results.push(result);
    expect(result.status).not.toBe('FAIL');
  });

  test('HTML sanitization overhead', async () => {
    const maliciousHtml = '<script>alert("xss")</script>'.repeat(80);
    const dataSize = `${(maliciousHtml.length / 1024).toFixed(1)}KB`;

    const testFunction = async (): Promise<number> => {
      const startTime = performance.now();
      const wrapper = mount(VueTruncateHtml, {
        props: {
          text: maliciousHtml,
          type: 'html',
          length: 100,
          modelValue: true,
        },
      });

      await nextTick();
      wrapper.unmount();

      return performance.now() - startTime;
    };

    const result = await runMultipleTests(
      'HTML sanitization overhead',
      testFunction,
      getThreshold('HTML sanitization overhead'),
      'sanitization',
      'HTML sanitization should not significantly impact performance',
      dataSize,
      `Sanitizing ${dataSize} of malicious HTML with 80 dangerous elements`,
    );

    results.push(result);
    expect(result.status).not.toBe('FAIL');
  });

  test('Memory usage (20 components)', async () => {
    const htmlContent = generateHtmlContent(200);
    const dataSize = `${(htmlContent.length / 1024).toFixed(1)}KB × 20`;

    const testFunction = async (): Promise<number> => {
      const startTime = performance.now();
      const wrappers = [];

      for (let i = 0; i < 20; i += 1) {
        const wrapper = mount(VueTruncateHtml, {
          props: {
            text: htmlContent,
            type: 'html',
            length: 100,
            modelValue: true,
          },
        });

        wrappers.push(wrapper);
      }

      await nextTick();
      const endTime = performance.now();

      // Cleanup
      wrappers.forEach((wrapper) => wrapper.unmount());

      return endTime - startTime;
    };

    const result = await runMultipleTests(
      'Memory usage (20 components)',
      testFunction,
      getThreshold('Memory usage (20 components)'),
      'memory',
      'Creating multiple components should not cause memory issues',
      dataSize,
      `Created 20 components with ${dataSize.split(' × ')[0]} each`,
    );

    results.push(result);
    expect(result.status).not.toBe('FAIL');
  });

  test('Edge case: extremely long word', async () => {
    const longWord = 'a'.repeat(10000);
    const dataSize = `${(longWord.length / 1024).toFixed(1)}KB`;

    const testFunction = async (): Promise<number> => {
      const startTime = performance.now();
      const wrapper = mount(VueTruncateHtml, {
        props: {
          text: longWord,
          type: 'text',
          length: 50,
          modelValue: true,
        },
      });

      await nextTick();
      wrapper.unmount();

      return performance.now() - startTime;
    };

    const result = await runMultipleTests(
      'Edge case: extremely long word',
      testFunction,
      getThreshold('Edge case: extremely long word'),
      'edge-case',
      'Extremely long words should be handled efficiently',
      dataSize,
      `Processing ${dataSize} single word (10000 characters)`,
    );

    results.push(result);
    expect(result.status).not.toBe('FAIL');
  });

  test('Concurrent component creation', async () => {
    const htmlContent = generateHtmlContent(120);
    const dataSize = `${(htmlContent.length / 1024).toFixed(1)}KB × 10`;

    const testFunction = async (): Promise<number> => {
      const startTime = performance.now();

      const createComponent = async (): Promise<void> => {
        const wrapper = mount(VueTruncateHtml, {
          props: {
            text: htmlContent,
            type: 'html',
            length: 100,
            modelValue: true,
          },
        });

        await nextTick();
        wrapper.unmount();
      };

      const promises = Array.from({ length: 10 }, () => createComponent());

      await Promise.all(promises);

      return performance.now() - startTime;
    };

    const result = await runMultipleTests(
      'Concurrent component creation',
      testFunction,
      getThreshold('Concurrent component creation'),
      'processing',
      'Concurrent component creation should be efficient',
      dataSize,
      `Creating 10 components simultaneously with ${dataSize.split(' × ')[0]} each`,
    );

    results.push(result);
    expect(result.status).not.toBe('FAIL');
  });

  test('Complex HTML structure', async () => {
    let complexHtml = '<div>';

    for (let i = 0; i < 60; i += 1) {
      complexHtml += `<div class="level-${i % 6}">`;
      for (let j = 0; j < 6; j += 1) {
        complexHtml += `<p><span>Content ${i}-${j}</span></p>`;
      }
      complexHtml += '</div>';
    }
    complexHtml += '</div>';

    const dataSize = `${(complexHtml.length / 1024).toFixed(1)}KB`;

    const testFunction = async (): Promise<number> => {
      const startTime = performance.now();
      const wrapper = mount(VueTruncateHtml, {
        props: {
          text: complexHtml,
          type: 'html',
          length: 200,
          modelValue: true,
        },
      });

      await nextTick();
      wrapper.unmount();

      return performance.now() - startTime;
    };

    const result = await runMultipleTests(
      'Complex HTML structure',
      testFunction,
      getThreshold('Complex HTML structure'),
      'processing',
      'Complex nested HTML should be processed efficiently',
      dataSize,
      `Processing ${dataSize} complex nested HTML with 360 tags`,
    );

    results.push(result);
    expect(result.status).not.toBe('FAIL');
  });
});
