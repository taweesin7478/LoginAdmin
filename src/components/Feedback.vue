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
                ความคิดเห็นผู้ใช้งาน
                <v-spacer></v-spacer>
              </v-card-title>

              <v-divider></v-divider>
              <v-container class="feedbackContainer">
                <div>
                  <v-row class="justify-content-center">
                    <v-spacer></v-spacer>
                    <v-col cols="5" class="box">
                      <div>
                        <v-card
                          border-variant="success"
                          header="Rating"
                          class="text-center"
                        >
                          Rating
                          <v-divider></v-divider>
                          <v-card-text
                            ><h1>{{ rating }}</h1></v-card-text
                          >
                          <v-rating
                            v-model="rating"
                            dense
                            half-increments
                            hover
                            size="28"
                            readonly
                          ></v-rating>
                          <div style="padding-top: 20px">
                            <v-icon>mdi-message-text</v-icon>
                            <span class="subheading mr-2"
                              >Comment : {{ comment.length }}</span
                            >
                          </div>
                        </v-card>
                      </div>
                    </v-col>
                    <v-spacer></v-spacer>
                    <v-col cols="5">
                      <div id="chart">
                        <apexchart
                          type="pie"
                          width="380"
                          :options="chartOptions"
                          :series="allStar"
                        ></apexchart>
                      </div>
                    </v-col>
                    <v-spacer></v-spacer>
                  </v-row>
                </div>
                <div>
                  <div
                    class="DialogComment"
                    v-for="item in items"
                    :key="item.id"
                  >
                    <v-row>
                      <v-col cols="3" class="star">
                        <v-card style="height: 180px">
                          <h1 class="text-center">{{ item.score }}</h1>
                          <v-rating
                            v-model="item.score"
                            background-color="indigo lighten-3"
                            color="indigo"
                            readonly
                          ></v-rating>
                          <p class="text-center">
                            Date : {{ item.created_at }}
                          </p>
                        </v-card>
                      </v-col>
                      <v-col cols="9" class="comment">
                        <v-card style="height: 180px">
                          <v-row>
                            <v-col>
                              <div class="overline">Room : {{ item.room }}</div>
                            </v-col>
                            <!-- <v-col>
                              <div class="overline">
                                Own Room : {{ item.ownroom }}
                              </div>
                            </v-col> -->
                          </v-row>
                          <v-card-text>{{ item.message }}</v-card-text>
                        </v-card>
                      </v-col>
                    </v-row>
                  </div>
                </div>
                <v-container text-center>
                  <div class="overline">
                    Page {{ page }} of {{ numberOfPages }}
                  </div>
                  <v-btn
                    fab
                    dark
                    color="success"
                    class="mr-3"
                    @click="formerPage"
                  >
                    <v-icon>mdi-chevron-left</v-icon>
                  </v-btn>
                  <v-btn
                    fab
                    dark
                    color="success"
                    class="ml-3"
                    @click="nextPage"
                  >
                    <v-icon>mdi-chevron-right</v-icon>
                  </v-btn>
                </v-container>
              </v-container>
              <v-divider></v-divider>
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
  name: "Feedback",
  created() {
    this.onestar();
    this.twostar();
    this.threestar();
    this.fourstar();
    this.fivestar();
    this.getRating();
    this.getComment();
    this.getData();
  },
  components: {
    apexchart: VueApexCharts,
  },
  data() {
    return {
      items: [],
      items_page: [],
      page: 1,
      page_length: 1,
      power1: 0,
      power2: 0,
      power3: 0,
      power4: 0,
      power5: 0,
      star1: [],
      star2: [],
      star3: [],
      star4: [],
      star5: [],
      rating: 0,
      comment: 0,
      allStar: [],
      chartOptions: {
        chart: {
          width: 380,
          type: "pie",
        },
        labels: ["5 ดาว", "4 ดาว", "3 ดาว", "2 ดาว", "1 ดาว"],
        responsive: [
          {
            breakpoint: 480,
            options: {
              chart: {
                width: 200,
              },
              legend: {
                position: "bottom",
              },
            },
          },
        ],
      },
    };
  },
  computed: {
    numberOfPages() {
      return Math.ceil(this.page_length);
    },
  },
  methods: {
    async getData() {
      try {
        var { data } = await this.axios.get(
          process.env.VUE_APP_API + "/api/feedback/data"
        );
        // this.items = data.data
        // this.items_page = data.data
        this.items = data.data;
        for (let i = 0; i < this.items.length; i++) {
          if (this.items[i].score === -1) {
            this.items[i].score = 0;
          }
          if (this.items[i].message === "") {
            this.items[i].message = "ไม่มีการแสดงความคิดเห็น";
          }
          if (this.items[i].room === "") {
            this.items[i].message = "ไม่มีชื่อห้อง";
          }
        }
        this.items_page = data.data;
      } catch (error) {
        (error.message);
      }
      this.getPage();
    },
    async onestar() {
      try {
        var { data } = await this.axios.post(
          process.env.VUE_APP_API + "/api/feedback/OneScore"
        );

        if (data.data !== "NoData") {
          this.star1 = data.data.length;
        } else {
          this.star1 = 0;
        }
      } catch (error) {
        (error.message);
      }
    },
    async twostar() {
      try {
        var { data } = await this.axios.post(
          process.env.VUE_APP_API + "/api/feedback/TwoScore"
        );

        this.star2 = data.data;
        if (data.data !== "NoData") {
          this.star2 = data.data.length;
        } else {
          this.star2 = 0;
        }
      } catch (error) {
        (error.message);
      }
    },
    async threestar() {
      try {
        var { data } = await this.axios.post(
          process.env.VUE_APP_API + "/api/feedback/ThreeScore"
        );

        if (data.data !== "NoData") {
          this.star3 = data.data.length;
        } else {
          this.star3 = 0;
        }
      } catch (error) {
        (error.message);
      }
    },
    async fourstar() {
      try {
        var { data } = await this.axios.post(
          process.env.VUE_APP_API + "/api/feedback/FourScore"
        );

        if (data.data !== "NoData") {
          this.star4 = data.data.length;
        } else {
          this.star4 = 0;
        }
      } catch (error) {
        (error.message);
      }
    },
    async fivestar() {
      try {
        var { data } = await this.axios.post(
          process.env.VUE_APP_API + "/api/feedback/FiveScore"
        );

        if (data.data !== "NoData") {
          this.star5 = data.data.length;
        } else {
          this.star5 = 0;
        }
        this.total();
      } catch (error) {
        (error.message);
      }
    },
    getRating() {
      this.axios
        .post(process.env.VUE_APP_API + "/api/feedback/Rating")
        .then((response) => {
          var average = response.data.average;
          this.rating = average;
        });
    },
    async getComment() {
      try {
        var { data } = await this.axios.get(
          process.env.VUE_APP_API + "/api/feedback/data"
        );

        this.comment = data.data;
      } catch (error) {
        (error.message);
      }
    },
    total() {
      this.allStar.push(
        this.star5,
        this.star4,
        this.star3,
        this.star2,
        this.star1
      );
    },
    getDataPage() {
      var item = [];
      var numberAdd = this.page * 5;
      for (let i = 0; i < numberAdd; i++) {
        if (this.items_page[i] !== undefined) {
          item.push(this.items_page[i]);
        }
      }
      if (this.page !== 1) {
        var numberDelete = (this.page - 1) * 5;
        for (let i = 0; i < numberDelete; i++) {
          item.shift(this.items_page[i]);
        }
      }
      this.items = item;
    },
    nextPage() {
      if (this.page + 1 <= this.numberOfPages) this.page += 1;
      this.getDataPage();
    },
    formerPage() {
      if (this.page - 1 >= 1) this.page -= 1;
      this.getDataPage();
    },
  },
};
</script>

<style scoped>
.feedbackContainer {
  border-bottom: 1px solid #e4e1e1;
  background-color: white;
}
.box {
  margin: 0 30px 0 0;
  padding: 40px 0 0 0;
}
.DialogComment {
  display: flex;
  margin: 0 0 0 0;
}
.comment {
  width: 100px;
  height: 200px;
}
/* .num {
  padding: 20px 0 0 60px;
} */
/* .col {
  padding: 12px 0 0 0;
} */
</style>
