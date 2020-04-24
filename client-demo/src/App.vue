<template>
  <div id="app" data-app="true">
    <EntitySelector @selected="selectedItem = $event" />
    <div v-if="selectedItem && selectedItem.label">
      {{selectedItem.label}}
    </div>
  </div>
</template>

<script>
import EntitySelector from './components/EntitySelector.vue'

export default {
  data: () => ({
    selectedItem: null
  }),
  name: 'App',
  components: {
    EntitySelector
  }
}
</script>

<style lang="scss">
</style>
