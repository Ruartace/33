import assert from 'node:assert/strict'
import test from 'node:test'
import { buildInternalCodeIssueMessages, formatReviewFlag } from './incomingStatus.js'

test('有 message 时原样展示，不再改写成统一的缺配置文案', () => {
  const messages = buildInternalCodeIssueMessages([
    {
      status: '找不到内部代码',
      reason: '文件描述已失效',
      message: '通知书编号 200001：文件描述已失效，请到「文件描述设置」中启用',
      candidates: ['A', 'B'],
    },
  ])
  assert.deepEqual(messages, [
    '通知书编号 200001：文件描述已失效，请到「文件描述设置」中启用',
  ])
})

test('没有 message 时按 reason 兜底', () => {
  const messages = buildInternalCodeIssueMessages([
    { notificationCode: '100001', status: '找不到内部代码', reason: '找不到' },
    {
      notificationCode: '100002',
      status: '有多个内部代码',
      reason: '不是唯一',
      candidates: ['C1', 'C2'],
    },
    { notificationCode: '100003', reason: '文件描述已失效' },
  ])
  assert.deepEqual(messages, [
    '通知书编号 100001：缺文件描述',
    '通知书编号 100002：内部代码不唯一（候选内部代码：C1、C2）',
    '通知书编号 100003：文件描述已失效，请到「文件描述设置」中启用，不要新建',
  ])
})

test('优审 / 预审以「是」「否」为主，兼容旧值', () => {
  assert.equal(formatReviewFlag('是'), '是')
  assert.equal(formatReviewFlag('否'), '否')
  assert.equal(formatReviewFlag(null), '')
  assert.equal(formatReviewFlag(undefined), '')
  assert.equal(formatReviewFlag(''), '')
  assert.equal(formatReviewFlag('true'), '是')
  assert.equal(formatReviewFlag(true), '是')
  assert.equal(formatReviewFlag('Y'), '是')
  assert.equal(formatReviewFlag('1'), '是')
  assert.equal(formatReviewFlag(1), '是')
  assert.equal(formatReviewFlag('false'), '否')
  assert.equal(formatReviewFlag(false), '否')
  assert.equal(formatReviewFlag('N'), '否')
  assert.equal(formatReviewFlag('0'), '否')
  assert.equal(formatReviewFlag(0), '否')
})
