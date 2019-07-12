<template>
  <div id="app" v-wechat-title="title">
    <!--<img class='catalogue_bgImgTT' v-if="dataConT" src='../assets/detalisa.png'></img>-->
    <!--<div class="catalogue_bgcolor"></div>-->
    <div class="catalogue_List_div">
      <div class='catalogue_List'>
        <div class="catalogue_List_item" v-for="(item,index) in myData">
          <div class='catalogue_List_content'>
            <div class='catalogue_List_Lin'></div>
            <div class='catalogue_List_name'>{{item.text | newName}}</div>
            <div class='catalogue_List_En'>{{dataCon.ename}}</div>
          </div>
          <div class="details_Item" v-for="(items,indexs) in item.children">
            <div class="details_Item_title" :id="forId(index,indexs)">{{Index + 1}}.{{indexs + 1}}{{items.text}}</div>
            <div class="details_Item_title_html" v-html="items.content"></div>
          </div>
        </div>
      </div>
      <img class="details_mulu" src="../assets/mulu.png" @click="goMulu"/>
      <img class="details_seach" src="../assets/seach.png" @click="goSeach"/>
      <div class="popu_div" v-show="!isShow"></div>
      <img src="../assets/popubg.png" class="popu_img_div" v-show="!isShow"/>
      <img src="../assets/popubtn.png" class="popu_btn_div" v-show="!isShow" @click="popuDoen"/>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        dataCon: {},
        myData: [],
        isShow: "",
        seachValue: "",
        dataConT: {},
        title: "",
        Index: 1
      }
    },
    computed: {},
    watch: {},
    filters: {
      newName(name) {
//        console.log(name)

        return name.replace(/@/, "")
      },
    },
    methods: {
      getData(id) {
        let _this = this;
        var formData = new FormData();
        formData.append("id", id);
        let data = {
          data: formData
        };
        this.$server.detailsNotice(data).then(data => {
          _this.myData = data.data;
          let detailsHref = "#forid_" + localStorage.getItem("detailsHrefLoc");
//          console.log(detailsHref);
          setTimeout(function () {
            let _id = document.getElementById(detailsHref);
            window.scrollTo(0, _id.offsetTop);
            localStorage.setItem("detailsHrefLoc", "");
          }, 300)

        })
      },
      popuDoen() {
        localStorage.setItem("detailsIsShow", "true");
        this.isShow = true
      },
      goMulu() {
        this.$router.push({
          name: "subdirectory"
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
      forId(index, indexs) {
        return "#forid_" + (index + 1) + "." + (indexs + 1)
      }
    },
    mounted() {
      let _this = this;
      _this.dataCon = JSON.parse(localStorage.getItem("detailsLoc"));
      _this.dataConT = JSON.parse(localStorage.getItem("catalogueLoc"));
      _this.Index = parseInt(localStorage.getItem("detailsIndexLoc"));
      _this.title = _this.dataCon.name;
      _this.isShow = localStorage.getItem("detailsIsShow");
      _this.getData(_this.dataCon.id)
    }
  }
</script>
