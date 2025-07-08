export interface PerformanceThreshold {
  testName: string;
  threshold: number;
  description: string;
  category: 'processing' | 'memory' | 'reactivity' | 'sanitization' | 'edge-case';
}

export const PERFORMANCE_THRESHOLDS: PerformanceThreshold[] = [
  {
    testName: 'Large HTML content processing',
    threshold: 100,
    description: 'Processing large HTML content should be fast',
    category: 'processing',
  },
  {
    testName: 'Large text content processing',
    threshold: 50,
    description: 'Text processing should be faster than HTML',
    category: 'processing',
  },
  {
    testName: 'Multiple re-renders (10 toggles)',
    threshold: 200,
    description: 'Multiple state changes should be efficient',
    category: 'reactivity',
  },
  {
    testName: 'Computed properties reactivity',
    threshold: 100,
    description: 'Reactive property updates should be fast',
    category: 'reactivity',
  },
  {
    testName: 'HTML sanitization overhead',
    threshold: 150,
    description: 'Security sanitization should not impact performance significantly',
    category: 'sanitization',
  },
  {
    testName: 'Memory usage (20 components)',
    threshold: 500,
    description: 'Memory management should be efficient',
    category: 'memory',
  },
  {
    testName: 'Concurrent component creation',
    threshold: 500,
    description: 'Parallel component creation should scale well',
    category: 'processing',
  },
  {
    testName: 'Edge case: extremely long word',
    threshold: 50,
    description: 'Edge cases should not cause performance degradation',
    category: 'edge-case',
  },
  {
    testName: 'Complex HTML structure',
    threshold: 200,
    description: 'Complex nested HTML should be processed efficiently',
    category: 'processing',
  },
];

export const PERFORMANCE_CONFIG = {
  // Количество запусков для усреднения результатов
  RUNS_COUNT: 10,

  // Минимальное количество запусков для валидного результата
  MIN_RUNS: 3,

  // Максимальное отклонение между запусками (в процентах)
  MAX_DEVIATION: 30,

  // Исключить крайние значения (outliers)
  EXCLUDE_OUTLIERS: true,

  // Процент outliers для исключения (по 5% с каждой стороны)
  OUTLIER_PERCENTAGE: 0.1,
};

export const getThreshold = (testName: string): number => {
  const config = PERFORMANCE_THRESHOLDS.find((t) => t.testName === testName);

  return config?.threshold || 100;
};

export const getThresholdConfig = (testName: string): PerformanceThreshold | undefined => PERFORMANCE_THRESHOLDS.find((t) => t.testName === testName);
