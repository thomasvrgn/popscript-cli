/*//////////////////////////////////
         POPSCRIPT LANGUAGE
              Message
//////////////////////////////////*/

import * as Chalk from 'chalk'

export default class Message {

    private template : string = '[%date%] %message%'
    private message  : string = ''

    constructor (message) {

        this.message = message

    }

    public format () {

        const options = this.template.match(/%.*?%/g)

        for (let option of options) {

            option = option.slice(1, option.length - 1)
            
            switch (option.toLowerCase()) {

                case 'date': {
                    const date = new Date()
                    this.template = this.template.replace(new RegExp('%' + option + '%', 'g'), Chalk.grey(date.getHours() + ':' + (date.getMinutes().toString().length === 1 ? ('0' + date.getMinutes().toString()) : date.getMinutes()) + ':' + (date.getSeconds().toString().length === 1 ? ('0' + date.getSeconds().toString()) : date.getSeconds())))
                    break
                }

                case 'message': {
                    this.template = this.template.replace(new RegExp('%' + option + '%', 'g'), this.message)
                    break
                }

            }

        }
        
        return this.template

    }

}