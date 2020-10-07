<template>
  <v-container id="contrain">
    <div class="loading-login-block" v-if="notReady"></div>
    <div class="lds-roller loading-login" v-if="notReady">
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
    <div v-if="notReady" class="waiting-login">
      <span>กำลังเข้าสู่ระบบ...</span>
    </div>
    <v-row justify="center">
      <v-col md="5" lg="5" sm="11" cols="11">
        <v-card elevation="8">
          <v-card-title class="card-login-title">
            <img
              width="100px"
              src="https://www.inet.co.th/assets/img/newlogo.png"
            />
          </v-card-title>
          <v-card-text>
            <v-row align="center">
              <v-col cols="12" class="pa-3">
                <v-row align="center" justify="center">
                  <v-col cols="11" align="center" class="row_h">
                    <img
                      width="200px"
                      src="https://meet.one.th/img/logoOne.a05f4e64.png"
                    />
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="11" align="center" justify="center">
                    <h1 class="login-title">SIGN IN ADMIN</h1>
                    <h4 class="login-title_2">By One platform</h4>
                  </v-col>
                </v-row>
                <v-form>
                  <v-row align="center" justify="center">
                    <v-col cols="11" class="row_login">
                      <v-text-field
                        prepend-inner-icon="mdi-account"
                        type="text"
                        v-model="username"
                        :rules="[rules.required]"
                        placeholder="ชื่อผู้ใช้ "
                        color="#0364be"
                        :error-messages="userError"
                      ></v-text-field>
                      <v-text-field
                        :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                        :error-messages="passError"
                        v-model="password"
                        prepend-inner-icon="mdi-lock"
                        :rules="[rules.required]"
                        :type="show1 ? 'text' : 'password'"
                        @click:append="show1 = !show1"
                        placeholder="รหัสผ่าน"
                        v-on:keyup.enter="getLoader"
                        color="#0364be"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                  <br />
                  <v-alert
                    v-if="alertType == 'error'"
                    dense
                    color="#ff5252"
                    dark
                    transition="fade-transition"
                  >
                    <span class="mdi mdi-alert"></span>
                    <span class="ml-2" style="font-size: 14px">{{
                      alertMsg
                    }}</span>
                  </v-alert>
                  <v-row align="center" justify="center">
                    <v-col cols="11" class="row_btn">
                      <v-btn
                        color="#0364be"
                        width="50%"
                        class
                        dark
                        v-on:click="getLoader()"
                        depressed
                        >เข้าสู่ระบบ</v-btn
                      >
                    </v-col>
                  </v-row>
                  <!-- <v-row align="center" justify="center">
              <v-col cols="11" class="row_btn">
                <v-btn color="#b2de49" width="50%" class="btn-login" dark><b>ลงทะเบียนใช้งาน</b></v-btn>
              </v-col>
                  </v-row>-->
                </v-form>

                <v-dialog v-model="authenDialog" max-width="290" persistent>
                  <v-card style="border-radius: 0px">
                    <v-layout wrap justify-center>
                      <v-flex xs12>
                        <v-layout
                          wrap
                          justify-center
                          align-center
                          style="padding-top: 24px"
                        >
                          <v-icon x-large>account_circle</v-icon>
                        </v-layout>
                      </v-flex>
                      <v-flex xs12>
                        <v-card-text class="text-center" style="font-size: 15px"
                          >กรุณายืนยันตัวตนก่อนเข้าใช้งาน</v-card-text
                        >
                      </v-flex>
                    </v-layout>
                    <v-card-actions>
                      <v-layout wrap justify-center>
                        <v-flex xs12 class="pl-1">
                          <v-btn
                            color="#67c25d"
                            depressed
                            class="ml-0"
                            @click="routeOneth()"
                            dark
                            block
                            >ตกลง</v-btn
                          >
                        </v-flex>
                      </v-layout>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      show1: false, // show1 คือ เปิดปิดการมองเห็น password
      defaultSleep: false,
      notReady: false,
      userError: [],
      passError: [],
      username: "",
      password: "",
      rules: {
        required: (value) => !!value || "กรุณาระบุข้อมูล", // แสดงตัวแดงเมื่อ username และ password เป็นช่องว่าง
      },
    };
  },
  methods: {
    getLoader() {
      // POPUP แถบแดง เมื่อไม่ใส่ข้อมูล
      if (this.username.length <= 0) {
        this.userError = "กรุณาระบุ USER";
      } else {
        this.userError = [];
      }

      if (this.password.length <= 0) {
        this.passError = "กรุณาระบุ Password";
      } else {
        this.passError = [];
      }

      if (this.username.length > 0 && this.password.length > 0) {
        this.loading = true;
        this.defaultSleep = true;
      } else {
        this.alertType = "error";
        this.alertMsg = "กรุณาระบุข้อมูลให้ถูกต้อง";
      }
    },
    startLogin() {
      this.loginCitizen(this.username, this.password);
    },
    loginCitizen(username, password) {
      this.notReady = true;
      this.axios
        .post(process.env.VUE_APP_API + "/api/admin/login", {
          user: username,
          password: password,
        })
        .then((response) => {
          var status = response.data.status;
          var data_login = response.data.data;
          ///////////////////////////////////////////////////////////////////////
          if (status === "OK") {
            this.$router.push({ path: "/User" });
            this.sessionData(data_login);
          }
          ///////////////////////////////////////////////////////////////////////
          else if (status == "Fail") {
            console.log("START ERROR");
            this.notReady = false;
            this.loading = false;
            this.alertType = "error";
            this.alertMsg = "ชื่อผู้ใช้งาน หรือรหัสผ่าน ไม่ตรงกับในระบบ";
          } else {
            this.notReady = false;
            this.loading = false;
            this.alertType = "error";
            this.alertMsg = "Connection Error";
          }
        })
        .catch(() => {
          this.notReady = false;
          this.loading = false;
          this.alertType = "error";
          this.alertType = "error";
          this.alertMsg = "ชื่อผู้ใช้งาน หรือรหัสผ่าน ไม่ตรงกับในระบบ";
        });
    },
    sessionData(data) {
      this.$session.set("id", data["_id"]);
      this.$session.set("user", data["user"]);
      this.$session.set("data", data);
    },
  },
  watch: {
    defaultSleep(val) {
      if (!val) return;
      setTimeout(() => ((this.defaultSleep = false), this.startLogin()), 200);
    },
  },
};
</script>

<style>
.card-login-title {
  background-color: #4bb6fd;
  padding-top: 2%;
  padding-left: 2%;
}

.row_h {
  text-align: center;
  /* background-color: green; */
  font-family: "Sarabun", sans-serif;
  font-size: 20px;
  color: white;
  /* border-radius:50px; */
  padding: 0%;
}

.login-title {
  font-family: "Sarabun", sans-serif;
  margin-left: 4%;
  color: #0364be;
}

.login-title_2 {
  font-family: "Sarabun", sans-serif;
  margin-left: 4%;
  color: #99a6b3;
}

.row_login {
  background-color: white;
  text-align: center;
}
.row_btn {
  background-color: white;
  text-align: center;
}

.btn-login {
  font-family: "Sarabun", sans-serif;
  color: #2e7d32 !important;
}

#contrain {
  /* width: 30%;
  height: 30%; */
  /* background-color:palegreen; */
  /* align-content: left; */
  margin-top: 5%;
  /* margin-bottom: 10%; */
}
.card {
  background-color: white;
  border-radius: 20px;
  box-shadow: 10px 10px 5px grey;
}

.register-link-block {
  padding-left: 8%;
}

.alert-error {
  font-family: "Sarabun", sans-serif !important;
  color: #f44336 !important;
}

.swal2-icon.swal2-warning {
  color: #f44336 !important;
  border-color: #f44336 !important;
}

.loading-login-block {
  position: fixed;
  top: 0px;
  left: 0px;
  /* top:25%; 
  left:45%;  */
  width: 100%;
  height: 100%;
  z-index: 15;
  background-color: gray;
  opacity: 0.3;
}

.loading-login {
  position: fixed;
  top: 31%;
  left: 48%;
  z-index: 16;
}

.waiting-login {
  font-family: "Sarabun", sans-serif;
  font-size: 16px;
  position: fixed;
  top: 40%;
  left: 47%;
  z-index: 16;
  color: green;
}

/*========================================*/

@media only screen and (max-width: 600px) {
  /*css for mobile screen*/
  .loading-login {
    left: 42%;
  }

  .waiting-login {
    left: 37%;
  }
}
</style>