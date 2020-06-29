#!/usr/bin/env node
/*//////////////////////////////////
         POPSCRIPT LANGUAGE
                Main
//////////////////////////////////*/

import * as PATH from 'path'
import * as FS   from 'fs'
import Message   from './lib/message'

export default class CLI {

    private readonly arguments : Array<string> = process.argv.slice(2)
    private readonly folder    : string        = process.cwd()

    constructor () {}

    public init () {

        FS.exists(PATH.join(__dirname, 'commands'), (boolean: Boolean) => {
            if (!boolean) return console.log(new Message('CLI commands folder does not exist!').format())
            FS.readdir(PATH.join(__dirname, 'commands'), (error: Error, content: Array<string>) => {
                if (error) throw error
                content = content.map(x => PATH.join(__dirname, 'commands', x))
                for (const index in this.arguments) {
                    const argument = this.arguments[index]
                    if (argument.match(/^(--|-)/g)) {
                        const match = content.map(x => PATH.basename(x).replace('.js', '')).filter(x => x === argument.replace(/^(--|-)/g, ''))
                        if (match) {
                            import(PATH.join(__dirname, 'commands', match[0] + '.js')).then(value => {
                                const command = new value.default({
                                    value     : this.arguments[parseInt(index) + 1],
                                    arguments : this.arguments
                                })
                                command.exec()
                            })
                        }
                    }
                }
                
            })
        })

    }

}

new CLI().init()