import { Hono } from 'hono'
import { BatchRunGenerator } from './batch-run-generator'

const app = new Hono().basePath('/api/v1.0')

const DEFAULT_COUNT = 20
const MINIMUM_COUNT = 1
const MAXIMUM_COUNT = 500
const MINIMUM_BATCH_RUN_NUMBER = 1
const MAXIMUM_BATCH_RUN_NUMBER = 200

app.post('/:organizationName/:projectName/batch-run/', (c) => {
  c.status(501)
  return c.json({ message: 'Not Implemented' })
})

app.get('/:organizationName/:projectName/batch-run/:batchRunNumber/', (c) => {
  const batchRunNumber = Number.parseInt(c.req.param('batchRunNumber'))
  if (batchRunNumber < MINIMUM_BATCH_RUN_NUMBER || batchRunNumber > MAXIMUM_BATCH_RUN_NUMBER) {
    c.status(400)
    return c.json({ message: 'Validation error' })
  }
  const generator = new BatchRunGenerator()
  const batchRun = generator.generateBatchRun(batchRunNumber)
  return c.json(batchRun)
})

app.get('/:organizationName/:projectName/batch-runs/', (c) => {
  const rawCount = c.req.query('count')
  const count = rawCount ? Number.parseInt(rawCount) : DEFAULT_COUNT
  if (count < MINIMUM_COUNT || count > MAXIMUM_COUNT) {
    c.status(400)
    return c.json({ message: 'Validation error' })
  }
  const rawMaxBatchRunNumber = c.req.query('max_batch_run_number')
  const maxBatchRunNumber = rawMaxBatchRunNumber ? Number.parseInt(rawMaxBatchRunNumber) : MAXIMUM_BATCH_RUN_NUMBER
  if (maxBatchRunNumber < MINIMUM_BATCH_RUN_NUMBER || maxBatchRunNumber > MAXIMUM_BATCH_RUN_NUMBER) {
    c.status(400)
    return c.json({ message: 'Validation error' })
  }
  const rawMinBatchRunNumber = c.req.query('min_batch_run_number')
  const minBatchRunNumber = rawMinBatchRunNumber ? Number.parseInt(rawMinBatchRunNumber) : MINIMUM_BATCH_RUN_NUMBER
  if (minBatchRunNumber < MINIMUM_BATCH_RUN_NUMBER) {
    c.status(400)
    return c.json({ message: 'Validation error' })
  }
  const computedMinBatchRunNumber = maxBatchRunNumber - minBatchRunNumber > count ? maxBatchRunNumber - count + 1 : minBatchRunNumber
  const batchRuns = new BatchRunGenerator().generateBatchRuns(computedMinBatchRunNumber, maxBatchRunNumber)
  return c.json(batchRuns)
})

app.post('/:organizationName/:projectName/batch-runs/:batchRunNumber/screenshots/', (c) => {
  c.status(501)
  return c.json({ message: 'Not Implemented' })
})

app.get('/:organizationName/:projectName/screenshots/:batchTaskId/', (c) => {
  c.status(501)
  return c.json({ message: 'Not Implemented' })
})

export default app
