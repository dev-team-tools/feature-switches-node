# Feature Switches Node
A NodeJS library for programatically accessing [dev-team-tools.com](https://www.dev-team-tools.com) feature-switches product.

Further docs can be found at [docs.dev-team-tools.com/docs/feature-switches/](https://docs.dev-team-tools.com/docs/feature-switches/)

## Installation
- `npm -i @dev-team-tool/feature-switches`

## Configuration
You'll need an API key, which you can generate on your [settings page](https://dev-team-tools.com/users/settings).

## Getting started
To get started you need to create an instance of `FeatureSwitchManager`:

```JavaScript
const manager = new FeatureSwitchManager("{your-api-ket-here}", "{environment}");
````

There are two main ways to request switches: in a basic way to get a `true` or `false` value, or with more context to get a more specific feature switch response based on how they've been configured in the [feature-switches](https://dev-team-tools.com/apps/feature-switches/) application.

### Basic
To just get a true or false value based on the **Default Rule**:

```JavaScript

const manager = new FeatureSwitchManager("{your-api-ket-here}", "{environment}");

const result = manager.getSwitchValue("{some-key-here}");

if(result.value) {
  // switch is on
} else {
  // switch is off
}

````

Where the `{some-key-here}` is replaced with the key for a specific switch.


### Advanced usage
To take full advantage of what [feature-switches](https://dev-team-tools.com/apps/feature-switches/) has to offer, you'll want to pass in more information to gain fine controller over the result.




## Recommendations


## Issues

## Contributing
