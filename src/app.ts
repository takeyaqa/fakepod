import { Hono } from 'hono'

const app = new Hono().basePath('/api/v1.0')

app.post('/:organizationName/:projectName/batch-run/', (c) => {
  c.status(501)
  return c.json({ message: 'Not Implemented' })
})

app.get('/:organizationName/:projectName/batch-run/:batchRunNumber/', (c) => {
  c.status(501)
  return c.json({ message: 'Not Implemented' })
})


app.get('/:organizationName/:projectName/batch-runs/', (c) => {
  c.status(501)
  return c.json({ message: 'Not Implemented' })
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
