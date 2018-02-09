const { presets, tasks, builder } = require('dope-builder')

const vendors = {
  "externalModules": [
  	'redux',
  	'moment',
  	'eventemitter3',
  	'seamless-immutable',
  ]
}

const config = {
	browserify:{
		vendors,
		dev:{ 
			files: {dest: 'dist/app.min.js', src: 'src/js/main.js'}
		}
	}
}

module.exports = function (grunt) {
  builder(grunt, presets.widget(config))
}
