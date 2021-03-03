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
                      <!--<v-btn text elevation="4" medium small v-on:click="data_all('today')">
                      TODAY
                      </v-btn>-->
                      <div id="app">
                        <input type="date" v-model="date" value="date" @change="select_data(date)"/>
                      </div>
                      <v-btn text elevation="4" medium small v-show="!hidden" v-on:click="data_all('ALL')">
                      ADD ALL
                      </v-btn>
                      <v-btn text elevation="4" small color="primary" v-show="hidden" v-on:click="select_data(date)" @change="select_data(date)">
                      Close
                      <v-icon>mdi-close-circle-outline</v-icon>
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
                        >
                        <template v-slot:top>
                          <v-dialog v-model="History" max-width="600px">
                          <v-card>
                            <v-card-title>
                              <span class="headline">{{
                                formTitle_users
                              }}</span>
                              <v-card-text>
                                <v-container>
                                  <v-row justify="center">
                                    <v-col cols="12" sm="12" md="12">
                                    <v-data-table
                                      :headers="header_member"
                                      :items="desserts"
                                    ></v-data-table>
                                    </v-col>
                                  </v-row>
                                </v-container>
                              </v-card-text>
                            </v-card-title>
                          </v-card>
                          </v-dialog>
                        </template>
                        <template v-slot:item.member="item">
                          <v-icon
                            medium
                            class="mr-2"
                            @click="data_all_name(item)"
                            >mdi-clipboard-account</v-icon
                          >
                        </template>
                        </v-data-table>
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
      History: false,
      hidden: false,
      total_user: 0,
      total_meeting: 0,
      date: new Date().toISOString().substr(0, 10),
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
        { text: "รายชื่อผู้ร่วมประชุม", value: "member", sortable: false },
      ],
      header_member: [
        { text: 'รายชื่อ' , align: 'start' , filterable: false , value: 'member_name'},
        { text: 'เวลาเข้าห้องประชุม', value: 'join_at' },
        { text: 'เวลาออกห้องประชุม', value: 'out_at' },
      ],
      desserts: [],
      meeting: [],
    };
  },
  watch: {
    dialog_admin(val) {
      val || this.close_admin();
    },
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
        // "https://meet.one.th/secret/api/users/data"
      );
      var data = API_Data.data.data;
      var API_Roles = await this.axios.get(
        process.env.VUE_APP_API + "/api/roles/data"
        // "https://meet.one.th/secret/api/roles/data"
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
      var attendee_All = [];
      var history_rooms = await this.axios.get(
        process.env.VUE_APP_API + "/api/History_rooms/data"
        // "https://meet.one.th/secret/api/history_rooms/data"
      );
      var data = history_rooms.data.data
      for (let i = 0; i < data.length; i++) {
        console.log(data[i])
        for (let j = 0; j < data[i]["member"].length; j++) {
          if(data[i]["member"][j]["email"] != undefined){
            attendee_All.push({
              attendee: data[i]["member"][j]["email"].split("@")[0],
              join_at: data[i]["member"][j]["join_at"],
              out_at: data[i]["member"][j]["out_at"],
            })
          }
          if(data[i]["member"][j]["attendee"] != undefined){
            // attendee_All.push(data[i]["member"][j]["attendee"].split("-")[0])
            attendee_All.push({
              attendee: data[i]["member"][j]["attendee"].split("-")[0],
              join_at: data[i]["member"][j]["join_at"],
              out_at: data[i]["member"][j]["out_at"],
            })
          }
        }
        if (this.date_show == data[i]["date"]) {
          data_ALL = [
            {
              room_name: data[i]["name"],
              owner: data[i]["username"],
              date: data[i]["date"],
              s_time: data[i]["start_time"],
              e_time: data[i]["end_time"],
              attendee: data[i]["attendee"],
              member: attendee_All,
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
              member: attendee_All,
            },
          ];
          N_meet = N_meet + 1;
          this.meeting.push(data_ALL[0]);
        }
        attendee_All = [];
      }
      this.total_meeting = N_meet
    },
    data_all_name (item) {
      this.desserts = [];
      var member = [];
      for (let i = 0; i < item["item"]["member"].length; i++) {
        if(item["item"]["member"][i]["out_at"] != ""){
          member = [
            {
              member_name: item["item"]["member"][i]["attendee"],
              join_at: new Date(item["item"]["member"][i]["join_at"]).toLocaleTimeString(),
              out_at: new Date(item["item"]["member"][i]["out_at"]).toLocaleTimeString(),
            },
          ];
        } else {
          member = [
            {
              member_name: item["item"]["member"][i]["attendee"],
              join_at: new Date(item["item"]["member"][i]["join_at"]).toLocaleTimeString(),
              out_at: "",
            },
          ];
        }
        this.desserts.push(member[0]);
      }
      this.History = true;
    },
    select_data (value) {
      this.meeting = [];
      this.hidden = false;
      this.date_show = value.split("-")[2]+"/"+value.split("-")[1]+"/"+value.split("-")[0]
      this.User_dashboard();
      this.meeting_dashboard();
    },
    data_all:function (data) {
      this.meeting = [];
      this.hidden = true;
      this.date_show = data;
      this.User_dashboard();
      this.meeting_dashboard();
    },
  }
};
</script>