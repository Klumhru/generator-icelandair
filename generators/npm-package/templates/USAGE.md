# USAGE

Should contain the following information


## Environment variables
*Example*
```
# Describe the purpose of this variable
ENV_NAME=value
```


## Secrets
See replication controller yml


## Usage examples
Git clone this project as a starting point

<% if (cli) { %>


### CLI

```
$ npm install --global @icelandair/<%= projectName %>
```

```
$ <%= projectName %> --help

  Usage
    <%= projectName %> [input]

  Options
    --foo  Lorem ipsum. [Default: false]

  Examples
    $ <%= projectName %>
    unicorns & rainbows
    $ <%= projectName %> ponies
    ponies & rainbows
```<% } %>


## Configuration
Configuration specific to this project


## Runtime requirements
- 3GB ram etc
