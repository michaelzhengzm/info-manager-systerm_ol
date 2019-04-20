import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

const login = resolve => require(["@/page/login/login"], resolve);

const main = resolve => require(["@/page/main/main"], resolve);
const home = resolve => require(["@/page/home/home"], resolve);
const weather = resolve => require(["@/page/weather/weather"], resolve);
const tableOperation = resolve => require(["@/page/tableManager/tableOperation"], resolve);
const quillEditor = resolve => require(["@/page/tableManager/quillEditor"], resolve);
const starNews = resolve => require(["@/page/allNews/starNews"], resolve);
const explain = resolve => require(["@/page/explain/explain"], resolve);


export default new Router({
  routes: [
    {
      path: '/',
      component: login
    },
    {
      path: '/main',
      component: main,
      children: [{
        path: '',
        component: home,
        meta: [],
      }, {
        path: '/weather',
        component: weather,
        meta: ['天气预报', '实时天气'],
      },
      {
        path: '/tableOperation',
        component: tableOperation,
        meta: ['数据管理', '表格操作'],
      },
      {
        path: '/quillEditor',
        component: quillEditor,
        meta: ['数据管理', '文本编辑'],
      },
      {
        path: '/starNews',
        component: starNews,
        meta: ['新闻资讯', '明星八卦'],
      },
      {
        path: '/explain',
        component: explain,
        meta: ['说明', '说明'],
      },
    
    ]
    }
  ]
})
