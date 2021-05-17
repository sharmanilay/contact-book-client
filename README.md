# Contact Book Client

## About

Contact book is an all in one app to write notes and manage contacts using google contacts.
- [Live Link](https://contact-book-client.netlify.app/)
- [Demo Video](https://drive.google.com/file/d/1RxjWfXcKGUeN1kRJMaH59Xp_CDfaZlJN/view?usp=sharing)

## Features

- [x] Fetch google contacts
- [x] Perform actions on contacts (email, phone call)
- [x] Add/Delete multiple comments for a particular contact
- [x] Other details include phone numbers, names, organizations and addresses

## Setup

Follow these steps to run locally
Prerequisites:

- [Node(12.13.0)](https://nodejs.org/en/blog/release/v12.13.0/)
- Npm
- Yarn `npm install --global yarn`

Steps for installation:

- `git clone REPO_LINK`
- `cd contact-book-client`
- `yarn install`
- `yarn start`

## Structure

The application is divided into separate directories as per their functionality.

### theme

This repository used [Material-UI](https://material-ui.com/). This directory creates a custom theme object to suit the overall visual appeal available across the app. Some of the styles include

- custom theme colours
- responsive fonts sizes for headers
- custom font families

### store

This directory contains our redux store. It is used to manage state across the application. Currently the application maintains user auth data across the application. We use two supporting packages along with redux

- `redux-thunk` - to support async calls to the server
- `redux-persist` - to persist data over window reload

The store is divided in to `actions` and `reducers` . We dispatch actions from our applications which invoke the respective reducers to carry out the required set of instructions.

### hooks

This directory contains all the custom hooks created to improve the reusability of code chunks. if a particular set of actions involving state is being used across the app, it is advisable to write a custom hook for it rather than writing redundant code.

#### Current custom hooks

1. useAxios
   - a custom hook created to make api calls to the server to fetch relevant data

### context

Event though we could have used to either the context API or redux to perform all the required task but it is better to separate concerns. So here Context API is used for client-only functions across the application and all the server-only functions are handled by Redux to maintain separation of concerns and make it future proof

### assets

This directory contains assets required on the client side. Currently it only has images but in future if we want distributed stylesheet, they should be created in this directory.

### components

#### Login

This component also serves as the landing page for new/logged out users. It contains the login button. Users can login using their google account

#### Loader

A custom loader component which takes props(types, qty) and renders custom loaders for different requirements

#### Header

Contains the header component and the Sidebar(for mobile).

#### Footer

Contains the footer component

#### Home

This is where the user is redirected after logging in. It renders a list of contacts user has in their google account. It can display an overview of each contact and provides the following actions

- write an email
- make a call( if number is present)
- add a comment

#### Details

This component renders all the details of the selected contact. This is where user can add comments to a particular contact along with the actions provided on the home.

#### utils

It contains all the utility components required at multiple places to carry out the same function and not necessarily require to use state like a custom hook.

- http - creates an axios instance with base url and cors headers for all the requests to the server
- PrivateRoute - creates a custom wrapper over Route from react-router allowing only authenticated users to visit that particular route.

### Required environment variables

- `REACT_APP_API_BASE_URL`
- `REACT_APP_GOOGLE_CLIENT_ID`
- `REACT_APP_GOOGLE_CLIENT_SECRET`
