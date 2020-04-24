<template>
  <div id="app" data-app="true">
    Item: <EntitySelector @selected="selectedItem = $event" />
    Property: <EntitySelector @selected="selectedProperties.push( $event )" type="property" />

    <div v-if="selectedItem && selectedItem.label">
      <FancyItemTable
              :item="selectedItem"
              :properties="selectedProperties"
      />
    </div>
  </div>
</template>

<script>
import EntitySelector from './components/EntitySelector.vue'
import FancyItemTable from './components/FancyItemTable.vue'

export default {
  data: () => ({
    selectedItem: null,
    selectedProperties: []
  }),
  name: 'App',
  components: {
    EntitySelector,
    FancyItemTable
  }
}
</script>

<style lang="scss">
</style>
