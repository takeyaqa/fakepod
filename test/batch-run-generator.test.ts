import { describe, expect, test } from 'bun:test'
import { BatchRunGenerator } from '../src/batch-run-generator'

describe('BatchRunGenerator', () => {

  const generator = new BatchRunGenerator()

  describe('generateBatchRuns()', () => {

    test('generate batch runs when pass start and end', async () => {
      const batchRuns = generator.generateBatchRuns(191, 200)
      const expected = JSON.parse(await Bun.file('./test/data/batch-runs.json').text())
      expect(batchRuns).toStrictEqual(expected)
    })

  })

  describe('generateBatchRun()', () => {

    test('generate batch run when pass odd number', async () => {
      const batchRun = generator.generateBatchRun(1)
      const expected = JSON.parse(await Bun.file('./test/data/batch-run-1-failed.json').text())
      expect(batchRun).toStrictEqual(expected)
    })

    test('generate batch run when pass even number', async () => {
      const batchRun = generator.generateBatchRun(2)
      const expected = JSON.parse(await Bun.file('./test/data/batch-run-2-succeeded.json').text())
      expect(batchRun).toStrictEqual(expected)
    })

  })
})
