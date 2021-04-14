<template>
  <div  style="background-color: #EEEEEE">
    <v-toolbar elevation="0" dense style="background-color: #EEEEEE">
      <v-spacer/>
      <div class=" mb-3 subtitle-1">
        {{extend}},今天是<strong>{{time}}</strong>
      </div>
      <v-spacer/>
    </v-toolbar>
    <!--日历组件-->
    <v-sheet height="500">
      <v-calendar
          color="success"
          locale="china"
          ref="calendar"
          v-model="value"
          :type="type"
          first-time="上午8时"
          interval-count="16"
          @click:event="showEvent"
          :events="events"
          :event-color="getEventColor"
          :event-overlap-threshold="30"
      ></v-calendar>
      <!--事件点开展开界面-->
      <v-menu
          offset-y
          transition="fab-transition"
          v-model="selectedOpen"
          :close-on-content-click="false"
          :activator="selectedElement"
      >
        <v-card color="grey lighten-4" min-width="350px" flat>
          <v-toolbar :color="selectedEvent.color" dark>
            <v-toolbar-title v-html="selectedEvent.name"></v-toolbar-title>
          </v-toolbar>
          <v-card-subtitle class="subtitle-1">
            会议时间：
            <span></span>
          </v-card-subtitle>
          <v-card-text class="subtitle-1">
            会议地点：
            <span v-html="selectedEvent.location"></span>
          </v-card-text>
        </v-card>
      </v-menu>
    </v-sheet>

  </div>
</template>

<script>
export default {
  name: "Home",
  data(){
    return{
      type: 'month',
      value: '',
      time: '',
      extend: '',
      events: [
        {
          name: '重要会议',
          start: '2021-03-19 20:00',
          end: '2021-03-19 21:00',
          location: 'A06-201'
        },
        {
          name: '院系内会议',
          start: '2021-03-19 14:00',
          end: '2021-03-19 16:00',
          location: 'A06-401'
        },
        {
          name: '重要会议',
          start: '2021-03-18 20:00',
          end: '2021-03-18 21:00',
          location: 'A02'
        },],
      selectedEvent: {},
      selectedElement: null,
      selectedOpen: false,
      colors: ['blue', 'indigo', 'deep-purple', 'cyan', 'green', 'orange','purple','teal' ],
    };
  },
  created() {
    this.init();
  },
  methods:{
    init(){
      let time =  new Date();
      let year = time.getFullYear()+'年';
      let month = time.getMonth()+1+'月';
      let day = time.getDate()+'号';
      this.time = year+month+day;
      let hours = time.getHours();
      if (hours>0 && hours<=6){
        this.extend = '午夜好';
      }else if(hours>7 && hours<=11){
        this.extend = '上午好';
      } else if(hours>11 && hours<=14){
        this.extend = '中午好';
      }else if(hours>14 && hours<=18){
        this.extend = '下午好';
      }else{
        this.extend = '晚上好';
      }
    },
    // 获取设置事件的颜色
    getEventColor (event) {
      event.color=this.colors[event.start.substring(8,10)%8];
      return event.color;
    },

    next () {
      this.$refs.calendar.next()
    },
    // 显示事件详细内容
    showEvent ({ nativeEvent, event }) {
      const open = () => {
        this.selectedEvent = event
        this.selectedElement = nativeEvent.target
        setTimeout(() => {
          this.selectedOpen = true
        }, 10)
      }
      if (this.selectedOpen) {
        this.selectedOpen = false
        setTimeout(open, 10)
      } else {
        open()
      }
      nativeEvent.stopPropagation()
    },
  },
}
</script>

<style scoped>

</style>