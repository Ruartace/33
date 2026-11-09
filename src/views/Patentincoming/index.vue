<template>
  <div class="patentincoming-wrapper">
    <!-- 搜索模块 -->
    <div class="body-part-search">
      <div class="filter-form">
        <el-form :model="queryParams" ref="queryForm" label-width="120px">
          <el-row :gutter="20">
            <el-col :span="8">
              <el-form-item label="项目编号" prop="projectNo">
                <el-input
                  v-model="queryParams.projectNo"
                  placeholder="请输入项目编号"
                  clearable
                  class="filter-item"
                  @keyup.enter="handleQuery"
                />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="机构编号" prop="institutionNumber">
                <el-input
                  v-model="queryParams.institutionNumber"
                  placeholder="请输入机构编号"
                  clearable
                  class="filter-item"
                  @keyup.enter="handleQuery"
                />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="申请号" prop="applicationNumber">
                <el-input
                  v-model="queryParams.applicationNumber"
                  placeholder="请输入申请号"
                  clearable
                  class="filter-item"
                  @keyup.enter="handleQuery"
                />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="处理状态" prop="status">
                <el-select
                  v-model="queryParams.status"
                  placeholder="请选择处理状态"
                  clearable
                  class="filter-item"
                >
                  <el-option
                    v-for="item in STATUS_FILTER_OPTIONS"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="发文日">
                <el-date-picker
                  v-model="queryParams.issueTime"
                  type="daterange"
                  value-format="YYYY-MM-DD"
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="申请日期">
                <el-date-picker
                  v-model="queryParams.applicationTime"
                  type="daterange"
                  value-format="YYYY-MM-DD"
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="项目名称" prop="projectName">
                <el-input
                  v-model="queryParams.projectName"
                  placeholder="请输入项目名称"
                  clearable
                  class="filter-item"
                  @keyup.enter="handleQuery"
                />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="客户名称" prop="customerName">
                <el-input
                  v-model="queryParams.customerName"
                  placeholder="请输入客户名称"
                  clearable
                  class="filter-item"
                  @keyup.enter="handleQuery"
                />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="通知名称" prop="notificationName">
                <el-input
                  v-model="queryParams.notificationName"
                  placeholder="请输入通知名称"
                  clearable
                  class="filter-item"
                  @keyup.enter="handleQuery"
                />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="申请类型" prop="applicationType">
                <el-select
                  v-model="queryParams.applicationType"
                  placeholder="请选择或搜索申请类型"
                  clearable
                  filterable
                  class="filter-item"
                >
                  <el-option
                    v-for="item in applicationTypeOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="2">
              <el-form-item >
                <el-checkbox v-model="queryParams.PriorityReview">优审案</el-checkbox>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item >
                <el-checkbox v-model="queryParams.PreliminaryReview">预审案</el-checkbox>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>

        <!-- 按钮区域 -->
        <div class="part-search-buttons">
          <el-button type="primary" @click="handleSearch">
            <el-icon><SearchIcon /></el-icon>
            查询
          </el-button>
          <el-button @click="handleReset">
            <el-icon><RefreshIcon /></el-icon>
            重置
          </el-button>
        </div>
      </div>
    </div>

    <!-- 内容区域 -->
    <div class="body-part-content">
      <div class="part-table-header">
        <div class="part-table-title">
          <span>专利电子来文</span>
        </div>
        <div class="part-table-actions">
          <el-button type="primary" @click="handleRestoreNotImported">
            恢复未导入
          </el-button>
          <el-button type="primary" @click="handleMoveToNoProcess">
            转入无需处理
          </el-button>
          <el-tooltip :content="importDisabledTip" placement="top" :disabled="!importDisabled">
            <span>
              <el-button type="primary" :disabled="importDisabled" @click="handleImportToSystem">
                导入系统
              </el-button>
            </span>
          </el-tooltip>
          <el-button type="primary" @click="handleMatchProject">
            匹配项目
          </el-button>
          <el-button type="primary" @click="handleExportTable">
            <el-icon><DownloadIcon /></el-icon>
            导出表格
          </el-button>
          <el-button type="primary" @click="handleUploadReceipt">
            <el-icon><DownloadIcon /></el-icon>
            上传回执
          </el-button>
          <el-button type="primary" @click="handleUploadCertificate">
            <el-icon><DownloadIcon /></el-icon>
            上传证书
          </el-button>
          <el-button type="primary" @click="handleUploadNotification">
            <el-icon><DownloadIcon /></el-icon>
            上传通知
          </el-button>
        </div>
      </div>

      <!-- 数据表格 -->
      <el-table
        v-loading="loading"
        :data="tableData"
        border
        row-key="id"
        @selection-change="handleSelectionChange"
        style="width: 100%"
      >
        <el-table-column type="selection" width="80" align="center" />
        <el-table-column label="序号" align="center" width="60">
          <template #default="scope">
            {{ scope.$index + 1 }}
          </template>
        </el-table-column>
        <el-table-column label="项目编号" prop="caseCode" width="150" align="center" />
        <el-table-column label="申请号" prop="applicationNo" width="150" align="center" />
        <el-table-column label="项目名称" prop="caseName" min-width="200" align="center" />
        <el-table-column label="来文类型" prop="incomingDocType" width="120" align="center" />
        <el-table-column label="官方发文日" prop="officialDocumentDate" width="120" align="center" />
        <el-table-column label="通知书编码" prop="notificationCode" width="100" align="center" />
        <el-table-column label="内部代码" prop="internalCode" width="100" align="center" />
        <el-table-column label="发文序列号" prop="documentSequenceNumber" width="130" align="center" />
        <el-table-column label="通知名称" prop="notificationName" width="120" align="center" />
        <el-table-column label="申请类型" prop="applicationType" width="120" align="center" />
        <el-table-column label="优审案" prop="priorityExamination" width="140" align="center" />
        <el-table-column label="预审案" prop="preliminaryCase" width="100" align="center" />
        <el-table-column label="机构账号" prop="institutionNumber" width="120" align="center" />
        <el-table-column label="客户名称" prop="customerName" width="120" align="center" />
        <el-table-column label="状态" width="120" align="center">
          <template #default="scope">
            <el-tag
              v-if="scope.row.statusLabel"
              :type="resolveStatusTagType(scope.row)"
              size="small"
              effect="light"
            >
              {{ scope.row.statusLabel }}
            </el-tag>
            <span v-else>{{ scope.row.status }}</span>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <el-pagination
        v-show="total > 0"
        :total="total"
        v-model:current-page="queryParams.pageNum"
        v-model:page-size="queryParams.pageSize"
        :page-sizes="[10, 20, 50, 100]"
        layout="total, sizes, prev, pager, next, jumper"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>

    <!-- 上传通知弹窗 -->
    <el-dialog
      v-model="uploadDialogVisible"
      :title="uploadType === 'certificate' ? '上传证书' : uploadType === 'receipt' ? '上传回执' : '上传通知'"
      width="500px"
      @close="handleDialogClose"
    >
      <el-form :model="uploadForm" label-width="100px">
        <el-form-item label="上传文件">
          <el-upload
            ref="uploadRef"
            :auto-upload="false"
            :limit="1"
            :on-change="handleFileChange"
            :on-remove="handleFileRemove"
            accept=".zip,.rar,.7z"
            drag
          >
            <el-icon><UploadFilled /></el-icon>
            <span>将文件拖到此处，或<em>点击上传</em></span>
            <template #tip>
              <div class="el-upload__tip">支持 .zip/.rar/.7z 格式文件</div>
            </template>
          </el-upload>
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="uploadDialogVisible = false">取消</el-button>
        <el-button type="primary" :loading="uploadLoading" @click="handleConfirmUpload">确认上传</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import {
  Search as SearchIcon,
  Refresh as RefreshIcon,
  Download as DownloadIcon,
  UploadFilled,
} from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'
import { PatentIncomingAPI } from '@/api/patentincoming'
import {
  STATUS_FILTER_OPTIONS,
  resolveStatusLabel,
  resolveStatusGroup,
  resolveStatusTagType,
  isImportable,
  buildInternalCodeIssueMessages,
  extractInternalCodeIssues,
  extractFailedImportDetails,
} from '@/utils/incomingStatus'

defineOptions({ name: 'PatentIncomingPage' })

const route = useRoute()

const loading = ref(false)
const ids = ref([])
const selectedRows = ref([])
const total = ref(0)
const tableData = ref([])
const uploadDialogVisible = ref(false)
const uploadLoading = ref(false)
const uploadRef = ref(null)
const uploadType = ref('notification')
const uploadForm = reactive({
  file: null,
})

const queryParams = reactive({
  pageNum: 1,
  pageSize: 10,
  projectNo: '',
  institutionNumber: '',
  applicationNumber: '',
  // 默认按「未处理」分组过滤（后端 status 为空时也会兜底按未处理过滤，前端显式传更稳妥）
  status: '未处理',
  issueTime: [],
  applicationTime: [],
  projectName: '',
  customerName: '',
  notificationName: '',
  applicationType: '',
  PriorityReview: false,
  PreliminaryReview: false,
})

const applicationTypeOptions = ref([])

const fetchApplyTypeOptions = async () => {
  try {
    const res = await PatentIncomingAPI.getApplyTypeOptions()
    const list = Array.isArray(res?.data) ? res.data : []
    applicationTypeOptions.value = list.map((item) => ({
      label: item.applyTypeName,
      value: item.applyTypeName,
    }))
  } catch (error) {
    console.error('获取申请类型失败:', error)
    applicationTypeOptions.value = []
  }
}

const priorityExaminationOptions = [
  // 后端契约：priorityExamination 取值为字符串 "true"/"false"
  // 页面用 el-checkbox 直接控制 queryParams.PriorityReview（boolean），
  // 提交时映射为 'true' / null。保留空数组防止有人改回下拉时漏配。
  { label: '是', value: 'true' },
  { label: '否', value: 'false' },
]

const preliminaryCaseOptions = [
  // 同上：preliminaryCase 取值为字符串 "true"/"false"
  { label: '是', value: 'true' },
  { label: '否', value: 'false' },
]

/**
 * 将接口返回（蛇形 / 驼峰、parse-zip 等）规整为表格使用字段
 */
const normalizeIncomingItem = (item = {}) => {
  const major = item.fileCategoryMajor ?? item.file_category_major
  const minor = item.fileCategoryMinor ?? item.file_category_minor
  const categoryLabel = [major, minor]
    .filter((x) => x != null && String(x).trim() !== '')
    .join('/')
  const incomingDocType =
    item.notificationType ??
    item.notification_type ??
    item.sourceType ??
    item.source_type ??
    item.documentType ??
    item.document_type ??
    categoryLabel ??
    ''

  return {
    caseCode:
      item.caseCode ??
      item.case_code ??
      item.project_no ??
      item.projectNumber ??
      '',
    applicationNo:
      item.applicationNo ??
      item.application_no ??
      item.applicationNumber ??
      item.application_number ??
      '',
    caseName:
      item.caseName ?? item.case_name ?? item.projectName ?? item.project_name ?? '',
    incomingDocType,
    officialDocumentDate:
      item.officialDocumentDate ??
      item.official_document_date ??
      item.officialReleaseDate ??
      item.official_release_date ??
      item.issueDate ??
      item.issue_date ??
      '',
    notificationCode:
      item.notificationCode ??
      item.notification_code ??
      item.notification_number ??
      item.notificationNumber ??
      '',
    internalCode: item.internalCode ?? item.internal_code ?? '',
    documentSequenceNumber:
      item.documentSequenceNumber ?? item.document_sequence_number ?? '',
    notificationName: item.notificationName ?? item.notification_name ?? '',
    applicationType: item.applicationType ?? item.application_type ?? '',
    priorityExamination:
      item.priorityExamination ??
      item.priority_examination ??
      item.optimisticApprovalCase ??
      '',
    preliminaryCase:
      item.preliminaryCase ??
      item.preliminary_case ??
      item.preapprovalCase ??
      '',
    institutionNumber:
      item.institutionNumber ??
      item.institution_number ??
      item.organizationAccount ??
      item.organization_account ??
      '',
    customerName: item.customerName ?? item.customer_name ?? '',
    notificationBrief: item.notificationBrief ?? item.notification_brief ?? '',
    status: item.status ?? '',
    statusLabel: item.statusLabel ?? item.status_label ?? '',
    statusGroup: item.statusGroup ?? item.status_group ?? '',
    applicationDate: item.applicationDate ?? item.application_date ?? '',
  }
}

const mapFields = (row) => ({
  ...row,
  // status 保留后端内部状态值（转状态接口按内部值比对），展示一律用 statusLabel
  statusLabel: resolveStatusLabel(row),
  statusGroup: resolveStatusGroup(row),
  // 优先按后端契约 "true"/"false" 映射；兼容历史数据中的 Y/N、布尔值；其余原样展示
  priorityExamination:
    row.priorityExamination === 'true' || row.priorityExamination === true || row.priorityExamination === 'Y'
      ? '是'
      : row.priorityExamination === 'false' ||
          row.priorityExamination === false ||
          row.priorityExamination === 'N'
        ? '否'
        : (row.priorityExamination ?? ''),
  preliminaryCase:
    row.preliminaryCase === 'true' || row.preliminaryCase === true || row.preliminaryCase === 'Y'
      ? '是'
      : row.preliminaryCase === 'false' ||
          row.preliminaryCase === false ||
          row.preliminaryCase === 'N'
        ? '否'
        : (row.preliminaryCase ?? ''),
})

const ensureSelection = () => {
  if (!ids.value || ids.value.length === 0) {
    ElMessage.warning('请先在表格中勾选要操作的来文')
    return false
  }
  return true
}

const getList = async () => {
  loading.value = true
  try {
    // 日期区间拆成 Start/End，且空值用 null 过滤（避免发送空字符串导致后端判定为错误格式）
    const [issueStart, issueEnd] = queryParams.issueTime || []
    const [applyStart, applyEnd] = queryParams.applicationTime || []
    const params = {
      caseCode: queryParams.projectNo || null,
      institutionNumber: queryParams.institutionNumber || null,
      applicationNo: queryParams.applicationNumber || null,
      caseName: queryParams.projectName || null,
      customerName: queryParams.customerName || null,
      notificationName: queryParams.notificationName || null,
      applicationType: queryParams.applicationType || null,
      status: queryParams.status || null,
      preliminaryCase: queryParams.PreliminaryReview ? 'true' : null,
      priorityExamination: queryParams.PriorityReview ? 'true' : null,
      officialDocumentDateStart: issueStart || null,
      officialDocumentDateEnd: issueEnd || null,
      applicationDateStart: applyStart || null,
      applicationDateEnd: applyEnd || null,
    }
    const res = await PatentIncomingAPI.getList(params)
    let payload = res?.data !== undefined ? res.data : res
    let rawList = Array.isArray(payload)
      ? payload
      : Array.isArray(payload?.data)
        ? payload.data
        : payload?.list ?? payload?.records ?? []
    if (!Array.isArray(rawList)) rawList = []
    const list = rawList.map((item, index) =>
      mapFields({
        ...normalizeIncomingItem(item),
        id: item.id != null ? item.id : index + 1,
      }),
    )
    total.value = payload?.total ?? payload?.count ?? list.length
    const start = (queryParams.pageNum - 1) * queryParams.pageSize
    const end = start + queryParams.pageSize
    tableData.value = list.slice(start, end)
  } catch (error) {
    console.error('获取列表失败:', error)
    ElMessage.error('获取列表失败')
    tableData.value = []
    total.value = 0
  } finally {
    loading.value = false
  }
}

const handleQuery = () => {
  queryParams.pageNum = 1
  getList()
}

const handleSearch = () => {
  handleQuery()
}

const handleReset = () => {
  queryParams.pageNum = 1
  queryParams.pageSize = 10
  queryParams.projectNo = ''
  queryParams.institutionNumber = ''
  queryParams.applicationNumber = ''
  queryParams.status = '未处理'
  queryParams.issueTime = []
  queryParams.applicationTime = []
  queryParams.projectName = ''
  queryParams.customerName = ''
  queryParams.notificationName = ''
  queryParams.applicationType = ''
  queryParams.PriorityReview = false
  queryParams.PreliminaryReview = false
  handleSearch()
}

const handleSizeChange = (size) => {
  queryParams.pageSize = size
  getList()
}

const handleCurrentChange = (page) => {
  queryParams.pageNum = page
  getList()
}

const handleSelectionChange = (selection) => {
  ids.value = selection.map((item) => item.id)
  selectedRows.value = selection
}

// 只有「已匹配」（内部值「找到唯一项目」）允许导入系统，其它状态后端会直接跳过
const importableRows = computed(() => selectedRows.value.filter((row) => isImportable(row)))
const importDisabled = computed(
  () => selectedRows.value.length > 0 && importableRows.value.length === 0,
)
const importDisabledTip = computed(() => {
  if (!importDisabled.value) return ''
  return '所选记录中没有「已匹配」状态，无法导入系统，请先完成匹配项目'
})

const handleRestoreNotImported = async () => {
  if (!ensureSelection()) return
  loading.value = true
  try {
    await PatentIncomingAPI.restoreProcesses({ ids: ids.value })
    ElMessage.success(`已恢复未导入来文，共 ${ids.value.length} 条`)
    getList()
  } catch (error) {
    console.error('恢复失败:', error)
    ElMessage.error('恢复失败')
  } finally {
    loading.value = false
  }
}

const handleMoveToNoProcess = async () => {
  if (!ensureSelection()) return
  loading.value = true
  try {
    const res = await PatentIncomingAPI.moveNoNeed({ ids: ids.value })
    if (res.data?.success) {
      ElMessage.success(`已转入无需处理，共 ${res.data.updatedCount} 条`)
      getList()
    } else {
      ElMessage.error(res.data?.message || '转入失败')
    }
  } catch (error) {
    console.error('转入失败:', error)
    ElMessage.error('转入失败')
  } finally {
    loading.value = false
  }
}

const handleImportToSystem = async () => {
  if (!ensureSelection()) return
  // 双保险：只有「已匹配」的记录允许导入系统
  const importableIds = importableRows.value.map((row) => row.id)
  if (importableIds.length === 0) {
    ElMessage.warning('所选记录中没有「已匹配」状态，无法导入系统，请先完成匹配项目')
    return
  }
  if (importableIds.length !== selectedRows.value.length) {
    ElMessage.warning('所选记录中存在非「已匹配」状态，已仅导入「已匹配」的记录')
  }
  loading.value = true
  try {
    const res = await PatentIncomingAPI.importProcesses({ ids: importableIds })
    const failedDetails = extractFailedImportDetails(res)
    if (failedDetails.length > 0) {
      ElMessage.warning({
        message: `导入完成，但有 ${failedDetails.length} 条未成功：\n${failedDetails.join('\n')}`,
        duration: 0,
        showClose: true,
        customClass: 'el-message-multiline',
      })
    } else {
      ElMessage.success(res?.message || `已导入系统，共 ${importableIds.length} 条`)
    }
    getList()
  } catch (error) {
    console.error('导入系统失败:', error)
    const failedDetails = extractFailedImportDetails(error?.payload ?? error?.response?.data ?? error)
    if (failedDetails.length > 0) {
      ElMessage.warning({
        message: `导入完成，但有 ${failedDetails.length} 条未成功：\n${failedDetails.join('\n')}`,
        duration: 0,
        showClose: true,
        customClass: 'el-message-multiline',
      })
    } else {
      ElMessage.error(error?.message || '导入系统失败')
    }
  } finally {
    loading.value = false
  }
}

const handleMatchProject = async () => {
  loading.value = true
  try {
    // 不传 ids 为全量匹配；传 ids 为定向匹配（当前 UI 无此场景）
    const params = ids.value && ids.value.length > 0 ? { ids: ids.value } : {}
    const res = await PatentIncomingAPI.oneClickMatch(params)
    const data = res?.data ?? res ?? {}
    const matched = data.matchedCount ?? 0
    const failed = data.failedCount ?? 0
    const failedItems = Array.isArray(data.failedItems) ? data.failedItems : []
    if (failedItems.length > 0) {
      const codes = failedItems.map((i) => i.caseCode).join('、')
      ElMessage.warning(`匹配完成，成功 ${matched} 条，失败 ${failed} 条（未匹配到案件：${codes}）`)
    } else {
      ElMessage.success(`匹配完成，成功 ${matched} 条${failed > 0 ? `，失败 ${failed} 条` : ''}`)
    }
    getList()
  } catch (error) {
    console.error('匹配失败:', error)
    const msg = error?.response?.data?.message ?? error?.message ?? '匹配失败'
    ElMessage.error(msg)
  } finally {
    loading.value = false
  }
}

const handleExportTable = async () => {
  if (!ensureSelection()) return
  loading.value = true
  try {
    const res = await PatentIncomingAPI.exportExcel(ids.value)
    const blob = res.data
    const url = window.URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    const date = new Date()
    const fmt = (n) => String(n).padStart(2, '0')
    const filename = `专利来文${date.getFullYear()}${fmt(date.getMonth() + 1)}${fmt(date.getDate())}.xlsx`
    link.download = filename
    link.click()
    window.URL.revokeObjectURL(url)
    ElMessage.success('导出成功')
  } catch (error) {
    console.error('导出失败:', error)
    ElMessage.error('导出失败')
  } finally {
    loading.value = false
  }
}

const handleUploadReceipt = () => {
  uploadDialogVisible.value = true
  uploadType.value = 'receipt'
}

const handleUploadCertificate = () => {
  uploadDialogVisible.value = true
  uploadType.value = 'certificate'
}

const handleUploadNotification = () => {
  uploadDialogVisible.value = true
  uploadType.value = 'notification'
}

const handleFileChange = (file) => {
  uploadForm.file = file.raw
}

const handleFileRemove = () => {
  uploadForm.file = null
}

const handleDialogClose = () => {
  if (uploadRef.value) {
    uploadRef.value.clearFiles()
  }
  uploadForm.file = null
}

const handleConfirmUpload = async () => {
  if (!uploadForm.file) {
    ElMessage.warning('请先选择文件')
    return
  }
  uploadLoading.value = true
  try {
    const formData = new FormData()
    formData.append('file', uploadForm.file)
    
    let message = '上传成功'
    let res = null
    if (uploadType.value === 'certificate') {
      res = await PatentIncomingAPI.parseZipRuidDao(formData)
      message = '证书上传成功'
    } else if (uploadType.value === 'notification') {
      res = await PatentIncomingAPI.parseZip(formData)
      message = '通知上传成功'
    } else if (uploadType.value === 'receipt') {
      await PatentIncomingAPI.parseListXml(formData)
      message = '回执上传成功'
    }

    // 上传后若通知书没有有效的文件描述配置，后端会返回 internalCodeIssues
    const issueMessages = buildInternalCodeIssueMessages(extractInternalCodeIssues(res))
    if (issueMessages.length > 0) {
      ElMessage.warning({
        message: `${message}\n${issueMessages.join('\n')}`,
        duration: 0,
        showClose: true,
        customClass: 'el-message-multiline',
      })
    } else {
      ElMessage.success(message)
    }
    uploadDialogVisible.value = false
    getList()
  } catch (error) {
    console.error('上传失败:', error)
    ElMessage.error('上传失败')
  } finally {
    uploadLoading.value = false
  }
}

watch(
  () => route.fullPath,
  () => {
    getList()
  },
)

onMounted(() => {
  getList()
  fetchApplyTypeOptions()
})
</script>

<style scoped>
.patentincoming-wrapper {
  box-sizing: border-box;
}

/* 搜索模块样式 */
.body-part-search {
  padding: 16px;
  background: #fff;
  border-radius: 4px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  margin-bottom: 16px;
}

.filter-form {
  width: 100%;
}

.part-search-buttons {
  text-align: center;
  margin-top: 10px;
  padding-top: 10px;
  border-top: 1px solid #ebeef5;
}

/* 内容区域样式 */
.body-part-content {
  padding: 16px;
  background: #fff;
  border-radius: 4px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}

.part-table-header {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-bottom: 15px;
  gap: 12px;
  width: 100%;
}

.part-table-title {
  font-size: 16px;
  font-weight: 600;
  color: #303133;
  flex-shrink: 0;
}

.part-table-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  width: 100%;
}

.el-pagination {
  margin-top: 16px;
  text-align: right;
  flex-wrap: wrap;
}

.filter-item {
  width: 100%;
}

/* 输入框使用默认高度，和下拉框保持一致 */
.filter-item :deep(.el-input),
.filter-item :deep(.el-input__inner),
.filter-item :deep(.el-input__wrapper) {
  height: 35px;
  line-height: normal;
}

.filter-item :deep(.el-input__wrapper) {
  min-height: auto;
}

/* 下拉选择器使用默认高度 */
.filter-item :deep(.el-select) {
  height: auto;
}

.filter-item :deep(.el-select .el-input__inner),
.filter-item :deep(.el-select .el-input__wrapper) {
  height: auto;
  line-height: normal;
}

:deep(.el-message-multiline) {
  white-space: pre-line;
  max-width: 60vw;
}
</style>
