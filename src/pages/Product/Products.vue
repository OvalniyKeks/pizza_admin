<template>
  <div class="products">
    <div class="q-pa-md flex justify-between">
      <div class="title text-h3 text-weight-bold">Продукты</div>
      <q-btn :to='{name: "ProductForm"}' color="green" label="Добавить продукт +" />
    </div>
    <q-separator></q-separator>
    <div class="flex q-pa-md q-mt-lg" style="grid-gap: 24px" v-if="productsList.length > 0">
      <q-card class="products-card q-pb-xl" flat bordered v-for="(product, i) of productsList" :key="`products-${i}`">
        <q-img
          :src="product.image"
          class="products-card__image"
        />

        <q-card-section>
          <div class="text-h5 q-mt-sm q-mb-xs">{{product.label}}</div>
          <div class="text-caption text-grey">
            {{product.description}}
          </div>
        </q-card-section>

        <q-card-actions align="between" style="position: absolute; bottom: 0">
          <q-btn flat color="red" label="Удалить" @click="deleteProduct(product._id)"/>
          <q-btn flat color="primary" label="Редактировать" @click="$router.push({name: 'ProductForm', params: {id: product._id} })"/>
        </q-card-actions>
      </q-card>
    </div>
    <div class="q-pa-md" v-else>
      <div class="text-h5">Раздел пуст</div>
    </div>
    <q-inner-loading
        :showing="loading"
        label="Загрузка продуктов"
        label-class="text-teal"
        label-style="font-size: 2em"
      />
  </div>
</template>
<script>
export default {
  data () {
    return {
      loading: false,

      productsList: []
    }
  },
  created () {
    this.getProducts()
  },
  methods: {
    getProducts () {
      this.loading = true
      this.$api
        .getProducts()
        .then(res => {
          const result = res.data
          this.productsList = result
        })
        .catch(e => {
          this.error = true
        })
        .finally(e => {
          this.loading = false
        })
    },
    deleteProduct (id) {
      this.loading = true
      this.$api
        .deleteProduct(id)
        .then(res => {
          this.getProducts()
        })
        .catch(e => {
          this.error = true
        })
        .finally(e => {
          this.loading = false
        })
    }
  }
}
</script>
