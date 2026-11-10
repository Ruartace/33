const isBlob = (value) => typeof Blob !== 'undefined' && value instanceof Blob

/** 读取接口错误文案。优先响应体 message，避免把 axios 的状态码句子展示给用户。 */
export const readErrorMessage = (error, fallback = '请求失败') => {
  const body = error?.response?.data ?? error?.payload
  if (body && typeof body === 'object' && !isBlob(body)) {
    const message = body.message || body.msg
    if (typeof message === 'string' && message.trim()) return message.trim()
  }
  const msg = error?.message
  if (typeof msg === 'string' && msg.trim() && !msg.startsWith('Request failed with status code')) {
    return msg.trim()
  }
  return fallback
}

/** 导出接口用文件流返回，400 时 body 是 JSON Blob，需要先读出 message。 */
export const readBlobErrorMessage = async (data, fallback = '请求失败') => {
  if (!isBlob(data)) return fallback
  try {
    const text = await data.text()
    const json = JSON.parse(text)
    const message = json?.message || json?.msg
    if (typeof message === 'string' && message.trim()) return message.trim()
  } catch {
    // 不是 JSON 时用调用方给的兜底文案
  }
  return fallback
}
