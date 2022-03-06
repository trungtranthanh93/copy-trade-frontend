<template>
  <div class="row justify-center">
    <div class="q-pa-md q-gutter-sm row">
      <q-btn
        no-caps
        class="button bg-positive"
        style="margin: 2px;"
        @click="$emit('today')"
      >
        <q-icon name="event" /> Hôm nay
      </q-btn>
      <q-btn
        no-caps
        class="button bg-positive"
        style="margin: 2px;"
        @click="$emit('prev')"
      >
        <q-icon name="skip_previous" /> Tháng Trước
      </q-btn>
      <q-btn
        no-caps
        class="button bg-positive"
        style="margin: 2px;"
        @click="$emit('next')"
      >
        Tháng Sau <q-icon name="skip_next" />
      </q-btn>
    </div>
  </div>
</template>