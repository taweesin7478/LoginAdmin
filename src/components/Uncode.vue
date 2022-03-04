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
                <v-tab ripple @click="clear()">ถอดรหัส</v-tab>
                    <v-tab-item>
                        <v-flex lg12 xs12>
                            <v-layout wrap>
                                <v-flex lg6 class="d-flex">
                                    <v-card width="100%" height="140px" outlined>
                                        <v-toolbar color="white" dense flat>
                                            <span style="font-size: 16px;">ถอดรหัส</span>
                                            <v-spacer></v-spacer>
                                            <v-spacer></v-spacer>
                                        </v-toolbar>
                                        <v-divider></v-divider>
                                        <v-container>
                                            <v-row>
                                                <v-col cols="12" md="12">
                                                    <v-text-field
                                                        v-model="in_code"
                                                        label="Code"
                                                        required
                                                    ></v-text-field>
                                                </v-col>
                                            </v-row>
                                        </v-container>
                                    </v-card>
                                </v-flex>
                                <v-flex lg6 class="d-flex">
                                    <v-card width="100%" height="140px" outlined>
                                        <v-toolbar color="white" dense flat>
                                            <span style="font-size: 16px;">เข้ารหัส</span>
                                            <v-spacer></v-spacer>
                                            <v-spacer></v-spacer>
                                        </v-toolbar>
                                        <v-divider></v-divider>
                                        <v-container>
                                            <v-row>
                                                <v-col cols="12" md="12">
                                                    <v-text-field
                                                        v-model="in_text"
                                                        label="Text"
                                                        required
                                                    ></v-text-field>
                                                </v-col>
                                            </v-row>
                                        </v-container>
                                    </v-card>
                                </v-flex>
                            </v-layout>
                        </v-flex>
                        <v-flex lg12 xs12>
                            <v-layout wrap>
                                <v-flex lg12 class="d-flex">
                                    <v-card width="100%" height="50px" outlined>
                                        <v-toolbar color="white" dense flat>
                                            <v-spacer></v-spacer>
                                            <v-btn text elevation="2" medium v-on:click="Uncode()">
                                            ถอดรหัส
                                            </v-btn>
                                            <v-spacer></v-spacer>
                                        </v-toolbar>
                                    </v-card>
                                </v-flex>
                            </v-layout>
                        </v-flex>
                        <v-flex lg12 xs12>
                            <v-layout wrap>
                                <v-flex lg12 class="d-flex">
                                    <v-card width="100%" height="500" outlined>
                                    <v-virtual-scroll
                                        :items="code"
                                        height="500"
                                        item-height="40"
                                    >
                                        <template v-slot:default="{ item }">
                                        <v-list-item :key="item">
                                            <v-list-item-content>
                                            <v-list-item-title>
                                                {{ item }}
                                            </v-list-item-title>
                                            </v-list-item-content>
                                        </v-list-item>

                                        <v-divider></v-divider>
                                        </template>
                                    </v-virtual-scroll>
                                    </v-card>
                                </v-flex>
                            </v-layout>
                        </v-flex>
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
    in_code: "",
    in_text: "",
    count: 0,
    code: [],
  }),
  watch: {
  },
  created() {
  },
  methods: {
    async Uncode() {
        const headers_token = {
            Authorization: 'Bearer '+ this.$session.get('jwt')
        }
        var API_Data = await this.axios.post(
            process.env.VUE_APP_API + "/api/users/uncode",{
                text: this.in_code,
                code: this.in_text,
            },{
                headers: headers_token
            }
        );
        var data = API_Data.data.data
        for (let i = 0; i < data.length; i++) {
            if(i == 0 && data[i] != "" && data[i].code != "ERR_INVALID_ARG_VALUE"){
                this.code.push("ถอดรหัสที่ได้  =  "+data[i])
            }else if (i == 1 && data[i] != ""){
                this.code.push("เข้ารหัสที่ได้  =  "+data[i])
            }
        }
        this.in_code = ""
        this.in_text = ""
    }
  },
};
</script>