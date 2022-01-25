<template>
  <div class="subcontent">
    <h6  class="row justify-center">Thống kê lãi tháng {{monthly + 1}}</h6>
    <h6 class="row justify-center">TỔNG THÁNG : {{totalMonth}}%</h6>
    <navigation-bar
      @today="onToday"
      @prev="onPrev"
      @next="onNext"
    />

    <div class="row justify-center">
      <div style="display: flex; max-width: 1400px; width: 100%;">
        <q-calendar-month
          ref="calendar"
          locale="vi-vn"
          v-model="selectedDate"
          date-align="right"
          month-label-size="xs"
          animated
          bordered
          focusable
          hoverable
          no-active-date
          :day-min-height="60"
          :day-height="0"
        >
          <template #day="{ scope: { timestamp } }">
            <template
              v-for="event in eventsMap[timestamp.date]"
              :key="event.id"
            >
              <div
                :class="badgeClasses(event, 'day')"
                :style="badgeStyles(event, 'day')"
                class="my-event"
              >
                <div class="title q-calendar__ellipsis">
                  {{ event.title}}%
                </div>
              </div>
            </template>
          </template>
        </q-calendar-month>
      </div>
    </div>
  </div>
</template>
<script>
import {
  QCalendarMonth,
  addToDate,
  parseDate,
  parseTimestamp,
  today
} from '@quasar/quasar-ui-qcalendar/src/index.js'
import '@quasar/quasar-ui-qcalendar/src/QCalendarVariables.sass'
import '@quasar/quasar-ui-qcalendar/src/QCalendarTransitions.sass'
import '@quasar/quasar-ui-qcalendar/src/QCalendarMonth.sass'
import { api } from 'boot/axios';

import { defineComponent } from 'vue'
import NavigationBar from '../components/NavigationBar.vue'

// The function below is used to set up our demo data
const CURRENT_DAY = new Date()
function getCurrentDay (montly, day) {
  const newDay = new Date(CURRENT_DAY)
  newDay.setMonth(montly)
  newDay.setDate(day)
  const tm = parseDate(newDay)
  return tm.date
}

export default defineComponent({
  name: 'MonthSlotDay',
  components: {
    NavigationBar,
    QCalendarMonth
  },
  data () {
    return {
      disablePrev: false,
      disableNext: false,
      size: 'xs',
      selectedDate: today(),
      monthly: new Date(today()).getMonth() + 1 ,
      events: [
        
      ],
      totalMonth: 0,
    }
  },
  computed: {
    eventsMap () {
      const map = {}
      if (this.events.length > 0) {
        this.events.forEach(event => {
          (map[ event.date ] = (map[ event.date ] || [])).push(event)
          if (event.days !== undefined) {
            let timestamp = parseTimestamp(event.date)
            let days = event.days
            // add a new event for each day
            // skip 1st one which would have been done above
            do {
              timestamp = addToDate(timestamp, { day: 1 })
              if (!map[ timestamp.date ]) {
                map[ timestamp.date ] = []
              }
              map[ timestamp.date ].push(event)
              // already accounted for 1st day
            } while (--days > 1)
          }
        })
      }
      return map
    }
  },
  methods: {
    badgeClasses (event) {
      return {
        [ `text-white bg-${ event.bgcolor }` ]: true,
        'rounded-border': true
      }
    },

    badgeStyles () {
      const s = {}
      // s.left = day.weekday === 0 ? 0 : (day.weekday * this.parsedCellWidth) + '%'
      // s.top = 0
      // s.bottom = 0
      // s.width = (event.days * this.parsedCellWidth) + '%'
      return s
    },
    async getMontlyExport() {
      try {
        let token = localStorage.getItem('jwt');
        // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
        api.defaults.headers.common['Authorization'] = `Bearer ${token}`;

        // let data = await api.get(
        //   '/users/monthly-export/' + (this.CURRENT_DAY.getMonth + 1)
        // );
        this.monthly = new Date(this.selectedDate).getMonth();
        let data = await api.get('/users/monthly-export/'+(this.monthly + 1));
        this.totalMonth = data.data.totalIncome ? parseFloat(data.data.totalIncome).toFixed(2)  : 0;
        const dailyReport = data.data.dailyReport;
        this.events = _.map(dailyReport, (obj) => {
          return {
            id: 1,
            title: parseFloat(obj.monthlyIncomePercent).toFixed(2),
            date: getCurrentDay(this.monthly, obj.daysOfMonth),
            bgcolor: obj.monthlyIncomePercent >= 0 ? 'green' : 'red',
          };
        });
      } catch (error) {}
    },
    async onToday () {
      await this.$refs.calendar.moveToToday()
      await this.getMontlyExport()
    },
    async onPrev () {
      await this.$refs.calendar.prev()
      if(new Date(this.selectedDate).getFullYear() !== new Date().getFullYear()) {
        await this.$refs.calendar.next(12)
      }
      await this.getMontlyExport()
    },
    async onNext () {
      await this.$refs.calendar.next()
      if(new Date(this.selectedDate).getFullYear() !== new Date().getFullYear()) {
        await this.$refs.calendar.prev(12)
      }
      await this.getMontlyExport()
    },
  },
  async created() {
    await this.getMontlyExport()
  }
})
</script>
<style lang="sass" scoped>
.my-event
  position: relative
  font-size: 12px
  width: 100%
  margin: 1px 0 0 0
  justify-content: center
  text-overflow: ellipsis
  overflow: hidden
  cursor: pointer

.title
  position: relative
  display: flex
  justify-content: center
  align-items: center
  height: 100%

.text-white
  color: white

.bg-blue
  background: blue

.bg-green
  background: green

.bg-orange
  background: orange

.bg-red
  background: red

.bg-teal
  background: teal

.bg-grey
  background: grey

.bg-purple
  background: purple

.rounded-border
  border-radius: 2px
</style>