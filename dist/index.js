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
var Chalk = require("chalk");
var message_1 = require("./lib/message");
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
            prefixTheme: Prompt.chalk.grey
        });
        prompt.ask('', function (error, response) {
            if (error)
                return console.log(new message_1["default"](error).format());
            process.stdout.write('>' + Chalk.grey(' Output: '));
            new core_1["default"]().text(response, function () { });
            _this.input();
        });
    };
    CLI.prototype.init = function () {
        var _this = this;
        if (this.arguments.filter(function (x) { return ['--input', '-input', '-i', '--i'].includes(x); }).length > 0) {
            var index = this.arguments.findIndex(function (x) { return ['--input', '-input', '-i', '--i'].includes(x); }), input_1 = this.arguments.slice(index + 1, index + 2).length > 0 ? this.arguments.slice(index + 1, index + 2)[0] : undefined;
            if (!input_1)
                return console.log(new message_1["default"]('No files were specified.').format());
            FS.exists(PATH.join(this.folder, input_1), function (bool) {
                if (!bool)
                    return console.log(new message_1["default"]('File specified does not exists.').format());
                if (_this.arguments.filter(function (x) { return ['--watch', '-watch', '--w', '-w'].includes(x); }).length > 0) {
                    var listener = Chokidar.watch(PATH.join(_this.folder, PATH.dirname(input_1)), {});
                    console.log(new message_1["default"]('Popscript watch mode started on ' + Chalk.grey(PATH.basename(input_1)) + '.').format());
                    listener.on('change', function (path) {
                        console.log(new message_1["default"]('Popscript execution started in watch mode...').format());
                        process.stdout.write(Chalk.grey('Output: '));
                        new core_1["default"]().file(path, function () {
                            console.log(new message_1["default"]('Popscript execution finished.\n').format());
                        });
                    });
                }
                else {
                    console.log(new message_1["default"]('Popscript execution started...').format());
                    process.stdout.write('>' + Chalk.grey(' Output: '));
                    new core_1["default"]().file(PATH.join(_this.folder, input_1), function () {
                        console.log(new message_1["default"]('Popscript execution finished.\n').format());
                    });
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
