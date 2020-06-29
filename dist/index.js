#!/usr/bin/env node
"use strict";
/*//////////////////////////////////
         POPSCRIPT LANGUAGE
                Main
//////////////////////////////////*/
exports.__esModule = true;
var PATH = require("path");
var FS = require("fs");
var message_1 = require("./lib/message");
var CLI = /** @class */ (function () {
    function CLI() {
        this.arguments = process.argv.slice(2);
        this.folder = process.cwd();
    }
    CLI.prototype.init = function () {
        var _this = this;
        FS.exists(PATH.join(__dirname, 'commands'), function (boolean) {
            if (!boolean)
                return console.log(new message_1["default"]('CLI commands folder does not exist!').format());
            FS.readdir(PATH.join(__dirname, 'commands'), function (error, content) {
                if (error)
                    throw error;
                content = content.map(function (x) { return PATH.join(__dirname, 'commands', x); });
                var _loop_1 = function (index) {
                    var argument = _this.arguments[index];
                    if (argument.match(/^(--|-)/g)) {
                        var match = content.map(function (x) { return PATH.basename(x).replace('.js', ''); }).filter(function (x) { return x === argument.replace(/^(--|-)/g, ''); });
                        if (match) {
                            Promise.resolve().then(function () { return require(PATH.join(__dirname, 'commands', match[0] + '.js')); }).then(function (value) {
                                var command = new value["default"]({
                                    value: _this.arguments[parseInt(index) + 1],
                                    arguments: _this.arguments
                                });
                                command.exec();
                            });
                        }
                    }
                };
                for (var index in _this.arguments) {
                    _loop_1(index);
                }
            });
        });
    };
    return CLI;
}());
exports["default"] = CLI;
new CLI().init();
