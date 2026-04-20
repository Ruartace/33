<template>
  <div class="patentincoming-wrapper">
    <!-- 搜索模块 -->
    <div class="body-part-search">
      <div class="filter-form">
        <el-form :model="queryParams" ref="queryForm" label-width="120px">
          <el-row :gutter="20">
            <el-col :span="8">
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
            <el-col :span="8">
              <el-form-item label="注册号" prop="registrationNumber">
                <el-input
                  v-model="queryParams.registrationNumber"
                  placeholder="请输入注册号"
                  clearable
                  class="filter-item"
                  @keyup.enter="handleQuery"
                />
              </el-form-item>
            </el-col>
            <el-col :span="8">
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
              <el-form-item label="来文类型" prop="documentType">
                <el-select
                  v-model="queryParams.documentType"
                  placeholder="请选择来文类型"
                  clearable
                  class="filter-item"
                >
                  <el-option
                    v-for="item in documentTypeOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  />
                </el-select>
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
              <el-form-item label="技术主导" prop="technicalLead">
                <el-input
                  v-model="queryParams.technicalLead"
                  placeholder="请输入技术主导"
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
              <el-form-item label="收文日">
                <el-date-picker
                  v-model="queryParams.receiptTime"
                  type="daterange"
                  value-format="YYYY-MM-DD"
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
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
              <el-form-item label="机构账号" prop="organizationAccount">
                <el-select
                  v-model="queryParams.organizationAccount"
                  placeholder="请选择机构账号"
                  clearable
                  class="filter-item"
                >
                  <el-option
                    v-for="item in organizationAccountOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="分析人员" prop="analyst">
                <el-input
                  v-model="queryParams.analyst"
                  placeholder="请输入分析人员"
                  clearable
                  class="filter-item"
                  @keyup.enter="handleQuery"
                />
              </el-form-item>
            </el-col>
            <el-col :span="8">
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
          <el-button type="primary" @click="handleRestoreNotImported" class="btn-upload">
            恢复未导入
          </el-button>
          <el-button type="primary" @click="handleMoveToNoProcess" class="btn-upload">
            转入无需处理
          </el-button>
          <el-button type="primary" @click="handleImportToSystem" class="btn-upload">
            导入系统
          </el-button>
          <el-button type="primary" @click="handleMatchProject" class="btn-upload">
            匹配项目
          </el-button>
          <el-button type="primary" @click="handleExportTable" class="btn-upload">
            <el-icon><DownloadIcon /></el-icon>
            导出表格
          </el-button>
          <el-button type="primary" @click="handleUploadReceipt" class="btn-upload">
            <el-icon><DownloadIcon /></el-icon>
            上传回执
          </el-button>
          <el-button type="primary" @click="handleUploadCertificate" class="btn-upload">
            <el-icon><DownloadIcon /></el-icon>
            上传证书
          </el-button>
          <el-button type="primary" @click="handleUploadNotification" class="btn-upload">
            <el-icon><DownloadIcon /></el-icon>
            上传通知
          </el-button>
        </div>
      </div>

      <!-- 数据表格 -->
      <el-table
        ref="dataTable"
        v-loading="loading"
        :data="tableData"
        border
        row-key="id"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="80" align="center" />
        <el-table-column label="序号" align="center" width="60">
          <template #default="scope">
            {{ scope.$index + 1 }}
          </template>
        </el-table-column>
        <el-table-column label="项目编号" prop="projectNumber" width="150" align="center" />
        <el-table-column label="注册号" prop="businessType" width="120" align="center" />
        <el-table-column label="项目名称" prop="projectName" min-width="200" align="center" />
        <el-table-column label="来文类型" prop="notificationType" width="120" align="center" />
        <el-table-column label="收文日" prop="officialReleaseDate" width="120" align="center" />
        <el-table-column label="通知书编码" prop="notificationNumber" width="100" align="center" />
        <el-table-column label="内部代码" prop="internalCode" width="100" align="center" />
        <el-table-column
          label="发文序列号"
          prop="notificationSerialNumber"
          width="130"
          align="center"
        />
        <el-table-column label="通知名称" prop="notificationName" width="120" align="center" />
        <el-table-column label="申请类型" prop="applicationType" width="120" align="center" />
        <el-table-column label="机构账号" prop="organizationAccount" width="120" align="center" />
        <el-table-column label="客户名称" prop="customerName" width="120" align="center" />
        <el-table-column label="技术主导" prop="technicalLead" width="120" align="center" />
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
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import {
  Search as SearchIcon,
  Refresh as RefreshIcon,
  Download as DownloadIcon,
} from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'
import { TrademarkIncomingPagedata } from '@/layouts/hshmoni'

defineOptions({ name: 'TrademarkIncomingPage' })

const route = useRoute()

const loading = ref(false)
const ids = ref([])
const total = ref(0)
const tableData = ref([])

const queryParams = reactive({
  pageNum: 1,
  pageSize: 10,
  ourDocumentNumber: '',
  registrationNumber: '',
  customerDocumentNumber: '',
  projectName: '',
  notificationName: '',
  customerName: '',
  technicalLead: '',
  status: '',
  applicationNumber: '',
  analyst: '',
  documentType: '',
  applicationType: '',
  organizationAccount: '',
})

const documentTypeOptions = [
  { label: '受理通知书', value: '受理通知书' },
  { label: '初审合格通知', value: '初审合格通知' },
  { label: '驳回通知书', value: '驳回通知书' },
  { label: '续展核准通知书', value: '续展核准通知书' },
]

const applicationTypeOptions = [
  { label: '注册申请', value: '注册申请' },
  { label: '变更申请', value: '变更申请' },
  { label: '续展申请', value: '续展申请' },
  { label: '转让申请', value: '转让申请' },
]

const statusOptions = [
  { label: '未处理', value: '未处理' },
  { label: '处理中', value: '处理中' },
  { label: '已完成', value: '已完成' },
]

const organizationAccountOptions = [
  { label: 'TR-ORG-01', value: 'TR-ORG-01' },
  { label: 'TR-ORG-02', value: 'TR-ORG-02' },
  { label: 'TR-ORG-03', value: 'TR-ORG-03' },
]

const ensureSelection = () => {
  if (!ids.value || ids.value.length === 0) {
    ElMessage.warning('请先在表格中勾选要操作的来文')
    return false
  }
  return true
}

const getList = () => {
  loading.value = true
  setTimeout(() => {
    let list = TrademarkIncomingPagedata.map((item, index) => ({
      id: item.id != null ? item.id : index + 1,
      projectNumber: item.projectNumber,
      businessType: item.businessType,
      projectName: item.projectName,
      notificationType: item.notificationType,
      officialReleaseDate: item.officialReleaseDate,
      notificationNumber: item.notificationNumber,
      internalCode: item.internalCode,
      notificationSerialNumber: item.notificationSerialNumber,
      notificationName: item.notificationName,
      applicationType: item.applicationType,
      optimisticApprovalCase: item.optimisticApprovalCase,
      preapprovalCase: item.preapprovalCase,
      organizationAccount: item.organizationAccount,
      customerName: item.customerName,
      technicalLead: item.technicalLead,
      status: item.status,
    }))

    if (queryParams.PriorityReview) {
      list = list.filter((row) => row.status === '优审案')
    }
    if (queryParams.PreliminaryReview) {
      list = list.filter((row) => row.status === '预审案')
    }

    tableData.value = list
    total.value = tableData.value.length
    loading.value = false
  }, 300)
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
  queryParams.projectName = ''
  queryParams.customerName = ''
  queryParams.projectBusinessPerson = ''
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

const handleRestoreNotImported = () => {
  if (!ensureSelection()) return
  ElMessage.success(`已恢复未导入来文，共 ${ids.value.length} 条`)
}

const handleMoveToNoProcess = () => {
  if (!ensureSelection()) return
  ElMessage.success(`已转入无需处理，共 ${ids.value.length} 条`)
}

const handleImportToSystem = () => {
  if (!ensureSelection()) return
  ElMessage.success(`已导入系统，共 ${ids.value.length} 条`)
}

const handleMatchProject = () => {
  if (!ensureSelection()) return
  ElMessage.success(`已匹配项目，共 ${ids.value.length} 条`)
}

const handleExportTable = () => {
  ElMessage.info(`正在导出表格，当前共 ${tableData.value.length} 条数据`)
}

const handleUploadReceipt = () => {
  if (!ensureSelection()) return
  ElMessage.success(`已上传回执，共 ${ids.value.length} 条`)
}

const handleUploadCertificate = () => {
  if (!ensureSelection()) return
  ElMessage.success(`已上传证书，共 ${ids.value.length} 条`)
}

const handleUploadNotification = () => {
  if (!ensureSelection()) return
  ElMessage.success(`已上传通知，共 ${ids.value.length} 条`)
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
  transform-origin: top left;

  box-sizing: border-box;
}

/* 搜索模块样式 */
.body-part-search {
  padding: 20px;
  background: #fff;
  border-radius: 4px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
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
  padding: 20px;
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
}

.part-table-title {
  font-size: 16px;
  font-weight: 600;
  color: #303133;
  width: 100%;
}
.btn-upload {
  margin-bottom: 20px;
  float: right;
  margin: 5px;
}
.el-pagination {
  margin-top: 20px;
  text-align: right;
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
