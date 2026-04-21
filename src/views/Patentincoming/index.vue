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
                    v-for="item in statusOptions"
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
                  placeholder="请选择申请类型"
                  clearable
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
            <el-col :span="8">
              <el-form-item label="优审案">
                <el-checkbox v-model="queryParams.PriorityReview">优审案</el-checkbox>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="预审案">
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
          <el-button type="primary" @click="handleImportToSystem">
            导入系统
          </el-button>
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
        <el-table-column label="项目编号" prop="projectNumber" width="150" align="center" />
        <el-table-column label="申请号" prop="applicationNo" width="150" align="center" />
        <el-table-column label="项目名称" prop="projectName" min-width="200" align="center" />
        <el-table-column label="来文类型" prop="sourceType" width="120" align="center" />
        <el-table-column label="官方发文日" prop="officialDocumentDate" width="120" align="center" />
        <el-table-column label="通知书编码" prop="notificationNumber" width="100" align="center" />
        <el-table-column label="内部代码" prop="internalCode" width="100" align="center" />
        <el-table-column label="发文序列号" prop="documentSequenceNumber" width="130" align="center" />
        <el-table-column label="通知名称" prop="notificationName" width="120" align="center" />
        <el-table-column label="申请类型" prop="applicationType" width="120" align="center" />
        <el-table-column label="优审案" prop="priorityExamination" width="140" align="center" />
        <el-table-column label="预审案" prop="preliminaryCase" width="100" align="center" />
        <el-table-column label="机构账号" prop="institutionNumber" width="120" align="center" />
        <el-table-column label="客户名称" prop="customerName" width="120" align="center" />
        <el-table-column label="状态" prop="status" width="120" align="center" />
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
import { ref, reactive, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import {
  Search as SearchIcon,
  Refresh as RefreshIcon,
  Download as DownloadIcon,
  UploadFilled,
} from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'
import { PatentIncomingAPI } from '@/api/patentincoming'

defineOptions({ name: 'TrademarkIncomingPage' })

const route = useRoute()

const loading = ref(false)
const ids = ref([])
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
  status: '',
  issueTime: [],
  applicationTime: [],
  projectName: '',
  customerName: '',
  notificationName: '',
  applicationType: '',
  PriorityReview: false,
  PreliminaryReview: false,
})

const applicationTypeOptions = [
  { label: '发明', value: '发明' },
  { label: '实用新型', value: '实用新型' },
  { label: '外观', value: '外观' },
  { label: '商标', value: '商标' },
]

const priorityExaminationOptions = [
  { label: '是', value: 'Y' },
  { label: '否', value: 'N' },
]

const preliminaryCaseOptions = [
  { label: '是', value: 'Y' },
  { label: '否', value: 'N' },
]

const statusOptions = [
  { label: '未处理', value: '未处理' },
  { label: '匹配失败', value: '匹配失败' },
  { label: '匹配成功', value: '匹配成功' },
  { label: '已处理', value: '已处理' },
  { label: '无需处理', value: '无需处理' },
  { label: '处理中', value: '处理中' },
]

const statusMap = {
  未处理: '未处理',
  匹配失败: '匹配失败',
  匹配成功: '匹配成功',
  已处理: '已处理',
  无需处理: '无需处理',
  PENDING: '未处理',
  PROCESSING: '处理中',
  COMPLETED: '已完成',
  NO_NEED: '无需处理',
}

const mapFields = (row) => ({
  ...row,
  status: statusMap[row.status] ?? row.status ?? '',
  priorityExamination: row.priorityExamination === 'Y' ? '是' : row.priorityExamination === 'N' ? '否' : '',
  preliminaryCase: row.preliminaryCase === 'Y' ? '是' : row.preliminaryCase === 'N' ? '否' : '',
  sourceType: row.sourceType ?? '',
  applicationType: row.applicationType ?? '',
  institutionNumber: row.institutionNumber ?? '',
  customerName: row.customerName ?? '',
  caseCode: row.caseCode ?? '',
  notificationBrief: row.notificationBrief ?? '',
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
    const params = {
      projectNo: queryParams.projectNo || null,
      institutionNumber: queryParams.institutionNumber || null,
      applicationNo: queryParams.applicationNumber || null,
      caseName: queryParams.projectName || null,
      customerName: queryParams.customerName || null,
      notificationName: queryParams.notificationName || null,
      applicationType: queryParams.applicationType || null,
      status: queryParams.status || null,
      preliminaryCase: queryParams.PreliminaryReview ? 'Y' : null,
      priorityExamination: queryParams.PriorityReview ? 'Y' : null,
      officialDocumentDateStart: queryParams.issueTime?.[0] || null,
      officialDocumentDateEnd: queryParams.issueTime?.[1] || null,
      applicationDateStart: queryParams.applicationTime?.[0] || null,
      applicationDateEnd: queryParams.applicationTime?.[1] || null,
    }
    const res = await PatentIncomingAPI.getList(params)
    const rawList = res.data || res || []
    const list = rawList.map((item, index) => ({
      id: item.id != null ? item.id : index + 1,
      projectNumber: item.project_no ?? '',
      applicationNo: item.application_no ?? '',
      projectName: item.case_name ?? '',
      sourceType: item.source_type ?? '',
      officialDocumentDate: item.official_document_date ?? '',
      notificationNumber: item.notification_code ?? '',
      internalCode: item.internal_code ?? '',
      documentSequenceNumber: item.document_sequence_number ?? '',
      notificationName: item.notification_name ?? '',
      applicationType: item.application_type ?? '',
      priorityExamination: item.priority_examination ?? '',
      preliminaryCase: item.preliminary_case ?? '',
      institutionNumber: item.institution_number ?? '',
      customerName: item.customer_name ?? '',
      status: item.status ?? '',
      applicationDate: item.application_date ?? '',
    }))
    total.value = rawList.length
    const start = (queryParams.pageNum - 1) * queryParams.pageSize
    const end = start + queryParams.pageSize
    tableData.value = list.map(mapFields).slice(start, end)
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
  queryParams.status = ''
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
}

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

const handleImportToSystem = () => {
  if (!ensureSelection()) return
  ElMessage.success(`已导入系统，共 ${ids.value.length} 条`)
}

const handleMatchProject = async () => {
  if (!ensureSelection()) return
  loading.value = true
  try {
    const res = await PatentIncomingAPI.oneClickMatch({ ids: ids.value })
    const rawList = res.data || []

    const list = rawList.map((item) => ({
      id: item.id,
      projectNumber: item.project_no ?? '',
      caseCode: item.case_code ?? '',
      applicationNo: item.application_no ?? '',
      projectName: item.case_name ?? '',
      sourceType: item.source_type ?? '',
      officialDocumentDate: item.official_document_date ?? '',
      notificationNumber: item.notification_code ?? '',
      internalCode: item.internal_code ?? '',
      documentSequenceNumber: item.document_sequence_number ?? '',
      notificationName: item.notification_name ?? '',
      applicationType: item.application_type ?? '',
      priorityExamination: item.priority_examination ?? '',
      preliminaryCase: item.preliminary_case ?? '',
      institutionNumber: item.institution_number ?? '',
      customerName: item.customer_name ?? '',
      status: item.status ?? '',
      applicationDate: item.application_date ?? '',
    }))

    total.value = list.length
    tableData.value = list.map(mapFields)
    ElMessage.success(`一键匹配完成，共 ${list.length} 条`)
  } catch (error) {
    console.error('匹配失败:', error)
    ElMessage.error('匹配失败')
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
  if (!ensureSelection()) return
  uploadDialogVisible.value = true
  uploadType.value = 'receipt'
}

const handleUploadCertificate = () => {
  if (!ensureSelection()) return
  uploadDialogVisible.value = true
  uploadType.value = 'certificate'
}

const handleUploadNotification = () => {
  if (!ensureSelection()) return
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
    if (uploadType.value === 'certificate') {
      await PatentIncomingAPI.parseZipRuidDao(formData)
      message = '证书上传成功'
    } else if (uploadType.value === 'notification') {
      await PatentIncomingAPI.parseZip(formData)
      message = '通知上传成功'
    } else if (uploadType.value === 'receipt') {
      await PatentIncomingAPI.parseListXml(formData)
      message = '回执上传成功'
    }
    
    ElMessage.success(message)
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
</style>
