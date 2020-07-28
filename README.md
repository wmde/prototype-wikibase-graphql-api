# prototype-wikibase-graphql-api
GraphQL API Prototyping April 2020

## Installation
Set the user-specific environment variables: `cp .env.example .env` and modify `.env` accordingly.

## Development

### GraphQL server
* Run `docker-compose run --rm node npm i` to install dependencies.
* Run `docker-compose up node` to start the server. You should see a message saying the server is running.

### GraphQL client demo
* Run `docker-compose run --rm client npm i` to install dependencies.
* Run `docker-compose up` to start the server and the client demo.

## Examples
The following examples should produce useful results when the GraphQL server is wired up to wikidata.org, i.e. `API_URL=http://wikidata.org/w/api.php`.
### Labels and descriptions
```gql
{
  item(id: "Q42") {
    id
    labels(languages: ["en", "fr"]) {
      language
      value
    }
    descriptions(languages: ["en", "fr"]) {
      language
      value
    }
  }
}
```

### Sitelinks
```gql
{
  item(id: "Q23501") {
    sitelinks(sites: ["enwiki", "kowiki"]) {
      site
      title
    }
  }
}
```

### Statements
Note that for now only item values and string values are implemented.
```gql
{
  item(id: "Q183") {
    labels(languages: ["en"]) {
      value
    }

    claims(propertyIDs: ["P6"]) {
      mainsnak {
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
}
```

### Linking items: Statements on item values on statements
```gql
{
  item(id: "Q183") {
    labels(languages: ["en"]) {
      value
    }

    claims(propertyIDs: ["P6"]) {
      mainsnak {
        ... on PropertyValueSnak {
          datavalue {
            ... on Item {
              labels(languages: ["en"]) {
                value
              }

              claims(propertyIDs: ["P19"]) {
                mainsnak {
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
          }
        }
      }
    }
  }
}
```

### Search
```gql
{
  search(
    query: "star wars episode",
    language: "en"
  ) {
    labels(languages: ["en"]) { value }
    claims(propertyIDs: ["P57"]) {
      mainsnak {
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
}
```

## Deployment on toolforge
This API can be deployed on [toolforge](https://wikitech.wikimedia.org/wiki/Help:Toolforge) on Kubernetes using the following files applied using the appropriate kubectl commands
```yaml
---
# deployment.yaml
# apply with kubectl apply --validate=true -f ~/deployment.yaml
# NOTE: this deployment works with the "toolforge" Kubernetes cluster, and not the legacy "default" cluster.
apiVersion: apps/v1
kind: Deployment
metadata:
  name: wmde.graphql.demo
  namespace: tool-wmde-graphql-demo
  labels:
    name: wmde-graphql-demo
    # The toolforge=tool label will cause $HOME and other paths to be mounted from Toolforge
        toolforge: tool
        'tools.wmflabs.org/webservice-version': '1'
        'tools.wmflabs.org/webservice': 'true'
spec:
  replicas: 1
  selector:
    matchLabels:
      name: wmde-graphql-demo
      toolforge: tool
      'tools.wmflabs.org/webservice-version': '1'
      'tools.wmflabs.org/webservice': 'true'
  template:
    metadata:
      labels:
        name: wmde-graphql-demo
        toolforge: tool
        'tools.wmflabs.org/webservice-version': '1'
        'tools.wmflabs.org/webservice': 'true'
    spec:
      containers:
        - name: api
          image: docker-registry.tools.wmflabs.org/toolforge-node10-sssd-web:latest
          command: [ "npm", "run", "serve" ]
          workingDir: /data/project/wmde-graphql-demo/prototype-wikibase-graphql-api
          ports:
            - name: http
              containerPort: 4000
              protocol: TCP
          env:
            - name: HOME
              value: /data/project/wmde-graphql-demo
            - name: PORT
              value: '4000'
            - name: API_URL
              value: 'https://wikidata.org/w/api.php'
          imagePullPolicy: Always
```

```yaml
# service.yaml
# apply with kubectl apply --validate=true -f ~/service.yaml
kind: Service
apiVersion: v1
metadata:
  name: wmde-graphql-demo
  namespace: tool-wmde-graphql-demo
  labels:
    name: wmde-graphql-demo
    toolforge: tool
    'tools.wmflabs.org/webservice-version': '1'
    'tools.wmflabs.org/webservice': 'true'
spec: 
  ports: 
  - name: http
    protocol: TCP
    port: 8000
    targetPort: 4000
  selector:
      name: wmde-graphql-demo
```

```yaml
# ingress.yaml
# apply with kubectl apply --validate=true -f ~/ingress.yaml
apiVersion: extensions/v1beta1
kind: Ingress
metadata:
  name: wmde-graphql-demo-subdomain
  namespace: tool-wmde-graphql-demo
  labels:
    name: wmde-graphql-demo
    toolforge: tool
    'tools.wmflabs.org/webservice-version': '1'
    'tools.wmflabs.org/webservice': 'true'
spec:
  rules:
  - host: wmde-graphql-demo.toolforge.org
    http:
      paths:
      - backend:
          serviceName: wmde-graphql-demo
          servicePort: 8000
```