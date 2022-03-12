<template>
  <div class="col-8 q-pa-md">
      <q-card class="q-pa-md">
          <q-label class="text-h6">Lịch sử cài đặt Auto Trade</q-label>
          <q-separator class="q-mt-md" />
          <q-table color="primary" flat bordered title="" :rows="rows" :columns="columns" row-key="name"
                :pagination="pagination" />
      </q-card>
  </div>
</template>
<script>
const columns = [
    { name: 'stt', align: 'center', label: 'STT', field: 'stt', sortable: true },
    { name: 'time', align: 'center', label: 'Thời gian', field: 'time', sortable: true },
    { name: 'botName', label: 'Tên Bot', field: 'botName', sortable: true },
    { name: 'win', label: 'Mức chốt lãi', field: 'win' },
    { name: 'lose', label: 'Mức chốt lỗ', field: 'lose' },
    { name: 'factor', label: 'Hệ số', field: 'factor' },
]

const rows = [
]

// import { useQuasar, QSpinnerIos, date } from 'quasar';
// import { ref, onBeforeMount, onMounted } from 'vue';
// import { api } from 'boot/axios';
// import { useRouter } from 'vue-router';

export default {
    setup () {
    return {
        columns,
        rows
    }
    }
}
</script>