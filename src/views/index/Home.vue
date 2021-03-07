<template>
  <div>
    <v-sheet
        tile
        height="54"
        class="d-flex"
    >
      <v-btn
          icon
          class="ma-2"
          @click="$refs.calendar.prev()"
      >
        <v-icon>mdi-chevron-left</v-icon>
      </v-btn>
      <v-select
          v-model="type"
          :items="types"
          dense
          outlined
          hide-details
          class="ma-2"
          label="显示类型"
      ></v-select>
      <v-container>{{ today }}</v-container>
      <v-btn
          icon
          class="ma-2"
          @click="$refs.calendar.next()"
      >
        <v-icon>mdi-chevron-right</v-icon>
      </v-btn>
    </v-sheet>
    <v-sheet height="400">
      <v-calendar
          ref="calendar"
          v-model="value"
          :type="type"
          :event-overlap-threshold="30"
      ></v-calendar>
    </v-sheet>
  </div>
</template>

<script>
export default {
  name: "Home",
  data(){
    return{
      today: '2021-3-3',
      type: 'month',
      types: ['month', 'week', 'day', '4day'],
      value: '',
    };
  },
  method:{
  
  },
}
</script>

<style scoped>

</style>