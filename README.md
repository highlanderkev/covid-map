# covid-map

## Build Setup

```bash
# install dependencies
$ npm install

# serve with hot reload at localhost:3000
$ npm run dev

# build for production and launch server
$ npm run build
$ npm run start

# generate static project
$ npm run generate
```

For detailed explanation on how things work, check out the [documentation](https://nuxtjs.org).

## Firebase Deployment

This app is hosted on [Firebase](https://firebase.google.com/). The static site is served via Firebase Hosting, and serverless API functions are deployed as Firebase Cloud Functions.

### Prerequisites

1. Install the Firebase CLI: `npm install -g firebase-tools`
2. Log in to Firebase: `firebase login`
3. Set your Firebase project ID in `.firebaserc`

### Deploy

```bash
# Deploy everything (static site + Cloud Functions)
$ npm run firebase:deploy

# Deploy only the static hosting
$ npm run firebase:deploy:hosting

# Deploy only the Cloud Functions
$ npm run firebase:deploy:functions
```

### Environment Variables

The Cloud Functions require the following environment variables. Set them using the Firebase CLI:

```bash
firebase functions:config:set \
  sendgrid.api_key="YOUR_SENDGRID_API_KEY" \
  twilio.account_sid="YOUR_TWILIO_ACCOUNT_SID" \
  twilio.auth_token="YOUR_TWILIO_AUTH_TOKEN"
```

For the static site, configure the following environment variables in your CI/CD pipeline or Firebase Hosting environment:

- `GOOGLE_MAPS_API_KEY`
- `SENDGRID_API_KEY`
- `SENDGRID_EMAIL_ADDRESS`
- `TWILIO_ACCOUNT_SID`
- `TWILIO_AUTH_TOKEN`
- `TWILIO_SMS_NUMBER`
- `GOOGLE_TAG_ID`

## Special Directories

You can create the following extra directories, some of which have special behaviors. Only `pages` is required; you can delete them if you don't want to use their functionality.

### `assets`

The assets directory contains your uncompiled assets such as Stylus or Sass files, images, or fonts.

More information about the usage of this directory in [the documentation](https://nuxtjs.org/docs/2.x/directory-structure/assets).

### `components`

The components directory contains your Vue.js components. Components make up the different parts of your page and can be reused and imported into your pages, layouts and even other components.

More information about the usage of this directory in [the documentation](https://nuxtjs.org/docs/2.x/directory-structure/components).

### `layouts`

Layouts are a great help when you want to change the look and feel of your Nuxt app, whether you want to include a sidebar or have distinct layouts for mobile and desktop.

More information about the usage of this directory in [the documentation](https://nuxtjs.org/docs/2.x/directory-structure/layouts).


### `pages`

This directory contains your application views and routes. Nuxt will read all the `*.vue` files inside this directory and setup Vue Router automatically.

More information about the usage of this directory in [the documentation](https://nuxtjs.org/docs/2.x/get-started/routing).

### `plugins`

The plugins directory contains JavaScript plugins that you want to run before instantiating the root Vue.js Application. This is the place to add Vue plugins and to inject functions or constants. Every time you need to use `Vue.use()`, you should create a file in `plugins/` and add its path to plugins in `nuxt.config.js`.

More information about the usage of this directory in [the documentation](https://nuxtjs.org/docs/2.x/directory-structure/plugins).

### `static`

This directory contains your static files. Each file inside this directory is mapped to `/`.

Example: `/static/robots.txt` is mapped as `/robots.txt`.

More information about the usage of this directory in [the documentation](https://nuxtjs.org/docs/2.x/directory-structure/static).

### `store`

This directory contains your Vuex store files. Creating a file in this directory automatically activates Vuex.

More information about the usage of this directory in [the documentation](https://nuxtjs.org/docs/2.x/directory-structure/store).
