<template>
  <div id="app" v-wechat-title="title">
    <div class='seach_view'>
      <input class='seach_input' id="seach_input" v-model="vale" placeholder="请您输入关键词..."></input>
      <img class='seach_image' v-show="vale" @click="seachNO" src='../assets/seachA002.png'></img>
      <div class='seach_back' @click="Back">取消</div>
    </div>
    <div v-show="isInfo">
      <div class='seach_NoImg_view' v-show="isShow">
        <img class='seach_NoImg' src='../assets/seachA001.png'></img>
        <div class='seach_Notext'>暂无相关内容</div>
      </div>
      <div class='seach_content' v-show="!isShow">
        <div class='seach_content_num'>共{{data.length}}条</div>
        <div class='seach_List'>
          <div class="seach_Item" v-for="(item,index) in data" @click="goDetais(item.pid)">
            <div class="seach_List three_text" v-html="item.contentT">
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        vale: "",
        data: [],
        html: '',
        isShow: true,
        isInfo: false,
        title: "搜索"
      }
    },
    computed: {},
    watch: {
      vale: function (a, b) {
        this.getHomeList(a)
      }
    },
    methods: {
      keywordscolorful(str, key) {
        let _this = this;

        var reg = new RegExp("(" + key + ")", "g");
        let mystr = _this.getHtml(str);
        let index = mystr.indexOf(key);
        let result = mystr.substr(index, mystr.length);
        let newstr = result.replace(reg, "<span class='catalogue_Item_num_active' >$1</span>");
        return newstr;
      },
      getHomeList(info) {
        let _this = this;
        var formData = new FormData();

        if (!info) {
          _this.isInfo = false
          return
        }
        if (info.replace(/(^\s*)|(\s*$)/g, "").length == 0) {
          _this.isInfo = false
        }
        formData.append("info", info.replace(/(^\s*)|(\s*$)/g, ""));
        let data = {
          data: formData
        };
        this.$server.searchNotice(data).then(data => {
          var data = data.data.list;
//          var data = [
//            {
//              "pid": 1558082635179766,
//              "content": "<p>睡</p>"
//            }
//          ]
          if (info) {
            _this.isInfo = true
          } else {
            _this.isInfo = false
          }
          if (data.length > 0) {
            _this.isShow = false;

          } else {
            _this.isShow = true;
            return
          }

          for (let i = 0; i < data.length; i++) {
            data[i].contentT = _this.keywordscolorful(data[i].content, _this.vale.replace(/(^\s*)|(\s*$)/g, ""))
          }
          _this.data = data;
          // console.log(data)

        })
      },
      goDetais(id) {
        let _this = this;
        let data = {
          id: id
        };
        localStorage.setItem("detailsLoc", JSON.stringify(data));
        _this.$router.push({
          name: "details"
        })
      },
      Back() {
        this.$router.go(-1);
      },
      seachNO() {
        let _this = this;
        _this.vale = ""
      },
      getHtml(html) {
        var text = html.replace(/<[^<>]+>/g, "");
        // console.log(text);
        return text
      }
    },
    mounted() {
      let _this = this;
      _this.vale = this.$route.params.seachValue;
      document.getElementById('seach_input').focus();
    }
  }
</script>
