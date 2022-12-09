import Vue from 'vue'
import axios from 'axios'

Vue.prototype.$axios = axios

export default async ({ app, ssrContext, store }) => {
  const axiosInstance = axios.create({
    baseURL: 'http://localhost:5000/api/'
  })
  app.axios = axiosInstance
  store.$axios = axiosInstance
}
