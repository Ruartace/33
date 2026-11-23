/**
 * 来文处理状态口径（专利 / 商标来文列表共用）
 *
 * 后端把「状态」拆成 9 个内部状态值 + 3 个业务分组 + 9 个中文标签，
 * 列表接口直接返回 statusLabel（中文标签）和 statusGroup（业务分组），
 * 前端展示与筛选一律以这两个字段为准。
 *
 * 下面的常量表只在后端未返回 statusLabel / statusGroup 时兜底使用，
 * 不要用它替代接口返回的字段。
 */

// 业务分组（同时也是处理状态下拉的 3 个取值）
export const STATUS_GROUP_PENDING = '未处理'
export const STATUS_GROUP_DONE = '已处理'
export const STATUS_GROUP_NO_PROCESS = '无需处理'

/** 处理状态下拉：仅 3 项，旧的「匹配失败 / 匹配成功 / 处理中」后端已不存在 */
export const STATUS_FILTER_OPTIONS = [
  { label: STATUS_GROUP_PENDING, value: STATUS_GROUP_PENDING },
  { label: STATUS_GROUP_DONE, value: STATUS_GROUP_DONE },
  { label: STATUS_GROUP_NO_PROCESS, value: STATUS_GROUP_NO_PROCESS },
]

/** 内部状态值 -> 中文标签 */
export const STATUS_LABEL_MAP = {
  找不到内部代码: '缺文件描述',
  有多个内部代码: '内部代码不唯一',
  内部代码唯一: '未处理',
  找不到项目: '找不到项目',
  找到多个项目: '项目不唯一',
  找到唯一项目: '已匹配',
  导入成功: '已处理',
  导入失败: '导入失败',
  无通知书规则: '无通知书规则',
  无需处理: '无需处理',
}

/** 内部状态值 -> 业务分组 */
export const STATUS_GROUP_MAP = {
  找不到内部代码: STATUS_GROUP_PENDING,
  有多个内部代码: STATUS_GROUP_PENDING,
  内部代码唯一: STATUS_GROUP_PENDING,
  找不到项目: STATUS_GROUP_PENDING,
  找到多个项目: STATUS_GROUP_PENDING,
  找到唯一项目: STATUS_GROUP_PENDING,
  导入成功: STATUS_GROUP_DONE,
  导入失败: STATUS_GROUP_PENDING,
  无通知书规则: STATUS_GROUP_PENDING,
  无需处理: STATUS_GROUP_NO_PROCESS,
}

/** 历史遗留的英文状态值兜底 */
const LEGACY_STATUS_LABELS = {
  PENDING: STATUS_GROUP_PENDING,
  PROCESSING: STATUS_GROUP_PENDING,
  COMPLETED: STATUS_GROUP_DONE,
  NO_NEED: STATUS_GROUP_NO_PROCESS,
}

const LEGACY_STATUS_GROUPS = {
  PENDING: STATUS_GROUP_PENDING,
  PROCESSING: STATUS_GROUP_PENDING,
  COMPLETED: STATUS_GROUP_DONE,
  NO_NEED: STATUS_GROUP_NO_PROCESS,
}

const pick = (row, camel, snake) => {
  const value = row?.[camel] ?? row?.[snake]
  return typeof value === 'string' && value.trim() !== '' ? value.trim() : ''
}

/** 取列表行 / 对象的内部状态值 */
export const getInternalStatus = (row = {}) => pick(row, 'status', 'status') || ''

/** 状态列展示文案：优先后端返回的 statusLabel，不回退显示内部值 status */
export const resolveStatusLabel = (row = {}) => {
  const label = pick(row, 'statusLabel', 'status_label')
  if (label) return label
  const internal = getInternalStatus(row)
  return STATUS_LABEL_MAP[internal] ?? LEGACY_STATUS_LABELS[internal] ?? ''
}

/** 状态分组：优先后端返回的 statusGroup */
export const resolveStatusGroup = (row = {}) => {
  const group = pick(row, 'statusGroup', 'status_group')
  if (group) return group
  const internal = getInternalStatus(row)
  return STATUS_GROUP_MAP[internal] ?? LEGACY_STATUS_GROUPS[internal] ?? STATUS_GROUP_PENDING
}

/** 同一「未处理」分组里需要醒目色的失败类标签 */
const FAILURE_STATUS_LABELS = new Set([
  '导入失败',
  '缺文件描述',
  '内部代码不唯一',
  '找不到项目',
  '项目不唯一',
  '无通知书规则',
])

/**
 * 状态标签颜色。
 * 未处理=默认灰、已处理=绿、无需处理=灰蓝；
 * 失败类（含无通知书规则）=红，「已匹配」=蓝。
 * 返回空字符串表示 Element Plus 默认标签色。
 */
export const resolveStatusTagType = (rowOrLabel) => {
  const row =
    typeof rowOrLabel === 'string' ? { statusLabel: rowOrLabel } : (rowOrLabel ?? {})
  const label = resolveStatusLabel(row)
  const group = resolveStatusGroup(row)

  if (FAILURE_STATUS_LABELS.has(label)) return 'danger'
  if (label === '已匹配') return 'primary'
  if (group === STATUS_GROUP_DONE) return 'success'
  if (group === STATUS_GROUP_NO_PROCESS) return 'info'
  return ''
}

/** 只有「已匹配」（内部值「找到唯一项目」）允许导入系统 */
export const isImportable = (row = {}) => resolveStatusLabel(row) === '已匹配'

/**
 * 优审 / 预审列展示。
 * 接口现返回「是」/「否」，空值为 null；旧数据里的 true/false、Y/N、1/0 仍按原意显示。
 */
export const formatReviewFlag = (value) => {
  if (value === null || value === undefined || value === '') return ''
  if (value === '是' || value === '否') return value
  if (value === true || value === 'true' || value === 'Y' || value === 1 || value === '1') return '是'
  if (value === false || value === 'false' || value === 'N' || value === 0 || value === '0') return '否'
  return String(value)
}

const ISSUE_CODE_KEYS = [
  'notificationCode',
  'notification_code',
  'notificationNo',
  'notification_no',
  'noticeCode',
  'notice_code',
  'number',
  'code',
]

const readIssueCode = (issue, reason) => {
  for (const key of ISSUE_CODE_KEYS) {
    const value = issue?.[key]
    if (value !== null && value !== undefined && String(value).trim() !== '') {
      return String(value).trim()
    }
  }
  return extractNoticeCodeFromReason(reason)
}

const readCandidates = (issue) =>
  (Array.isArray(issue?.candidates) ? issue.candidates : []).filter(
    (item) => item !== null && item !== undefined && item !== '',
  )

/** message 缺失时，按 reason 生成提示。status 内部值「找不到内部代码」展示为「缺文件描述」。 */
const buildInternalCodeIssueFallback = (issue = {}) => {
  const reason = typeof issue.reason === 'string' ? issue.reason.trim() : ''
  const code = readIssueCode(issue, reason)
  const prefix = code ? `通知书编号 ${code}：` : ''
  const candidates = readCandidates(issue)

  if (reason === '文件描述已失效') {
    return `${prefix}文件描述已失效，请到「文件描述设置」中启用，不要新建`
  }
  if (reason === '不是唯一') {
    const extra = candidates.length ? `（候选内部代码：${candidates.join('、')}）` : ''
    return `${prefix}内部代码不唯一${extra}`
  }
  if (reason === '找不到' || issue.status === '找不到内部代码') {
    return `${prefix}缺文件描述`
  }
  if (reason) return `${prefix}${reason}`
  const label = resolveStatusLabel({ status: issue.status })
  if (label) return `${prefix}${label}`
  return prefix.replace(/：$/, '')
}

/**
 * 上传响应里的 internalCodeIssues -> 提示文案。
 * 后端 message 已写好，直接展示。没有 message 时再按 reason 兜底。
 */
export const buildInternalCodeIssueMessages = (issues) => {
  const list = Array.isArray(issues) ? issues : []
  return list
    .map((issue) => {
      const message = typeof issue?.message === 'string' ? issue.message.trim() : ''
      if (message) return message
      return buildInternalCodeIssueFallback(issue ?? {})
    })
    .filter(Boolean)
}

/** 从 reason 文案里抠出通知书编号，如「通知书编号=20261101」 */
const extractNoticeCodeFromReason = (reason) => {
  if (!reason || typeof reason !== 'string') return ''
  const matched = /通知书编号\s*[:=：]?\s*([A-Za-z0-9._-]+)/.exec(reason)
  return matched?.[1] ?? ''
}

/** 从上传 / 导入接口响应里取出 internalCodeIssues */
export const extractInternalCodeIssues = (res) => {
  const issues =
    res?.data?.internalCodeIssues ??
    res?.internalCodeIssues ??
    res?.data?.data?.internalCodeIssues ??
    res?.payload?.data?.internalCodeIssues ??
    res?.payload?.internalCodeIssues ??
    []
  return Array.isArray(issues) ? issues : []
}

/**
 * 从导入接口响应里取出需要提示的明细：
 * 1. failed === true 的条目 —— remark 里已带明确原因（未匹配文件描述 / internal_code 为空 /
 *    无有效规则 / 未定位到案件 / 无变更），直接展示；
 * 2. failed === false 但被跳过的条目 —— 后端在 remark 里写明跳过原因（如「状态为「导入失败」，
 *    已按无需处理跳过」），这类同样要提示，避免用户以为导入成功了。
 */
export const extractFailedImportDetails = (res) => {
  const details =
    res?.data?.details ??
    res?.details ??
    res?.data?.data?.details ??
    res?.payload?.data?.details ??
    res?.payload?.details ??
    []
  const list = Array.isArray(details) ? details : []
  return list
    .filter((item) => {
      if (item?.failed === true) return true
      // 已产生实际变更的条目不算问题；只有被跳过的才提示
      const changed =
        (item?.inserted ?? 0) +
        (item?.updated ?? 0) +
        (item?.caseStatusUpdated ?? 0) +
        (item?.caseInfoUpdated ?? 0)
      if (changed > 0) return false
      const remark = item?.remark ?? ''
      return typeof remark === 'string' && remark.includes('跳过')
    })
    .map((item) => item?.remark || item?.message || '导入失败')
}

/**
 * 从导入接口响应里取出所有条目的 remark（不仅仅是失败的，成功/跳过/失败都取）。
 * 后端对每个导入条目都会返回 remark 说明处理结果（如「已导入」、「跳过」、「失败原因」）。
 * 统一展示让用户知道每条的去向。
 */
export const extractAllImportRemarks = (res) => {
  const details =
    res?.data?.details ??
    res?.details ??
    res?.data?.data?.details ??
    res?.payload?.data?.details ??
    res?.payload?.details ??
    []
  const list = Array.isArray(details) ? details : []
  return list
    .map((item) => item?.remark || item?.message || '')
    .filter(Boolean)
}

const readDetailList = (res) => {
  const details =
    res?.data?.details ??
    res?.details ??
    res?.data?.data?.details ??
    res?.payload?.data?.details ??
    res?.payload?.details ??
    []
  return Array.isArray(details) ? details : []
}

/** 常见 remark 片段对应的人工说明。原文（含基准日期代码）仍原样保留。 */
const hintForRemarkSegment = (segment) => {
  if (/期限基准日期取不到\s*[:：]\s*priority_date/.test(segment)) {
    return '该案件无优先权信息，相关期限需人工补'
  }
  if (/期限基准日期取不到\s*[:：]\s*application_date/.test(segment)) {
    return '该案件无申请日，相关期限需人工补'
  }
  if (segment.includes('来文 PDF 地址为空') || segment.includes('来文PDF地址为空')) {
    return '重新上传该来文后才会生成附件'
  }
  if (segment.includes('本次未对应到处理事项')) {
    return '检查规则的处理事项'
  }
  if (segment.includes('找不到对应事项')) {
    return '核对规则的事项名称与案件内事项'
  }
  if (segment === '无变更') {
    return '可转状态后重试'
  }
  return ''
}

/**
 * 导入结果弹窗行。failed=false 但带 remark 的条目同样展示。
 * 多段用「；」拼接，基准日期代码保留在 remark 原文里。
 */
export const buildImportResultRows = (res) => {
  return readDetailList(res)
    .map((item) => {
      const raw = String(item?.remark || item?.message || '').trim()
      if (!raw) return null
      const segments = raw
        .split(/[；;\n]+/)
        .map((part) => part.trim())
        .filter(Boolean)
      const hints = []
      segments.forEach((segment) => {
        const hint = hintForRemarkSegment(segment)
        if (hint && !hints.includes(hint)) hints.push(hint)
      })
      const caseCode =
        item?.caseCode ?? item?.case_code ?? item?.projectNumber ?? item?.project_no ?? ''
      return {
        caseCode: caseCode == null ? '' : String(caseCode),
        remark: segments.join('；'),
        hint: hints.join('；'),
        failed: item?.failed === true,
      }
    })
    .filter(Boolean)
}
