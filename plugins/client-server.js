import Vue from 'vue'
import Vuex from 'vuex'
import { Button, Card, Form, FormItem, Input, Notification } from 'element-ui'
import TextareaAutosize from 'vue-textarea-autosize'
import 'element-ui/lib/theme-chalk/index.css'

Vue.use(Vuex)
Vue.use(TextareaAutosize)

Vue.use(Card)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
Vue.use(Button)
Vue.prototype.$notify = Notification
