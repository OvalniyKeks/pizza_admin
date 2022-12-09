<template>
  <div class="product-add">
    <div class="q-pa-md">
      <div class="title text-h3 text-weight-bold">Создание/Изменение продукта</div>
    </div>
    <q-separator></q-separator>
    <div class="q-pa-md">
      <div class="text-h5 q-mb-md">Название</div>
      <q-input outlined label="Название" v-model="label" class="q-mb-md"/>
      <q-separator class="q-my-md"></q-separator>
      <div>
        <div class="text-h5">Настройки</div>
        <div class="flex column">
          <q-toggle
            v-model="newProduct"
            label="Новый"
          />
          <q-toggle
            v-model="topProduct"
            label="Часто заказывают"
          />
          <q-separator class="q-my-md"></q-separator>
          <div class="q-pa-md">
            <div class="flex justify-between q-mb-md" style="align-items: center">
              <div class="text-h6">Категория продукта</div>
              <q-btn color="primary" @click="$router.push({name: 'CategoryForm'})">Добавить новую категорию</q-btn>
            </div>
            <q-select outlined v-model="currCategory" :options="listCategories" label="Категория продукта" />
          </div>
        </div>
      </div>
      <q-separator class="q-my-md"></q-separator>
      <div>
        <div class="text-h5">Тип теста</div>
        <div class="flex">
          <div class="product-element" v-for="(el, i) of type" :key="`element-compound-${i}`"  @click="removeElement('type', el)" style="width: 105px; height: 105px">{{el.label}}</div>
          <q-btn class="product-element__add" size="xl" style="width: 105px; height: 105px" @click="openDialogAddElement('type')">+</q-btn>
        </div>
      </div>
      <q-separator class="q-my-md"></q-separator>
      <div>
        <div class="text-h5">Состав</div>
        <div class="flex">
          <div class="product-element" v-for="(el, i) of compound" :key="`element-compound-${i}`"  @click="removeElement('compound', el)" style="width: 105px; height: 105px">{{el.label}}</div>
          <q-btn class="product-element__add" size="xl" style="width: 105px; height: 105px" @click="openDialogAddElement('compound')">+</q-btn>
        </div>
      </div>
      <q-separator class="q-my-md"></q-separator>
      <div>
        <div class="text-h5 q-mb-md">Размеры и граммовки</div>
        <div class="flex">
          <div class="product-element flex" v-for="(el, i) of price" :key="`element-${i}`"  @click="removeElement('price', el)" style="width: 105px; height: 105px">
            <div>{{el.label}} см</div>
            <div>{{el.price}} ₽</div>
            <div>{{el.weight}} г</div>
          </div>
          <q-btn class="product-element__add" size="xl" style="width: 105px; height: 105px" @click="openDialogAddElement('price')">+</q-btn>
        </div>
      </div>
      <q-separator class="q-my-md"></q-separator>
      <div>
        <div class="text-h5 q-mb-md">Описание</div>
        <q-input outlined type="textarea" label="Описание" v-model="description" class="q-mb-md"/>
      </div>
      <q-separator class="q-my-md"></q-separator>
      <div>
        <div class="text-h5 q-mb-md">Модификаторы</div>
        <div class="flex">
          <div class="product-element flex" v-for="(el, i) of modificators" :key="`element-modificator-${i}`"  @click="removeElement('modificators', el)" style="width: 105px; height: 105px">
            <div>{{el.label}}</div>
            <div>{{el.price}} ₽</div>
          </div>
          <q-btn class="product-element__add" size="xl" style="width: 105px; height: 105px" @click="openDialogAddElement('modificators')">+</q-btn>
        </div>
      </div>
      <q-separator class="q-my-md"></q-separator>
      <div>
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
    </div>

    <div class="flex justify-center">
      <q-btn :loading='loading' color="green" class="q-ma-md" size="lg" @click="setProduct">Создать/Изменить продукт</q-btn>
    </div>

    <q-dialog v-model="addElementDialog">
      <q-card style="min-width: 350px" class="q-pa-md">
        <q-input dense v-model="addElementDialogValues.label" autofocus :label="addElementDialogType == 'price' ? `Размер в см` : `Название`"/>
        <q-input dense v-if="addElementDialogType == 'modificators' || addElementDialogType == 'price'" v-model="addElementDialogValues.price" autofocus label="Цена"/>
        <q-input dense v-if="addElementDialogType == 'price'" v-model="addElementDialogValues.weight" autofocus label="Граммовки"/>

        <q-card-actions align="right" class="text-primary">
          <q-btn color="red" flat label="Отмена" v-close-popup />
          <q-btn color="green" flat label="Добавить" v-close-popup @click="addElement"/>
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>
<script>
export default {
  data () {
    return {
      id: null,
      label: '',
      description: '',
      compound: [],
      modificators: [],
      price: [],
      type: [],
      imageFile: null,
      image: null,
      newProduct: false,
      topProduct: false,
      currCategory: null,

      addElementDialog: false,
      addElementDialogType: null,
      addElementDialogValues: {
        label: null,
        price: null,
        weight: null
      },

      loading: false,
      isCreatePage: true,

      listCategories: []
    }
  },
  created () {
    if (this.$route.params.id) {
      this.id = this.$route.params.id
      this.isCreatePage = false
      this.getDataProduct()
    } else {
      this.getCategory()
    }
  },
  methods: {
    getCategory (product) {
      this.$api
        .getCategory()
        .then(res => {
          this.listCategories = res.data
          if (product) {
            this.currCategory = res.data.find(item => item._id === product.categoryId)
          }
        })
        .finally(() => {

        })
      return []
    },
    getDataProduct () {
      const id = this.$route.params.id
      this.$api
        .getDataProduct(id)
        .then(res => {
          const result = res.data
          this.label = result.label
          this.compound = this.$api.jsonParse(result.compound)
          this.modificators = this.$api.jsonParse(result.modificators)
          this.price = this.$api.jsonParse(result.price)
          this.type = this.$api.jsonParse(result.type)
          this.image = result.image
          this.description = result.description
          this.newProduct = result.new === '1'
          this.topProduct = result.top === '1'
          this.getCategory(result)
        })
        .finally(() => {

        })
    },
    openDialogAddElement (type) {
      this.addElementDialogType = type
      this.addElementDialog = true
    },
    addElement () {
      const obj = {}
      for (const key in this.addElementDialogValues) {
        if (this.addElementDialogValues[key]) {
          obj[key] = this.addElementDialogValues[key]
        }
      }
      this[this.addElementDialogType].push(obj)

      for (const key in this.addElementDialogValues) {
        this.addElementDialogValues[key] = null
      }
      this.addElementDialogType = null
    },
    removeElement (type, el) {
      const idx = this[type].findIndex(item => item === el)
      this[type].splice(idx, 1)
    },
    addImage (file) {
      this.imageFile = file
      const reader = new FileReader()
      reader.readAsDataURL(file)
      const vm = this
      reader.onload = function () {
        vm.image = reader.result
      }
    },
    removeImage () {
      this.imageFile = null
      this.image = null
    },
    setProduct () {
      if (this.isCreatePage) {
        this.createProduct()
      } else {
        this.updateProduct()
      }
    },
    setDataToSend () {
      let data = {
        label: this.label,
        compound: this.$api.jsonStringify(this.compound),
        modificators: this.$api.jsonStringify(this.modificators),
        price: this.$api.jsonStringify(this.price),
        type: this.$api.jsonStringify(this.type),
        new: this.newProduct ? 1 : 0,
        top: this.topProduct ? 1 : 0,
        description: this.description,
        categoryId: this.currCategory._id
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
    createProduct () {
      this.loading = true

      const data = this.setDataToSend()

      this.$api
        .createProduct(data)
        .then(res => {
          this.$router.push({ name: 'Products' })
          this.$q.notify(res.data.message)
        })
        .finally(() => {
          this.loading = false
        })
    },
    updateProduct () {
      this.loading = true

      const data = this.setDataToSend()

      this.$api
        .updateProduct(data, this.id)
        .then(res => {
          this.$router.push({ name: 'Products' })
          this.$q.notify(res.data.message)
        })
        .finally(() => {
          this.loading = false
        })
    }
  }
}
</script>
