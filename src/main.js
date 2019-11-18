import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/zh-CN' // lang i18n
import VCharts from 'v-charts'
import XLSX from 'xlsx'    //导入


import '@/styles/index.scss' // global css

import App from './App'
import router from './router'
import store from './store'

import '../static/UE/ueditor.config.js'
import '../static/UE/ueditor.all.min.js'
import '../static/UE/lang/zh-cn/zh-cn.js'
import '../static/UE/ueditor.parse.min.js'


import '@/icons' // icon
import '@/permission' // permission control
import global from '@/utils/global.js'
import {
  formatDate,
  transDate
} from '@/utils/date.js'
import moment from 'moment'

import VueQuillEditor from 'vue-quill-editor'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
Vue.use(VueQuillEditor)



Vue.prototype.global = global;
Vue.prototype.formatDate = formatDate;
Vue.prototype.transDate = transDate;
Vue.prototype.moment = moment;
Vue.use(ElementUI, {
  locale
})
Vue.use(VCharts)
Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: {
    App
  }
})
