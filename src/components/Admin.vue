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
              <div class="lds-roller loading-circle" v-if="notReady">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
              </div>
              <v-btn
                color="blue darken-3"
                text
                @click="New_admin()"
              >สร้าง New Account</v-btn>
              <v-dialog v-model="dialog_New" max-width="500px">
                <v-card>
                  <v-card-title>
                    New Admin
                  </v-card-title>

                  <v-card-text>
                    <v-container>
                      <v-row justify="center">
                        <v-col cols="6" sm="6" md="6">
                          <v-text-field
                            v-model="New_Admin.user"
                            label="username"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="6" sm="6" md="6">
                          <v-text-field
                            v-model="New_Admin.pass"
                            label="password"
                          ></v-text-field>
                        </v-col>
                      </v-row>
                    </v-container>
                  </v-card-text>

                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                      color="blue darken-1"
                      text
                      @click="close_admin_N"
                      >ยกเลิก</v-btn
                    >
                    <v-btn
                      color="blue darken-1"
                      text
                      @click="save_New"
                      >บันทึก</v-btn
                    >
                  </v-card-actions>
                </v-card>
              </v-dialog>
              <v-divider></v-divider>
              <v-tabs :centered="true" :grow="true">
                <v-tab ripple @click="clear()">TOTAL</v-tab>
                <v-tab ripple @click="clear()">Modify</v-tab>
                <v-tab ripple @click="clear()">View Only</v-tab>
                <v-tab-item>
                  <!-- /////////////////////////////////////////////////////////// -->
                  <v-card flat>
                    <v-data-table
                      :headers="headers"
                      :items="total"
                      :search="search"
                      :items-per-page="10"
                      sort
                      class="elevation-1"
                    >
                    <template v-slot:top>
                      <v-toolbar flat color="white">
                        <v-text-field
                          v-model="search"
                          append-icon="mdi-magnify"
                          label="ค้นหา"
                          single-line
                          hide-details
                          style="
                            font-family: 'Sarabun', sans-serif !important;"
                        ></v-text-field>
                      </v-toolbar>
                    </template>
                    <template v-slot:item.actions="{ item }">
                      <v-icon
                        medium
                        class="mr-2"
                        @click="edit_Admin_T(item)"
                      >mdi-account-edit</v-icon>
                    </template>
                    <template v-slot:item.date="{ item }">
                      {{ new Date(item.date).toLocaleDateString('fr') }}
                    </template>
                    <template v-slot:item.limit="{ item }">
                      {{ item.limit }}
                    </template>
                    </v-data-table>
                  </v-card>
                  <v-dialog v-model="dialog_edit_T" max-width="500px">
                    <v-card>
                      <v-card-title>
                        แก้ไขสิทธิ์ของ {{edited_admin_T.user}}
                      </v-card-title>

                      <v-card-text>
                        <v-container>
                          <v-row justify="center">
                            <v-col cols="12" sm="12" md="12">
                              <v-select
                                v-model="edited_admin_T.limit"
                                :items="items"
                                label="สิทธิ์"
                              ></v-select>
                            </v-col>
                          </v-row>
                        </v-container>
                      </v-card-text>

                      <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn
                          color="blue darken-1"
                          text
                          @click="close_admin_T"
                          >ยกเลิก</v-btn
                        >
                        <v-btn
                          color="blue darken-1"
                          text
                          @click="save_admin_T"
                          >บันทึก</v-btn
                        >
                      </v-card-actions>
                    </v-card>
                  </v-dialog>
                </v-tab-item>
                <v-tab-item>
                  <!-- /////////////////////////////////////////////////////////// -->
                  <v-card flat>
                    <v-data-table
                      :headers="headers"
                      :items="modify"
                      :search="search"
                      :items-per-page="10"
                      sort
                      class="elevation-1"
                    >
                    <template v-slot:top>
                      <v-toolbar flat color="white">
                        <v-text-field
                          v-model="search"
                          append-icon="mdi-magnify"
                          label="ค้นหา"
                          single-line
                          hide-details
                          style="
                            font-family: 'Sarabun', sans-serif !important;"
                        ></v-text-field>
                      </v-toolbar>
                    </template>
                    <template v-slot:item.actions="{ item }">
                      <v-icon
                        medium
                        class="mr-2"
                        @click="edit_Admin_M(item)"
                      >mdi-account-edit</v-icon>
                    </template>
                    <template v-slot:item.date="{ item }">
                      {{ new Date(item.date).toLocaleDateString('fr') }}
                    </template>
                    </v-data-table>
                  </v-card>
                  <v-dialog v-model="dialog_edit_M" max-width="500px">
                    <v-card>
                      <v-card-title>
                        แก้ไขสิทธิ์ของ {{edited_admin_M.user}}
                      </v-card-title>

                      <v-card-text>
                        <v-container>
                          <v-row justify="center">
                            <v-col cols="12" sm="12" md="12">
                              <v-select
                                v-model="edited_admin_M.limit"
                                :items="items"
                                label="สิทธิ์"
                              ></v-select>
                            </v-col>
                          </v-row>
                        </v-container>
                      </v-card-text>

                      <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn
                          color="blue darken-1"
                          text
                          @click="close_admin_M"
                          >ยกเลิก</v-btn
                        >
                        <v-btn
                          color="blue darken-1"
                          text
                          @click="save_admin_M"
                          >บันทึก</v-btn
                        >
                      </v-card-actions>
                    </v-card>
                  </v-dialog>
                </v-tab-item>
                <v-tab-item>
                  <!-- /////////////////////////////////////////////////////////// -->
                  <v-card flat>
                    <v-data-table
                      :headers="headers"
                      :items="view"
                      :search="search"
                      :items-per-page="10"
                      sort
                      class="elevation-1"
                    >
                    <template v-slot:top>
                      <v-toolbar flat color="white">
                        <v-text-field
                          v-model="search"
                          append-icon="mdi-magnify"
                          label="ค้นหา"
                          single-line
                          hide-details
                          style="
                            font-family: 'Sarabun', sans-serif !important;"
                        ></v-text-field>
                      </v-toolbar>
                    </template>
                    <template v-slot:item.date="{ item }">
                      {{ new Date(item.date).toLocaleDateString('fr') }}
                    </template>
                    <template v-slot:item.actions="{ item }">
                      <v-icon
                        medium
                        class="mr-2"
                        @click="edit_Admin_V(item)"
                      >mdi-account-edit</v-icon>
                    </template>
                    </v-data-table>
                  </v-card>
                  <v-dialog v-model="dialog_edit_V" max-width="500px">
                    <v-card>
                      <v-card-title>
                        แก้ไขสิทธิ์ของ {{edited_admin_V.user}}
                      </v-card-title>

                      <v-card-text>
                        <v-container>
                          <v-row justify="center">
                            <v-col cols="12" sm="12" md="12">
                              <v-select
                                v-model="edited_admin_V.limit"
                                :items="items"
                                label="สิทธิ์"
                              ></v-select>
                            </v-col>
                          </v-row>
                        </v-container>
                      </v-card-text>

                      <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn
                          color="blue darken-1"
                          text
                          @click="close_admin_V"
                          >ยกเลิก</v-btn
                        >
                        <v-btn
                          color="blue darken-1"
                          text
                          @click="save_admin_V"
                          >บันทึก</v-btn
                        >
                      </v-card-actions>
                    </v-card>
                  </v-dialog>
                </v-tab-item>
              </v-tabs>
              <v-divider></v-divider>
            </v-card>
          </v-row>
        </v-container>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  data: () => ({
    items: [true, false],
    total: [],
    modify: [],
    view: [],
    editedIndex_T: -1,
    editedIndex_M: -1,
    editedIndex_V: -1,
    search: "",
    dialog_New: false,
    dialog_edit_T: false,
    dialog_edit_M: false,
    dialog_edit_V: false,
    headers: [
      { text: "ชื่อผู้ใช้", value: "user" },
      { text: "วันที่สมัคร", value: "date" },
      { text: "สิทธิ์การทำงาน", value: "limit" },
      { text: "Option", value: "actions", sortable: false },
    ],
    New_Admin: {
      user: "",
      pass: "",
    },
    edited_admin_T: {
      user: "",
      date: "",
      limit: ""
    },
    edited_admin_M: {
      user: "",
      date: "",
      limit: ""
    },
    edited_admin_V: {
      user: "",
      date: "",
      limit: ""
    },
    defaultItem: {
      user: "",
      date: "",
      limit: ""
    },
  }),
  created() {
    this.alldata();
  },
  methods: {
    async alldata() {
      var data_ALL = [];
      var API_Data = await this.axios.get(
        process.env.VUE_APP_API + "/api/admin/data",{
          headers: { 'Authorization' : `token ${process.env.ADMIN_TOKEN}` }
        }
      );
      var data = API_Data.data.data;
      console.log(data)
      for (let i = 0; i < data.length; i++) {
        if (data[i]["No_limit"] == true) {
          data_ALL = [
            {
              user: data[i]["user"],
              date: data[i]["created_at"],
              limit: data[i]["No_limit"],
            },
          ];
          this.modify.push(data_ALL[0]);
        }
        if (data[i]["No_limit"] == false) {
          data_ALL = [
            {
              user: data[i]["user"],
              date: data[i]["created_at"],
              limit: data[i]["No_limit"],
            },
          ];
          this.view.push(data_ALL[0]);
        }
        data_ALL = [
            {
              user: data[i]["user"],
              date: data[i]["created_at"],
              limit: data[i]["No_limit"],
            },
        ];
        this.total.push(data_ALL[0]);
      }
    },
    async update(update){
      var API_Data = await this.axios.get(
        process.env.VUE_APP_API + "/api/admin/data",{
          headers: { 'Authorization' : `token ${process.env.ADMIN_TOKEN}` }
        }
      );
      var data = API_Data.data.data;
      for (let i = 0; i < data.length; i++) {
        if (update["user"] == data[i]["user"]) {
          var data_target = data[i];
        }
      }
      data_target["No_limit"] = update["limit"]
      await this.axios.put(
        process.env.VUE_APP_API + "/api/admin/update",
        data_target,{
          headers: { 'Authorization' : `token ${process.env.ADMIN_TOKEN}` }
        }
      );
      this.total = [],
      this.modify = [],
      this.view = [],
      this.alldata();
    },
    async create(data){
      await this.axios.post(
        process.env.VUE_APP_API + "/api/admin/create",{
          user: data.user,
          password: data.pass,          
        },{
          headers: { 'Authorization' : `token ${process.env.ADMIN_TOKEN}` }
        }
      );
      this.total = [],
      this.modify = [],
      this.view = [],
      this.alldata();
    },
    New_admin(){
      this.dialog_New = true;
    },
    edit_Admin_T(item) {
      this.dialog_edit_T = true;
      this.editedIndex_T = this.total.indexOf(item);
      this.edited_admin_T = Object.assign({}, item);
    },
    edit_Admin_M(item) {
      this.dialog_edit_M = true;
      this.editedIndex_M = this.modify.indexOf(item);
      this.edited_admin_M = Object.assign({}, item);
    },
    edit_Admin_V(item) {
      this.dialog_edit_V = true;
      this.editedIndex_V = this.view.indexOf(item);
      this.edited_admin_V = Object.assign({}, item);
    },
    close_admin_N(){
      this.dialog_New = false;
    },
    close_admin_T() {
      this.dialog_edit_T = false;
      this.$nextTick(() => {
        this.edited_admin_T = Object.assign({}, this.defaultItem);
      });
    },
    close_admin_M() {
      console.log("close")
      this.dialog_edit_M = false;
      this.$nextTick(() => {
        this.edited_admin_M = Object.assign({}, this.defaultItem);
      });
    },
    close_admin_V() {
      this.dialog_edit_V = false;
      this.$nextTick(() => {
        this.edited_admin_V = Object.assign({}, this.defaultItem);
      });
    },
    save_New(){
      this.create(this.New_Admin)
      this.close_admin_N()
    },
    save_admin_T() {
      Object.assign(
        this.total[this.editedIndex_T],
        this.edited_admin_T
      );
      this.update(this.total[this.editedIndex_T]);
      this.close_admin_T();
    },
    save_admin_M() {
      console.log("1")
      Object.assign(
        this.modify[this.editedIndex_M],
        this.edited_admin_M
      );
      console.log("2")
      this.update(this.modify[this.editedIndex_M]);
      this.close_admin_M();
      console.log("3")
    },
    save_admin_V() {
      Object.assign(
        this.view[this.editedIndex_V],
        this.edited_admin_V
      );
      this.update(this.view[this.editedIndex_V]);
      this.close_admin_V();
    },
    clear() {
      this.search = "";
    },
  },
};
</script>
    