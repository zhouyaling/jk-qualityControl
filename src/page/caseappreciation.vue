<template>
  <div id="app" v-wechat-title="title">
    <img class='caseappreciation_bgImg' src='../assets/caseAppreciationA001.png'></img>
    <div class='catalogue_List'>
      <div class='catalogue_List_content'>
        <div class='catalogue_List_Lin'></div>
        <div class='catalogue_List_name'>案例欣赏</div>
        <div class='catalogue_List_En'>CASE APPRECIATION</div>
      </div>
      <div class='catalogue_item_view'></div>
    </div>
    <div class='caseAppreciation_list'>
      <div class='caseAppreciation_Item' v-for="(item,index) in myData" @click="goPictureview(item)">
        <img class='caseAppreciation_image' :src="item.imgurl"></img>
        <div class='caseAppreciation_name'>{{item.name}}</div>
        <div class='caseAppreciation_num'>{{item.count}}张</div>
        <div class="caseAppreciation_div"></div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        myData: [],
        title: '案例欣赏',
      }
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
        this.$server.caseNotice(data).then(data => {
          _this.myData = data.data
        })
      },
      goPictureview(item) {
        localStorage.setItem("pictureviewLoc", JSON.stringify(item))
        this.$router.push({
          name: "pictureview"
        })
      }
    },
    mounted() {
      let data = JSON.parse(localStorage.getItem("catalogueLoc"));
      this.getData(data.id)
    }
  }
</script>
