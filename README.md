# WeightStats

WeightStats is a desktop app created using Electron + React + D3 for managing
weight statistics

### Save weight history

<img src="https://media.giphy.com/media/SGWpXF2ct8yO8Ze3y7/giphy.gif"/>

### Display and manipulate stats

<img src="https://media.giphy.com/media/3XByitL8eHDdkMYWRb/giphy.gif"/>

## Build project

#### You need to create a file named .env in the root directory with the next information.

```
DB_HOST=HERE_YOUR_MONGODB_URL
```

#### Then build project with the following command.

```
yarn install
```

## Run development environment

```
yarn run electron-dev
```

## Build production environment

```
yarn run preelectron-pack
yarn run electron-pack
```

