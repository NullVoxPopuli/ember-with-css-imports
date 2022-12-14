'use strict';

const path = require('path');

const EmberApp = require('ember-cli/lib/broccoli/ember-app');

module.exports = function (defaults) {
  const packageJson = require('./package.json');

  let app = new EmberApp(defaults, {
    autoImport: {
      watchDependencies: ['ember-with-css-imports'],
      webpack: {
        module: {
          rules: [
            {
              test: /\.css$/i,
              include: [
                ...Object.keys(packageJson.dependencies)
                  .map((depName) => {
                    if (depName.includes('moment')) return;

                    return path.dirname(require.resolve(depName));
                  })
                  .filter(Boolean),
              ],
              use: ['style-loader', 'css-loader'],
            },
          ],
        },
      },
    },
  });

  const { maybeEmbroider } = require('@embroider/test-setup');
  return maybeEmbroider(app);
};
