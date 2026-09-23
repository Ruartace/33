<template>
  <div class="patentincoming-wrapper">
    <!-- 搜索模块 -->
    <div class="body-part-search">
      <div class="filter-form">
        <el-form :model="queryParams" ref="queryForm" label-width="120px">
          <el-row :gutter="20">
            <el-col :span="8">
              <el-form-item label="项目编号" prop="projectNumber">
                <el-input
                  v-model="queryParams.projectNumber"
                  placeholder="请输入项目编号"
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
              <el-form-item label="收文日">
                <el-date-picker
                  v-model="queryParams.receiptTime"
                  type="daterange"
                  value-format="YYYY-MM-DD"
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                  class="filter-item"
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
              <el-form-item label="上传日期">
                <el-date-picker
                  v-model="queryParams.uploadTime"
                  type="daterange"
                  value-format="YYYY-MM-DD"
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                  class="filter-item"
                />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="机构账号" prop="organizationAccount">
                <el-input
                  v-model="queryParams.organizationAccount"
                  placeholder="请输入机构账号"
                  clearable
                  class="filter-item"
                  @keyup.enter="handleQuery"
                />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="分析人员" prop="analystUserId">
                <el-select
                  v-model="queryParams.analystUserId"
                  placeholder="请选择或搜索分析人员"
                  clearable
                  filterable
                  remote
                  :remote-method="fetchUserOptions"
                  :loading="userLoading"
                  class="filter-item"
                >
                  <el-option
                    v-for="item in analystOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  />
                </el-select>
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
          <span>商标电子来文</span>
        </div>
        <div class="part-table-actions">
          <el-button type="primary" @click="handleRestoreNotImported">
            恢复未导入
          </el-button>
          <el-button type="primary" @click="handleMoveToNoProcess">
            转入无需处理
          </el-button>
          <el-button type="primary" @click="handleTransStatus">
            转状态
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
          <el-button type="primary" @click="handleUploadNotice">
            <el-icon><DownloadIcon /></el-icon>
            上传通知书
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
        style="width: 100%"
      >
        <el-table-column type="selection" width="80" align="center" />
        <el-table-column label="序号" align="center" width="60">
          <template #default="scope">
            {{ scope.$index + 1 }}
          </template>
        </el-table-column>
        <el-table-column label="项目编号" prop="projectNumber" width="150" align="center" />
        <el-table-column label="注册号" prop="registrationNumber" width="120" align="center" />
        <el-table-column label="项目名称" prop="projectName" min-width="200" align="center" />
        <el-table-column label="文件类型" prop="fileType" width="100" align="center" />
        <el-table-column label="收文日" prop="receiptDate" width="120" align="center" />
        <el-table-column label="申请号" prop="applicationNumber" width="130" align="center" />
        <el-table-column label="内部代码" prop="internalCode" width="100" align="center" />
        <el-table-column label="通知名称" prop="notificationName" width="120" align="center" />
        <el-table-column label="业务类型" prop="businessType" width="120" align="center" />
        <el-table-column label="机构" prop="organization" width="100" align="center" />
        <el-table-column label="客户名称" prop="customerName" min-width="140" align="center" />
        <el-table-column label="技术主导" prop="technicalLead" width="100" align="center" />
        <el-table-column label="状态" prop="status" width="100" align="center" />
      </el-table>
      <!-- 分页 -->
      <el-pagination
        v-show="total > 0"
        :total="total"
        :current-page="queryParams.pageNum"
        :page-size="queryParams.pageSize"
        :page-sizes="[10, 20, 50, 100]"
        layout="total, sizes, prev, pager, next, jumper"
        @current-change="handleCurrentChange"
        @size-change="handleSizeChange"
      />
    </div>

    <el-dialog
      v-model="receiptDialogVisible"
      title="上传回执"
      width="500px"
      @closed="resetReceiptDialog"
    >
      <el-form :model="receiptForm" label-width="100px">
        <el-form-item label="ZIP 包">
          <el-upload
            ref="receiptZipUploadRef"
            :auto-upload="false"
            :limit="1"
            :on-change="onReceiptZipChange"
            :on-remove="onReceiptZipRemove"
            accept=".zip,.rar,.7z"
            drag
          >
            <el-icon><UploadFilled /></el-icon>
            <span>将 ZIP 文件拖到此处，或<em>点击上传</em></span>
            <template #tip>
              <div class="el-upload__tip">支持 .zip/.rar/.7z 格式文件</div>
            </template>
          </el-upload>
        </el-form-item>
        <el-form-item label="Excel 表">
          <el-upload
            ref="receiptExcelUploadRef"
            :auto-upload="false"
            :limit="1"
            :on-change="onReceiptExcelChange"
            :on-remove="onReceiptExcelRemove"
            accept=".xlsx,.xls"
            drag
          >
            <el-icon><UploadFilled /></el-icon>
            <span>将 Excel 文件拖到此处，或<em>点击上传</em></span>
            <template #tip>
              <div class="el-upload__tip">支持 .xlsx/.xls 格式文件</div>
            </template>
          </el-upload>
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="receiptDialogVisible = false">取消</el-button>
        <el-button type="primary" :loading="receiptUploading" @click="submitReceiptUpload">
          确认上传
        </el-button>
      </template>
    </el-dialog>

    <el-dialog
      v-model="certificateDialogVisible"
      title="上传证书"
      width="500px"
      @closed="resetCertificateDialog"
    >
      <el-form :model="certificateForm" label-width="100px">
        <el-form-item label="ZIP 包">
          <el-upload
            ref="certificateZipUploadRef"
            :auto-upload="false"
            :limit="1"
            :on-change="onCertificateZipChange"
            :on-remove="onCertificateZipRemove"
            accept=".zip,.rar,.7z"
            drag
          >
            <el-icon><UploadFilled /></el-icon>
            <span>将 ZIP 文件拖到此处，或<em>点击上传</em></span>
            <template #tip>
              <div class="el-upload__tip">支持 .zip/.rar/.7z 格式文件</div>
            </template>
          </el-upload>
        </el-form-item>
        <el-form-item label="Excel 表">
          <el-upload
            ref="certificateExcelUploadRef"
            :auto-upload="false"
            :limit="1"
            :on-change="onCertificateExcelChange"
            :on-remove="onCertificateExcelRemove"
            accept=".xlsx,.xls"
            drag
          >
            <el-icon><UploadFilled /></el-icon>
            <span>将 Excel 文件拖到此处，或<em>点击上传</em></span>
            <template #tip>
              <div class="el-upload__tip">支持 .xlsx/.xls 格式文件</div>
            </template>
          </el-upload>
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="certificateDialogVisible = false">取消</el-button>
        <el-button type="primary" :loading="certificateUploading" @click="submitCertificateUpload">
          确认上传
        </el-button>
      </template>
    </el-dialog>

    <el-dialog
      v-model="noticeDialogVisible"
      title="上传通知书"
      width="500px"
      @closed="resetNoticeDialog"
    >
      <el-form :model="noticeForm" label-width="100px">
        <el-form-item label="ZIP 包">
          <el-upload
            ref="noticeZipUploadRef"
            :auto-upload="false"
            :limit="1"
            :on-change="onNoticeZipChange"
            :on-remove="onNoticeZipRemove"
            accept=".zip,.rar,.7z"
            drag
          >
            <el-icon><UploadFilled /></el-icon>
            <span>将 ZIP 文件拖到此处，或<em>点击上传</em></span>
            <template #tip>
              <div class="el-upload__tip">支持 .zip/.rar/.7z 格式文件</div>
            </template>
          </el-upload>
        </el-form-item>
        <el-form-item label="Excel 表">
          <el-upload
            ref="noticeExcelUploadRef"
            :auto-upload="false"
            :limit="1"
            :on-change="onNoticeExcelChange"
            :on-remove="onNoticeExcelRemove"
            accept=".xlsx,.xls"
            drag
          >
            <el-icon><UploadFilled /></el-icon>
            <span>将 Excel 文件拖到此处，或<em>点击上传</em></span>
            <template #tip>
              <div class="el-upload__tip">支持 .xlsx/.xls 格式文件</div>
            </template>
          </el-upload>
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="noticeDialogVisible = false">取消</el-button>
        <el-button type="primary" :loading="noticeUploading" @click="submitNoticeUpload">
          确认上传
        </el-button>
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
import { TrademarkIncomingAPI } from '@/api/trademarkincoming'

defineOptions({ name: 'TrademarkIncomingPage' })

const route = useRoute()

const loading = ref(false)
const ids = ref([])
const dataTable = ref(null)
const total = ref(0)
const tableData = ref([])

const queryParams = reactive({
  pageNum: 1,
  pageSize: 10,
  projectNumber: '',
  applicationNumber: '',
  registrationNumber: '',
  status: '',
  documentType: '',
  receiptTime: '',
  projectName: '',
  customerName: '',
  technicalLead: '',
  applicationType: '',
  notificationName: '',
  uploadTime: '',
  organizationAccount: '',
  analyst: '',
  analystUserId: '',
})

const documentTypeOptions = [
  { label: '通知书', value: '通知书' },
  { label: '证书', value: '证书' },
  { label: '回执', value: '回执' },
]

const statusOptions = [
  // 与后端 TrademarkResponse.status 字段枚举对齐
  { label: '未处理', value: '未处理' },
  { label: '匹配成功', value: '匹配成功' },
  { label: '匹配失败', value: '匹配失败' },
  { label: '无需处理', value: '无需处理' },
]

const analystOptions = ref([])
const userLoading = ref(false)

const fetchUserOptions = async (query) => {
  userLoading.value = true
  try {
    const res = await TrademarkIncomingAPI.getUserOptions(query)
    const list = Array.isArray(res?.data) ? res.data : Array.isArray(res) ? res : []
    analystOptions.value = list.map((item) => ({
      label: item.realName,
      value: item.id || item.value,
    }))
  } catch (error) {
    console.error('获取分析人员失败:', error)
    analystOptions.value = []
  } finally {
    userLoading.value = false
  }
}

const applicationTypeOptions = ref([])

const fetchApplyTypeOptions = async () => {
  try {
    const res = await TrademarkIncomingAPI.getApplyTypeOptions()
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

const ensureSelection = () => {
  if (!ids.value || ids.value.length === 0) {
    ElMessage.warning('请先在表格中勾选要操作的来文')
    return false
  }
  return true
}

// 真正发起请求的函数：服务端分页，每次都按 pageNum/pageSize 请求后端
const fetchList = async () => {
  loading.value = true
  try {
    const receiptTime = queryParams.receiptTime
    const uploadTime = queryParams.uploadTime
    const params = {
      projectNumber: queryParams.projectNumber || null,
      applicationNo: queryParams.applicationNumber || null,
      registrationNumber: queryParams.registrationNumber || null,
      projectName: queryParams.projectName || null,
      customerName: queryParams.customerName || null,
      status: queryParams.status || null,
      documentType: queryParams.documentType || null,
      technicalLead: queryParams.technicalLead || null,
      notificationName: queryParams.notificationName || null,
      applicationType: queryParams.applicationType || null,
      organizationAccount: queryParams.organizationAccount || null,
      analystUserId: queryParams.analystUserId || null,
      receiveDateStart: Array.isArray(receiptTime) ? receiptTime[0] : null,
      receiveDateEnd: Array.isArray(receiptTime) ? receiptTime[1] : null,
      uploadTimeStart: Array.isArray(uploadTime) ? uploadTime[0] : null,
      uploadTimeEnd: Array.isArray(uploadTime) ? uploadTime[1] : null,
      pageNum: queryParams.pageNum,
      pageSize: queryParams.pageSize,
    }

    const res = await TrademarkIncomingAPI.getList(params)

    const list = Array.isArray(res?.data) ? res.data : []
    tableData.value = list.map((item) => ({
      id: item.id,
      projectNumber: item.caseCode,
      applicationNumber: item.applicationNo,
      registrationNumber: item.registrationNo,
      projectName: item.caseName,
      customerName: item.customerName,
      internalCode: item.internalCode,
      fileType: item.sourceType,
      receiptDate: item.receiveDate,
      notificationName: item.notificationName,
      businessType: item.businessType,
      technicalLead: item.technicalLead,
      organization: item.agencyCode,
      status: item.status,
      caseId: item.caseId,
      applicationType: item.applicationType,
      uploadTime: item.uploadTime,
      fileName: item.fileName,
    }))

    const serverTotal = Number(res?.total)
    total.value =
      Number.isFinite(serverTotal) && serverTotal > 0
        ? serverTotal
        : tableData.value.length
  } catch (error) {
    console.error('获取数据失败:', error)
    ElMessage.error('获取数据失败')
  } finally {
    loading.value = false
  }
}

// 保留旧名 getList 给 watch/onMounted 调用
const getList = () => fetchList()

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
  queryParams.projectNumber = ''
  queryParams.applicationNumber = ''
  queryParams.registrationNumber = ''
  queryParams.status = ''
  queryParams.documentType = ''
  queryParams.receiptTime = ''
  queryParams.projectName = ''
  queryParams.customerName = ''
  queryParams.technicalLead = ''
  queryParams.applicationType = ''
  queryParams.notificationName = ''
  queryParams.uploadTime = ''
  queryParams.organizationAccount = ''
  queryParams.analyst = ''
  queryParams.analystUserId = ''
  handleSearch()
}

const handleSizeChange = (size) => {
  queryParams.pageSize = size
  queryParams.pageNum = 1
  // 走服务端分页：每次都重新请求后端
  getList()
}

const handleCurrentChange = (page) => {
  queryParams.pageNum = page
  // 走服务端分页：每次都重新请求后端
  getList()
}

const handleSelectionChange = (selection) => {
  ids.value = selection.map((item) => item.id)
}

const handleRestoreNotImported = async () => {
  if (!ensureSelection()) return
  loading.value = true
  try {
    const res = await TrademarkIncomingAPI.restoreProcesses({ ids: ids.value })
    ElMessage.success(res?.message || `已恢复未导入来文，共 ${ids.value.length} 条`)
    getList()
  } catch (error) {
    ElMessage.error(error?.message || '恢复未导入失败')
  } finally {
    loading.value = false
  }
}

const collectMoveNoNeedPayload = () => {
  const rows = dataTable.value?.getSelectionRows?.() ?? []
  const ids = rows
    .map((r) => r.id)
    .filter((id) => id != null && id !== '')
  const projectNos = rows
    .map((r) => r.projectNo ?? r.projectNumber)
    .map((v) => (v != null && v !== '' ? String(v).trim() : ''))
    .filter(Boolean)
  return { ids, projectNos }
}

const handleMoveToNoProcess = async () => {
  if (!ensureSelection()) return
  const { ids: selectedIds, projectNos } = collectMoveNoNeedPayload()
  if (selectedIds.length === 0) {
    ElMessage.warning('所选记录缺少有效 id，无法转入无需处理')
    return
  }
  loading.value = true
  try {
    const res = await TrademarkIncomingAPI.moveNoNeed({
      ids: selectedIds,
      project_no: projectNos,
    })
    ElMessage.success(res?.message || `已转入无需处理，共 ${selectedIds.length} 条`)
    getList()
  } catch (error) {
    ElMessage.error(error?.message || '转入无需处理失败')
  } finally {
    loading.value = false
  }
}

/** 失败态 / 无需处理 → 内部代码唯一，以便重新匹配、导入 */
const handleTransStatus = async () => {
  if (!ensureSelection()) return
  const selectedIds = (ids.value || []).filter((id) => id != null && id !== '')
  if (selectedIds.length === 0) {
    ElMessage.warning('所选记录缺少有效 id，无法转状态')
    return
  }
  loading.value = true
  try {
    const res = await TrademarkIncomingAPI.transStatus({ ids: selectedIds })
    const data = res?.data ?? {}
    const updated = data.updatedCount ?? 0
    const skipped = data.skippedCount ?? 0
    const summary =
      res?.message ||
      data.message ||
      `转状态完成：已转 ${updated} 条为「内部代码唯一」，未转 ${skipped} 条`
    if (skipped > 0 && updated === 0) {
      const reasons = (Array.isArray(data.details) ? data.details : [])
        .filter((d) => d && d.updated === false)
        .map((d) => d.message)
        .filter(Boolean)
        .slice(0, 3)
      ElMessage.warning(reasons.length ? `${summary}（${reasons.join('；')}）` : summary)
    } else if (skipped > 0) {
      ElMessage.warning(summary)
    } else {
      ElMessage.success(summary)
    }
    getList()
  } catch (error) {
    ElMessage.error(error?.response?.data?.message ?? error?.message ?? '转状态失败')
  } finally {
    loading.value = false
  }
}

const handleImportToSystem = async () => {
  if (!ensureSelection()) return
  loading.value = true
  try {
    const res = await TrademarkIncomingAPI.importProcesses({ ids: ids.value })
    ElMessage.success(res?.message || `已导入系统，共 ${ids.value.length} 条`)
    getList()
  } catch (error) {
    ElMessage.error(error?.message || '导入系统失败')
  } finally {
    loading.value = false
  }
}

const handleMatchProject = async () => {
  if (!ensureSelection()) return
  loading.value = true
  try {
    const res = await TrademarkIncomingAPI.oneClickMatch({ ids: ids.value })
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
    const msg = error?.response?.data?.message ?? error?.message ?? '匹配失败'
    ElMessage.error(msg)
  } finally {
    loading.value = false
  }
}

function parseFilenameFromContentDisposition(disposition) {
  if (!disposition || typeof disposition !== 'string') return ''
  const star = /filename\*=UTF-8''([^;]+)/i.exec(disposition)
  if (star?.[1]) {
    try {
      return decodeURIComponent(star[1].trim())
    } catch {
      return star[1].trim()
    }
  }
  const quoted = /filename="([^"]+)"/i.exec(disposition)
  if (quoted?.[1]) return quoted[1]
  const plain = /filename=([^;\s]+)/i.exec(disposition)
  return plain?.[1] ? plain[1].replace(/^["']|["']$/g, '') : ''
}

const handleExportTable = async () => {
  if (!ensureSelection()) return
  loading.value = true
  try {
    const response = await TrademarkIncomingAPI.exportList(ids.value)
    const blob = response.data
    const ctype = (response.headers['content-type'] || '').toLowerCase()
    if (ctype.includes('application/json')) {
      const text = await blob.text()
      let msg = '导出失败'
      try {
        const j = JSON.parse(text)
        msg = j.message || j.msg || msg
      } catch {
        /* ignore */
      }
      ElMessage.error(msg)
      return
    }
    let filename = parseFilenameFromContentDisposition(
      response.headers['content-disposition'] || response.headers['Content-Disposition']
    )
    if (!filename) filename = `商标电子来文_${Date.now()}.xlsx`
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = filename
    a.rel = 'noopener'
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
    ElMessage.success('导出成功')
  } catch (error) {
    const data = error?.response?.data
    if (data instanceof Blob) {
      try {
        const text = await data.text()
        const j = JSON.parse(text)
        ElMessage.error(j.message || j.msg || '导出失败')
      } catch {
        ElMessage.error(error?.message || '导出失败')
      }
    } else {
      ElMessage.error(error?.message || '导出失败')
    }
  } finally {
    loading.value = false
  }
}

const receiptDialogVisible = ref(false)
const receiptUploading = ref(false)
const receiptZipUploadRef = ref(null)
const receiptExcelUploadRef = ref(null)
const receiptForm = reactive({
  zip: null,
  excel: null,
})

const onReceiptZipChange = (file) => {
  receiptForm.zip = file.raw
}

const onReceiptZipRemove = () => {
  receiptForm.zip = null
}

const onReceiptExcelChange = (file) => {
  receiptForm.excel = file.raw
}

const onReceiptExcelRemove = () => {
  receiptForm.excel = null
}

const resetReceiptDialog = () => {
  receiptForm.zip = null
  receiptForm.excel = null
  receiptZipUploadRef.value?.clearFiles()
  receiptExcelUploadRef.value?.clearFiles()
}

// ========== 证书上传 ==========
const certificateDialogVisible = ref(false)
const certificateUploading = ref(false)
const certificateZipUploadRef = ref(null)
const certificateExcelUploadRef = ref(null)
const certificateForm = reactive({
  zip: null,
  excel: null,
})

const onCertificateZipChange = (file) => {
  certificateForm.zip = file.raw
}

const onCertificateZipRemove = () => {
  certificateForm.zip = null
}

const onCertificateExcelChange = (file) => {
  certificateForm.excel = file.raw
}

const onCertificateExcelRemove = () => {
  certificateForm.excel = null
}

const resetCertificateDialog = () => {
  certificateForm.zip = null
  certificateForm.excel = null
  certificateZipUploadRef.value?.clearFiles()
  certificateExcelUploadRef.value?.clearFiles()
}

// ========== 通知书上传 ==========
const noticeDialogVisible = ref(false)
const noticeUploading = ref(false)
const noticeZipUploadRef = ref(null)
const noticeExcelUploadRef = ref(null)
const noticeForm = reactive({
  zip: null,
  excel: null,
})

const onNoticeZipChange = (file) => {
  noticeForm.zip = file.raw
}

const onNoticeZipRemove = () => {
  noticeForm.zip = null
}

const onNoticeExcelChange = (file) => {
  noticeForm.excel = file.raw
}

const onNoticeExcelRemove = () => {
  noticeForm.excel = null
}

const resetNoticeDialog = () => {
  noticeForm.zip = null
  noticeForm.excel = null
  noticeZipUploadRef.value?.clearFiles()
  noticeExcelUploadRef.value?.clearFiles()
}

const handleUploadReceipt = () => {
  receiptDialogVisible.value = true
}

const submitReceiptUpload = async () => {
  const zip = receiptForm.zip
  const excel = receiptForm.excel
  if (!zip || !excel) {
    ElMessage.warning('请同时选择 ZIP 压缩包与 Excel 文件')
    return
  }
  receiptUploading.value = true
  try {
    const formData = new FormData()
    formData.append('file', zip, zip.name)
    formData.append('excel', excel, excel.name)
    const res = await TrademarkIncomingAPI.uploadReceipt(formData)
    ElMessage.success(res?.message || '上传成功')
    receiptDialogVisible.value = false
    getList()
  } catch (error) {
    ElMessage.error(error?.message || '上传失败')
  } finally {
    receiptUploading.value = false
  }
}

const handleUploadCertificate = () => {
  certificateDialogVisible.value = true
}

const submitCertificateUpload = async () => {
  const zip = certificateForm.zip
  const excel = certificateForm.excel
  if (!zip || !excel) {
    ElMessage.warning('请同时选择 ZIP 压缩包与 Excel 文件')
    return
  }
  certificateUploading.value = true
  try {
    const formData = new FormData()
    formData.append('file', zip, zip.name)
    formData.append('excel', excel, excel.name)
    formData.append('user_id', localStorage.getItem('userId') || '')
    const res = await TrademarkIncomingAPI.uploadDoc(formData)
    const data = res?.data ?? {}
    const msgs = Array.isArray(data.messages) ? data.messages : []
    const summary =
      `解析 ${data.pdfCount ?? 0} 条 PDF，` +
      `通知书 ${data.noticeCount ?? 0}、证书 ${data.certificateCount ?? 0}，` +
      `入库 ${data.insertedCount ?? 0} 条，` +
      `失败 ${data.failedCount ?? 0} 条`
    if (res?.success) {
      if (msgs.length > 0) {
        ElMessage.warning({
          message: `${summary}\n${msgs.join('\n')}`,
          duration: 0,
          showClose: true,
          customClass: 'el-message-multiline',
        })
      } else {
        ElMessage.success(summary)
      }
      certificateDialogVisible.value = false
      getList()
    } else {
      ElMessage.error(res?.message || '处理失败')
    }
  } catch (error) {
    ElMessage.error(error?.message || '上传失败')
  } finally {
    certificateUploading.value = false
  }
}

const handleUploadNotice = () => {
  noticeDialogVisible.value = true
}

const submitNoticeUpload = async () => {
  const zip = noticeForm.zip
  const excel = noticeForm.excel
  if (!zip || !excel) {
    ElMessage.warning('请同时选择 ZIP 压缩包与 Excel 文件')
    return
  }
  noticeUploading.value = true
  try {
    const formData = new FormData()
    formData.append('file', zip, zip.name)
    formData.append('excel', excel, excel.name)
    formData.append('user_id', localStorage.getItem('userId') || '')
    const res = await TrademarkIncomingAPI.uploadDoc(formData)
    const data = res?.data ?? {}
    const msgs = Array.isArray(data.messages) ? data.messages : []
    const summary =
      `解析 ${data.pdfCount ?? 0} 条 PDF，` +
      `通知书 ${data.noticeCount ?? 0}、证书 ${data.certificateCount ?? 0}，` +
      `入库 ${data.insertedCount ?? 0} 条，` +
      `失败 ${data.failedCount ?? 0} 条`
    if (res?.success) {
      if (msgs.length > 0) {
        ElMessage.warning({
          message: `${summary}\n${msgs.join('\n')}`,
          duration: 0,
          showClose: true,
          customClass: 'el-message-multiline',
        })
      } else {
        ElMessage.success(summary)
      }
      noticeDialogVisible.value = false
      getList()
    } else {
      ElMessage.error(res?.message || '处理失败')
    }
  } catch (error) {
    ElMessage.error(error?.message || '上传失败')
  } finally {
    noticeUploading.value = false
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
  fetchUserOptions('')
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
