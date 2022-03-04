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
                      <v-btn text elevation="4" medium small v-show="!rate" v-on:click="rate_on()">
                      Rate OFF
                      </v-btn>
                      <v-btn text elevation="4" small color="primary" v-show="rate" v-on:click="rate_off()" @change="select_data(date)">
                      Rate ON
                      </v-btn>
                      <div id="app" v-show="rate">
                        <v-card width="100%" height="100%" outlined>
                          <input type="date" v-model="rate_date_S" value="rate_date" @change="select_rate_S(rate_date_S)"/>
                        </v-card>
                      </div>
                      <div id="app" v-show="rate">
                        --
                      </div>
                      <div id="app" v-show="rate">
                        <v-card width="100%" height="100%" outlined>
                          <input type="date" v-model="rate_date_E" value="rate_date" @change="select_rate_E(rate_date_E)"/>
                        </v-card>
                      </div>
                      <div id="app" v-show="!rate">
                        <v-card width="100%" height="100%" outlined>
                          <input type="date" v-model="date" value="date" outlined @change="select_data(date)"/>
                        </v-card>
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
                          <span style="font-size: 16px;">User</span>
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
                          <v-btn text elevation="4" small v-on:click="onExport()">Export</v-btn>
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
                          <v-dialog v-model="History" max-width="800px">
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
                                      :sort-by="['join_at']"
                                    ></v-data-table>
                                    </v-col>
                                  </v-row>
                                </v-container>
                              </v-card-text>
                            </v-card-title>
                          </v-card>
                          </v-dialog>
                          <v-dialog v-model="Record" max-width="600px">
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
                                      :headers="header_record"
                                      :items="Recordfile"
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
                        <!--////////////////////////////////////////////////-->
                        <template v-slot:item.file="item">
                          <div v-if="item.item.file[0] === 'notRecord'">
                            <v-icon>mdi-minus</v-icon>
                          </div>
                          <div v-else>
                            <v-icon
                              medium
                              class="mr-2"
                              @click="data_record_name(item)"
                              >mdi-file-video</v-icon>
                          </div>
                        </template>
                        </v-data-table>
                      </v-card>
                    </v-flex>
                  </v-layout>
                </v-flex>
              </v-layout>
            </v-card>
          </v-row>
          <v-overlay :value="overlay">
            <v-progress-circular
              indeterminate
              size="64"
            ></v-progress-circular>
          </v-overlay>
        </v-container>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import VueApexCharts from "vue-apexcharts";
import XLSX from 'xlsx'

export default {
  components: {
    apexcharts: VueApexCharts
  },
  data() {
    return {
      History: false,
      hidden: false,
      rate: false,
      Record: false,
      total_user: 0,
      overlay: false,
      total_meeting: 0,
      date: new Date().toISOString().substr(0, 10),
      today: "",
      rate_date_S: new Date().toISOString().substr(0, 10),
      rate_date_E: new Date().toISOString().substr(0, 10),
      rate_show: "",
      date_show: "",
      api_user:[],
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
        { text: "Company", value: "company" },
        { text: 'วันที่ประชุม' , value: 'date'},
        { text: 'start time' , value: 's_time'},
        { text: 'end time' , value: 'e_time'},
        { text: 'จำนวนผู้ร่วมประชุม' , value: 'attendee'},
        { text: "รายชื่อผู้ร่วมประชุม", value: "member", sortable: false },
        { text: "record", value: "file", sortable: false },
        { text: "IP", value: "ip", sortable: false },
        { text: "Meeting-ID", value: "mid", sortable: false },
      ],
      header_member: [
        { text: 'รายชื่อ' , align: 'start' , filterable: false , value: 'member_name'},
        { text: 'เวลาเข้าห้องประชุม', value: 'join_at' , width:"100px" },
        { text: 'เวลาออกห้องประชุม', value: 'out_at' , width:"100px" },
        { text: "IP", value: "ip", sortable: false , width:"200px"}
      ],
      header_record: [
        { text: 'ชื่อไฟล์' , align: 'start' , filterable: false , value: 'file_name'},
        { text: 'ขนาดไฟล์', value: 'size' },
      ],
      desserts: [],
      meeting: [],
      Recordfile:[],
    };
  },
  watch: {
    dialog_admin(val) {
      val || this.close_admin();
    }
  },
  created() {
    this.date_API();
  },
  methods: {
    async date_API(){
      this.session_exp()
      const headers_token = {
        Authorization: 'Bearer '+ this.$session.get('jwt')
      }
      var API_Data = await this.axios.get(
        process.env.VUE_APP_API + "/api/users/data",{
          headers: headers_token
        }
      );
      this.api_user = API_Data.data.data;
      this.date_time();
    },
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
        this.rate_show = day_begin;
      }else{
        this.date_show = "ALL";
      }
      this.today = day_begin
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
      var data = this.api_user;
      const headers_token = {
        Authorization: 'Bearer '+ this.$session.get('jwt')
      }
      var API_Roles = await this.axios.get(
        process.env.VUE_APP_API + "/api/roles/data",{
          headers: headers_token
        }
      );
      var roles = API_Roles.data.data;
      for (let k = 0; k < data.length; k++) {
        var date = data[k]["created_at"].split("T")[0].split("-")[2]
        +"/"+data[k]["created_at"].split("T")[0].split("-")[1]
        +"/"+data[k]["created_at"].split("T")[0].split("-")[0];
        data_CD.push([data[k]["role"] , date])
      }
      for (let i = 0; i < data_CD.length; i++) {
        if (this.date_show == "ALL") {
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
        }else {
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
      this.session_exp()
      var N_meet = 0;
      var data_ALL = [];
      var attendee_All = [];
      var record_ALL = [];
      var Company_user;
      this.meeting = [];
      var room = [];
      const headers_token = {
        Authorization: 'Bearer '+ this.$session.get('jwt')
      }
      var history_rooms = await this.axios.post(
        process.env.VUE_APP_API + "/api/History_rooms/data",{
          date : this.date_show,
          rate : this.rate_show
        },{
          headers: headers_token
        }
      );
      var data = history_rooms.data.data
      var record = await this.axios.get(
        process.env.VUE_APP_API + "/api/onebox/record",{
          headers: headers_token
        }
      );
      var file = record.data.recore
      var data_user = this.api_user;
      for (let i = 0; i < data.length; i++) {
        for (let j = 0; j < data[i]["member"].length; j++) {
          if(data[i]["member"][j]["email"] != undefined && data[i]["member"][j]["email"].code == undefined){
            if(data[i]["member"][j]["ip"] == undefined){
              attendee_All.push({
                attendee: data[i]["member"][j]["email"].split("@")[0],
                join_at: data[i]["member"][j]["join_at"],
                out_at: data[i]["member"][j]["out_at"],
                ip: "",
              })
            } else {
              attendee_All.push({
                attendee: data[i]["member"][j]["email"].split("@")[0],
                join_at: data[i]["member"][j]["join_at"],
                out_at: data[i]["member"][j]["out_at"],
                ip: data[i]["member"][j]["ip"],
              })
            }
          }
          if(data[i]["member"][j]["attendee"] != undefined && data[i]["member"][j]["attendee"].code == undefined){
            if(data[i]["member"][j]["ip"] == undefined){
            attendee_All.push({
              attendee: data[i]["member"][j]["attendee"].split("-")[0],
              join_at: data[i]["member"][j]["join_at"],
              out_at: data[i]["member"][j]["out_at"],
              ip: "",
            })
            } else {
              attendee_All.push({
                attendee: data[i]["member"][j]["attendee"].split("-")[0],
                join_at: data[i]["member"][j]["join_at"],
                out_at: data[i]["member"][j]["out_at"],
                ip: data[i]["member"][j]["ip"],
              })
            }
          }
        }
        for (let k = 0; k < file.length; k++) {
          if(file[k].meetingid == data[i]["meeting_id"]){
            record_ALL.push({
              name : file[k]["filename"],
              size : file[k]["size"]
            })
          }
        }
        for (let l = 0; l < data_user.length; l++) {
          if(data_user[l]["username"] == data[i]["username"]){
            Company_user = data_user[l]["company"]
          }
        }
        if (this.date_show == "ALL") {
          if(record_ALL.length == 0){
            record_ALL.push("notRecord")
          }
          data_ALL = [
            {
              room_name: data[i]["name"],
              owner: data[i]["username"],
              company:Company_user,
              date: data[i]["date"],
              s_time: data[i]["start_time"],
              e_time: data[i]["end_time"],
              attendee: data[i]["attendee"],
              member: attendee_All,
              file: record_ALL,
              ip: data[i]["ip"],
              mid: data[i]["meeting_id"]
            },
          ];
          N_meet = N_meet + 1;
          room.push(data_ALL[0]);
        }else {
          if(record_ALL.length == 0){
            record_ALL.push("notRecord")
          }
          data_ALL = [
            {
              room_name: data[i]["name"],
              owner: data[i]["username"],
              company:Company_user,
              date: data[i]["date"],
              s_time: data[i]["start_time"],
              e_time: data[i]["end_time"],
              attendee: data[i]["attendee"],
              member: attendee_All,
              file: record_ALL,
              ip: data[i]["ip"],
              mid: data[i]["meeting_id"]
            },
          ];
          N_meet = N_meet + 1;
          room.push(data_ALL[0]);
        }
        attendee_All = [];
        record_ALL = [];
      }
      this.total_meeting = N_meet
      this.meeting = room
      this.overlay = false;
    },
    data_all_name (item) {
      this.desserts = [];
      var member = [];
      for (let i = 0; i < item["item"]["member"].length; i++) {
        if(typeof item["item"]["member"][i]["join_at"] == "object"){
          for(let j = 0; j < item["item"]["member"][i]["join_at"].length; j++){
            if(item["item"]["member"][i]["out_at"][j] != undefined){
              member = [
                {
                  member_name: item["item"]["member"][i]["attendee"],
                  join_at: new Date(item["item"]["member"][i]["join_at"][j]).toLocaleTimeString(),
                  out_at: new Date(item["item"]["member"][i]["out_at"][j]).toLocaleTimeString(),
                  ip: item["item"]["member"][i]["ip"][j]
                },
              ];
            } else {
              member = [
                {
                  member_name: item["item"]["member"][i]["attendee"],
                  join_at: new Date(item["item"]["member"][i]["join_at"][j]).toLocaleTimeString(),
                  out_at: "",
                  ip: item["item"]["member"][i]["ip"][j]
                },
              ];
            }
            this.desserts.push(member[0]);
          }
        }else {
          if(item["item"]["member"][i]["out_at"] != ""){
            member = [
              {
                member_name: item["item"]["member"][i]["attendee"],
                join_at: new Date(item["item"]["member"][i]["join_at"]).toLocaleTimeString(),
                out_at: new Date(item["item"]["member"][i]["out_at"]).toLocaleTimeString(),
                ip: item["item"]["member"][i]["ip"]
              },
            ];
          } else {
            member = [
              {
                member_name: item["item"]["member"][i]["attendee"],
                join_at: new Date(item["item"]["member"][i]["join_at"]).toLocaleTimeString(),
                out_at: "",
                ip: item["item"]["member"][i]["ip"]
              },
            ];
          }
          this.desserts.push(member[0]);
        }
      }
      this.History = true;
    },
    data_record_name (item) {
      this.Recordfile = [];
      var Recorddata = [];
      if(item["item"]["file"][0] != "notRecord"){
        for (let i = 0; i < item["item"]["file"].length; i++) {
          Recorddata = [
            {
              file_name: item["item"]["file"][i]["name"],
              size: item["item"]["file"][i]["size"]
            },
          ];
          this.Recordfile.push(Recorddata[0]);
        }
      }else{
        Recorddata = [
          {
            file_name: "NO File",
            size: "-"
          },
        ];
        this.Recordfile.push(Recorddata[0]);
      }
      this.Record = true;
    },
    select_data (value) {
      this.overlay = true;
      this.meeting = [];
      this.hidden = false;
      this.date_show = value.split("-")[2]+"/"+value.split("-")[1]+"/"+value.split("-")[0]
      this.rate_show = this.date_show
      this.rate_date_S = value
      this.rate_date_E = value
      this.User_dashboard();
      this.meeting_dashboard();
    },
    select_rate_S (value) {
      this.overlay = true;
      this.meeting = [];
      this.hidden = false;
      this.rate_show = value.split("-")[2]+"/"+value.split("-")[1]+"/"+value.split("-")[0]
      if(this.date_show == "ALL"){
        this.date_show = this.today;
      }
      this.User_dashboard();
      this.meeting_dashboard();
    },
    select_rate_E (value) {
      this.overlay = true;
      this.meeting = [];
      this.hidden = false;
      this.date_show = value.split("-")[2]+"/"+value.split("-")[1]+"/"+value.split("-")[0]
      this.date = value
      this.User_dashboard();
      this.meeting_dashboard();
    },
    data_all:function (data) {
      this.overlay = true;
      this.meeting = [];
      this.hidden = true;
      this.rate = false;
      this.date_show = data;
      this.rate_date_S = new Date().toISOString().substr(0, 10);
      this.rate_date_E = new Date().toISOString().substr(0, 10);
      this.User_dashboard();
      this.meeting_dashboard();
    },
    rate_on (){
      this.rate = true;
    },
    rate_off (){
      this.rate = false;
      this.overlay = true;
      this.select_data(this.date)
    },
    onExport() {
      var from = []
      var excal = []
      var sum = []
      for (let i = 0; i < this.meeting.length; i++) {
        var sum_time = this.sumtime(this.meeting[i]["s_time"],this.meeting[i]["e_time"])
        from = [
            {
              ลำดับ : i+1,
              ชื่อห้อง : this.meeting[i]["room_name"],
              ชื่อผู้ใช้ : this.meeting[i]["owner"],
              Company : this.meeting[i]["company"],
              วันที่ประชุม : this.meeting[i]["date"],
              จำนวนผู้ร่วมประชุม: this.meeting[i]["attendee"],
              Start : this.meeting[i]["s_time"],
              Stop : this.meeting[i]["e_time"],
              เวลารวม : sum_time
            },
          ];
        excal.push(from[0])
        sum.push(sum_time)
      }
      var st = this.arraytime(sum)
      from = [
            {
              ลำดับ : "เวลารวมทั้งหมด",
              ชื่อห้อง : "",
              ชื่อผู้ใช้ : "",
              Company : "",
              วันที่ประชุม : "",
              จำนวนผู้ร่วมประชุม: "",
              Start : "",
              Stop : "",
              เวลารวม : st
            },
          ];
      excal.push(from[0])
      var merge = [{ s: { r: this.meeting.length+1, c: 0 }, e: { r: this.meeting.length+1, c: 7 } },];
      var dataWS = XLSX.utils.json_to_sheet(excal)
      var wb = XLSX.utils.book_new()
      dataWS["!merges"] = merge;
      dataWS["A1"].s = {
        alignment: {
            vertical: "center",
            horizontal: "center",
            wrapText: true
        }
      }
      XLSX.utils.book_append_sheet(wb, dataWS)
      XLSX.writeFile(wb,'History_'+this.date_show+'_meeting_'+this.total_meeting+'.xlsx')
    },
    sumtime(S,E){
      if(E != ""){
        var start = S.split(":");
        var end = E.split(":");
        var startDate = new Date(0, 0, 0, start[0], start[1], 0);
        var endDate = new Date(0, 0, 0, end[0], end[1], 0);
        var diff = endDate.getTime() - startDate.getTime();
        var hours = Math.floor(diff / 1000 / 60 / 60);
        diff -= hours * 1000 * 60 * 60;
        var minutes = Math.floor(diff / 1000 / 60);
        if (hours < 0){
          hours = hours + 24;
        }
        var sum = (hours <= 9 ? "0" : "") + hours + ":" + (minutes <= 9 ? "0" : "") + minutes;
        return sum
      } else {
        return ""
      }
    },
    arraytime(myArray){
      var hours = 0
      var minutes = 0
      for(var i in myArray){
      if(myArray[i] != ""){
        hours = hours + parseInt(myArray[i].substring(0, 2))
        minutes = minutes + parseInt(myArray[i].substring(3, 5))
      }
      }
      if(minutes > 59){
        hours = hours + parseInt(minutes / 60);
        minutes = parseInt(minutes % 60);
      }
      var sum = hours + ":" + minutes;
      return sum
    },
    session_exp() {
      var exp = new Date(this.$session.get("data").exp * 1000)
      if (new Date() > exp){
        this.$router.push({ path: "/login" });
      }
    }
  }
};
</script>