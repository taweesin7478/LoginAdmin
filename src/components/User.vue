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

              <v-card-title class="table-name">
                จัดการบัญชีผู้ใช้
                <v-spacer></v-spacer>
              </v-card-title>

              <v-divider></v-divider>
              <v-tabs :centered="true" :grow="true">
                <v-tab ripple @click="clear()">TOTAL</v-tab>
                <v-tab ripple @click="clear()">Business</v-tab>
                <v-tab ripple @click="clear()">Citizen</v-tab>
                <v-tab ripple @click="clear()">User</v-tab>
                <v-tab-item>
                  <!-- /////////////////////////////////////////////////////////// -->
                  <v-card flat>
                    <v-data-table
                      :headers="headers"
                      :items="admin"
                      :search="search"
                      :items-per-page="10"
                      multi-sort
                      class="elevation-1"
                    >
                      <template v-slot:top>
                        <v-toolbar flat color="white">
                          <v-spacer></v-spacer>
                          <v-card-title>
                          จำนวนผู้ใช้ทั้งหมด {{total_all}} คน
                          </v-card-title>
                          <v-spacer></v-spacer>
                          <v-text-field
                            v-model="search"
                            append-icon="mdi-magnify"
                            label="ค้นหา"
                            single-line
                            hide-details
                            style="
                              font-family: 'Sarabun', sans-serif !important;
                            "
                          ></v-text-field>
                          <v-dialog v-model="dialog_admin" max-width="500px">
                            <v-card>
                              <v-card-title>
                                <span class="headline">{{
                                  formTitle_admin
                                }}</span>
                              </v-card-title>

                              <v-card-text>
                                <v-container>
                                  <v-row justify="center">
                                    <v-col cols="12" sm="6" md="4">
                                      <v-text-field
                                        v-model="editedItem_admin.user"
                                        label="ชื่อผู้ใช้"
                                        readonly
                                      ></v-text-field>
                                    </v-col>
                                    <v-col cols="12" sm="6" md="4">
                                      <v-text-field
                                        v-model="editedItem_admin.fname"
                                        label="ชื่อ"
                                        readonly
                                      ></v-text-field>
                                    </v-col>
                                    <v-col cols="12" sm="6" md="4">
                                      <v-text-field
                                        v-model="editedItem_admin.lname"
                                        label="นามสกุล"
                                        readonly
                                      ></v-text-field>
                                    </v-col>
                                    <v-col cols="12" sm="6" md="4">
                                      <v-text-field
                                        v-model="editedItem_admin.company"
                                        label="Company"
                                        readonly
                                      ></v-text-field>
                                    </v-col>
                                    <v-col cols="12" sm="6" md="4">
                                      <v-text-field
                                        v-model="editedItem_admin.phone"
                                        label="เบอร์โทรศัพท์"
                                        readonly
                                      ></v-text-field>
                                    </v-col>
                                    <v-col cols="12" sm="6" md="4">
                                      <v-text-field
                                        v-model="editedItem_admin.mail"
                                        label="E-mail"
                                        readonly
                                      ></v-text-field>
                                    </v-col>
                                    <!-- <v-col cols="12" sm="6" md="4"> -->
                                    <!-- <v-text-field
                                        v-model="editedItem_admin.status"
                                        label="สิทธิ์"
                                    ></v-text-field>-->
                                    <v-col cols="12" sm="12" md="12">
                                      <v-select
                                        v-model="editedItem_admin.status"
                                        :items="items"
                                        label="สิทธิ์"
                                      ></v-select>
                                    </v-col>
                                    <!-- </v-col> -->
                                    <v-col cols="12" sm="6" md="6">
                                      <v-text-field
                                        v-model="editedItem_admin.date"
                                        label="date"
                                        readonly
                                      ></v-text-field>
                                    </v-col>
                                    <v-col cols="12" sm="6" md="6">
                                      <v-text-field
                                        v-model="editedItem_admin.update"
                                        label="Update"
                                        readonly
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
                                  @click="close_admin"
                                  >ยกเลิก</v-btn
                                >
                                <v-btn
                                  color="blue darken-1"
                                  text
                                  @click="save_admin"
                                  >บันทึก</v-btn
                                >
                              </v-card-actions>
                            </v-card>
                          </v-dialog>
                        </v-toolbar>
                      </template>
                      <template v-slot:item.online="{ item }">
                        <v-chip
                          :color="getColor(item.online)"
                          dark
                        >
                          {{ item.online }}
                        </v-chip>
                      </template>
                      <template v-slot:item.actions="{ item }">
                        <v-icon
                          medium
                          class="mr-2"
                          @click="editItem_admin(item)"
                          >mdi-account-edit</v-icon
                        >
                        <!-- <v-icon small @click="deleteItem(item)">mdi-delete</v-icon> -->
                      </template>
                    </v-data-table>
                  </v-card>
                </v-tab-item>
                <v-tab-item>
                  <!-- /////////////////////////////////////////////////////////// -->
                  <v-card flat>
                    <v-data-table
                      :headers="headers"
                      :items="host"
                      :search="search"
                      :items-per-page="10"
                      multi-sort
                      class="elevation-1"
                    >
                      <template v-slot:top>
                        <v-toolbar flat color="white">
                          <v-spacer></v-spacer>
                          <v-card-title>
                          จำนวน BUSINESS ทั้งหมด {{total_bussiness}} คน
                          </v-card-title>
                          <v-spacer></v-spacer>
                          <v-text-field
                            v-model="search"
                            append-icon="mdi-magnify"
                            label="ค้นหา"
                            single-line
                            hide-details
                            style="
                              font-family: 'Sarabun', sans-serif !important;
                            "
                          ></v-text-field>
                          <v-dialog v-model="dialog_host" max-width="500px">
                            <v-card>
                              <v-card-title>
                                <span class="headline">{{
                                  formTitle_host
                                }}</span>
                              </v-card-title>

                              <v-card-text>
                                <v-container>
                                  <v-row justify="center">
                                    <v-col cols="12" sm="6" md="4">
                                      <v-text-field
                                        v-model="editedItem_host.user"
                                        label="ชื่อผู้ใช้"
                                        readonly
                                      ></v-text-field>
                                    </v-col>
                                    <v-col cols="12" sm="6" md="4">
                                      <v-text-field
                                        v-model="editedItem_host.fname"
                                        label="ชื่อ"
                                        readonly
                                      ></v-text-field>
                                    </v-col>
                                    <v-col cols="12" sm="6" md="4">
                                      <v-text-field
                                        v-model="editedItem_host.lname"
                                        label="นามสกุล"
                                        readonly
                                      ></v-text-field>
                                    </v-col>
                                    <v-col cols="12" sm="6" md="4">
                                      <v-text-field
                                        v-model="editedItem_host.company"
                                        label="Company"
                                        readonly
                                      ></v-text-field>
                                    </v-col>
                                    <v-col cols="12" sm="6" md="4">
                                      <v-text-field
                                        v-model="editedItem_host.phone"
                                        label="เบอร์โทรศัพท์"
                                        readonly
                                      ></v-text-field>
                                    </v-col>
                                    <v-col cols="12" sm="6" md="4">
                                      <v-text-field
                                        v-model="editedItem_host.mail"
                                        label="E-mail"
                                        readonly
                                      ></v-text-field>
                                    </v-col>
                                    <!-- <v-col cols="12" sm="6" md="4">
                                      <v-text-field v-model="editedItem_host.status" label="สิทธิ์"></v-text-field>
                                    </v-col>-->
                                    <v-col cols="12" sm="12" md="12">
                                      <v-select
                                        v-model="editedItem_host.status"
                                        :items="items"
                                        label="สิทธิ์"
                                      ></v-select>
                                    </v-col>
                                    <v-col cols="12" sm="6" md="6">
                                      <v-text-field
                                        v-model="editedItem_host.date"
                                        label="date"
                                        readonly
                                      ></v-text-field>
                                    </v-col>
                                    <v-col cols="12" sm="6" md="6">
                                      <v-text-field
                                        v-model="editedItem_host.update"
                                        label="Update"
                                        readonly
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
                                  @click="close_host"
                                  >ยกเลิก</v-btn
                                >
                                <v-btn
                                  color="blue darken-1"
                                  text
                                  @click="save_host"
                                  >บันทึก</v-btn
                                >
                              </v-card-actions>
                            </v-card>
                          </v-dialog>
                        </v-toolbar>
                      </template>
                      <template v-slot:item.online="{ item }">
                        <v-chip
                          :color="getColor(item.online)"
                          dark
                        >
                          {{ item.online }}
                        </v-chip>
                      </template>
                      <template v-slot:item.actions="{ item }">
                        <v-icon medium class="mr-2" @click="editItem_host(item)"
                          >mdi-account-edit</v-icon
                        >
                        <!-- <v-icon small @click="deleteItem(item)">mdi-delete</v-icon> -->
                      </template>
                    </v-data-table>
                  </v-card>
                </v-tab-item>
                <v-tab-item>
                  <!-- /////////////////////////////////////////////////////////// -->
                  <v-card flat>
                    <v-data-table
                      :headers="headers"
                      :items="citizen"
                      :search="search"
                      :items-per-page="10"
                      multi-sort
                      class="elevation-1"
                    >
                      <template v-slot:top>
                        <v-toolbar flat color="white">
                          <v-spacer></v-spacer>
                          <v-card-title>
                          จำนวน CITIZEN ทั้งหมด {{total_citizen}} คน
                          </v-card-title>
                          <v-spacer></v-spacer>
                          <v-text-field
                            v-model="search"
                            append-icon="mdi-magnify"
                            label="ค้นหา"
                            single-line
                            hide-details
                            style="
                              font-family: 'Sarabun', sans-serif !important;
                            "
                          ></v-text-field>
                          <v-dialog v-model="dialog_citizen" max-width="500px">
                            <v-card>
                              <v-card-title>
                                <span class="headline">{{
                                  formTitle_citizen
                                }}</span>
                              </v-card-title>

                              <v-card-text>
                                <v-container>
                                  <v-row justify="center">
                                    <v-col cols="12" sm="6" md="4">
                                      <v-text-field
                                        v-model="editedItem_citizen.user"
                                        label="ชื่อผู้ใช้"
                                        readonly
                                      ></v-text-field>
                                    </v-col>
                                    <v-col cols="12" sm="6" md="4">
                                      <v-text-field
                                        v-model="editedItem_citizen.fname"
                                        label="ชื่อ"
                                        readonly
                                      ></v-text-field>
                                    </v-col>
                                    <v-col cols="12" sm="6" md="4">
                                      <v-text-field
                                        v-model="editedItem_citizen.lname"
                                        label="นามสกุล"
                                        readonly
                                      ></v-text-field>
                                    </v-col>
                                    <v-col cols="12" sm="6" md="4">
                                      <v-text-field
                                        v-model="editedItem_citizen.company"
                                        label="Company"
                                        readonly
                                      ></v-text-field>
                                    </v-col>
                                    <v-col cols="12" sm="6" md="4">
                                      <v-text-field
                                        v-model="editedItem_citizen.phone"
                                        label="เบอร์โทรศัพท์"
                                        readonly
                                      ></v-text-field>
                                    </v-col>
                                    <v-col cols="12" sm="6" md="4">
                                      <v-text-field
                                        v-model="editedItem_citizen.mail"
                                        label="E-mail"
                                        readonly
                                      ></v-text-field>
                                    </v-col>
                                    <!-- <v-col cols="12" sm="6" md="4"> -->
                                    <!-- <v-text-field
                                        v-model="editedItem_citizen.status"
                                        label="สิทธิ์"
                                    ></v-text-field>-->
                                    <v-col cols="12" sm="12" md="12">
                                      <v-select
                                        v-model="editedItem_citizen.status"
                                        :items="items"
                                        label="สิทธิ์"
                                      ></v-select>
                                    </v-col>
                                    <v-col cols="12" sm="6" md="6">
                                      <v-text-field
                                        v-model="editedItem_citizen.date"
                                        label="date"
                                        readonly
                                      ></v-text-field>
                                    </v-col>
                                    <v-col cols="12" sm="6" md="6">
                                      <v-text-field
                                        v-model="editedItem_citizen.update"
                                        label="Update"
                                        readonly
                                      ></v-text-field>
                                    </v-col>
                                    <!-- </v-col> -->
                                  </v-row>
                                </v-container>
                              </v-card-text>

                              <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn
                                  color="blue darken-1"
                                  text
                                  @click="close_citizen"
                                  >ยกเลิก</v-btn
                                >
                                <v-btn
                                  color="blue darken-1"
                                  text
                                  @click="save_citizen"
                                  >บันทึก</v-btn
                                >
                              </v-card-actions>
                            </v-card>
                          </v-dialog>
                        </v-toolbar>
                      </template>
                      <template v-slot:item.online="{ item }">
                        <v-chip
                          :color="getColor(item.online)"
                          dark
                        >
                          {{ item.online }}
                        </v-chip>
                      </template>
                      <template v-slot:item.actions="{ item }">
                        <v-icon
                          medium
                          class="mr-2"
                          @click="editItem_citizen(item)"
                          >mdi-account-edit</v-icon
                        >
                        <!-- <v-icon small @click="deleteItem(item)">mdi-delete</v-icon> -->
                      </template>
                    </v-data-table>
                  </v-card>
                </v-tab-item>
                <v-tab-item>
                  <!-- /////////////////////////////////////////////////////////// -->
                  <v-card flat>
                    <v-data-table
                      :headers="headers"
                      :items="users"
                      :search="search"
                      :items-per-page="10"
                      multi-sort
                      class="elevation-1"
                    >
                      <template v-slot:top>
                        <v-toolbar flat color="white">
                          <v-spacer></v-spacer>
                          <v-card-title>
                          จำนวน USER ทั้งหมด {{total_user}} คน
                          </v-card-title>
                          <v-spacer></v-spacer>
                          <v-text-field
                            v-model="search"
                            append-icon="mdi-magnify"
                            label="ค้นหา"
                            single-line
                            hide-details
                            style="
                              font-family: 'Sarabun', sans-serif !important;
                            "
                          ></v-text-field>
                          <v-dialog v-model="dialog_users" max-width="500px">
                            <v-card>
                              <v-card-title>
                                <span class="headline">{{
                                  formTitle_users
                                }}</span>
                              </v-card-title>

                              <v-card-text>
                                <v-container>
                                  <v-row justify="center">
                                    <v-col cols="12" sm="6" md="4">
                                      <v-text-field
                                        v-model="editedItem_users.user"
                                        label="ชื่อผู้ใช้"
                                        readonly
                                      ></v-text-field>
                                    </v-col>
                                    <v-col cols="12" sm="6" md="4">
                                      <v-text-field
                                        v-model="editedItem_users.fname"
                                        label="ชื่อ"
                                        readonly
                                      ></v-text-field>
                                    </v-col>
                                    <v-col cols="12" sm="6" md="4">
                                      <v-text-field
                                        v-model="editedItem_users.lname"
                                        label="นามสกุล"
                                        readonly
                                      ></v-text-field>
                                    </v-col>
                                    <v-col cols="12" sm="6" md="4">
                                      <v-text-field
                                        v-model="editedItem_users.company"
                                        label="Company"
                                        readonly
                                      ></v-text-field>
                                    </v-col>
                                    <v-col cols="12" sm="6" md="4">
                                      <v-text-field
                                        v-model="editedItem_users.phone"
                                        label="เบอร์โทรศัพท์"
                                        readonly
                                      ></v-text-field>
                                    </v-col>
                                    <v-col cols="12" sm="6" md="4">
                                      <v-text-field
                                        v-model="editedItem_users.mail"
                                        label="E-mail"
                                        readonly
                                      ></v-text-field>
                                    </v-col>
                                    <!-- <v-col cols="12" sm="6" md="4"> -->
                                    <!-- <v-text-field
                                        v-model="editedItem_users.status"
                                        label="สิทธิ์"
                                    ></v-text-field>-->
                                    <v-col cols="12" sm="12" md="12">
                                      <v-select
                                        v-model="editedItem_users.status"
                                        :items="items"
                                        label="สิทธิ์"
                                      ></v-select>
                                    </v-col>
                                    <v-col cols="12" sm="6" md="6">
                                      <v-text-field
                                        v-model="editedItem_users.date"
                                        label="date"
                                        readonly
                                      ></v-text-field>
                                    </v-col>
                                    <v-col cols="12" sm="6" md="6">
                                      <v-text-field
                                        v-model="editedItem_users.update"
                                        label="Update"
                                        readonly
                                      ></v-text-field>
                                    </v-col>
                                    <!-- </v-col> -->
                                  </v-row>
                                </v-container>
                              </v-card-text>

                              <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn
                                  color="blue darken-1"
                                  text
                                  @click="close_users"
                                  >ยกเลิก</v-btn
                                >
                                <v-btn
                                  color="blue darken-1"
                                  text
                                  @click="save_users"
                                  >บันทึก</v-btn
                                >
                              </v-card-actions>
                            </v-card>
                          </v-dialog>
                        </v-toolbar>
                      </template>
                      <template v-slot:item.online="{ item }">
                        <v-chip
                          :color="getColor(item.online)"
                          dark
                        >
                          {{ item.online }}
                        </v-chip>
                      </template>
                      <template v-slot:item.actions="{ item }">
                        <v-icon
                          medium
                          class="mr-2"
                          @click="editItem_users(item)"
                          >mdi-account-edit</v-icon
                        >
                        <!-- <v-icon small @click="deleteItem(item)">mdi-delete</v-icon> -->
                      </template>
                    </v-data-table>
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
    items: ["host", "user", "citizen"],
    search: "",
    dialog_admin: false,
    dialog_host: false,
    dialog_users: false,
    dialog_citizen: false,
    headers: [
      // { text: "ลำดับ", align: "start" , sortable: false , value: "number" },
      { text: "ชื่อผู้ใช้", value: "user" },
      { text: "ชื่อ", value: "fname" },
      { text: "นามสกุล", value: "lname" },
      { text: "Company", value: "company" },
      { text: "เบอร์โทรศัพท์", value: "phone" },
      { text: "E-mail", value: "mail" },
      { text: "วันที่สมัคร", value: "date" },
      { text: 'Update', value: 'update' },
      { text: "สิทธิ์", value: "status" },
      { text: 'Status', value: 'online' },
      { text: "Option", value: "actions", sortable: false },
    ],
    all_data: [],
    admin: [],
    users: [],
    host: [],
    citizen: [],
    total_all: 0,
    total_bussiness: 0,
    total_citizen: 0,
    total_user: 0,
    editedIndex_admin: -1,
    editedIndex_users: -1,
    editedIndex_citizen: -1,
    editedItem_admin: {
      user: "",
      fname: "",
      lname: "",
      company: "",
      phone: "",
      date:"",
      update:"",
      mail: "",
      status: "",
    },
    editedItem_host: {
      user: "",
      fname: "",
      lname: "",
      company: "",
      phone: "",
      date:"",
      update:"",
      mail: "",
      status: "",
    },
    editedItem_users: {
      user: "",
      fname: "",
      lname: "",
      company: "",
      phone: "",
      date:"",
      update:"",
      mail: "",
      status: "",
    },
    editedItem_citizen: {
      user: "",
      fname: "",
      lname: "",
      company: "",
      phone: "",
      date:"",
      update:"",
      mail: "",
      status: "",
    },
    defaultItem: {
      user: "",
      fname: "",
      lname: "",
      company: "",
      phone: "",
      date:"",
      update:"",
      mail: "",
      status: "",
    },
  }),
  computed: {
    formTitle_admin() {
      return this.editedIndex_admin === -1 ? "New User" : "แก้ไข ผู้ดูแลระบบ";
    },
    formTitle_host() {
      return this.editedIndex_host === -1 ? "New User" : "แก้ไข ผู้ใช้งาน";
    },
    formTitle_users() {
      return this.editedIndex_users === -1 ? "New User" : "แก้ไข ผู้ใช้งาน";
    },
    formTitle_citizen() {
      return this.editedIndex_citizen === -1
        ? "New User"
        : "แก้ไข ผู้ใช้งาน";
    },
  },

  watch: {
    dialog_admin(val) {
      val || this.close_admin();
    },
    dialog_host(val) {
      val || this.close_host();
    },
    dialog_users(val) {
      val || this.close_users();
    },
    dialog_citizen(val) {
      val || this.close_citizen();
    },
  },

  created() {
    // this.initialize();
    this.alldata();
  },
  methods: {
    getColor (online) {
      if (online == "ON") return 'green'
      else if (online == "OFF") return 'red'
      else return 'white'
    },
    initialize() {
      this.admin = [
        {
          number: "",
          user: "Admin01",
          fname: "SON",
          lname: "SAA",
          company: "Inet",
          phone: "123",
          date:"",
          update:"",
          mail: "T@inet",
          online:"",
          status: "admin",
        },
      ];
      this.host = [
        {
          number: "",
          user: "Host01",
          fname: "Han",
          lname: "Solo",
          company: "PPP",
          phone: "789",
          date:"",
          update:"",
          mail: "B@JADI",
          online:"",
          status: "host",
        },
      ];
      this.users = [
        {
          number: "",
          user: "User01",
          fname: "non",
          lname: "STA",
          company: "NN",
          phone: "456",
          date:"",
          update:"",
          mail: "B@gmail",
          online:"",
          status: "user",
        },
      ];
      this.citizen = [
        {
          number: "",
          user: "ban01",
          fname: "ERR",
          lname: "WER",
          company: "??",
          phone: "1212312121",
          date:"",
          update:"",
          mail: "B@ZIZI",
          online:"",
          status: "citizen",
        },
      ];
    },
    ////////////////////////////    API    ////////////////////////////////
    async alldata() {
      var data_ALL = [];
      var data_Update = [];
      var on_status;
      var role;
      var N_total = 0;
      // var N_admin = 1;
      var N_host = 0;
      var N_citizen = 0;
      var N_user = 0;
      var date_NF = Date.now();
      var date_now_1 = new Date(date_NF);
      var date_now_2 = date_now_1.toISOString();
      var API_Data = await this.axios.get(
        process.env.VUE_APP_API + "/api/users/data"
      );
      var data = API_Data.data.data;
      var API_Roles = await this.axios.get(
        process.env.VUE_APP_API + "/api/roles/data"
      );
      var roles = API_Roles.data.data;
      var API_ssr = await this.axios.get(
        process.env.VUE_APP_API + "/api/rooms/data"
      );
      var ssr = API_ssr.data.data;
      // console.log(ssr);
      console.log(data);
      for (let i = 0; i < data.length; i++) {
        for (let j = 0; j < roles.length; j++) {
          if (data[i]["role"] == roles[j]["_id"]) {
            role = roles[j]["name"];
          }
        }
        for (let k = 0; k < ssr.length; k++) {
          if (data[i]["_id"] == ssr[k]["user_id"]) {
            on_status = "ON";
          }else{
            on_status = "OFF";
          }
        }
        // console.log(on_status)
        var date = data[i]["created_at"].split("T")[0].split("-")[2]
        +"/"+data[i]["created_at"].split("T")[0].split("-")[1]
        +"/"+data[i]["created_at"].split("T")[0].split("-")[0];
        var update = data[i]["updated_at"].split("T")[0].split("-")[2]
        +"/"+data[i]["updated_at"].split("T")[0].split("-")[1]
        +"/"+data[i]["updated_at"].split("T")[0].split("-")[0];
        if (role == "admin") {
          data_ALL = [
            {
              // number: N_admin,
              user: data[i]["username"],
              fname: data[i]["name"],
              lname: data[i]["lastname"],
              company: data[i]["company"],
              phone: data[i]["phonenumber"],
              date: date,
              update: update,
              mail: data[i]["email"],
              online: on_status,
              status: role,
            },
          ];
          // N_admin =+ 1;
        } if (role == "host") {
          data_ALL = [
            {
              // number: N_host,
              user: data[i]["username"],
              fname: data[i]["name"],
              lname: data[i]["lastname"],
              company: data[i]["company"],
              phone: data[i]["phonenumber"],
              date: date,
              update: update,
              mail: data[i]["email"],
              online: on_status,
              status: role,
            },
          ];
          N_host = N_host + 1;
          N_total = N_total + 1;
        } if (role == "user") {
          data_ALL = [
            {
              // number: N_user,
              user: data[i]["username"],
              fname: data[i]["name"],
              lname: data[i]["lastname"],
              company: data[i]["company"],
              phone: data[i]["phonenumber"],
              date: date,
              update: update,
              mail: data[i]["email"],
              online: on_status,
              status: role,
            },
          ];
          N_user = N_user + 1;
          N_total = N_total + 1;
        } if (role == "citizen") {
          data_ALL = [
            {
              // number: N_citizen,
              user: data[i]["username"],
              fname: data[i]["name"],
              lname: data[i]["lastname"],
              company: data[i]["company"],
              phone: data[i]["phonenumber"],
              date: date,
              update: update,
              mail: data[i]["email"],
              online: on_status,
              status: role,
            },
          ];
          N_citizen = N_citizen + 1;
          N_total = N_total + 1;
        } 
        data_Update = [
          {
            id: data[i]["_id"],
            user: data[i]["username"],
            fname: data[i]["name"],
            lname: data[i]["lastname"],
            company: data[i]["company"],
            phone: data[i]["phonenumber"],
            date: data[i]["created_at"].split("T","1"),
            update: date_now_2,
            mail: data[i]["email"],
            status: role,
          },
        ];
        this.all_data.push(data_Update[0]);
        this.admin.push(data_ALL[0]);
        if (role == "host") {
          this.host.push(data_ALL[0]);
        } else if (role == "user") {
          this.users.push(data_ALL[0]);
        } else if (role == "citizen") {
          this.citizen.push(data_ALL[0]);
        }
      }
      this.total_all = N_total
      this.total_bussiness = N_host
      this.total_citizen = N_citizen
      this.total_user = N_user
    },
    async update(data) {
      var API_Data = await this.axios.get(
        process.env.VUE_APP_API + "/api/users/data"
      );
      var data_api = API_Data.data.data;
      var API_Roles = await this.axios.get(
        process.env.VUE_APP_API + "/api/roles/data"
      );
      var roles = API_Roles.data.data;
      for (let i = 0; i < this.all_data.length; i++) {
        if (data["user"] == this.all_data[i]["user"]) {
          var data_id = this.all_data[i]["id"];
        }
      }
      for (let j = 0; j < data_api.length; j++) {
        if (data_id == data_api[j]["_id"]) {
          var data_target = data_api[j];
        }
      }
      for (let k = 0; k < roles.length; k++) {
        if (data["status"] == roles[k]["name"]) {
          var roles_id = roles[k]["_id"];
        }
      }
      data_target["role"] = roles_id;
      console.log("data end", data_target);
      await this.axios.put(
        process.env.VUE_APP_API + "/api/users/updatestatus",
        data_target
      );
      // .then((res) => {
      //   console.log(res);
      // });
      this.admin = [];
      this.host = [];
      this.users = [];
      this.citizen = [];
      this.alldata();
    },
    ///////////////////////////////////////////////////////////////////////
    editItem_admin(item) {
      this.editedIndex_admin = this.admin.indexOf(item);
      this.editedItem_admin = Object.assign({}, item);
      this.dialog_admin = true;
    },

    editItem_host(item) {
      this.editedIndex_host = this.host.indexOf(item);
      this.editedItem_host = Object.assign({}, item);
      this.dialog_host = true;
    },

    editItem_users(item) {
      this.editedIndex_users = this.users.indexOf(item);
      this.editedItem_users = Object.assign({}, item);
      this.dialog_users = true;
    },

    editItem_citizen(item) {
      this.editedIndex_citizen = this.citizen.indexOf(item);
      this.editedItem_citizen = Object.assign({}, item);
      this.dialog_citizen = true;
    },

    // deleteItem(item) {
    //   const index = this.admin.indexOf(item);
    //   confirm("Are you sure you want to delete this item?") &&
    //     this.admin.splice(index, 1);
    // },

    close_admin() {
      this.dialog_admin = false;
      this.$nextTick(() => {
        this.editedItem_admin = Object.assign({}, this.defaultItem);
        this.editedIndex_admin = -1;
      });
    },

    close_host() {
      this.dialog_host = false;
      this.$nextTick(() => {
        this.editedItem_host = Object.assign({}, this.defaultItem);
        this.editedIndex_host = -1;
      });
    },

    close_users() {
      this.dialog_users = false;
      this.$nextTick(() => {
        this.editedItem_users = Object.assign({}, this.defaultItem);
        this.editedIndex_users = -1;
      });
    },

    close_citizen() {
      this.dialog_citizen = false;
      this.$nextTick(() => {
        this.editedItem_citizen = Object.assign({}, this.defaultItem);
        this.editedIndex_citizen = -1;
      });
    },

    save_admin() {
      if (this.editedIndex_admin > -1) {
        Object.assign(
          this.admin[this.editedIndex_admin],
          this.editedItem_admin
        );
        this.update(this.admin[this.editedIndex_admin]);
      } else {
        this.admin.push(this.editedItem_admin);
      }
      this.close_admin();
    },

    save_host() {
      if (this.editedIndex_host > -1) {
        Object.assign(this.host[this.editedIndex_host], this.editedItem_host);
        this.update(this.host[this.editedIndex_host]);
      } else {
        this.user.push(this.editedItem_host);
      }
      this.close_host();
    },

    save_users() {
      if (this.editedIndex_users > -1) {
        Object.assign(
          this.users[this.editedIndex_users],
          this.editedItem_users
        );
        this.update(this.users[this.editedIndex_users]);
      } else {
        this.user.push(this.editedItem_users);
      }
      this.close_users();
    },

    save_citizen() {
      if (this.editedIndex_citizen > -1) {
        Object.assign(
          this.citizen[this.editedIndex_citizen],
          this.editedItem_citizen
        );
        this.update(this.citizen[this.editedIndex_citizen]);
      } else {
        this.citizen.push(this.editedItem_citizen);
      }
      this.close_citizen();
    },
    clear() {
      this.search = "";
    },
  },
};
</script>

<style>
.use-table th {
  background-color: #32cd32;
  font-size: 18px !important;
  color: #ffffff !important;
  font-family: "Sarabun", sans-serif;
  padding-right: 0% !important;
}

.table-name {
  font-size: 25px;
  color: #1e90ff;
  font-family: "Sarabun", sans-serif;
  padding-left: 5%;
}

/*========================================*/

@media only screen and (max-width: 600px) {
  /*css for mobile screen*/
  .tab-name {
    font-size: 13px;
  }

  .table-name {
    font-size: 26px !important;
    padding-left: 0%;
    padding-right: 0%;
  }
}
</style>