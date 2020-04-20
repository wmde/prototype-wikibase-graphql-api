<template>
  <div>
      <input v-model.lazy="itemId"/>
      <div v-if="itemId">
          label: <strong>{{item.labels[0].value}}</strong>
      </div>
  </div>
</template>

<script>
import gql from 'graphql-tag'

export default {
  data() {
    return {
      itemId: '',
    }
  },

  apollo: {
    item: {
      query: gql`query item($itemId: String!){
        item(id: $itemId) {
          id
          labels(languages: ["en"]) {
            value
          }
        }
      }`,
      variables() {
        return {
          itemId: this.itemId
        }
      },
      skip() {
        return !this.itemId
      }

    }
  }
}
</script>

<style scoped lang="scss">
</style>
