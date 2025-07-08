#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

function generateDeltaHtmlReport() {
  const deltaPath = path.join(process.cwd(), 'performance-delta.json');

  if (!fs.existsSync(deltaPath)) {
    console.error('❌ Performance delta report not found. Run performance tests first.');
    process.exit(1);
  }

  const delta = JSON.parse(fs.readFileSync(deltaPath, 'utf8'));

  const getStatusColor = (status) => {
    switch (status) {
      case 'IMPROVED': return '#28a745';
      case 'DEGRADED': return '#dc3545';
      case 'SAME': return '#6c757d';
      default: return '#6c757d';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'IMPROVED': return '📈';
      case 'DEGRADED': return '📉';
      case 'SAME': return '➡️';
      default: return '➡️';
    }
  };

  const getScoreColor = (scoreDelta) => {
    if (scoreDelta > 0) return '#28a745';
    if (scoreDelta < 0) return '#dc3545';

    return '#6c757d';
  };

  const getDurationColor = (durationDelta) => {
    if (durationDelta < 0) return '#28a745'; // Faster is better
    if (durationDelta > 0) return '#dc3545'; // Slower is worse

    return '#6c757d';
  };

  const formatDelta = (value, unit = '', showSign = true) => {
    const sign = showSign && value > 0 ? '+' : '';

    return `${sign}${value.toFixed(2)}${unit}`;
  };

  const html = `<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Performance Delta Report</title>
    <style>
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 1200px;
            margin: 0 auto;
            padding: 20px;
            background-color: #f5f5f5;
        }
        .header {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 30px;
            border-radius: 10px;
            margin-bottom: 30px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }
        .header h1 {
            margin: 0;
            font-size: 2.5em;
            font-weight: 300;
        }
        .header p {
            margin: 10px 0 0 0;
            opacity: 0.9;
            font-size: 1.1em;
        }
        .summary {
            background: white;
            padding: 25px;
            border-radius: 10px;
            margin-bottom: 30px;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }
        .summary h2 {
            margin-top: 0;
            color: #333;
            border-bottom: 2px solid #eee;
            padding-bottom: 10px;
        }
        .delta-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 20px;
            margin-top: 20px;
        }
        .delta-card {
            background: #f8f9fa;
            padding: 20px;
            border-radius: 8px;
            text-align: center;
            border-left: 4px solid #007bff;
        }
        .delta-card.improved {
            border-left-color: #28a745;
            background: #f8fff9;
        }
        .delta-card.degraded {
            border-left-color: #dc3545;
            background: #fff8f8;
        }
        .delta-card.same {
            border-left-color: #6c757d;
            background: #f8f9fa;
        }
        .delta-value {
            font-size: 1.8em;
            font-weight: bold;
            margin-bottom: 5px;
        }
        .delta-label {
            color: #666;
            font-size: 0.9em;
            text-transform: uppercase;
            letter-spacing: 0.5px;
        }
        .delta-change {
            font-size: 1.2em;
            font-weight: bold;
            margin-top: 10px;
        }
        .comparison {
            display: flex;
            justify-content: space-between;
            align-items: center;
            font-size: 0.9em;
            color: #666;
            margin-top: 10px;
        }
        .test-deltas {
            background: white;
            border-radius: 10px;
            overflow: hidden;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }
        .test-deltas h2 {
            margin: 0;
            padding: 20px 25px;
            background: #f8f9fa;
            border-bottom: 1px solid #eee;
            color: #333;
        }
        .test-item {
            padding: 20px 25px;
            border-bottom: 1px solid #eee;
            transition: background-color 0.2s;
        }
        .test-item:hover {
            background-color: #f8f9fa;
        }
        .test-item:last-child {
            border-bottom: none;
        }
        .test-header {
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            margin-bottom: 15px;
        }
        .test-name {
            font-size: 1.2em;
            font-weight: 600;
            color: #333;
            margin: 0;
        }
        .test-category {
            background: #e9ecef;
            color: #495057;
            padding: 2px 8px;
            border-radius: 4px;
            font-size: 0.8em;
            margin-left: 10px;
        }
        .status-badge {
            padding: 4px 12px;
            border-radius: 20px;
            font-size: 0.8em;
            font-weight: bold;
            text-transform: uppercase;
            color: white;
        }
        .status-improved { background: #28a745; }
        .status-degraded { background: #dc3545; }
        .status-same { background: #6c757d; }
        .metrics-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
            gap: 15px;
            margin-top: 15px;
        }
        .metric {
            text-align: center;
            padding: 15px;
            background: #f8f9fa;
            border-radius: 6px;
        }
        .metric-title {
            font-size: 0.8em;
            color: #666;
            margin-bottom: 8px;
            text-transform: uppercase;
            letter-spacing: 0.5px;
        }
        .metric-comparison {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 8px;
        }
        .metric-old {
            color: #666;
            font-size: 0.9em;
        }
        .metric-new {
            font-weight: bold;
            color: #333;
        }
        .metric-delta {
            font-weight: bold;
            font-size: 1.1em;
        }
        .stats-summary {
            background: white;
            padding: 25px;
            border-radius: 10px;
            margin-bottom: 30px;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }
        .stats-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
            gap: 20px;
            margin-top: 20px;
        }
        .stat-card {
            text-align: center;
            padding: 20px;
            background: #f8f9fa;
            border-radius: 8px;
        }
        .stat-number {
            font-size: 2em;
            font-weight: bold;
            margin-bottom: 5px;
        }
        .stat-label {
            color: #666;
            font-size: 0.9em;
        }
        .footer {
            text-align: center;
            margin-top: 40px;
            padding: 20px;
            color: #666;
            font-size: 0.9em;
        }
        .no-change {
            color: #6c757d;
            font-style: italic;
        }
    </style>
</head>
<body>
    <div class="header">
        <h1>📊 Performance Delta Report</h1>
        <p>Сравнение производительности • Сгенерировано ${new Date(delta.summary.timestamp).toLocaleString()}</p>
    </div>

    <div class="summary">
        <h2>📈 Общая сводка изменений</h2>
        <div class="delta-grid">
            <div class="delta-card ${delta.summary.scoreDelta > 0 ? 'improved' : delta.summary.scoreDelta < 0 ? 'degraded' : 'same'}">
                <div class="delta-value" style="color: ${getScoreColor(delta.summary.scoreDelta)}">
                    ${delta.summary.currentScore}
                </div>
                <div class="delta-label">Performance Score</div>
                <div class="delta-change" style="color: ${getScoreColor(delta.summary.scoreDelta)}">
                    ${formatDelta(delta.summary.scoreDelta)}
                </div>
                <div class="comparison">
                    <span>Предыдущий: ${delta.summary.previousScore}</span>
                    <span>Текущий: ${delta.summary.currentScore}</span>
                </div>
            </div>

            <div class="delta-card ${delta.summary.durationDelta < 0 ? 'improved' : delta.summary.durationDelta > 0 ? 'degraded' : 'same'}">
                <div class="delta-value" style="color: ${getDurationColor(delta.summary.durationDelta)}">
                    ${delta.summary.currentDuration.toFixed(2)}ms
                </div>
                <div class="delta-label">Average Duration</div>
                <div class="delta-change" style="color: ${getDurationColor(delta.summary.durationDelta)}">
                    ${formatDelta(delta.summary.durationDelta, 'ms')}
                </div>
                <div class="comparison">
                    <span>Предыдущий: ${delta.summary.previousDuration.toFixed(2)}ms</span>
                    <span>Текущий: ${delta.summary.currentDuration.toFixed(2)}ms</span>
                </div>
            </div>
        </div>
    </div>

    <div class="stats-summary">
        <h2>📊 Статистика изменений</h2>
        <div class="stats-grid">
            <div class="stat-card">
                <div class="stat-number" style="color: #28a745;">
                    ${delta.testDeltas.filter((d) => d.status === 'IMPROVED').length}
                </div>
                <div class="stat-label">Улучшено</div>
            </div>
            <div class="stat-card">
                <div class="stat-number" style="color: #dc3545;">
                    ${delta.testDeltas.filter((d) => d.status === 'DEGRADED').length}
                </div>
                <div class="stat-label">Ухудшено</div>
            </div>
            <div class="stat-card">
                <div class="stat-number" style="color: #6c757d;">
                    ${delta.testDeltas.filter((d) => d.status === 'SAME').length}
                </div>
                <div class="stat-label">Без изменений</div>
            </div>
            <div class="stat-card">
                <div class="stat-number" style="color: #007bff;">
                    ${delta.testDeltas.length}
                </div>
                <div class="stat-label">Всего тестов</div>
            </div>
        </div>
    </div>

    <div class="test-deltas">
        <h2>🔍 Детальные изменения по тестам</h2>
        ${delta.testDeltas.map((test) => `
            <div class="test-item">
                <div class="test-header">
                    <div>
                        <h3 class="test-name">
                            ${getStatusIcon(test.status)} ${test.testName}
                            <span class="test-category">${test.category}</span>
                        </h3>
                    </div>
                    <div>
                        <span class="status-badge status-${test.status.toLowerCase()}">${test.status}</span>
                    </div>
                </div>

                <div class="metrics-grid">
                    <div class="metric">
                        <div class="metric-title">Время выполнения</div>
                        <div class="metric-comparison">
                            <span class="metric-old">${test.previousTime.toFixed(2)}ms</span>
                            <span class="metric-new">${test.currentTime.toFixed(2)}ms</span>
                        </div>
                        <div class="metric-delta" style="color: ${getDurationColor(test.timeDelta)}">
                            ${formatDelta(test.timeDelta, 'ms')}
                        </div>
                    </div>

                    <div class="metric">
                        <div class="metric-title">Performance Score</div>
                        <div class="metric-comparison">
                            <span class="metric-old">${test.previousPercentage}%</span>
                            <span class="metric-new">${test.currentPercentage}%</span>
                        </div>
                        <div class="metric-delta" style="color: ${getScoreColor(test.percentageDelta)}">
                            ${formatDelta(test.percentageDelta, '%')}
                        </div>
                    </div>

                    <div class="metric">
                        <div class="metric-title">Изменение времени</div>
                        <div class="metric-comparison">
                            <span class="metric-old">Базовое</span>
                            <span class="metric-new">Текущее</span>
                        </div>
                        <div class="metric-delta" style="color: ${getDurationColor(test.timeDelta)}">
                            ${Math.abs(test.timeDelta) < 0.01 ? 'Без изменений'
    : test.timeDelta > 0 ? `+${((test.timeDelta / test.previousTime) * 100).toFixed(1)}%`
      : `${((test.timeDelta / test.previousTime) * 100).toFixed(1)}%`}
                        </div>
                    </div>
                </div>
            </div>
        `).join('')}
    </div>

    <div class="footer">
        <p>Сгенерировано VueTruncateHtml Performance Testing Framework</p>
        <p>Отчет показывает изменения производительности между запусками тестов</p>
        <p>🟢 Улучшение • 🔴 Ухудшение • ⚪ Без изменений</p>
    </div>
</body>
</html>`;

  const outputPath = path.join(process.cwd(), 'performance-delta.html');

  fs.writeFileSync(outputPath, html);

  console.log(`✅ HTML delta report generated: ${outputPath}`);

  const improved = delta.testDeltas.filter((d) => d.status === 'IMPROVED').length;
  const degraded = delta.testDeltas.filter((d) => d.status === 'DEGRADED').length;
  const same = delta.testDeltas.filter((d) => d.status === 'SAME').length;

  console.log(`📊 Changes: ${improved} improved, ${degraded} degraded, ${same} unchanged`);
  console.log(`📈 Score: ${delta.summary.previousScore} → ${delta.summary.currentScore} (${formatDelta(delta.summary.scoreDelta)})`);
  console.log(`⏱️  Duration: ${delta.summary.previousDuration.toFixed(2)}ms → ${delta.summary.currentDuration.toFixed(2)}ms (${formatDelta(delta.summary.durationDelta, 'ms')})`);
}

if (require.main === module) {
  generateDeltaHtmlReport();
}

module.exports = { generateDeltaHtmlReport };
