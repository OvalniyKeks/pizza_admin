<template>
  <div class="products">
    <div class="q-pa-md flex justify-between">
      <div class="title text-h3 text-weight-bold">Категории</div>
      <q-btn :to='{name: "CategoryForm"}' color="green" label="Добавить категорию +" />
    </div>
    <q-separator></q-separator>
    <div class="flex q-pa-md q-mt-lg" style="grid-gap: 24px" v-if="categoryList.length > 0">
      <q-card class="q-pa-sm q-px-md category-card" style="width: 100%" flat bordered v-for="(category, i) of categoryList" :key="`category-${i}`">
        <div class="flex justify-between" style="align-items: center">
          <div class="flex" style="align-items: center">
            <q-img :src="category.image" class="q-mr-md" style="width: 48px"></q-img>
            <div class="text-h5">
              {{category.label}}
            </div>
          </div>
          <q-card-actions align="between">
            <q-btn color="red" label="Удалить" @click="deleteCategory(category._id)"/>
            <q-btn color="primary" label="Редактировать" @click="$router.push({name: 'CategoryForm', params: {id: category._id} })"/>
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

      categoryList: []
    }
  },
  created () {
    this.getCategory()
  },
  methods: {
    getCategory () {
      this.$api
        .getCategory()
        .then(res => {
          this.categoryList = res.data
        })
        .finally(() => {

        })
    },
    deleteCategory (id) {
      this.loading = true
      this.$api
        .deleteCategory(id)
        .then(res => {
          this.getCategory()
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
