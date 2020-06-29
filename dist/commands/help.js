"use strict";
/*//////////////////////////////////
         POPSCRIPT LANGUAGE
              Help
//////////////////////////////////*/
var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
exports.__esModule = true;
var Chalk = require("chalk");
var PATH = require("path");
var FS = require("fs");
var message_1 = require("../lib/message");
var Help = /** @class */ (function () {
    function Help(options) {
        if (options === void 0) { options = {
            value: '',
            arguments: []
        }; }
        this.value = '';
        this.arguments = [];
        this.description = 'Show help informations.';
        this.usage = '--help, -help, --h, -h';
        this.value = options.value;
        this.arguments = options.arguments;
    }
    Help.prototype.exec = function () {
        var _this = this;
        if (this.value) {
            FS.exists(PATH.join(__dirname), function (boolean) {
                if (!boolean)
                    console.log(new message_1["default"]('Commands folder does not exists!'));
                Promise.resolve().then(function () { return require(PATH.join(__dirname, _this.value)); }).then(function (value) {
                    var command = new value["default"](), name = PATH.basename(_this.value).replace('.js', '');
                    console.log(Chalk.red.bold('POPSCRIPT:\n'));
                    console.log(Chalk.red('  • ') + Chalk.bold(name.slice(0, 1).toUpperCase() + name.slice(1)));
                    console.log('    - Description: ' + command.description);
                    console.log('    - Usage: ' + command.usage.split(', ').map(function (x) { return Chalk.grey(x); }).join(', '));
                    console.log('\n');
                })["catch"](function (error) {
                    console.log(new message_1["default"]('Commands ' + _this.value + ' does not exists!').format());
                });
            });
        }
        else {
            FS.exists(PATH.join(__dirname), function (boolean) {
                if (!boolean)
                    console.log(new message_1["default"]('Commands folder does not exists!'));
                FS.readdir(PATH.join(__dirname), function (error, content) {
                    var e_1, _a;
                    if (error)
                        console.log(new message_1["default"]('Commands folder does not exists!'));
                    content = content.map(function (x) { return PATH.join(__dirname, x); });
                    console.log(Chalk.red.bold('POPSCRIPT:\n'));
                    var _loop_1 = function (file) {
                        Promise.resolve().then(function () { return require(file); }).then(function (value) {
                            var command = new value["default"](), name = PATH.basename(file).replace('.js', '');
                            console.log(Chalk.red('  • ') + Chalk.bold(name.slice(0, 1).toUpperCase() + name.slice(1)));
                            console.log('    - Description: ' + command.description);
                            console.log('    - Usage: ' + command.usage.split(', ').map(function (x) { return Chalk.grey(x); }).join(', '));
                            console.log('\n');
                        });
                    };
                    try {
                        for (var content_1 = __values(content), content_1_1 = content_1.next(); !content_1_1.done; content_1_1 = content_1.next()) {
                            var file = content_1_1.value;
                            _loop_1(file);
                        }
                    }
                    catch (e_1_1) { e_1 = { error: e_1_1 }; }
                    finally {
                        try {
                            if (content_1_1 && !content_1_1.done && (_a = content_1["return"])) _a.call(content_1);
                        }
                        finally { if (e_1) throw e_1.error; }
                    }
                });
            });
        }
    };
    return Help;
}());
exports["default"] = Help;
