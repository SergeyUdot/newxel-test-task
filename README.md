## Test task for Newxel

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `yarn build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

## Description

In the "real" project it's better to handle the data on the backend. <br>
Frontend should only send some requests with params to backend and get sorted or paginated data. <br>
For example: send request to /get-data?page=2 and get data for second page.<br>
The whole data (with more than 2000 rows) should not be loaded at once.
