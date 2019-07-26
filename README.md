# Spotipaca 🦙

Are you constantly running into the notorious [Spotify 10k songs limit](https://community.spotify.com/t5/Live-Ideas/All-Platforms-Your-Library-Increase-maximum-Songs-allowed-in/idi-p/733759) (like me)?

Do you just want to clean up your album library a bit, in a convenient way?

**Spotipaca** gives you an overview over all your saved **Spotify** albums and lets you delete those which you don't appreciate that much any more, or the ones you maybe didn't _really_ want to save. 🤷

My main motivation to build this was the aforementioned 10,000 songs limit Spotify still has (no matter if you're _Premium_) and frequently gives me a hard time skimming through my library and thinking about what I could delete in order to gain more space for new stuff.

What's unique about **Spotipaca** is the **_Smart Filter_** that, once enabled, recommends you those of your albums that you could rather sacrifice for fresh ones.  
This recommendation is based on Spotify's estimation on how much you're into the album (mostly based on _play counts of the album/tracks/artist_).  
You can't access this info in the official Spotify apps.

**Spotipaca** additionally lets you sort your albums ascending/descending by **recently added** (default) or **popularity**. The latter is less connected to your personal collection but more a ranking of all Spotify on which artists are _currently in vogue_.

Unfortunately I didn't have the time yet to host this as a public tool for everyone yet(!), so you need to build it yourself (easy).  
Beforehand, you'll need a [**Spotify Account**](https://developer.spotify.com/dashboard/) (free account works as well) and sign up for a **Client ID** (personal API key).

---

## Installation

Clone this repository and install the dependencies:

```sh
yarn
```

After you've hopefully signed up for a Spotify API key (_"Client ID"_), you need to manually create a **.env** file in the root project directory and add the following line:

```sh
REACT_APP_SPOTIFY_CLIENT_ID=********************************

# (the ***'s are your ID!)
```

Then run the app in dev mode:

```sh
yarn start

# running tests
yarn test
```

Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app), and all the core environment, tools and workflows were untouched.

![Screenshot of the app](https://besing.grus.uberspace.de/image_hosting/spotipaca_screenshot.png)

---

## TODO

This is highly considered alpha software and I'll continuously improve things on it.  
The goal is to have a hosted public version that every Spotify user can access without the need for dev tools or an API key.

Of course I'm very happy about contributors to this project!

My current upcoming plans / TODOs:

### Code

- [x] WIP: Add tests
- [ ] Save app data in LocalStorage instead of just state? (quicker reload...?)
- [ ] Clean up component structure a bit more (?)
- [ ] Replace _Material UI_ by something simpler & with better performance (custom UI elements or other library)
- [ ] Make sure (Webpack) tree shaking works as expected
  - [ ] especially _Material UI_ module imports will need to be refactored
- [ ] a11y
- [ ] Replace TSlint (soon to be deprecated) by ESlint

### App features

- [ ] Show (amount of) tracks of each album
  - [ ] show emptied up space after deletion
- [ ] Search Functionality (by Album Name...)

### Design

- [ ] App logo
- [ ] Favicon
