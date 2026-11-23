<template>
  <el-dialog v-model="visible" title="导入结果" width="720px" append-to-body>
    <p class="import-result-summary">{{ summary }}</p>
    <el-table v-if="rows.length" :data="rows" border size="small" max-height="420">
      <el-table-column type="index" label="序号" width="64" align="center" />
      <el-table-column label="项目编号" prop="caseCode" width="150" align="center" />
      <el-table-column label="remark" min-width="280">
        <template #default="scope">
          <div class="import-result-remark">{{ scope.row.remark }}</div>
          <div v-if="scope.row.hint" class="import-result-hint">{{ scope.row.hint }}</div>
        </template>
      </el-table-column>
    </el-table>
    <template #footer>
      <el-button type="primary" @click="visible = false">知道了</el-button>
    </template>
  </el-dialog>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  modelValue: { type: Boolean, default: false },
  summary: { type: String, default: '' },
  rows: { type: Array, default: () => [] },
})

const emit = defineEmits(['update:modelValue'])

const visible = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value),
})
</script>

<style scoped>
.import-result-summary {
  margin: 0 0 12px;
  line-height: 1.6;
}

.import-result-remark {
  line-height: 1.6;
  word-break: break-all;
}

.import-result-hint {
  margin-top: 4px;
  color: #909399;
  line-height: 1.6;
}
</style>
