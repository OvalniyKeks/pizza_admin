<template>
  <div class="category">
    <div class="q-pa-md">
      <div class="title text-h3 text-weight-bold">Создание/Изменение категории</div>
    </div>
    <q-separator></q-separator>
    <div class="q-pa-md">
      <div class="text-h5 q-mb-md">Название</div>
      <q-input outlined label="Название" v-model="label" class="q-mb-md"/>
    </div>
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
      <q-btn :loading='loading' color="green" class="q-ma-md" size="lg" @click="setCategory">Создать/Изменить категорию</q-btn>
    </div>
    <q-inner-loading
      :showing="loadingCat"
      label="Загрузка категории"
      label-class="text-teal"
      label-style="font-size: 2em"
    />
  </div>
</template>
<script>
export default {
  data () {
    return {
      id: null,
      label: '',
      imageFile: null,
      image: null,

      loading: false,
      loadingCat: false,
      isCreatePage: true
    }
  },
  created () {
    if (this.$route.params.id) {
      this.id = this.$route.params.id
      this.isCreatePage = false
      this.getDataCategory()
    }
  },
  methods: {
    getDataCategory () {
      this.loadingCat = true
      this.$api
        .getDataCategory(this.id)
        .then(res => {
          this.label = res.data.label
          this.image = res.data.image
        })
        .finally(() => {
          this.loadingCat = false
        })
    },
    setCategory () {
      if (this.isCreatePage) {
        this.createCategory()
      } else {
        this.updateCategory()
      }
    },
    setDataToSend () {
      let data = {
        label: this.label
      }

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
    createCategory () {
      this.loading = true

      const data = this.setDataToSend()

      this.$api
        .createCategory(data)
        .then(res => {
          this.$router.push({ name: 'Category' })
          this.$q.notify(res.data.message)
        })
        .finally(() => {
          this.loading = false
        })
    },
    updateCategory () {
      this.loading = true

      const data = this.setDataToSend()
      this.$api
        .updateCategory(data, this.id)
        .then(res => {
          this.$router.push({ name: 'Category' })
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
