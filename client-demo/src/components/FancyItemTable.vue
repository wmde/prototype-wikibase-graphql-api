<template>
    <div>
        ({{ item.id }}) {{ item.label }}
         <v-data-table ref="bla"
          :headers="headers"
          :items="statements"
          :items-per-page="5"
          class="elevation-1"
        ></v-data-table>
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
        return (this.results || []).map(res => {
          return {
              ...res,
              label: res.labels[0].value,
              description: res.descriptions[0].value
          }
        })
    },
    statements() {
      console.log( this.results, "omg")
      return (this.results || []).map( (statement) => {
          return { property: statement.mainsnak.property.labels[0].value,
          value: statement.mainsnak.datavalue.labels[0].value
        }
      } )
    },
    headers() {
      return [
        {
          text: "Property",
          value: "property",
        },
        {
          text: "Value",
          value: "value",
        }
      ]
    }
  },

    watch: {
        search(val) {
            console.log(val)
        }
    },

    apollo: {
      results: {
        query: gql`query item($item: String!, $properties: [String]){
          item(id: $item) {
            claims(propertyIDs: $properties) {
             mainsnak {
              property {
               labels(languages: ["en"]) {
                value
               }
              }
              ... on PropertyValueSnak {
               datavalue {
                ... on Item {
                 labels(languages: ["en"]) {
                  value
                 }
                }
               }
              }
             }
            }
           }
          }`,
        variables() {
          return {
            properties: this.properties.map( ( property ) => property.id ),
            item: this.item.id
          }
        },
        skip() {
          return !this.item || this.properties.length === 0
        },
        update(result) {
          return result.item.claims
        },
        throttle: 100
      }
    }
}
</script>

<style scoped lang="scss">
.v-data-table {
  margin-top: 5em;
}
</style>
