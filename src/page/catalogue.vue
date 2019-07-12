<template>
  <div id="app" v-wechat-title="title">
    <div class='catalogue_input_view'>
      <!--<input class='catalogue_input' v-model="seachValue"></input>-->
      <div class='catalogue_input' @click="goSeach">请您输入关键词…</div>
      <img class='catalogue_input_img' src='../assets/homeA002.png' @click="goSeach"></img>
    </div>
    <!-- catalogueA001.png -->
    <img class='catalogue_bgImgT' v-if="dataCon.name=='硬景品质部分'" src='../assets/catalogueA001.png'></img>
    <img class='catalogue_bgImgT' v-if="dataCon.name=='软景品质部分'" src='../assets/catalogueA002.png'></img>
    <img class='catalogue_bgImgT' v-if="dataCon.name=='软景标准化'" src='../assets/catalogueA002.png'></img>
    <img class='catalogue_bgImgT' src='../assets/catalogueA001.png' v-else></img>
    <div class='catalogue_List'>
      <div class='catalogue_List_content'>
        <div class='catalogue_List_Lin'></div>
        <div class='catalogue_List_name'>{{dataCon.name}}</div>
        <div class='catalogue_List_En one_text'>{{dataCon.ename}}</div>
      </div>
      <div class='catalogue_Item_view'>
        <div class='catalogue_Item '
             :class="{'catalogue_Item_active': index===Index,'catalogue_Item_le': (index+1)%3==0} "
             v-for="(item,index) in myData"
             @click="goDetails(index,item)">
          <div class='catalogue_Item_num ' :class="{'catalogue_Item_num_active': index===Index}" v-show="index>=9">
            {{index + 1}}
          </div>
          <div class='catalogue_Item_num ' v-show="index<9" :class="{'catalogue_Item_num_active': index===Index}">
            0{{index + 1}}
          </div>
          <div class='catalogue_Item_name catalogue_Item_nameT' v-if="dataCon.name=='软景标准化'">
            <span class="catalogue_Item_num_active">{{item.nameT}}</span>{{item.name}}
          </div>
          <div class='catalogue_Item_name ' v-else="dataCon.name!='软景标准化'">
            <span class="catalogue_Item_num_active">{{item.nameT}}</span>{{item.name}}
          </div>
          <img class='catalogue_Item-img' :src="item.backImage"></img>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
  export default {
    data() {
      return {
        dataCon: {},
        myData: [],
        Index: "",
        seachValue: "",
        title: ""
      }
    },
    computed: {},
    watch: {},
    methods: {

      getData() {
        let _this = this;
        var formData = new FormData();

        formData.append("id", _this.dataCon.id);

        let data = {
          data: formData
        };
        this.$server.secondNotice(data).then(data => {
          let dataArr = data.data;
          _this.myData = dataArr;
//          if (_this.dataCon.name == "软景标准化") {
          for (let i = 0; i < dataArr.length; i++) {
//            let len = dataArr[i].length;
            let myArr = dataArr[i].name.split("@");
            if (myArr.length == 1) {
              dataArr[i].nameT = "";
              dataArr[i].name = myArr[0];
            } else {
              dataArr[i].nameT = myArr[0];
              dataArr[i].name = myArr[1];
            }

          }
          _this.myData = dataArr;
//          console.log(dataArr)
//          }
        })
      },
      goDetails(index, data) {
        let _this = this;
        _this.Index = index;
        setTimeout(function () {
          localStorage.setItem("detailsLoc", JSON.stringify(data));
          localStorage.setItem("detailsIndexLoc", index);
          _this.$router.push({
            name: "details"
          })
        }, 200)
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
    },
    mounted() {

      let _this = this;
      _this.dataCon = JSON.parse(localStorage.getItem("catalogueLoc"));
      _this.title = _this.dataCon.name;

      _this.getData()

    }
  }
</script>
