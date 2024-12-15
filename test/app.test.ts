import { describe, expect, test } from 'bun:test'
import app from '../src/app'

describe('MagicPod Web API v1.0', () => {

  describe('POST /api/v1.0/:organizationName/:projectName/batch-run/', () => {

    test('get response code', async () => {
      const res = await app.request('/api/v1.0/org1/proj1/batch-run/', { method: 'POST' })
      expect(res.status).toBe(501)
    })

  })

  describe('GET /api/v1.0/:organizationName/:projectName/batch-run/:batchRunNumber/', () => {

    test('get response code', async () => {
      const res = await app.request('/api/v1.0/org1/proj1/batch-run/1/')
      expect(res.status).toBe(501)
    })

  })

  describe('GET /api/v1.0/:organizationName/:projectName/batch-runs/', () => {

    test('get response code', async () => {
      const res = await app.request('/api/v1.0/org1/proj1/batch-runs/')
      expect(res.status).toBe(501)
    })

  })

  describe('POST /api/v1.0/:organizationName/:projectName/batch-runs/:batchRunNumber/screenshots/', () => {

    test('get response code', async () => {
      const res = await app.request('/api/v1.0/org1/proj1/batch-runs/1/screenshots/', { method: 'POST' })
      expect(res.status).toBe(501)
    })

  })

  describe('GET /api/v1.0/:organizationName/:projectName/screenshots/:batchTaskId/', () => {

    test('get response code', async () => {
      const res = await app.request('/api/v1.0/org1/proj1/screenshots/1/')
      expect(res.status).toBe(501)
    })

  })

})
