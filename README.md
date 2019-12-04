The library is a thin client for Recommendation APIs for SearchTap. The library can be run both on NodeJS environment or browsers, though slight difference

## Getting Started

First install the client using the NPM or Yarn package manager.

```js
// npm
npm install --save @searchtap/recommendation-client

//yarn
yarn add @searchtap/recommendation-client
```

Once installed, initialise the client by passing the **API keys** and the **security token**. 

>Please note that token is only required if you are using the library for NodeJS integration. Never use the token on public facing properties like browsers etc. 

```ts
// NodeJS
const client = new StRecommendationClient(apiKey:string, token:string);

//browser
const client = new StRecommendationTracker(apiKey:string [, trackAutoEvent:boolean]);
```

## Important Notes

- Timestamps are in ISO8601 format in UTC timezone. If you send any timezone data, those will be converted to UTC. 
- All methods return JS promises which are not cancellable.
- Never use your tokens on public facing properties like browser etc. 
- Never use identifiable properties like email, phone, ssn etc as user-id for API. If needed, hash them and use hash values to identify a user for API operations. 

## Methods

### Set User
`.setUser(userId)`

Use the method to explicitly set a user-id which uniquely identifies a user. The value shared should be same as the value sent as part of the users data. 

> Never user values which can identify a user, such as email, phone, ssn etc. If needed, you should hash such values at your end and then share those with our APIs. 

For browser based environment, if no values are passed, the library will create a unique value on its own to track user interaction. 

### Track Interaction Event
`.track(eventName:string, eventData:any)`

> This is the only event which can be used from browser without `token`. All other methods require both `API key` & `token`

Use this method to send a single interaction event. 

### Send Interactions Data
`.saveEvents(eventData[])`

Use this to send historic event data in bulk for recommendation engine to process. The schema for `eventData` is

```json
{
    "userId": "",
    "itemId": "",
    "eventName": "",
    "timestamp": "",
    "meta": {}
}
```

### Send User Data
`.saveUsers(users[])`

Use this method to send user data in bulk for recommendation engine to process. 

```json
{
    "userId":"",
    "meta": {
        ...
    }
}
```

### Send Items Data
`.saveItems(items[])`

Use this method to send items data to the recommendation engine. The schema for an `item` is 

```json
{
    "itemId":"",
    "title":"",
    "meta": {}
}

```


## License
The software is license under the [MIT License](LICENSE.txt).