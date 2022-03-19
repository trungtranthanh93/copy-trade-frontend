<template>
  <div class="col-8 q-pa-md">
      <q-card class="q-pa-md">
          <q-label class="text-h6">Thống Kê BOT</q-label>
          <q-separator class="q-mt-md" />
          <q-table color="primary" flat bordered title="" :rows="rows" :columns="columns" row-key="name"
                :pagination="pagination" />
      </q-card>
  </div>
</template>
<script>
const columns = [
    { name: 'stt', align: 'center', label: 'STT', field: 'stt', sortable: true },
    { name: 'name', align: 'center', label: 'Tên phương pháp', field: 'name', sortable: true },
    { name: 'win', label: 'Số lệnh win liên tiếp', field: 'win', sortable: true },
    { name: 'lose', label: 'Số lệnh lose liên tiếp', field: 'lose', sortable: true },
    { name: 'winLoseInDay', label: 'Số lệnh Win/Lose ngày', field: 'winLoseInDay' },
    { name: 'winPercent', label: 'Tỉ lệ thắng', field: 'winPercent' },
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