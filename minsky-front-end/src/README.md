# Minsky-front-end

For how to write tests see
<https://journal.artfuldev.com/unit-testing-node-applications-with-typescript-using-mocha-and-chai-384ef05f32b2>

<https://www.chaijs.com/api/bdd/>

Imports and modules
<https://medium.com/@mattlag/es6-modules-getting-started-gotchas-2ad154f38e2e>

Mocking DOM
<https://github.com/jsdom/jsdom>

## Dependencies

Unit testing requires additional node libraries that are installed using commands like this -

```sh
npm install chai mocha ts-node @types/chai @types/mocha --save-dev
```

Note the use of ```--save-dev``` to ensure these dependencies are added to the ```package.json``` manifest.

## Mocks

As this Typescript code is to be run in the browser it has some dependencies on the content of the webpage it will be run on.  This is handled for us in the tests by ```jsdom```.

Note that the Typescript type checker requires further modules,with names such as ```@types/jsdom``` to be installed.  At the present time is appears that latest version of some of these modules are not compatible with each other.  I found that specifying  ```parse5@4.0.0 @types/parse5@4.0.0``` fixed this problem for me.


## Code structure

At present there is one large Typescript file with all classes.  A modular approach would be better.  Consider using Webpack.
