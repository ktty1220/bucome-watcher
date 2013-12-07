#!/usr/bin/env coffee

fs = require 'fs'
coffee = require 'coffee-script'
uglify = require 'uglify-js'
{argv} = require 'optimist'
watch = require 'nodewatch'

jsDir = './js'
outJs = 'app.js'
minifyJs = (filename, src) -> "/* #{filename} */\n#{uglify.minify(src, fromString: true).code}\n"
buildJs = (cb) ->
  outCode = "var __DEBUG__ = #{(argv.debug?).toString()};\n"
  fs.readdir jsDir, (err, files) ->
    files.sort()
    coffeeList = []
    jsList = []
    for f in files
      coffeeList.push f if /\.coffee$/i.test f
      jsList.push f if /\.js$/i.test(f) and f isnt outJs
    for js in jsList
      outCode += minifyJs js, fs.readFileSync("#{jsDir}/#{js}", 'utf8')
    for cf in coffeeList
      try
        jsSrc = coffee.compile fs.readFileSync("#{jsDir}/#{cf}", 'utf8'), bare: false
      catch e
        return cb e
      outCode += minifyJs cf, jsSrc
    fs.writeFileSync "#{jsDir}/#{outJs}", outCode, 'utf8'
    cb()

buildJs (err) ->
  console.log err if err?
  process.exit() unless argv.w

  watch.add(jsDir).onChange (file, prev, curr, action) ->
    f = file.match /[\\\/]([^\\\/]+)$/
    return if f[1] is outJs
    buildJs (err) -> console.log err ? "#{outJs} updated"
