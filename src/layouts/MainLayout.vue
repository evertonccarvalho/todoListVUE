<template>
  <q-layout view="lHh Lpr lFf">
    <q-header>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <div class="q-px-lg q-pt-xl q-mb-md">
          <q-toolbar-title>Lista de Tarefas</q-toolbar-title>
          <div class="text-subtitle1">{{ todaysDate }}</div>
        </div>
        <q-img
          src="../statics/mountains.jpg"
          class="header-image absolute-top"
        />
      </q-toolbar>
    </q-header>
    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      :width="250"
      :breakpoint="600"
    >
      <q-scroll-area
        style="
          height: calc(100% - 150px);
          margin-top: 150px;
          border-right: 1px solid #ddd;
        "
      >
        <q-list padding>
          <q-item to="/" exact clickable v-ripple>
            <q-item-section avatar>
              <q-icon name="list" />
            </q-item-section>
            <q-item-section> Todo List </q-item-section>
          </q-item>
        </q-list>
        <q-list padding>
          <q-item to="artigos" exact clickable v-ripple>
            <q-item-section avatar>
              <q-icon name="article" />
            </q-item-section>
            <q-item-section> Artigos </q-item-section>
          </q-item>
        </q-list>
      </q-scroll-area>

      <q-img
        class="absolute-top"
        src="../statics/mountains.jpg"
        style="height: 124px"
      >
        <div class="absolute-bottom">
          <q-avatar size="56px" class="q-mb-sm">
            <img src="../statics/avatar.png" />
          </q-avatar>
          <div class="text-weight-bold">Éverton Carvalho</div>
          <div>@evertonccarvalho</div>
        </div>
      </q-img>
    </q-drawer>

    <q-page-container>
      <keep-alive>
        <router-view />
      </keep-alive>
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">
import { date } from 'quasar';

import { defineComponent, ref } from 'vue';

const linksList = [
  {
    title: 'home',
    caption: 'v',
    icon: 'home',
    route: { name: 'home' },
  },
];

export default defineComponent({
  name: 'MainLayout',

  setup() {
    const leftDrawerOpen = ref(false);
    return {
      essentialLinks: linksList,
      leftDrawerOpen,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value;
      },
    };
  },
  computed: {
    todaysDate() {
      const timeStamp = Date.now();
      return date.formatDate(timeStamp, 'dddd D MMMM YYYY HH:mm:ss');
    },
  },
});
</script>

<style lang="scss">
.header-image,
.q-img-image {
  height: 100%;
  z-index: -1;
  opacity: 50%;
  filter: grayscale(10%);
}
</style>
