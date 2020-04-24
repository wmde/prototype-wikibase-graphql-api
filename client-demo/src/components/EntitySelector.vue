<template>
    <div>
        <v-autocomplete
                @input="$emit('selected', $event)"
                :items="items"
                :search-input.sync="search"
                color="white"
                hide-no-data
                hide-selected
                item-text="label"
                item-value="id"
                placeholder="Start typing to Search"
                prepend-icon="mdi-database-search"
                return-object
        >
            <template v-slot:item="{ item }">
                {{item.label}} ({{item.id}})
                <p>{{item.description}}</p>
            </template>
        </v-autocomplete>
    </div>
</template>

<script>
import gql from 'graphql-tag'

export default {
  data() {
    return {
      results: [],
      search: null
    }
  },

  computed: {
    items() {
      return this.results.map(res => {
        return {
          ...res,
          label: res.labels[0].value,
          description: res.descriptions[0].value
        }
      })
    }
  },

  watch: {
    search(val) {
      console.log(val)
    }
  },

  apollo: {
    results: {
      query: gql`query search($search: String!){
          search(
            query: $search,
            language: "en"
          ) {
            id
            labels(languages: ["en"]) { value }
            descriptions(languages: ["en"]) { value }
          }
      }`,
      variables() {
        return {
          search: this.search
        }
      },
      skip() {
        return !this.search
      },
      update(result) {
        console.log(result)
        return result.search
      },
      throttle: 100
    }
  }
}
</script>

<style scoped lang="scss">
</style>
