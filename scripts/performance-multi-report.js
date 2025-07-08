#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

function generateHtmlReport() {
  const reportPath = path.join(process.cwd(), 'performance-multi-report.json');

  if (!fs.existsSync(reportPath)) {
    console.error('❌ Performance report not found. Run tests first.');
    process.exit(1);
  }

  const report = JSON.parse(fs.readFileSync(reportPath, 'utf8'));

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Performance Multi-Run Report</title>
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
        .stats-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 20px;
            margin-top: 20px;
        }
        .stat-card {
            background: #f8f9fa;
            padding: 20px;
            border-radius: 8px;
            text-align: center;
            border-left: 4px solid #007bff;
        }
        .stat-value {
            font-size: 2em;
            font-weight: bold;
            color: #007bff;
            margin-bottom: 5px;
        }
        .stat-label {
            color: #666;
            font-size: 0.9em;
            text-transform: uppercase;
            letter-spacing: 0.5px;
        }
        .status-badge {
            padding: 4px 12px;
            border-radius: 20px;
            font-size: 0.8em;
            font-weight: bold;
            text-transform: uppercase;
        }
        .status-pass { background: #d4edda; color: #155724; }
        .status-fail { background: #f8d7da; color: #721c24; }
        .status-unstable { background: #fff3cd; color: #856404; }
        .reliability-high { background: #d1ecf1; color: #0c5460; }
        .reliability-medium { background: #fff3cd; color: #856404; }
        .reliability-low { background: #f8d7da; color: #721c24; }
        .test-results {
            background: white;
            border-radius: 10px;
            overflow: hidden;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }
        .test-results h2 {
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
        .test-metrics {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
            gap: 15px;
            margin-top: 15px;
        }
        .metric {
            text-align: center;
            padding: 10px;
            background: #f8f9fa;
            border-radius: 6px;
        }
        .metric-value {
            font-size: 1.1em;
            font-weight: bold;
            color: #333;
        }
        .metric-label {
            font-size: 0.8em;
            color: #666;
            margin-top: 2px;
        }
        .test-description {
            color: #666;
            font-style: italic;
            margin-bottom: 10px;
        }
        .test-details {
            background: #f8f9fa;
            padding: 10px;
            border-radius: 4px;
            font-size: 0.9em;
            color: #666;
            margin-top: 10px;
        }
        .runs-summary {
            margin-top: 15px;
            padding: 15px;
            background: #f8f9fa;
            border-radius: 6px;
        }
        .runs-summary h4 {
            margin: 0 0 10px 0;
            color: #333;
        }
        .runs-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(60px, 1fr));
            gap: 5px;
            margin-top: 10px;
        }
        .run-time {
            text-align: center;
            padding: 5px;
            background: white;
            border-radius: 3px;
            font-size: 0.8em;
            color: #666;
        }
        .footer {
            text-align: center;
            margin-top: 40px;
            padding: 20px;
            color: #666;
            font-size: 0.9em;
        }
        .performance-score {
            font-size: 3em;
            font-weight: bold;
            color: ${report.summary.score >= 80 ? '#28a745' : report.summary.score >= 60 ? '#ffc107' : '#dc3545'};
        }
    </style>
</head>
<body>
    <div class="header">
        <h1>🚀 Performance Multi-Run Report</h1>
        <p>Generated on ${new Date(report.summary.timestamp).toLocaleString()}</p>
    </div>

    <div class="summary">
        <h2>📊 Summary</h2>
        <div class="stats-grid">
            <div class="stat-card">
                <div class="performance-score">${report.summary.score || 0}</div>
                <div class="stat-label">Performance Score</div>
            </div>
            <div class="stat-card">
                <div class="stat-value">${report.summary.totalTests || 0}</div>
                <div class="stat-label">Total Tests</div>
            </div>
            <div class="stat-card">
                <div class="stat-value">${report.summary.passed || 0}</div>
                <div class="stat-label">Passed</div>
            </div>
            <div class="stat-card">
                <div class="stat-value">${report.summary.failed || 0}</div>
                <div class="stat-label">Failed</div>
            </div>
            <div class="stat-card">
                <div class="stat-value">${report.summary.unstable || 0}</div>
                <div class="stat-label">Unstable</div>
            </div>
            <div class="stat-card">
                <div class="stat-value">${(report.summary.averageDuration || 0).toFixed(2)}ms</div>
                <div class="stat-label">Average Duration</div>
            </div>
            <div class="stat-card">
                <div class="stat-value">${report.summary.runsPerTest || 0}</div>
                <div class="stat-label">Runs per Test</div>
            </div>
            <div class="stat-card">
                <div class="stat-value">
                    <span class="status-badge status-${(report.summary.overallStatus || 'PASS').toLowerCase()}">${report.summary.overallStatus || 'PASS'}</span>
                </div>
                <div class="stat-label">Overall Status</div>
            </div>
        </div>
    </div>

    <div class="test-results">
        <h2>🔍 Test Results</h2>
        ${report.results.map((result) => `
            <div class="test-item">
                <div class="test-header">
                    <div>
                        <h3 class="test-name">
                            ${result.name || 'Unknown Test'}
                            <span class="test-category">${result.category || 'general'}</span>
                        </h3>
                        <div class="test-description">${result.description || 'No description'}</div>
                    </div>
                    <div>
                        <span class="status-badge status-${(result.status || 'PASS').toLowerCase()}">${result.status || 'PASS'}</span>
                        <span class="status-badge reliability-${(result.reliability || 'HIGH').toLowerCase()}">${result.reliability || 'HIGH'}</span>
                    </div>
                </div>

                <div class="test-metrics">
                    <div class="metric">
                        <div class="metric-value">${(result.averageTime || 0).toFixed(2)}ms</div>
                        <div class="metric-label">Average Time</div>
                    </div>
                    <div class="metric">
                        <div class="metric-value">${(result.minTime || 0).toFixed(2)}ms</div>
                        <div class="metric-label">Min Time</div>
                    </div>
                    <div class="metric">
                        <div class="metric-value">${(result.maxTime || 0).toFixed(2)}ms</div>
                        <div class="metric-label">Max Time</div>
                    </div>
                    <div class="metric">
                        <div class="metric-value">${(result.standardDeviation || 0).toFixed(2)}ms</div>
                        <div class="metric-label">Std Deviation</div>
                    </div>
                    <div class="metric">
                        <div class="metric-value">${((result.coefficient || 0) * 100).toFixed(1)}%</div>
                        <div class="metric-label">Coefficient of Variation</div>
                    </div>
                    <div class="metric">
                        <div class="metric-value">${(result.threshold || 0).toFixed(2)}ms</div>
                        <div class="metric-label">Threshold</div>
                    </div>
                    <div class="metric">
                        <div class="metric-value">${result.score || 0}%</div>
                        <div class="metric-label">Performance Score</div>
                    </div>
                    <div class="metric">
                        <div class="metric-value">${result.dataSize || 'Unknown'}</div>
                        <div class="metric-label">Data Size</div>
                    </div>
                </div>

                <div class="test-details">
                    <strong>Details:</strong> ${result.details || 'No details available'}
                </div>

                <div class="runs-summary">
                    <h4>Individual Run Times (${result.runs ? result.runs.length : 0} runs)</h4>
                    <div class="runs-grid">
                        ${result.runs ? result.runs.map((run) => `
                            <div class="run-time">${(run.processingTime || 0).toFixed(1)}ms</div>
                        `).join('') : '<div class="run-time">No runs</div>'}
                    </div>
                </div>
            </div>
        `).join('')}
    </div>

    <div class="footer">
        <p>Generated by VueTruncateHtml Performance Testing Framework</p>
        <p>Report includes ${report.summary.runsPerTest || 0} runs per test for statistical accuracy</p>
    </div>
</body>
</html>`;

  const outputPath = path.join(process.cwd(), 'performance-multi-report.html');

  fs.writeFileSync(outputPath, html);

  console.log(`✅ HTML report generated: ${outputPath}`);
  console.log(`📊 Overall Status: ${report.summary.overallStatus || 'PASS'}`);
  console.log(`🎯 Performance Score: ${report.summary.score || 0}/100`);
  console.log(`📈 Tests: ${report.summary.passed || 0} passed, ${report.summary.failed || 0} failed, ${report.summary.unstable || 0} unstable`);
  console.log(`🔄 Reliability: ${report.summary.reliability || 'HIGH'}`);
}

if (require.main === module) {
  generateHtmlReport();
}

module.exports = { generateHtmlReport };
