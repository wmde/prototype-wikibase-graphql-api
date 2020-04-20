import Vue from 'vue'
import App from './App.vue'
import ApolloClient from 'apollo-boost'
import VueApollo from 'vue-apollo'

Vue.config.productionTip = false

Vue.use(VueApollo)

new Vue({
  render: h => h(App),
  apolloProvider: new VueApollo({
    defaultClient: new ApolloClient({
      uri: process.env.VUE_APP_GRAPHQL_URL
    })
  })
}).$mount('#app')
