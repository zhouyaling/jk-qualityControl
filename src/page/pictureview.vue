<template>
  <div id="picView" v-wechat-title="title">
    <div class="swiper-container">
      <div class="swiper-wrapper">
        <div class="swiper-slide" v-for="(item,index) in urls">
          <img :src="item.imgurl" @click="amplifier(item.imgurl)"/>
        </div>
      </div>
      <div class="swiper-scrollbar"></div>
    </div>
    <div class="picView_num"><span>{{urlNum}}</span>/{{urls.length}}</div>
    <big-img v-if="showImg" style="z-index: 10000" @clickit="viewImg" :imgSrc="imgSrc"></big-img>
  </div>
</template>

<script>
  import Swiper from 'swiper';
  import 'swiper/dist/css/swiper.min.css';
  import BigImg from './BigImg.vue';

  export default {
    data() {
      return {
        urls: [],
        urlNum: 1,
        showImg: false,
        imgSrc: '',
        title: ""
      }
    },
    components: {
      'big-img': BigImg
    },
    computed: {},
    watch: {},
    methods: {
      amplifier: function (url) {
        this.showImg = true;
        // 获取当前图片地址
        this.imgSrc = url
      },
      viewImg() {
        this.showImg = false;
      },
      getData(id) {
        let _this = this;
        var formData = new FormData();
        formData.append("id", id);
        let data = {
          data: formData
        };
        this.$server.imagesNotice(data).then(data => {
          _this.urls = data.data
        })
      },
    },
    mounted() {
      let _this = this;
//      setTimeout(function () {
//
//
//      }, 3000);

      let myId = JSON.parse(localStorage.getItem("pictureviewLoc"));
      _this.getData(myId.id);
      _this.title = myId.name
      var mySwiper = new Swiper('.swiper-container', {

        observer: true,//修改swiper自己或子元素时，自动初始化swiper
        paginationType: 'fraction',
        pagination: '.swiper-pagination',

        effect: 'coverflow',
        grabCursor: true,
        centeredSlides: true,
        slidesPerView: 'auto',
        coverflow: {
          rotate: 50,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: true
        },
        on: {
          transitionEnd: function () {
            _this.urlNum = this.activeIndex + 1;//切换结束时，告诉我现在是第几个slide
          },
        },
      })


    }
  }
</script>
