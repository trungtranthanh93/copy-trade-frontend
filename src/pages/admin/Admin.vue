@ -0,0 +1,125 @@
<template>
  <!-- <q-layout container style="height: 600px"> -->
  <q-layout view="hHh Lpr fff" class="shadow-10 rounded-borders" style="background: linear-gradient(135deg, #ea5c54 0%, #bb6dec 100%)">
    <!-- Header : barre du haut -->
    <q-header elevated class="bg-purple">
      <q-toolbar class="glossy">
        <q-btn
          flat
          round
          dense
          dark
          icon="menu"
          aria-label="Menu"
          @click="leftDrawerOpen = !leftDrawerOpen"
        />
         <div>
          <img class="relative-top-left" src="logo.png" style="height: 80px" />
        </div>
        <!-- Titre de l'appli -->
        <q-toolbar-title style="color-text: red">
          <router-link
            to="/"
            class="text-white text-bold"
            style="text-decoration: none"
            >Màn hình Chuyên gia</router-link
          >
        </q-toolbar-title>

        <!-- Remplissage d'espaces dans le DOM flexbox -->
        <q-space />
      </q-toolbar>
    </q-header>

    <!-- Menu latÃ©ral gauche -->
    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      :width="250"
      :breakpoint="500"
    >
      <!-- Calcule la place pour l'image du profil -->
      <q-scroll-area style="height: 100%; border-right: 1px solid #ddd">
        <q-list padding>
          <q-item-label header class="text-grey-8">Menu</q-item-label>
          <MenuItem v-for="link in menuLinks" :key="link.title" v-bind="link" />
        </q-list>
      </q-scroll-area>
      <!-- Bouton de repli (can be anything) qui replie le menu en mini-mode (Icone seule) -->
    </q-drawer>

    <q-page-container>
      <!-- Effet de transition entre les pages du contenu 
      <transition :name="transitionName">
      -->
      <transition
        appear
        enter-active-class="animated fadeOut"
        leave-active-class="animated rotateOut"
        :duration="300"
      >
        <router-view />
      </transition>
    </q-page-container>
  </q-layout>
</template>
<script>
import MenuItem from 'components/MenuItem.vue';

import { api } from 'boot/axios';
import { useRouter } from 'vue-router';
import { useQuasar } from 'quasar';
import { ref } from 'vue';

const linksData = [
  {
    title: 'Đánh lệnh',
    caption: 'Màn hình đánh lệnh',
    icon: 'account_balance',
    iconColor: 'blue',
    link: '/admin/user',
    separator: true,
  },
  {
    title: 'Lịch sử',
    caption: 'Lịch sử vào lệnh',
    icon: 'history',
    iconColor: 'orange',
    link: '/user/history-trading',
    separator: false,
  },
  {
    title: 'Đăng nhập sàn',
    caption: 'Đăng nhập vào sàn để đồng bộ lệnh đánh',
    icon: 'login',
    iconColor: 'black',
    link: '/user/login-exchange',
    separator: false,
  },
];
export default {
 setup() {
    const $router = useRouter();
    const $q = useQuasar();
    const leftDrawerOpen = ref(false);
    const  miniState = ref(false);
    const  menuLinks = ref(linksData) // Structure du menu
    const  transitionName =  ref('rotateOut'); // Effet de transition entre les pages du <q-page-container> : https://quasar.dev/options/transitions
    const  message =  ref('');
    
    function drawerClick(e) {
      // if in "mini" state and user click on drawer, we switch it to "normal" mode
      if (this.miniState) {
        this.miniState = false;
        // notice we have registered an event with capture flag;
        // we need to stop further propagation as this click is
        // intended for switching drawer to "normal" mode only
        // eslint-disable-next-line @typescript-eslint/no-unsafe-call
        e.stopPropagation();
      }
    }
    return {
      leftDrawerOpen,
      miniState,
      menuLinks,
      transitionName,
      message,
      drawerClick,
      goLoginExchange
    }   
  },
  components: {
    MenuItem,
  },
}
</script>