import Vue from 'vue'

Vue.mixin({
  beforeCreate () {
    const options = this.$options
    if (options.api) {
      this.$api = options.api
    } else if (options.parent) {
      this.$api = options.parent.$api
    }
  }
})

class ApiService {
  axios = undefined
  // eslint-disable-next-line space-before-function-paren
  constructor(axios) {
    this.axios = axios
  }

  deepCopy (data) {
    try {
      return JSON.parse(JSON.stringify(data))
    } catch (e) {
      return null
    }
  }

  jsonParse (data) {
    try {
      return JSON.parse(data)
    } catch (e) {
      console.log(e)
      return data
    }
  }

  jsonStringify (data) {
    try {
      return JSON.stringify(data)
    } catch (e) {
      return null
    }
  }

  appendFormData (data, fd) {
    let formData = fd
    if (!formData) {
      formData = new FormData()
    }
    if (typeof data === 'object') {
      for (const key in data) {
        if (Object.hasOwnProperty.call(data, key)) {
          formData.append(key, data[key])
        }
      }
    }
    return formData
  }

  async getSomething (data) {
    return this.axios.get('', { params: { ...data } })
  }

  async setSomething (data) {
    return this.axios.post('', data)
  }

  async createProduct (data) {
    return this.axios.post('/product/add', data)
  }

  async deleteProduct (data) {
    return this.axios.delete(`/product/${data}`)
  }

  async updateProduct (data, id) {
    return this.axios.patch(`/product/${id}`, data)
  }

  async getDataProduct (data) {
    return this.axios.get(`/product/${data}`)
  }

  async getProducts (data) {
    return this.axios.get('/product/all', { params: { ...data } })
  }

  async createCategory (data) {
    return this.axios.post('/category/add', data)
  }

  async deleteCategory (data) {
    return this.axios.delete(`/category/${data}`)
  }

  async updateCategory (data, id) {
    return this.axios.patch(`/category/${id}`, data)
  }

  async getDataCategory (data) {
    return this.axios.get(`/category/${data}`)
  }

  async getCategory (data) {
    return this.axios.get('/category/all', { params: { ...data } })
  }

  async createSale (data) {
    return this.axios.post('/sale/add', data)
  }

  async deleteSale (data) {
    return this.axios.delete(`/sale/${data}`)
  }

  async updateSale (data, id) {
    return this.axios.patch(`/sale/${id}`, data)
  }

  async getDataSale (data) {
    return this.axios.get(`/sale/${data}`)
  }

  async getSale (data) {
    return this.axios.get('/sale/all', { params: { ...data } })
  }
}

export default async ({ app }) => {
  app.api = new ApiService(app.axios)
}
