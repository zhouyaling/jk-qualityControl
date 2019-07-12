import {post} from './http-service.js'

// var serve = "http://dev-quality.tq-service.com/quality-api/";
var serve = "http://222.180.169.87:7060/quality-api/";
// var serve = "/sever";

export const server = {
  //首页
  notice: function (paramObj) {
    return post(serve + 'appController/notice', paramObj);
  },
  //二级目录
  secondNotice: function (paramObj) {
    return post(serve + 'appController/secondNotice', paramObj);
  },
  //二级目录详情
  detailsNotice: function (paramObj) {
    return post(serve + 'appController/detailsNotice', paramObj);
  },
  //内容搜索
  searchNotice: function (paramObj) {
    return post(serve + 'appController/searchNotice', paramObj);
  },
  //案例首页
  caseNotice: function (paramObj) {
    return post(serve + 'appController/caseNotice', paramObj);
  },  //案例图片
  imagesNotice: function (paramObj) {
    return post(serve + 'appController/imagesNotice', paramObj);
  },

};

// let _this = this;
//
// var formData = new FormData();
//
// formData.append("pointId", _this.PointId);
// formData.append("openId", _this.OpenId);
// let data = {
//   data: formData
// };
// this.$server.point(data).then(data => {
//
// })
