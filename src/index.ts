#!/usr/bin/env node
/*//////////////////////////////////
         POPSCRIPT LANGUAGE
                Main
//////////////////////////////////*/

import Popscript from '@popscript/core'
import * as PATH from 'path'
import * as FS   from 'fs'

export default class CLI {

    private readonly arguments : Array<string> = process.argv.slice(2)
    private readonly folder    : string        = process.cwd()

    constructor () {}

    public init () {

        if (this.arguments.filter(x => ['--input', '-input', '-i', '--i'].includes(x)).length > 0) {
            const index = this.arguments.findIndex(x => ['--input', '-input', '-i', '--i'].includes(x)),
                  input = this.arguments.slice(index + 1, index + 2).length > 0 ? this.arguments.slice(index + 1, index + 2)[0] : undefined
            if (!input) throw new Error('No files were specified!')
            
            FS.exists(PATH.join(this.folder, input), bool => {
                if (!bool) throw new Error('File specified does not exist!')
                new Popscript().file(PATH.join(this.folder, input))
            })
            
        }

    }

}

new CLI().init()