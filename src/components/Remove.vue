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
              <v-divider></v-divider>
              <v-tabs :centered="true" :grow="true">
                <v-tab ripple @click="clear()">Delete User</v-tab>
                <v-tab-item>
                  <!-- /////////////////////////////////////////////////////////// -->
                  <v-card flat>
                    <v-data-table
                      :headers="headers"
                      :items="Delete"
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
                          >
                          </v-text-field>
                        </v-toolbar>
                      </template>
                      <template v-slot:item.actions="{ item }">
                          <v-menu left>
                            <template v-slot:activator="{ on , attrs}">
                              <v-btn
                                black
                                icon
                                v-bind="attrs"
                                v-on="on"
                              >
                                <v-icon>mdi-dots-vertical</v-icon>
                              </v-btn>
                            </template>
                            <v-list>
                                <v-list-item-title>
                                  <v-btn width="100%" height="40" @click="Re_users(item)">
                                    <v-icon
                                    medium
                                    class="mr-2"
                                    >mdi-recycle</v-icon>
                                    ยกเลิกการลบ
                                  </v-btn>
                                </v-list-item-title>
                                <v-list-item-title>
                                  <v-btn width="100%" height="40" @click="Wait_delete(item)">
                                    <v-icon 
                                      medium
                                      class="mr-2" 
                                    >mdi-delete</v-icon>
                                    ลบ User
                                  </v-btn>
                                </v-list-item-title>
                            </v-list>
                          </v-menu>
                      </template>
                    </v-data-table>
                    <v-dialog v-model="dialog_Re_users" max-width="500px">
                        <v-card>
                          <v-card-title>
                            <span class="headline" >คุณต้องการยกเลิกการลบ  หรือไม่</span>
                          </v-card-title>
                          <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn
                              color="blue darken-1"
                              text
                              @click="close_All"
                              >ยกเลิก</v-btn
                            >
                            <v-btn
                              color="blue darken-1"
                              text
                              @click="Redelete_users"
                              >ตกลง</v-btn
                            >
                          </v-card-actions>
                        </v-card>
                    </v-dialog>
                    <v-dialog v-model="dialog_W_delete" max-width="500px">
                        <v-card>
                          <v-card-title>
                            <span class="headline" >คุณต้องการลบ User หรือไม่</span>
                          </v-card-title>
                          <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn
                              color="blue darken-1"
                              text
                              @click="close_All"
                              >ยกเลิก</v-btn
                            >
                            <v-btn
                              color="blue darken-1"
                              text
                              @click="delete_users"
                              >ตกลง</v-btn
                            >
                          </v-card-actions>
                        </v-card>
                    </v-dialog>
                  </v-card>
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
    Delete: [],
    search: "",
    dialog_W_delete: false,
    dialog_Re_users: false,
    dataIndex: -1,
    headers: [
      { text: "ชื่อผู้ใช้", value: "user" },
      { text: "ชื่อ", value: "fname" },
      { text: "นามสกุล", value: "lname" },
      { text: "Company", value: "company" },
      { text: "E-mail", value: "email" },
      { text: "สิทธิ์", value: "status" },
      { text: "Option", value: "actions", sortable: false },
    ],
    delete_data: {
      user: "",
      fname: "",
      lname: "",
      company: "",
      email: "",
      status: ""
    },
    defaultItem: {
      user: "",
      fname: "",
      lname: "",
      company: "",
      email: "",
      status: ""
    },
  }),
  watch: {
    dialog_W_delete(val) {
      val || this.close_All();
    },
    dialog_Re_users(val) {
      val || this.close_All();
    },
  },
  created() {
    this.alldata();
  },
  methods: {
    async alldata() {
      var data_ALL = [];
      var role;
      var API_Data = await this.axios.get(
          process.env.VUE_APP_API + "/api/remove/data"
      );
      var data = API_Data.data.data;
      var API_Roles = await this.axios.get(
          process.env.VUE_APP_API + "/api/roles/data"
      );
      var roles = API_Roles.data.data;
      for (let i = 0; i < data.length; i++) {
        for (let j = 0; j < roles.length; j++) {
            if (data[i]["role"] == roles[j]["_id"]) {
            role = roles[j]["name"];
            }
        }
        data_ALL = [
            {
                // number: N_admin,
                user: data[i]["username"],
                fname: data[i]["name"],
                lname: data[i]["lastname"],
                company: data[i]["company"],
                email: data[i]["email"],
                status: role,
            },
        ];
        this.Delete.push(data_ALL[0]);
      }
    },
    async delete(data) {
      console.log("delete")
      console.log(data)
      await this.axios.post(
        process.env.VUE_APP_API + "/api/remove/delete",{
          username: data.user,
          email: data.email,
        }
      );
      this.Delete = [];
      this.alldata();
    },
    async restore(data) {
      await this.axios.post(
        process.env.VUE_APP_API + "/api/remove/restore",{
          username: data.user,
          email: data.email,
        }
      );
      this.Delete = [];
      this.alldata();
    },
    Wait_delete(item) {
      this.dialog_W_delete = true;
      this.dataIndex = this.Delete.indexOf(item);
      this.delete_data = Object.assign({}, item);
    },
    Re_users(item) {
      this.dialog_Re_users = true;
      this.dataIndex = this.Delete.indexOf(item);
      this.delete_data = Object.assign({}, item);
    },
    Redelete_users() {
      Object.assign(
        this.Delete[this.dataIndex],
        this.delete_data
      );
      this.restore(this.Delete[this.dataIndex]);
      this.close_All();
    },
    delete_users(){
      Object.assign(
        this.Delete[this.dataIndex],
        this.delete_data
      );
      this.delete(this.Delete[this.dataIndex]);
      this.close_All();
    },
    close_All() {
      this.dialog_Re_users = false;
      this.dialog_W_delete = false;
      this.$nextTick(() => {
        this.delete_data = Object.assign({}, this.defaultItem);
      });
    },
    clear() {
        this.search = "";
    },
  },
};
</script>