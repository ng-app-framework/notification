## Angular Module Example
![Travis CI](https://travis-ci.org/ng-app-framework/example.svg?branch=master)


### Mission Statement
In order to help the community (and myself of course) in building apps in a quick and painless fashion,
I have decided to work on an open source project to allow for quick building of angular libraries and apps.

This framework is to expand upon other technologies so we can develop useful tools for others to use.

### Instructions
#### For Development
- clone the repository
- run `npm install`
- put modules and angular code into the `src/app` folder
- put all test spec files and mocks into the `test` folder
- in the `src/app/index.ts` export each class/mock you want to allow external code to use
- update the `package.json` file with your module's name and such
- create new git repo for your module
- run `npm run package` so the module is bundled and ready to publish
- run `npm publish dist` so we get a npm package for that module

#### For Inclusion
- run `npm install @ng-app-framework/{module-name} --save-dev`
- you should be able to import any exported class from the module
