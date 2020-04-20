<template>
  <div>
      <input v-model.lazy="itemId"/>
      <div v-if="itemLabel">
          label: <strong>{{ itemLabel }}</strong>
      </div>
  </div>
</template>

<script>
import gql from 'graphql-tag'

export default {
  data() {
    return {
      itemId: '',
      itemLabel: ''
    }
  },

  apollo: {
    itemLabel: {
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
      },
      update(result) {
        return result.item.labels[0].value
      }

    }
  }
}
</script>

<style scoped lang="scss">
</style>
