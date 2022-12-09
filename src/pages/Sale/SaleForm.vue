<template>
  <div class="category">
    <div class="q-pa-md">
      <div class="title text-h3 text-weight-bold">Создание/Изменение акции</div>
    </div>
    <q-separator></q-separator>
    <div class="q-pa-md">
      <div class="text-h5">Изображение</div>
      <div class="flex">
        <div v-if="image" class="product-image" @click="removeImage">
          <img :src="image" alt="">
        </div>
        <q-file outlined @input='addImage' class="product-image__add" v-if="!image">
          <template v-slot:prepend>
            <q-icon name="attach_file" />
          </template>
        </q-file>
      </div>
    </div>
    <q-separator></q-separator>
    <div class="flex justify-center">
      <q-btn :loading='loading' color="green" class="q-ma-md" size="lg" @click="setSale">Создать/Изменить акцию</q-btn>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      id: null,
      imageFile: null,
      image: null,

      loading: false,
      isCreatePage: true
    }
  },
  created () {
    if (this.$route.params.id) {
      this.id = this.$route.params.id
      this.isCreatePage = false
      this.getData()
    }
  },
  methods: {
    getData () {
      this.loadingCat = true
      this.$api
        .getDataSale(this.id)
        .then(res => {
          this.image = res.data.image
        })
        .finally(() => {
          this.loadingCat = false
        })
    },
    setSale () {
      if (this.isCreatePage) {
        this.createSale()
      } else {
        this.updateSale()
      }
    },
    setDataToSend () {
      let data = {}

      data = this.$api.appendFormData(data)

      if (this.isCreatePage) {
        data.append('image', this.imageFile)
      } else {
        if (this.imageFile) {
          data.append('image', this.imageFile)
        }
      }

      return data
    },
    createSale () {
      this.loading = true

      const data = this.setDataToSend()

      this.$api
        .createSale(data)
        .then(res => {
          this.$router.push({ name: 'Sale' })
          this.$q.notify(res.data.message)
        })
        .finally(() => {
          this.loading = false
        })
    },
    updateSale () {
      this.loading = true

      const data = this.setDataToSend()
      this.$api
        .updateSale(data, this.id)
        .then(res => {
          this.$router.push({ name: 'Sale' })
          this.$q.notify(res.data.message)
        })
        .finally(() => {
          this.loading = false
        })
    },
    removeImage () {
      this.imageFile = null
      this.image = null
    },
    addImage (file) {
      this.imageFile = file
      const reader = new FileReader()
      reader.readAsDataURL(file)
      const vm = this
      reader.onload = function () {
        vm.image = reader.result
      }
    }
  }
}
</script>
