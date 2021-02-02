<template>
  <v-layout wrap>
    <v-flex xs12>
      <v-card height="100%" flat color="#f5f5f5">
        <v-container fluid grid-list-lg class="pa-0 pl-0 pr-0">
          <v-row justify="center">
              <div class="loading-myform-block" v-if="notReady"></div>
              <v-card
              height="100%"
              width="95%"
              class="table-content pa-2 pl-2 pr-2"
              >
              <v-layout
                class="ma-0" wrap
              >
                <!-- START -->
                <v-flex lg12 xs12>
                  <v-toolbar dense flat>
                    <v-spacer></v-spacer><v-spacer></v-spacer><v-spacer></v-spacer><v-spacer></v-spacer>
                    <v-spacer></v-spacer><v-spacer></v-spacer><v-spacer></v-spacer><v-spacer></v-spacer>
                    <v-spacer></v-spacer><v-spacer></v-spacer><v-spacer></v-spacer><v-spacer></v-spacer>
                    <v-spacer></v-spacer><v-spacer></v-spacer><v-spacer></v-spacer><v-spacer></v-spacer>
                    <v-row
                      align="center"
                      justify="space-around"
                    >
                      <v-btn text elevation="4" medium small v-on:click="data_all('today')">
                      TODAY
                      </v-btn>
                      <v-btn text elevation="4" medium small v-on:click="data_all('all')">
                      ADD ALL
                      </v-btn>
                    </v-row>
                  </v-toolbar>
                </v-flex>
                <v-flex lg6 xs12>
                  <v-layout wrap>
                    <v-flex lg12 class="d-flex">
                      <v-card width="100%" height="320px" outlined>
                        <v-toolbar color="white" dense flat>
                          <span style="font-size: 16px;">ผู้ใช้งาน {{date_show}}</span>
                          <v-spacer></v-spacer>
                          <v-spacer></v-spacer>
                        </v-toolbar>
                        <v-divider></v-divider>
                        <v-list-item>
                          <v-list-item-content>
                            <v-list-item-title>
                            รวมผู้ใช้งานทั้งหมด {{total_user}} คน
                              <apexcharts
                                type="pie"
                                width="100%"
                                height="230"
                                :options="chartOptions"
                                :series="series"
                              ></apexcharts>
                            </v-list-item-title>
                          </v-list-item-content>
                        </v-list-item>
                      </v-card>
                    </v-flex>
                  </v-layout>
                </v-flex>
                <v-flex lg6 xs12>
                  <v-layout wrap>
                    <v-flex lg6 class="d-flex">
                      <v-card width="100%" height="320px" outlined>
                        <v-toolbar color="white" dense flat>
                          <span style="font-size: 16px;">New User</span>
                          <v-spacer></v-spacer>
                        </v-toolbar>
                        <v-divider></v-divider>
                        <v-toolbar color="white" dense flat height="85px">
                          <v-spacer></v-spacer>
                          <span style="font-size: 20px;">Business</span>
                          <v-spacer></v-spacer>
                          <span style="font-size: 20px;">{{series[0]}}</span>
                          <v-spacer></v-spacer>
                          <span style="font-size: 20px;">คน</span>
                          <v-spacer></v-spacer>
                        </v-toolbar>
                        <v-divider></v-divider>
                        <v-toolbar color="white" dense flat height="85px">
                          <v-spacer></v-spacer>
                          <span style="font-size: 20px;">Citizen</span>
                          <v-spacer></v-spacer>
                          <span style="font-size: 20px;">{{series[1]}}</span>
                          <v-spacer></v-spacer>
                          <span style="font-size: 20px;">คน</span>
                          <v-spacer></v-spacer>
                        </v-toolbar>
                        <v-divider></v-divider>
                        <v-toolbar color="white" dense flat height="85px">
                          <v-spacer></v-spacer>
                          <span style="font-size: 20px;">User</span>
                          <v-spacer></v-spacer>
                          <span style="font-size: 20px;">{{series[2]}}</span>
                          <v-spacer></v-spacer>
                          <span style="font-size: 20px;">คน</span>
                          <v-spacer></v-spacer>
                        </v-toolbar>
                      </v-card>
                    </v-flex>
                    <v-flex lg6 class="d-flex">
                      <v-card width="100%" height="320px" outlined>
                        <v-toolbar color="white" dense flat>
                          <span style="font-size: 16px;">Start Meeting</span>
                          <v-spacer></v-spacer>
                        </v-toolbar>
                        <v-divider></v-divider>
                        <v-toolbar color="white" dense flat height="250px">
                          <v-spacer></v-spacer>
                          <span style="font-size: 40px;" class="">{{total_meeting}}</span>
                          <v-spacer></v-spacer>
                        </v-toolbar>
                      </v-card>
                    </v-flex>
                  </v-layout>
                </v-flex>
                <v-flex lg12 xs12>
                  <v-layout wrap>
                    <v-flex lg12 class="d-flex">
                      <v-card width="100%" height="100%" outlined>
                        <v-toolbar color="white" dense flat>
                          <span style="font-size: 16px;">History</span>
                          <v-spacer></v-spacer>
                        </v-toolbar>
                        <v-divider></v-divider>
                        <v-card-title>
                          <v-text-field
                            v-model="search"
                            append-icon="mdi-magnify"
                            label="Search"
                            single-line
                            hide-details
                          ></v-text-field>
                        </v-card-title>
                        <v-data-table
                          :headers="headers"
                          :items="meeting"
                          :search="search"
                        ></v-data-table>
                      </v-card>
                    </v-flex>
                  </v-layout>
                </v-flex>
              </v-layout>
            </v-card>
          </v-row>
        </v-container>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import VueApexCharts from "vue-apexcharts";

export default {
  components: {
    apexcharts: VueApexCharts
  },
  data() {
    return {
      total_user: 0,
      total_meeting: 0,
      date_show: "",
      series: [1 , 1 , 1],
      chartOptions: {
        labels: ["Business", "Citizen", "User"],
        dataLabels: {
          formatter: function(series, opts) {
            return  opts.w.globals.series[opts.seriesIndex] 
          }
        },
        responsive: [
          {
            breakpoint: 480,
            options: {
              chart: {
                width: 260
              },
              legend: {
                position: "bottom"
              }
            }
          }
        ],
        colors: ["#32CD32","#1E90FF","#DC143C"],
        toolbar: {
          show: false
        }
      },
      search: '',
      headers: [
        { text: 'ชื่อห้อง' , align: 'start' , filterable: false , value: 'room_name'},
        { text: 'ชื่อเจ้าของห้อง', value: 'owner' },
        { text: 'วันที่ประชุม' , value: 'date'},
        { text: 'start time' , value: 's_time'},
        { text: 'end time' , value: 'e_time'},
        { text: 'จำนวนผู้ร่วมประชุม' , value: 'attendee'},
      ],
      meeting: [
        // {
        //   room_name: 'Meeting 01',
        //   owner: 'User-01',
        //   date: '',
        //   s_time: '',
        //   e_time: '',
        //   attendee: '',
        // },
        // {
        //   room_name: 'Meeting 02',
        //   owner: 'User-02',
        //   date: '',
        //   s_time: '',
        //   e_time: '',
        //   attendee: '',
        // },
      ],
    };
  },
  created() {
    this.date_time();
  },
  methods: {
    date_time(type){
      var data_type = type
      if( data_type == undefined){
        data_type = "today"
      }
      var timenow = new Date();
      var timenow_day = timenow.getDate();
      var timenow_month = timenow.getMonth() + 1;
      var timenew_year = timenow.getFullYear();
      console.log(timenow_day)
      if(timenow_day<10){
        var string_day = "0"+timenow_day
      }else{
        string_day = timenow_day
      }
      if(timenow_month<10){
        var string_month = "0"+timenow_month
      }else{
        string_month = timenow_month
      }
      var day_begin = string_day + "/" + string_month + "/" + timenew_year;
      console.log(day_begin)
      // var timenow_Hours = timenow.getHours();
      // var timenow_Minut = timenow.getMinutes();
      // var timenow_Secon = timenow.getSeconds();
      // var time_begin = timenow_Hours + ":" + timenow_Minut + ":" + timenow_Secon;

      if(data_type == "today"){
        this.date_show = day_begin;
      }else{
        this.date_show = "ALL";
      }
      this.User_dashboard();
      this.meeting_dashboard();
    },
    async User_dashboard() {
      var N_total = 0;
      var N_host = 0;
      var N_citizen = 0;
      var N_user = 0;
      var total_push = [];
      var data_CD = [];
      var API_Data = await this.axios.get(
        process.env.VUE_APP_API + "/api/users/data"
      );
      var data = API_Data.data.data;
      var API_Roles = await this.axios.get(
        process.env.VUE_APP_API + "/api/roles/data"
      );
      var roles = API_Roles.data.data;
      for (let k = 0; k < data.length; k++) {
        var date = data[k]["created_at"].split("T")[0].split("-")[2]
        +"/"+data[k]["created_at"].split("T")[0].split("-")[1]
        +"/"+data[k]["created_at"].split("T")[0].split("-")[0];
        data_CD.push([data[k]["role"] , date])
      }
      for (let i = 0; i < data_CD.length; i++) {
        if (this.date_show == data_CD[i][1]) {
          for (let j = 0; j < roles.length; j++) {
            if (data_CD[i][0] == roles[j]["_id"]) {
              var role = roles[j]["name"];
            }
          }
          if (role == "host") {
            // this.host.push(data_ALL[0]);
            N_host = N_host + 1;
            N_total = N_total + 1;
          } else if (role == "user") {
            // this.users.push(data_ALL[0]);
            N_user = N_user + 1;
            N_total = N_total + 1;
          } else if (role == "citizen") {
            // this.citizen.push(data_ALL[0]);
            N_citizen = N_citizen + 1;
            N_total = N_total + 1;
          }
        }else if (this.date_show == "ALL") {
          for (let j = 0; j < roles.length; j++) {
            if (data_CD[i][0] == roles[j]["_id"]) {
              role = roles[j]["name"];
            }
          }
          if (role == "host") {
            // this.host.push(data_ALL[0]);
            N_host = N_host + 1;
            N_total = N_total + 1;
          } else if (role == "user") {
            // this.users.push(data_ALL[0]);
            N_user = N_user + 1;
            N_total = N_total + 1;
          } else if (role == "citizen") {
            // this.citizen.push(data_ALL[0]);
            N_citizen = N_citizen + 1;
            N_total = N_total + 1;
          }
        }
      }
      this.total_user = N_total
      total_push.push(N_host , N_citizen , N_user)
      this.series = total_push
    },
    async meeting_dashboard(){
      var N_meet = 0;
      var data_ALL = [];
      var history_rooms = await this.axios.get(
        process.env.VUE_APP_API + "/api/History_rooms/data"
      );
      var data = history_rooms.data.data
      for (let i = 0; i < data.length; i++) {
        if (this.date_show == data[i]["date"]) {
          data_ALL = [
            {
              room_name: data[i]["name"],
              owner: data[i]["username"],
              date: data[i]["date"],
              s_time: data[i]["start_time"],
              e_time: data[i]["end_time"],
              attendee: data[i]["attendee"],
            },
          ];
          N_meet = N_meet + 1;
          this.meeting.push(data_ALL[0]);
        }else if (this.date_show == "ALL") {
          data_ALL = [
            {
              room_name: data[i]["name"],
              owner: data[i]["username"],
              date: data[i]["date"],
              s_time: data[i]["start_time"],
              e_time: data[i]["end_time"],
              attendee: data[i]["attendee"],
            },
          ];
          N_meet = N_meet + 1;
          this.meeting.push(data_ALL[0]);
        }
      }
      this.total_meeting = N_meet
    },
    data_all:function (data) {
      this.meeting = [];
      this.date_time(data);
    },
  }
};
</script>