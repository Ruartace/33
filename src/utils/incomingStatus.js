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

/** 状态列展示文案：优先后端返回的 statusLabel */
export const resolveStatusLabel = (row = {}) => {
  const label = pick(row, 'statusLabel', 'status_label')
  if (label) return label
  const internal = getInternalStatus(row)
  return STATUS_LABEL_MAP[internal] ?? LEGACY_STATUS_LABELS[internal] ?? internal
}

/** 状态分组：优先后端返回的 statusGroup */
export const resolveStatusGroup = (row = {}) => {
  const group = pick(row, 'statusGroup', 'status_group')
  if (group) return group
  const internal = getInternalStatus(row)
  return STATUS_GROUP_MAP[internal] ?? LEGACY_STATUS_GROUPS[internal] ?? STATUS_GROUP_PENDING
}

/**
 * 状态标签颜色：按 statusGroup 上底色，失败类标签再用醒目色覆盖。
 * 未处理=默认、已处理=成功色、无需处理=灰色；
 * 缺文件描述 / 内部代码不唯一 / 找不到项目 / 项目不唯一 / 导入失败 = 醒目色（danger）。
 * 已匹配用警告色，突出「可以导入系统」的行。
 */
export const resolveStatusTagType = (rowOrLabel) => {
  const row =
    typeof rowOrLabel === 'string' ? { statusLabel: rowOrLabel } : (rowOrLabel ?? {})
  const label = row.statusLabel ?? ''
  const group = row.statusGroup ?? resolveStatusGroup(row)

  if (
    label === '导入失败' ||
    label === '缺文件描述' ||
    label === '内部代码不唯一' ||
    label === '找不到项目' ||
    label === '项目不唯一'
  ) {
    return 'danger'
  }
  if (label === '已匹配') return 'warning'
  if (group === STATUS_GROUP_DONE) return 'success'
  if (group === STATUS_GROUP_NO_PROCESS) return 'info'
  return 'primary'
}

/** 只有「已匹配」（内部值「找到唯一项目」）允许导入系统 */
export const isImportable = (row = {}) => resolveStatusLabel(row) === '已匹配'

/**
 * 上传响应里的 internalCodeIssues -> 提示文案。
 * 后端给的是 status / reason / candidates，其中 status 仍是内部值
 * （如「找不到内部代码」），展示要换成中文标签「缺文件描述」。
 */
export const buildInternalCodeIssueMessages = (issues) => {
  const list = Array.isArray(issues) ? issues : []
  return list.map((issue) => {
    const reason = issue?.reason ?? issue?.message ?? ''
    const code =
      issue?.notificationCode ??
      issue?.notification_code ??
      issue?.notificationNo ??
      issue?.notification_no ??
      issue?.noticeCode ??
      issue?.notice_code ??
      issue?.number ??
      issue?.code ??
      // 通知书编号可能只写在 reason 里
      extractNoticeCodeFromReason(reason) ??
      ''
    const label = resolveStatusLabel({ status: issue?.status })
    const candidates = (Array.isArray(issue?.candidates) ? issue.candidates : []).filter(
      (c) => c !== null && c !== undefined && c !== '',
    )
    const base =
      `通知书编号 ${code || '未知'} 没有有效的文件描述配置，` +
      `已置为${label || '缺文件描述'}，请先在「文件描述设置」中配置后再匹配`
    const extras = []
    if (candidates.length > 0) extras.push(`候选内部代码：${candidates.join('、')}`)
    if (reason && !code) extras.push(reason)
    return extras.length > 0 ? `${base}（${extras.join('；')}）` : base
  })
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
