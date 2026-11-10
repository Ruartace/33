import assert from 'node:assert/strict'
import test from 'node:test'
import { readBlobErrorMessage, readErrorMessage } from './apiError.js'

test('列表 400 时展示响应 message，而不是状态码文案', () => {
  const error = new Error('Request failed with status code 400')
  error.response = {
    data: { success: false, message: '日期格式应为 yyyy-MM-dd：2026/11/10' },
  }
  assert.equal(
    readErrorMessage(error, '获取列表失败'),
    '日期格式应为 yyyy-MM-dd：2026/11/10',
  )
})

test('没有响应体时使用业务错误信息，axios 状态码文案回退到兜底', () => {
  assert.equal(readErrorMessage(new Error('导入失败'), '获取列表失败'), '导入失败')
  assert.equal(
    readErrorMessage(new Error('Request failed with status code 500'), '获取列表失败'),
    '获取列表失败',
  )
})

test('导出文件流里的 JSON 错误读出 message', async () => {
  const blob = new Blob(
    [JSON.stringify({ success: false, message: '日期格式应为 yyyy-MM-dd：bad' })],
    { type: 'application/json' },
  )
  assert.equal(await readBlobErrorMessage(blob, '导出失败'), '日期格式应为 yyyy-MM-dd：bad')
})
