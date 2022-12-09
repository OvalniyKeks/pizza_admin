<template>
  <div class="sale">
    <div class="q-pa-md flex justify-between">
      <div class="title text-h3 text-weight-bold">Акции</div>
      <q-btn :to='{name: "SaleForm"}' color="green" label="Добавить акцию +" />
    </div>
    <q-separator></q-separator>
    <div class="flex q-pa-md q-mt-lg" style="grid-gap: 24px" v-if="saleList.length > 0">
      <q-card class="q-pa-sm q-px-md sale-card" style="width: 100%" flat bordered v-for="(sale, i) of saleList" :key="`sale-${i}`">
        <div class="flex justify-between" style="align-items: center">
          <div class="flex" style="align-items: center">
            <q-img :src="sale.image" class="q-mr-md" style="width: 300px"></q-img>
          </div>
          <q-card-actions align="between">
            <q-btn color="red" label="Удалить" @click="deleteSale(sale._id)"/>
            <q-btn color="primary" label="Редактировать" @click="$router.push({name: 'SaleForm', params: {id: sale._id} })"/>
          </q-card-actions>
        </div>
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

      saleList: []
    }
  },
  created () {
    this.getSale()
  },
  methods: {
    getSale () {
      this.$api
        .getSale()
        .then(res => {
          this.saleList = res.data
        })
        .finally(() => {

        })
    },
    deleteSale (id) {
      this.loading = true
      this.$api
        .deleteSale(id)
        .then(res => {
          this.getsale()
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
