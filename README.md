[![Netlify Status](https://api.netlify.com/api/v1/badges/dee90550-b62d-4911-a451-0316afbd1e67/deploy-status)](https://app.netlify.com/sites/emtropy-gnews/deploys)

# :newspaper: :computer: G News Web Application

## Description

This application displays data about SpaceX rocket launches.

Using the Gnews API: <https://gnews.io/>.

**Emtropy React JS Coding Assignment
Problem statement:
Create a news articles listing website using React.js*

**Demo**
[demo](emtropy-gnews.netlify.app)


Built with:

- [React](https://reactjs.org/)
- [React-Router-Dom](https://www.npmjs.com/package/react-router-dom)
- [Styled-COmponents](https://styled-components.com/)
- [react-cool-img](https://www.npmjs.com/package/react-cool-img)
- [React-Redux](https://redux.js.org/)


Hosted on:
- [Netlify](https://www.netlify.com/)


> Desktop Version

![Desktopdemo](https://github.com/akhilbharti/emtropy/blob/master/desktop.png)

> Mobile Version

 ![Mobiledemo](https://github.com/akhilbharti/spacex-assignment/blob/master/2.png)

> LightHouse Score(Desktop)

 ![DesktopLightHouse](https://github.com/akhilbharti/spacex-assignment/blob/master/3.png)

### Features of application

* Application Fetches News Headlines details when app is initialized based on the selected Category
* Styled-Components library are used to create the components-level styles.
* Responsive UI for all kind of device
* A searchBar is created to get the search result of news headlines
* Hide functionality to remove the news card from the user's view
* Like functionality to like any news article
* ALL MODIFIED DATA like hide and likes – should be persisted and should not reset on browser refresh


### Development Approach

* Used Functional Components with Hooks
* Redux is used to maintain single source of truth and persistence of likes and hide articles is made in the store itself.
* Sending API calls ony when topic changes
* Used React lazy and Suspense for code spliting on component level with dynamic imports

### Performance optimization

* lazy loading of Images implemented for each news article
* Memoiztion of Components added, 
* Avoided unncessary API call by saving news for the same topic in localstorage.
* Virtualization of articles card added to avoid creation of unnecessary dom-nodes in dom-node-tree.

## Getting Started

1. Clone the Repo

   ```bash
   git clone https://github.com/akhilbharti/emtropy.git 
     ```

2. Install dependencies

   ```bash
   yarn
   ```

3. Fire up the server and watch files

   ```bash
   yarn start
   ```

