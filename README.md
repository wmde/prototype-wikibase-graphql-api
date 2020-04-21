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
