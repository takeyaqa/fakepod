export class BatchRunGenerator {

  readonly organizationName: string
  readonly projectName: string
  readonly epoch: Date

  constructor() {
    this.organizationName = 'FakeOrganization'
    this.projectName = 'FakeProject'
    this.epoch = new Date(2024, 0, 1, 3, 0, 0)
  }

  generateBatchRuns(minBatchRunNumber: number, maxBatchRunNumber: number) {
    const batchRuns = []
    for (let i = minBatchRunNumber; i <= maxBatchRunNumber; i++) {
      const batchRun = this.generateBatchRun(i)
      const resultBatchRun = {
        batch_run_number: batchRun.batch_run_number,
        test_setting_name: batchRun.test_setting_name,
        branch_name: batchRun.branch_name,
        status: batchRun.status,
        status_number: batchRun.status_number,
        started_at: batchRun.started_at,
        finished_at: batchRun.finished_at,
        duration_seconds: batchRun.duration_seconds,
        test_cases: {
          succeeded: batchRun.test_cases.succeeded,
          total: batchRun.test_cases.total,
        },
        url: batchRun.url,
        executed_via: batchRun.executed_via,
        executed_by: batchRun.executed_by,
      } as any
      if (batchRun.status === 'failed') {
        resultBatchRun.test_cases['failed'] = batchRun.test_cases.failed
      }
      batchRuns.push(resultBatchRun)
    }
    batchRuns.reverse()
    return {
      organization_name: this.organizationName,
      project_name: this.projectName,
      batch_runs: batchRuns,
      total_count: batchRuns[0].batch_run_number,
    }
  }

  generateBatchRun(batchRunNumber: number) {
    const started_at = new Date(this.epoch.getFullYear(), this.epoch.getMonth(), this.epoch.getDate() + batchRunNumber - 1, this.epoch.getHours(), this.epoch.getMinutes(), this.epoch.getSeconds())
    const finished_at = new Date(started_at.getFullYear(), started_at.getMonth(), started_at.getDate(), started_at.getHours(), started_at.getMinutes() + 25, started_at.getSeconds())
    const status = batchRunNumber % 2 === 0 ? 'succeeded' : 'failed'
    const detailsResult01 = this.generateBatchRunTestCaseDetailResults(batchRunNumber, started_at, status, 1)
    const detailsResult02 = this.generateBatchRunTestCaseDetailResults(batchRunNumber, started_at, status, 2)
    const detailsResults = detailsResult01.concat(detailsResult02)
    const batchRun = {
      organization_name: this.organizationName,
      project_name: this.projectName,
      batch_run_number: batchRunNumber,
      test_setting_name: 'Fake Test Setting',
      branch_name: 'main',
      status: status,
      status_number: status === 'succeeded' ? 1 : 2,
      started_at: started_at.toISOString().split('.')[0] + 'Z',
      finished_at: finished_at.toISOString().split('.')[0] + 'Z',
      duration_seconds: (finished_at.getTime() - started_at.getTime()) / 1000,
      test_cases: {
        succeeded: detailsResults.filter((result: any) => result.status === 'succeeded').length,
        total: detailsResults.length,
        details: [
          {
            pattern_name: 'fake_pattern_01',
            included_labels: [],
            excluded_labels: [],
            pattern: {
              number: 1,
              name: 'Android13_Pixel6',
              environment: 'magic_pod',
              os: 'android',
              device_type: 'arm64_v8a_emulator',
              version: '13.0',
              model: 'Pixel 6',
              app_type: 'app_file',
              app_file_number: batchRunNumber,
              app_url: null,
              app_path: null,
              bundle_id: null,
              app_package: null,
              app_activity: null,
            },
            results: detailsResult01,
          },
          {
            pattern_name: 'fake_pattern_02',
            included_labels: [],
            excluded_labels: [],
            pattern: {
              number: 2,
              name: 'Android12_Pixel6',
              environment: 'magic_pod',
              os: 'android',
              device_type: 'arm64_v8a_emulator',
              version: '12.0',
              model: 'Pixel 6',
              app_type: 'app_file',
              app_file_number: batchRunNumber,
              app_url: null,
              app_path: null,
              bundle_id: null,
              app_package: null,
              app_activity: null,
            },
            results: detailsResult02,
          },
        ],
      },
      url: `https://app.fakepod.example.com/${this.organizationName}/${this.projectName}/batch-run/${batchRunNumber}/`,
      executed_via: 'web_api',
      executed_by: 'John Doe'
    } as any
    if (status === 'failed') {
      batchRun.test_cases['failed'] = detailsResults.filter((result: any) => result.status === 'failed').length
    }
    return batchRun
  }

  private generateBatchRunTestCaseDetailResults(number: number, started_at: Date, status: 'succeeded' | 'failed', pattern: number) {
    const batchRunResults = []
    for (let i = 1; i <= 5; i++) {
      let resultStatus = status
      if (resultStatus === 'succeeded') {
        resultStatus = 'succeeded'
      } else {
        if (i % 2 === 0) {
          resultStatus = 'succeeded'
        } else {
          resultStatus = 'failed'
        }
      }
      batchRunResults.push(this.generateBatchRunTestCaseDetailResult(number, started_at, i, resultStatus, pattern))
    }
    return batchRunResults
  }

  private generateBatchRunTestCaseDetailResult(number: number, started_at: Date, order: number, status: 'succeeded' | 'failed', pattern: number) {
    const runsStarted_at = new Date(started_at.getFullYear(), started_at.getMonth(), started_at.getDate(), started_at.getHours(), started_at.getMinutes() + 5 * (order - 1), started_at.getSeconds())
    const runsFinished_at = new Date(runsStarted_at.getFullYear(), runsStarted_at.getMonth(), runsStarted_at.getDate(), runsStarted_at.getHours(), runsStarted_at.getMinutes() + 5, runsStarted_at.getSeconds())
    return{
      order: order,
      test_case: {
        number: order,
        name: `Test Case No.${order}`,
        url: `https://app.fakepod.example.com/${this.organizationName}/${this.projectName}/${order}/`,
        step_count: 10,
      },
      number: order,
      status: status,
      started_at: runsStarted_at.toISOString().split('.')[0] + 'Z',
      finished_at: runsFinished_at.toISOString().split('.')[0] + 'Z',
      duration_seconds: (runsFinished_at.getTime() - runsStarted_at.getTime()) / 1000,
      data_patterns: null,
      note: null,
      errors: [],
      test_run_log_url: `https://app.fakepod.example.com/api/v1.0/${this.organizationName}/${this.projectName}/batch-run/${number}/${pattern}/${order}/1/test-run-log/`,
      test_engine_log_url: `https://app.fakepod.example.com/api/v1.0/${this.organizationName}/${this.projectName}/batch-run/${number}/${pattern}/${order}/1/test-engine-log/`,
      device_log_url: `https://app.fakepod.example.com/api/v1.0/${this.organizationName}/${this.projectName}/batch-run/${number}/${pattern}/${order}/1/device-log/`,
    }
  }
  
}
