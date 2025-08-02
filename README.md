# Feature Switches Node
A NodeJS library for programatically accessing [dev-team-tools.com](https://www.dev-team-tools.com) feature-switches product.

Further docs can be found at [docs.dev-team-tools.com](https://docs.dev-team-tools.com/docs/feature-switches/)

## Installation
- `npm -i @dev-team-tool/feature-switches`
- >=NodeJS 20

## Configuration
- API key (generate one on the [settings page](https://dev-team-tools.com/users/settings))
- A configured environment ([create / manage them here](https://dev-team-tools.com/apps/environments))

## Getting started
Before using this library, we recommend you read the [Feature-Switches Documentation](https://docs.dev-team-tools.com/docs/feature-switches/). It'll walk you through creating your first switch, as well as managing and customing them further.

To get started you need to create an instance of the `FeatureSwitchManager`:

```JavaScript
const manager = new FeatureSwitchManager("{your-api-ket-here}", "{environment}");
````

There are two main ways to request switches: in a basic way to get a `true` or `false` value, or with more context to get a more specific feature switch response based on how they've been configured in the [feature-switches](https://dev-team-tools.com/apps/feature-switches/) application.

### Basic usage
To just get a true or false value based on the **Default Rules**:

```JavaScript
const manager = new FeatureSwitchManager("some-api-key", "stage");

const result = await manager.getSwitchValue("devToolsEnabled");

if(result.value) {
  // switch is on
} else {
  // switch is off
}

const switches = await manager.getSwitches();

const found = switches.find(fs => fs.key === 'devToolsEnabled');

if(found && found.value) {
  // switch is on
}

````

### Advanced usage
If you've customised a switch value for a specific user or group of users via "context", then you can pass in more information.
The json body of the request would look roughly like thie:
```json
{
  "userId": "e8d696cb-e4c0-4316-8520-c596feaa52ac",
  "userName": "Test User",
  "context": [
    {
      "key": "company_id",
      "value": "123"
    },
  ]
}
```

```JavaScript
const manager = new FeatureSwitchManager("some-api-key", "stage");

const request = {
  userId: "e8d696cb-e4c0-4316-8520-c596feaa52ac",
  userName: "Test User",
  context: [
    {
      key: "company_id",
      value: "123"
    },
  ]
}

const result = await manager.getSwitchValue("devToolsEnabled", request);

if(result.value) {
  // switch is on
} else {
  // switch is off
}


// You can also get all switches customised to a specific user
const switches = await manager.getSwitches(request);

const found = switches.find(fs => fs.key === 'devToolsEnabled');

if(found && found.value) {
  // switch is on
}

````


## Issues
You can raise issues via our [GitHub issues page](https://github.com/dev-team-tools/feature-switches-node/issues).

## Contributing
// TBD
