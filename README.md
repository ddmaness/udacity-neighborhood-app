# [Udacity Neighborhood Map](http://mexican-food-roanoke.surge.sh/)

This app was created as my final project for Udacity's Front-End Nanodegree program.

## Functionality

This app makes and API call to Yelp's Fusion API for Mexican restaurants in Roanoke, VA. Then uses the
results of this API call to populate a map with markers using Google's Google Maps API and populates
the info windows of these markers with information taken from the initial Yelp Fusion API call.

The results can be filtered by both price and average rating.

## How to Run App

First download or fork and clone this repository. In the project folder and run `npm install` to download all required dependencies. then run `npm start` to run the development build of the app or `npm run build` for the production build. 

## Dependencies

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
It makes use of both the [Yelp Fusion](https://www.yelp.com/developers/documentation/v3/get_started) and
[Google Maps](https://developers.google.com/maps/documentation/) as well as [CORS Anywhere](https://cors-anywhere.herokuapp.com/) for use of the Yelp Fusion API which does not have CORS enabled. The font used in this project is "Roboto" from Google Fonts.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

This application makes use of Service Workers but this functionality is only available in its production
build.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
