"use strict";
/*//////////////////////////////////
         POPSCRIPT LANGUAGE
              Message
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
var Message = /** @class */ (function () {
    function Message(message) {
        this.template = '[%date%] %message%';
        this.message = '';
        this.message = message;
    }
    Message.prototype.format = function () {
        var e_1, _a;
        var options = this.template.match(/%.*?%/g);
        try {
            for (var options_1 = __values(options), options_1_1 = options_1.next(); !options_1_1.done; options_1_1 = options_1.next()) {
                var option = options_1_1.value;
                option = option.slice(1, option.length - 1);
                switch (option.toLowerCase()) {
                    case 'date': {
                        var date = new Date();
                        this.template = this.template.replace(new RegExp('%' + option + '%', 'g'), Chalk.grey(date.getHours() + ':' + (date.getMinutes().toString().length === 1 ? ('0' + date.getMinutes().toString()) : date.getMinutes()) + ':' + (date.getSeconds().toString().length === 1 ? ('0' + date.getSeconds().toString()) : date.getSeconds())));
                        break;
                    }
                    case 'message': {
                        this.template = this.template.replace(new RegExp('%' + option + '%', 'g'), this.message);
                        break;
                    }
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (options_1_1 && !options_1_1.done && (_a = options_1["return"])) _a.call(options_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
        return this.template;
    };
    return Message;
}());
exports["default"] = Message;
