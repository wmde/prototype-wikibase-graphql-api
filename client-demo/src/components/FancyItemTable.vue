<template>
    <div>
        {{ item.id }}
        {{ properties.length }}
    </div>
</template>

<script>
import gql from 'graphql-tag'

export default {
  props: {
    properties: {
        required: true,
        type: Array
    },
    item: {
      required: true,
      type: Object
    },
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
