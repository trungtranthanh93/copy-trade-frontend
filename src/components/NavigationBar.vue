<template>
  <div class="row justify-center">
    <div class="q-pa-md q-gutter-sm row">
      <q-btn
        no-caps
        class="button bg-positive"
        style="margin: 2px;"
        @click="$emit('today')"
      >
        Hôm nay
      </q-btn>
      <q-btn
        no-caps
        class="button bg-positive"
        style="margin: 2px;"
        @click="$emit('prev')"
      >
        &lt; Tháng Trước
      </q-btn>
      <q-btn
        no-caps
        class="button bg-positive"
        style="margin: 2px;"
        @click="$emit('next')"
      >
        Tháng Sau &gt;
      </q-btn>
    </div>
  </div>
</template>