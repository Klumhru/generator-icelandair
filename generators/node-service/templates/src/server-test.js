import test from 'ava'
import path from 'path'
import request from 'supertest-as-promised'

const app = require(path.resolve(__dirname, './server'))

test('returns hello world by default', async t => {
  t.plan(2)

  const res = await request(app.listen())
    .get('/')

  t.is(res.status, 200)
  t.is(res.body.content, 'Hello World')
})

test('uses optional param', async t => {
  t.plan(2)

  const res = await request(app.listen())
    .get('/Dave')

  t.is(res.status, 200)
  t.is(res.body.content, 'Hello Dave')
})
