<template>
    <!-- 搜索模块 -->
    <div class="body-part-search">
      <el-card class="search-card" shadow="never">
        <div class="filter-form">
          <el-form :model="queryParams" ref="queryForm" label-width="120px">
            <el-row :gutter="20">
              <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8">
                <el-form-item label="我方文号" prop="ourDocumentNumber">
                  <el-input
                    v-model="queryParams.ourDocumentNumber"
                    placeholder="请输入我方文号"
                    clearable
                    class="filter-item"
                    @keyup.enter="handleQuery"
                  />
                </el-form-item>
              </el-col>

              <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8">
                <el-form-item label="客户文号" prop="customerDocumentNumber">
                  <el-input
                    v-model="queryParams.customerDocumentNumber"
                    placeholder="请输入客户文号"
                    clearable
                    class="filter-item"
                    @keyup.enter="handleQuery"
                  />
                </el-form-item>
              </el-col>
              <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8">
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
              <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8">
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
              <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8">
                <el-form-item label="来文类型" prop="sourceType">
                  <el-select
                    v-model="queryParams.sourceType"
                    placeholder="请选择来文类型"
                    clearable
                    class="filter-item"
                  >
                    <el-option
                      v-for="item in sourceTypeOptions"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8">
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
              <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8">
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
              <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8">
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
              <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8">
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
              <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8">
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
              <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8">
                <el-form-item label="上传日期">
                  <el-date-picker
                    v-model="queryParams.uploadTime"
                    type="daterange"
                    value-format="YYYY-MM-DD"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                  />
                </el-form-item>
              </el-col>
              <el-row>
              <el-col :xs="12" :sm="8" :md="8" :lg="8" :xl="8">
                <el-form-item label=" ">
                  <el-checkbox v-model="queryParams.PriorityReview"> 优审案 </el-checkbox>
                </el-form-item>
              </el-col>
              <el-col :xs="12" :sm="8" :md="8" :lg="8" :xl="8">
                <el-form-item label=" ">
                  <el-checkbox v-model="queryParams.PreliminaryReview"> 预审案 </el-checkbox>
                </el-form-item>
              </el-col>
              </el-row>
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
      </el-card>
    </div>

    <!-- 内容区域 -->
    <div class="body-part-content">
      <el-card class="content-card" shadow="never">
        <div class="part-table-header">
          <div class="part-table-title">
            <span>专利电子来文</span>
          </div>
          <div class="part-table-actions">
            <el-button-group>
              <el-button type="primary" @click="handleRestoreNotImported">恢复未导入</el-button>
              <el-button type="primary" @click="handleMoveToNoProcess">转入无需处理</el-button>
              <el-button type="primary" @click="handleImportToSystem">导入系统</el-button>
              <el-button type="primary" @click="handleMatchProject">匹配项目</el-button>
            </el-button-group>
            
            <el-button type="success" @click="handleExportTable">
              <el-icon><DownloadIcon /></el-icon>导出表格
            </el-button>
            
            <el-dropdown trigger="click" @command="handleUploadCommand">
              <el-button type="primary">
                <el-icon><UploadIcon /></el-icon>上传
                <el-icon class="el-icon--right"><ArrowDown /></el-icon>
              </el-button>
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item command="receipt">
                    <el-icon><Document /></el-icon>上传回执
                  </el-dropdown-item>
                  <el-dropdown-item command="certificate">
                    <el-icon><Medal /></el-icon>上传证书
                  </el-dropdown-item>
                  <el-dropdown-item command="notification">
                    <el-icon><Bell /></el-icon>上传通知
                  </el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
          </div>
        </div>
      </el-card>

      <!-- 数据表格 -->
      <el-card class="content-card" shadow="never">
          <el-table
            ref="dataTable"
            v-loading="loading"
            :data="tableData"
            border
            row-key="id"
            @selection-change="handleSelectionChange"
          >
            <el-table-column type="selection" width="80" align="center" />
            <el-table-column label="序号" align="center" width="60" fixed="left">
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
            <el-table-column
              label="发文序列号"
              prop="documentSequenceNumber"
              width="130"
              align="center"
            />
            <el-table-column label="通知名称" prop="notificationName" width="120" align="center" />
            <el-table-column label="申请类型" prop="applicationType" width="120" align="center" />
            <el-table-column label="优审案" prop="priorityExamination" width="140" align="center" />
            <el-table-column label="预审案" prop="preliminaryCase" width="100" align="center" />
            <el-table-column label="机构账号" prop="institutionNumber" width="120" align="center" />
            <el-table-column label="客户名称" prop="customerName" width="120" align="center" />
            <el-table-column label="状态" prop="status" width="120" align="center" />
          </el-table>
        </el-card>

      <!-- 分页 -->
      <el-pagination
        v-show="total > 0"
        :total="total"
        v-model:current-page="queryParams.pageNum"
        v-model:page-size="queryParams.pageSize"
        :page-sizes="[5, 10, 15, 20]"
        layout="total, sizes, prev, pager, next, jumper"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />

      <!-- 上传通知弹窗 -->
    <el-dialog v-model="uploadDialogVisible" :title="uploadType === 'certificate' ? '上传证书' : uploadType === 'receipt' ? '上传回执' : '上传通知'" width="500px" @close="handleDialogClose">
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
  Upload as UploadIcon,
  ArrowDown,
  Document,
  Medal,
  Bell,
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
  ourDocumentNumber: '',
  customerDocumentNumber: '',
  applicationNumber: '',
  status: '',
  sourceType: '',
  issueTime: [],
  projectName: '',
  customerName: '',
  notificationName: '',
  applicationType: '',
  uploadTime: [],
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

const sourceTypeOptions = [
  { label: '通知书', value: '通知书' },
  { label: '回执', value: '回执' },
  { label: 'ZIP_LIST_XML', value: 'ZIP_LIST_XML' },
  { label: '电子申请回执', value: '电子申请回执' },
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
    }
    const res = await PatentIncomingAPI.getList(params)
    const rawList = res.data || res || []
    const list = rawList.map((item, index) => ({
      id: item.id != null ? item.id : index + 1,
      projectNumber: item.projectNo ?? '',
      applicationNo: item.applicationNo ?? '',
      projectName: item.caseName ?? '',
      sourceType: item.sourceType ?? '',
      officialDocumentDate: item.officialDocumentDate ?? '',
      notificationNumber: item.notificationCode ?? '',
      internalCode: item.internalCode ?? '',
      documentSequenceNumber: item.documentSequenceNumber ?? '',
      notificationName: item.notificationName ?? '',
      applicationType: item.applicationType ?? '',
      priorityExamination: item.priorityExamination ?? '',
      preliminaryCase: item.preliminaryCase ?? '',
      institutionNumber: item.institutionNumber ?? '',
      customerName: item.customerName ?? '',
      status: item.status ?? '',
      applicationDate: item.applicationDate ?? '',
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
  queryParams.ourDocumentNumber = ''
  queryParams.customerDocumentNumber = ''
  queryParams.applicationNumber = ''
  queryParams.status = ''
  queryParams.sourceType = ''
  queryParams.issueTime = []
  queryParams.projectName = ''
  queryParams.customerName = ''
  queryParams.notificationName = ''
  queryParams.applicationType = ''
  queryParams.uploadTime = []
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
    
    // 转换字段名：snake_case -> 表格需要的字段
    const list = rawList.map((item) => ({
      id: item.id,
      projectNumber: item.projectNo ?? '',
      caseCode: item.caseCode ?? '',
      applicationNo: item.applicationNo ?? '',
      projectName: item.caseName ?? '',
      sourceType: item.sourceType ?? '',
      officialDocumentDate: item.officialDocumentDate ?? '',
      notificationNumber: item.notificationCode ?? '',
      internalCode: item.internalCode ?? '',
      documentSequenceNumber: item.documentSequenceNumber ?? '',
      notificationName: item.notificationName ?? '',
      applicationType: item.applicationType ?? '',
      priorityExamination: item.priorityExamination ?? '',
      preliminaryCase: item.preliminaryCase ?? '',
      institutionNumber: item.institutionNumber ?? '',
      customerName: item.customerName ?? '',
      status: item.status ?? '',
      applicationDate: item.applicationDate ?? '',
    }))
    
    total.value = list.length
    tableData.value = list
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
}

const handleUploadCommand = (command) => {
  if (!ensureSelection()) return
  uploadDialogVisible.value = true
  uploadType.value = command
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
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.body-part-search {
  width: 100%;
}

.search-card {
  border-radius: 8px;
}

.body-part-content {
  width: 100%;
}

.content-card {
  border-radius: 8px;
}

.filter-form {
  width: 100%;
}

.part-search-buttons {
  display: flex;
  justify-content: flex-end;
  flex-wrap: wrap;
  gap: 8px;
  padding-right: 8px;
  margin-top: 8px;
}

.part-table-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 12px;
  margin-bottom: 12px;
}

.part-table-title {
  font-size: 16px;
  font-weight: 600;
  color: #303133;
}

.part-table-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  align-items: center;
}

@media (max-width: 768px) {
  .patentincoming-wrapper {
    padding: 12px;
    gap: 12px;
  }

  .part-table-header {
    flex-direction: column;
    align-items: flex-start;
  }

  .part-table-actions {
    width: 100%;
  }

  .part-table-actions .el-button {
    flex: 1 1 auto;
    min-width: 80px;
  }
}
</style>
