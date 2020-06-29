#!/usr/bin/env node
/*//////////////////////////////////
         POPSCRIPT LANGUAGE
                Main
//////////////////////////////////*/

import Popscript     from '@popscript/core'
import * as PATH     from 'path'
import * as FS       from 'fs'
import * as Chokidar from 'chokidar'
import * as Prompt   from 'prompt-improved'
import * as Chalk    from 'chalk'
import Message       from './lib/message'

export default class CLI {

    private readonly arguments : Array<string> = process.argv.slice(2)
    private readonly folder    : string        = process.cwd()

    constructor () {}

    private input () {
        
        const prompt = new Prompt({
            prefix      : '>>>',
            suffix      : '',
            prefixTheme : Prompt.chalk.grey
        })
        
        prompt.ask('', (error, response) => {
            if (error) return console.log(new Message(error).format())
            process.stdout.write('>' + Chalk.grey(' Output: '))
            new Popscript().text(response, () => {})
            this.input()
        })

    }

    public init () {

        if (this.arguments.filter(x => ['--input', '-input', '-i', '--i'].includes(x)).length > 0) {

            const index = this.arguments.findIndex(x => ['--input', '-input', '-i', '--i'].includes(x)),
                  input = this.arguments.slice(index + 1, index + 2).length > 0 ? this.arguments.slice(index + 1, index + 2)[0] : undefined
            
            if (!input) return console.log(new Message('No files were specified.').format())
            
            FS.exists(PATH.join(this.folder, input), bool => {

                if (!bool) return console.log(new Message('File specified does not exists.').format())

                if (this.arguments.filter(x => ['--watch', '-watch', '--w', '-w'].includes(x)).length > 0) {

                    const listener = Chokidar.watch(PATH.join(this.folder, PATH.dirname(input)), {})

                    console.log(new Message('Popscript watch mode started on ' + Chalk.grey(PATH.basename(input)) + '.').format())

                    listener.on('change', path => {
                        console.log(new Message('Popscript execution started in watch mode...').format())
                        process.stdout.write(Chalk.grey('Output: '))

                        new Popscript().file(path, () => {
                            console.log(new Message('Popscript execution finished.\n').format())
                        })

                    })

                } else {

                    console.log(new Message('Popscript execution started...').format())
                    process.stdout.write('>' + Chalk.grey(' Output: '))

                    new Popscript().file(PATH.join(this.folder, input), () => {
                        console.log(new Message('Popscript execution finished.\n').format())
                    })

                }
            })
            
        } else if (this.arguments.length === 0) {

            this.input()

        }

    }

}

new CLI().init()