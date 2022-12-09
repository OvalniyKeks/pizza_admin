<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="leftDrawerOpen = !leftDrawerOpen"
        />

        <q-toolbar-title>
          Pizza Admin
        </q-toolbar-title>

      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      content-class="bg-grey-1"
    >
      <q-list>
        <q-btn color="white" text-color="black" no-caps style="width:100%" size="lg" :to="{name: 'Main'}">Главная</q-btn>
        <q-btn color="white" text-color="black" no-caps style="width:100%" size="lg" :to="{name: 'Sale'}">Акции</q-btn>
        <q-btn color="white" text-color="black" no-caps style="width:100%" size="lg" :to="{name: 'Category'}">Категории</q-btn>
        <q-btn color="white" text-color="black" no-caps style="width:100%" size="lg" :to="{name: 'Products'}">Продукты</q-btn>
        <q-btn color="white" text-color="black" no-caps style="width:100%" size="lg" :to="{name: 'Orders'}">Заказы</q-btn>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>

export default {
  name: 'MainLayout',
  data () {
    return {
      leftDrawerOpen: false
    }
  }
}
</script>
