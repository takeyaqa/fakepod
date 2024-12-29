import { describe, expect, test } from 'bun:test'
import app from '../src/index'

describe('MagicPod Web API v1.0', () => {

  describe('POST /api/v1.0/:organizationName/:projectName/batch-run/', () => {

    test('get response code', async () => {
      const res = await app.request('/api/v1.0/org1/proj1/batch-run/', { method: 'POST' })
      expect(res.status).toBe(501)
    })

  })

  describe('GET /api/v1.0/:organizationName/:projectName/batch-run/:batchRunNumber/', () => {

    test('get batch run no. 1', async () => {
      const res = await app.request('/api/v1.0/FakeOrganization/FakeProject/batch-run/1/')
      const data = await res.json()
      expect(data.organization_name).toBe('FakeOrganization')
      expect(data.project_name).toBe('FakeProject')
      expect(data.batch_run_number).toBe(1)
    })

    test('get batch run no. 200', async () => {
      const res = await app.request('/api/v1.0/FakeOrganization/FakeProject/batch-run/200/')
      const data = await res.json()
      expect(data.organization_name).toBe('FakeOrganization')
      expect(data.project_name).toBe('FakeProject')
      expect(data.batch_run_number).toBe(200)
    })

    test('error get batch run no. 0', async () => {
      const res = await app.request('/api/v1.0/FakeOrganization/FakeProject/batch-run/0/')
      const data = await res.json()
      expect(res.status).toBe(400)
      expect(data.message).toBe('Validation error')
    })

    test('error get batch run no. 201', async () => {
      const res = await app.request('/api/v1.0/FakeOrganization/FakeProject/batch-run/201/')
      const data = await res.json()
      expect(res.status).toBe(400)
      expect(data.message).toBe('Validation error')
    })

  })

  describe('GET /api/v1.0/:organizationName/:projectName/batch-runs/', () => {

    test('get batch runs default paramator', async () => {
      const res = await app.request('/api/v1.0/FakeOrganization/FakeProject/batch-runs/')
      const data = await res.json()
      expect(data.organization_name).toBe('FakeOrganization')
      expect(data.project_name).toBe('FakeProject')
      expect(data.batch_runs.length).toBe(20)
      expect(data.batch_runs[0].batch_run_number).toBe(200)
      expect(data.batch_runs[data.batch_runs.length - 1].batch_run_number).toBe(181)
    })

    test('get batch runs with count 1', async () => {
      const res = await app.request('/api/v1.0/FakeOrganization/FakeProject/batch-runs/?count=1')
      const data = await res.json()
      expect(data.organization_name).toBe('FakeOrganization')
      expect(data.project_name).toBe('FakeProject')
      expect(data.batch_runs.length).toBe(1)
      expect(data.batch_runs[0].batch_run_number).toBe(200)
      expect(data.batch_runs[data.batch_runs.length - 1].batch_run_number).toBe(200)
    })

    test('get batch runs with count 100', async () => {
      const res = await app.request('/api/v1.0/FakeOrganization/FakeProject/batch-runs/?count=100')
      const data = await res.json()
      expect(data.organization_name).toBe('FakeOrganization')
      expect(data.project_name).toBe('FakeProject')
      expect(data.batch_runs.length).toBe(100)
      expect(data.batch_runs[0].batch_run_number).toBe(200)
      expect(data.batch_runs[data.batch_runs.length - 1].batch_run_number).toBe(101)
    })

    test('get batch runs with range 1 to 10', async () => {
      const res = await app.request('/api/v1.0/FakeOrganization/FakeProject/batch-runs/?min_batch_run_number=1&max_batch_run_number=10')
      const data = await res.json()
      expect(data.organization_name).toBe('FakeOrganization')
      expect(data.project_name).toBe('FakeProject')
      expect(data.batch_runs.length).toBe(10)
      expect(data.batch_runs[0].batch_run_number).toBe(10)
      expect(data.batch_runs[data.batch_runs.length - 1].batch_run_number).toBe(1)
    })

    test('get batch runs with range 1 to 50', async () => {
      const res = await app.request('/api/v1.0/FakeOrganization/FakeProject/batch-runs/?min_batch_run_number=1&max_batch_run_number=50')
      const data = await res.json()
      expect(data.organization_name).toBe('FakeOrganization')
      expect(data.project_name).toBe('FakeProject')
      expect(data.batch_runs.length).toBe(20)
      expect(data.batch_runs[0].batch_run_number).toBe(50)
      expect(data.batch_runs[data.batch_runs.length - 1].batch_run_number).toBe(31)
    })

    test('get batch runs with max 100', async () => {
      const res = await app.request('/api/v1.0/FakeOrganization/FakeProject/batch-runs/?max_batch_run_number=100')
      const data = await res.json()
      expect(data.organization_name).toBe('FakeOrganization')
      expect(data.project_name).toBe('FakeProject')
      expect(data.batch_runs.length).toBe(20)
      expect(data.batch_runs[0].batch_run_number).toBe(100)
      expect(data.batch_runs[data.batch_runs.length - 1].batch_run_number).toBe(81)
    })

    test('get batch runs with max 100 and count 25', async () => {
      const res = await app.request('/api/v1.0/FakeOrganization/FakeProject/batch-runs/?max_batch_run_number=100&count=25')
      const data = await res.json()
      expect(data.organization_name).toBe('FakeOrganization')
      expect(data.project_name).toBe('FakeProject')
      expect(data.batch_runs.length).toBe(25)
      expect(data.batch_runs[0].batch_run_number).toBe(100)
      expect(data.batch_runs[data.batch_runs.length - 1].batch_run_number).toBe(76)
    })

    test('get batch runs with range 1 to 50 and count 25', async () => {
      const res = await app.request('/api/v1.0/FakeOrganization/FakeProject/batch-runs/?min_batch_run_number=1&max_batch_run_number=50&count=25')
      const data = await res.json()
      expect(data.organization_name).toBe('FakeOrganization')
      expect(data.project_name).toBe('FakeProject')
      expect(data.batch_runs.length).toBe(25)
      expect(data.batch_runs[0].batch_run_number).toBe(50)
      expect(data.batch_runs[data.batch_runs.length - 1].batch_run_number).toBe(26)
    })

    test('get batch runs with max 10 and count 25 (edge)', async () => {
      const res = await app.request('/api/v1.0/FakeOrganization/FakeProject/batch-runs/?max_batch_run_number=10&count=25')
      const data = await res.json()
      expect(data.organization_name).toBe('FakeOrganization')
      expect(data.project_name).toBe('FakeProject')
      expect(data.batch_runs.length).toBe(10)
      expect(data.batch_runs[0].batch_run_number).toBe(10)
      expect(data.batch_runs[data.batch_runs.length - 1].batch_run_number).toBe(1)
    })

    test('error get batch runs with max over 201', async () => {
      const res = await app.request('/api/v1.0/FakeOrganization/FakeProject/batch-runs/?max_batch_run_number=201')
      const data = await res.json()
      expect(res.status).toBe(400)
      expect(data.message).toBe('Validation error')
    })

    test('error get batch runs with max under 0', async () => {
      const res = await app.request('/api/v1.0/FakeOrganization/FakeProject/batch-runs/?max_batch_run_number=0')
      const data = await res.json()
      expect(res.status).toBe(400)
      expect(data.message).toBe('Validation error')
    })

    test('error get batch runs with min under 0', async () => {
      const res = await app.request('/api/v1.0/FakeOrganization/FakeProject/batch-runs/?min_batch_run_number=0')
      const data = await res.json()
      expect(res.status).toBe(400)
      expect(data.message).toBe('Validation error')
    })

    test('error get batch runs with count over 501', async () => {
      const res = await app.request('/api/v1.0/FakeOrganization/FakeProject/batch-runs/?count=501')
      const data = await res.json()
      expect(res.status).toBe(400)
      expect(data.message).toBe('Validation error')
    })

    test('error get batch runs with count under 0', async () => {
      const res = await app.request('/api/v1.0/FakeOrganization/FakeProject/batch-runs/?count=0')
      const data = await res.json()
      expect(res.status).toBe(400)
      expect(data.message).toBe('Validation error')
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
