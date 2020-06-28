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

export default class CLI {

    private readonly arguments : Array<string> = process.argv.slice(2)
    private readonly folder    : string        = process.cwd()

    constructor () {}

    private input () {
        
        const prompt = new Prompt({
            prefix: '>>>',
            suffix: '',
            prefixTheme: Prompt.chalk.grey
        })
        
        prompt.ask('', (err, res) => {
            if (err) return console.error(err)
            process.stdout.write(Chalk.grey('Output: '))
            new Popscript().text(res, () => {})
            this.input()
        })

    }

    public init () {

        if (this.arguments.filter(x => ['--input', '-input', '-i', '--i'].includes(x)).length > 0) {
            const index = this.arguments.findIndex(x => ['--input', '-input', '-i', '--i'].includes(x)),
                  input = this.arguments.slice(index + 1, index + 2).length > 0 ? this.arguments.slice(index + 1, index + 2)[0] : undefined
            if (!input) throw new Error('No files were specified!')
            
            FS.exists(PATH.join(this.folder, input), bool => {
                if (!bool) throw new Error('File specified does not exist!')
                if (this.arguments.filter(x => ['--watch', '-watch', '--w', '-w'].includes(x)).length > 0) {
                    const listener = Chokidar.watch(PATH.join(this.folder, PATH.dirname(input)), {})
                    const date     = new Date()
                    console.log('[' + Chalk.grey(date.getHours() + ':' + (date.getMinutes().toString().length === 1 ? ('0' + date.getMinutes().toString()) : date.getMinutes()) + ':' + (date.getSeconds().toString().length === 1 ? ('0' + date.getSeconds().toString()) : date.getSeconds())) + '] Popscript watch mode started on ' + Chalk.grey(PATH.basename(input)) + '.')
                    listener.on('change', path => {
                        const date = new Date()
                        console.log('[' + Chalk.grey(Chalk.grey((date.getHours().toString().length === 1 ? ('0' + date.getHours().toString()) : date.getHours()))  + ':' + (date.getMinutes().toString().length === 1 ? ('0' + date.getMinutes().toString()) : date.getMinutes()) + ':' + (date.getSeconds().toString().length === 1 ? ('0' + date.getSeconds().toString()) : date.getSeconds())) + '] Popscript execution started in watch mode...')
                        process.stdout.write(Chalk.grey('Output: '))
                        new Popscript().file(path, () => {
                            const date = new Date()
                            console.log('[' + Chalk.grey((date.getHours().toString().length === 1 ? ('0' + date.getHours().toString()) : date.getHours()) + ':' + (date.getMinutes().toString().length === 1 ? ('0' + date.getMinutes().toString()) : date.getMinutes()) + ':' + (date.getSeconds().toString().length === 1 ? ('0' + date.getSeconds().toString()) : date.getSeconds())) + '] Popscript execution finished.\n')
                        })
                    })
                } else {
                    const date = new Date()
                    console.log('[' + Chalk.grey((date.getHours().toString().length === 1 ? ('0' + date.getHours().toString()) : date.getHours()) + ':' + (date.getMinutes().toString().length === 1 ? ('0' + date.getMinutes().toString()) : date.getMinutes()) + ':' + date.getSeconds()) + '] Popscript execution started...')
                    process.stdout.write(Chalk.grey('Output: '))
                    new Popscript().file(PATH.join(this.folder, input), () => {
                        const date = new Date()
                        console.log('[' + Chalk.grey((date.getHours().toString().length === 1 ? ('0' + date.getHours().toString()) : date.getHours()) + ':' + (date.getMinutes().toString().length === 1 ? ('0' + date.getMinutes().toString()) : date.getMinutes()) + ':' + (date.getSeconds().toString().length === 1 ? ('0' + date.getSeconds().toString()) : date.getSeconds())) + '] Popscript execution finished.\n')
                    })
                }
            })
            
        } else if (this.arguments.length === 0) {

            this.input()

        }

    }

}

new CLI().init()