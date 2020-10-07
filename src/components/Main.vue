<template>
  <v-app class="app">
    <div>
      <v-row class="top-bar">
        <v-app-bar :clipped-left="$vuetify.breakpoint.lgAndUp">
          <v-toolbar-title
            @click.stop="drawer = !drawer"
            class="web-name hidden-sm-and-down"
          >
            <!-- web -->
            <!-- <img width="120px" height="70px" style="margin-top:5px;" src="https://www.img.in.th/images/ff8d1d0be8793accdea55989cf4f3723.png" > -->
            <!--one style-->
            <img
              width="120px"
              height="60px"
              style="margin-top: 5px"
              src="https://www.inet.co.th/assets/img/newlogo.png"
            />
            <!--inet style-->
            <!-- <img src="https://www.img.in.th/images/02af060bc8df3d82297092e19f0ad406.png" height="70px"> -->
          </v-toolbar-title>
          <v-toolbar-title
            @click.stop="drawer = !drawer"
            class="web-name hidden-md-and-up"
          >
            <!-- <img width="75px" height="50px" style="margin-top:5px;" src="https://www.img.in.th/images/ff8d1d0be8793accdea55989cf4f3723.png" > -->
            <!--one style-->
            <img
              width="120px"
              height="60px"
              style="margin-top: 5px"
              src="https://www.inet.co.th/assets/img/newlogo.png"
            />
            <!--inet style-->
          </v-toolbar-title>
          <!-- mobile -->
          <div class="flex-grow-1"></div>
          <div class="pr-5"></div>

          <v-divider class="mx-2" vertical></v-divider>
          <div style="margin-left: auto; width: 20%">
            <v-menu offset-y>
              <template v-slot:activator="{ on }">
                <v-card v-on="on" flat>
                  <v-list-item>
                    <v-list-item-avatar size="26px">
                      <v-icon large>mdi mdi-account-circle</v-icon>
                    </v-list-item-avatar>

                    <v-list-item-content class="hidden-sm-and-down">
                      <v-list-item-title class="font-size-14">{{
                        account_name
                      }}</v-list-item-title>
                    </v-list-item-content>

                    <v-list-item-icon>
                      <v-icon>mdi-menu-down</v-icon>
                    </v-list-item-icon>
                  </v-list-item>
                </v-card>
              </template>
              <v-list class="menu-dropdown">
                <v-list-item v-on:click="logout()">
                  <v-list-item-title class="logout"
                    >ออกจากระบบ</v-list-item-title
                  >
                </v-list-item>
              </v-list>
            </v-menu>
          </div>
        </v-app-bar>
      </v-row>

      <v-navigation-drawer
        v-model="drawer"
        :clipped="$vuetify.breakpoint.lgAndUp"
        app
        style="z-index: 17"
      >
        <v-list class="left-bar pt-16 mt-2" dense nav>
          <template v-for="menuLeft in menusLeft">
            <v-row
              v-if="menuLeft.heading"
              :key="menuLeft.heading"
              align="center"
            ></v-row>
            <v-list-group
              v-else-if="menuLeft.children"
              :key="menuLeft.title"
              v-model="menuLeft.model"
              :prepend-icon="
                menuLeft.model ? menuLeft.icon : menuLeft['icon-alt']
              "
              append-icon
            >
              <template v-slot:activator>
                <v-list-item-content>
                  <v-list-item-title class="side-menu">{{
                    menuLeft.title
                  }}</v-list-item-title>
                </v-list-item-content>
              </template>
              <v-list-item
                v-for="child in menuLeft.children"
                :key="child.title"
                :to="child.path"
                :class="colorClass"
                link
              >
                <v-list-item-action v-if="child.icon">
                  <v-icon>{{ child.icon }}</v-icon>
                </v-list-item-action>
                <v-list-item-content>
                  <v-list-item-title class="side-menu">{{
                    child.title
                  }}</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list-group>
            <v-list-item
              v-else
              :v-if="menuLeft.show"
              :key="menuLeft.title"
              :to="menuLeft.path"
              class="menu-block menu-green"
              link
            >
              <v-list-item-action>
                <v-icon>{{ menuLeft.icon }}</v-icon>
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title class="side-menu">{{
                  menuLeft.title
                }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </template>
        </v-list>
      </v-navigation-drawer>

      <v-content style="background: #f5f5f5">
        <v-container fluid class="content">
          <router-view />
        </v-container>
      </v-content>
    </div>
  </v-app>
</template>

<script>
export default {
  data: () => ({
    account_name: "",
    item: 4,
    logoUrl:
      "https://media.datacenterdynamics.com/media/images/Inet-thailand.2e16d0ba.fill-1200x630.jpg",
    dialog: false,
    drawer: null,
    menusLeft: [
      {
        icon: "mdi-account-multiple",
        title: "จัดการบัญชีผู้ใช้",
        path: "/User",
        show: true,
      },
      {
        icon: "mdi-file-document",
        title: "ความคิดเห็นผู้ใช้งาน",
        path: "/Feedback",
        show: true,
      },
    ],
  }),
  mounted() {
    if (!this.$session.get("id") || !this.$session.get("user")) {
      this.$router.push({ path: "/login" });
    }
    var data = this.$session.get("data");
    this.account_name = data["user"];
  },
  methods: {
    logout() {
      localStorage.clear();
      sessionStorage.clear();
      this.$session.clear();
      this.$router.push({ path: "/login" });
    },
  },
};
</script>

<style>
@import url("https://fonts.googleapis.com/css?family=Sarabun&display=swap");

.app-plain {
  overflow: hidden;
  width: 100%;
}

.web-name {
  margin-left: 1%;
}

.business-title {
  font-family: "Sarabun", sans-serif;
  font-size: 16px;
  color: black !important;
  margin-top: 0%;
}

.business-box {
  margin-top: 0% !important;
  width: 230px;
}

.v-select.v-text-field--outlined.business-box-inside:not(.v-text-field--single-line)
  .v-select__selections {
  padding-left: 3% !important;
}

.v-text-field.v-text-field--enclosed.icon-select .v-input__append-inner {
  margin-top: 7px !important;
}

.top-bar {
  position: fixed;
  top: 0;
  left: 0;
  width: 100% !important;
  height: 64px;
  z-index: 18;
  width: 100%;
  margin-left: 0%;
}

.sub-bar {
  width: 100% !important;
  margin-top: 64px;
}

.left-bar {
  position: relative;
  top: 68px;
  left: 0;
  z-index: 17;
}

.content {
  margin-top: 65px;
  /* position: fixed; */
  /* top: 100px; */
  /* overflow: auto; */
  width: 100%;
  height: calc(100vh);
  padding-left: 1%;
}

.username-block {
  font-family: "Sarabun", sans-serif;
  font-size: 18px;
}

.account-icon {
  color: gray;
  margin-right: 5%;
  font-size: 35px;
}

.menu-dropdown :hover {
  background-color: #f5f5f5;
}

.logout {
  font-family: "Sarabun", sans-serif;
  font-size: 16px;
}

.logout-icon {
  color: grey;
  margin-right: 5%;
  font-size: 25px;
}

.menu-block:hover {
  background-color: #53ba47;
}

.v-list-item--active.menu-green {
  background-color: #53ba47;
  color: white;
}
.side-menu {
  font-family: "Sarabun", sans-serif;
  font-size: 18px !important;
  line-height: 27px !important;
  top: 50px !important;
}

.side-menu:hover {
  color: white;
}

/*========================================*/

@media only screen and (max-width: 600px) {
  /*css for mobile screen*/
  .toolbar-mobile {
    padding-right: 0% !important;
    padding-left: 2%;
  }

  .v-toolbar__content,
  .v-toolbar__extension.toolbar-mobile {
    padding-left: 0% !important;
  }

  .business-box {
    width: 200px;
  }

  .v-toolbar__content,
  .v-toolbar__extension.toolbar-mobile {
    padding-right: 0% !important;
  }

  .web-name {
    margin-left: 0%;
  }

  .hidden-sm-and-down {
    display: none !important;
  }

  .username-block {
    padding-left: 0% !important;
    padding-right: 0% !important;
  }

  .menu-dropdown {
    width: 154px;
  }

  .content {
    padding-right: 0%;
  }
}

/*==========================================*/

@media only screen and (min-width: 960px) {
  /*css for pc screen*/
  .hidden-md-and-up {
    display: none !important;
  }
}
</style>