#!/usr/bin/env node
"use strict";
/*//////////////////////////////////
         POPSCRIPT LANGUAGE
                Main
//////////////////////////////////*/
exports.__esModule = true;
var core_1 = require("@popscript/core");
var PATH = require("path");
var FS = require("fs");
var Chokidar = require("chokidar");
var Prompt = require("prompt-improved");
var CLI = /** @class */ (function () {
    function CLI() {
        this.arguments = process.argv.slice(2);
        this.folder = process.cwd();
    }
    CLI.prototype.input = function () {
        var _this = this;
        var prompt = new Prompt({
            prefix: '>>>',
            suffix: '',
            prefixTheme: Prompt.chalk.green
        });
        prompt.ask('', function (err, res) {
            if (err)
                return console.error(err);
            new core_1["default"]().text(res);
            _this.input();
        });
    };
    CLI.prototype.init = function () {
        var _this = this;
        if (this.arguments.filter(function (x) { return ['--input', '-input', '-i', '--i'].includes(x); }).length > 0) {
            var index = this.arguments.findIndex(function (x) { return ['--input', '-input', '-i', '--i'].includes(x); }), input_1 = this.arguments.slice(index + 1, index + 2).length > 0 ? this.arguments.slice(index + 1, index + 2)[0] : undefined;
            if (!input_1)
                throw new Error('No files were specified!');
            FS.exists(PATH.join(this.folder, input_1), function (bool) {
                if (!bool)
                    throw new Error('File specified does not exist!');
                if (_this.arguments.filter(function (x) { return ['--watch', '-watch', '--w', '-w'].includes(x); }).length > 0) {
                    var listener = Chokidar.watch(PATH.join(_this.folder, PATH.dirname(input_1)), {});
                    listener.on('change', function (path) {
                        new core_1["default"]().file(path);
                    });
                }
                else {
                    new core_1["default"]().file(PATH.join(_this.folder, input_1));
                }
            });
        }
        else if (this.arguments.length === 0) {
            this.input();
        }
    };
    return CLI;
}());
exports["default"] = CLI;
new CLI().init();
