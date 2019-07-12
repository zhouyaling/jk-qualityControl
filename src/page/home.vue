<template>
  <div id="app" v-wechat-title="title">
    <div class='homeBanner'>
      <img class='homeBanner_image' src='../assets/homeA001.png'></img>
      <!--<input class='home_serch' v-model="seachValue" placeholder='请您输入关键词…'/>-->
      <div class='home_serchT' @click="goSeach">请您输入关键词…</div>
      <img class='home_serch_go' src='../assets/homeA002.png' @click="goSeach"></img>
    </div>
    <div class='homeList'>
      <div class='homeitem' v-for="(item,index) in myData " @click="goCatalogue(item)">
        <div class='homeitem_name one_text'>{{item.name}}</div>
        <div class='homeitem_En one_text'>{{item.ename}}</div>
        <img class='homeitem_img' :src="item.backImage"></img>
        <div class="homeitem_imgbg"></div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        myData: [],
        seachValue: "",
        title: '品控手册'
      }
    },
    computed: {},
    watch: {},
    methods: {
      getHomeList() {
        let _this = this;

        let data = {};
        this.$server.notice(data).then(data => {
          _this.myData = data.data
        })
      },
      goSeach() {
        let _this = this;
        this.$router.push({
          name: "seach",
          params: {
            seachValue: _this.seachValue
          }
        })

      },
      goCatalogue(data) {
        localStorage.setItem("catalogueLoc", JSON.stringify(data));
        if (data.type == '1') {
          this.$router.push({
            name: "catalogue"
          })
        }
        if (data.type == '2') {
          this.$router.push({
            name: "caseappreciation"
          })

        }
      }
    },
    mounted() {
      let _this = this;
      _this.getHomeList()

    }
  }
</script>
