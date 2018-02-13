const { presets, tasks, builder } = require('dope-builder')

const vendors = {
  "externalModules": [
    // 'moment',
    // 'redux',
    // 'seamless-immutable',
    // 'eventemitter3',
    'pixi.js',
    'pixi-animate',
  ]
}

const config = {
  browserify:{
    vendors,
    dev:{ 
      files: {dest: 'dist/app.min.js', src: 'src/js/main.js'}
    },
    standalone: 'tournaments',
  }
}

module.exports = function (grunt) {
  builder(grunt, presets.game(config))
}
