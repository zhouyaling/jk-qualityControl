<template>
  <div id="app" v-wechat-title="title">
    <img class='catalogue_bgImg' src='../assets/subdirectoryA001.png'></img>
    <div class='catalogue_List'>
      <div class='catalogue_List_content'>
        <div class='catalogue_List_Lin'></div>
        <div class='catalogue_List_name'>{{dataConT.name}}</div>
        <div class='catalogue_List_En'>{{dataConT.ename}}</div>
      </div>
      <div class='catalogue_item_div'></div>
    </div>
    <div class='subdirectory_List'>
      <div class='subdirectory_Item' v-for="(item,index) in myData" @click="goDetails(item,index,0)">
        <div class='subdirectory_Item_title' v-if="index<9">0{{index + 1}}{{item.text | newName}}</div>
        <div class='subdirectory_Item_title' v-if="index>=9">{{index + 1}}{{item.text | newName}}</div>
        <div class='subdirectory_Item_div ' @click.stop="goDetails(item,index,indexs)"
             v-for="(items,indexs) in item.children">
          <div class='subdirectory_Item_div_num'>{{index + 1}}.{{indexs + 1}}</div>
          <div class='subdirectory_Item_div_line one_text'></div>
          <div class='subdirectory_Item_div_name'>{{items.text}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        myData: [],
        myDataT: [],
        myDataTT: [],
        dataCon: {},
        title: "",
        dataConT: {},
        myNum: 0
      }
    },
    filters: {
      capture(text) {
        let myText = text.split(" ");
        console.log(myText[1]);
        let textStr = '';
        for (let i = 0; i < myText.length; i++) {
          if (i > 0) {
            textStr += myText[i]
          }
        }
        return textStr
      },
      newName(name) {
//        console.log(name)

        return name.replace(/@/, "")
      },
    },
    computed: {},
    watch: {},
    methods: {
      getData(id) {
        let _this = this;
        var formData = new FormData();

        formData.append("id", id);

        let data = {
          data: formData
        };
        this.$server.detailsNotice(data).then(data => {
          let myArr = _this.myDataTT;
          for (let i = 0; i < _this.myDataT.length; i++) {
            if (_this.myDataT[i].name == data.data[0].text) {
              _this.myNum = _this.myNum + 1
              myArr[i] = data.data[0];
            }
          }
          _this.myDataTT = myArr;
          if (_this.myNum == _this.myDataT.length) {
            _this.myData = _this.myDataTT;
          }

        })
      },
      getDataT() {
        let _this = this;
        var formData = new FormData();

        formData.append("id", _this.dataConT.id);

        let data = {
          data: formData
        };
        this.$server.secondNotice(data).then(data => {
          let dataArr = data.data;
          _this.myDataT = dataArr;
          for (let i = 0; i < dataArr.length; i++) {
            _this.getData(dataArr[i].id)
          }
        })
      },
      goDetails(data, index, indexs) {
        let _this = this;
        let href = 1 + "." + (indexs + 1);
        localStorage.setItem("detailsLoc", JSON.stringify(data));
        localStorage.setItem("detailsIndexLoc", index);
        localStorage.setItem("detailsHrefLoc", href);

        _this.$router.push({
          name: "details"
        })
      },
    },
    mounted() {
      let _this = this;
      _this.dataCon = JSON.parse(localStorage.getItem("detailsLoc"));
      _this.dataConT = JSON.parse(localStorage.getItem("catalogueLoc"));
      _this.getDataT();
      _this.title = _this.dataConT.name;
//      _this.getData(_this.dataCon.id)
    }
  }
</script>
