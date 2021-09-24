<template>
  <div>
    <!--  <q-item clickable v-ripple tag="a" target="_self" :href="link">  -->
    <!-- QItem as a <router-link> : user navigation in a router-enabled app -->
    <q-item
      clickable
      :to="link"
    >
      <q-item-section
        v-if="icon"
        avatar
      >
        <q-icon
          :name="icon"
          :color="iconColor"
        />
      </q-item-section>

      <q-item-section>
        <q-item-label>{{ title }}</q-item-label>
        <q-item-label caption>{{ caption }}</q-item-label>
      </q-item-section>
    </q-item>
    <!-- Suppose la dÃ©claration des Props -->
    <!-- <q-separator :key="'sep' + index" v-if="separator" /> -->
    <q-separator
      v-if="separator"
      :key="Date.now()"
    />
  </div>
</template>

<script>
export default {
  name: 'MenuItem',
  // Structure d'un Item de menu (Ã  l'appel de ce composant)
  props: {
    title: {
      type: String,
      required: true
    },
    caption: {
      type: String,
      default: ''
    },
    icon: {
      type: String,
      default: ''
    },
    iconColor: {
      type: String,
      default: 'black'
    },
    link: {
      type: String,
      default: '#'
    },
    separator: { // Ligne de sÃ©parator
      default: 'false'
    }
  }
}
</script>
