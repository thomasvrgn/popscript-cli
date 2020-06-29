/*//////////////////////////////////
         POPSCRIPT LANGUAGE
              Help
//////////////////////////////////*/

import * as Chalk from 'chalk'
import * as PATH  from 'path'
import * as FS    from 'fs'
import Message    from '../lib/message'

export default class Help {

    private value       : string        = ''
    private arguments   : Array<string> = []
    private description : string        = 'Show help informations.'
    private usage       : string        = '--help, -help, --h, -h'

    constructor (options = {
        value     : '',
        arguments : []
    }) {

        this.value     = options.value
        this.arguments = options.arguments

    }

    public exec () : void {
        if (this.value) {
            FS.exists(PATH.join(__dirname), (boolean: Boolean) => {
                if (!boolean) console.log(new Message('Commands folder does not exists!'))
                import(PATH.join(__dirname, this.value)).then(value => {
                    const command = new value.default(),
                          name    = PATH.basename(this.value).replace('.js', '')

                    console.log(Chalk.red.bold('POPSCRIPT:\n'))
                    console.log(Chalk.red('  • ') + Chalk.bold(name.slice(0, 1).toUpperCase() + name.slice(1)))
                    console.log('    - Description: ' + command.description)
                    console.log('    - Usage: ' + command.usage.split(', ').map(x => Chalk.grey(x)).join(', '))
                    console.log('\n')
                }).catch((error: Error) => {
                    console.log(new Message('Commands ' + this.value + ' does not exists!').format())
                })
            })
        } else {
            FS.exists(PATH.join(__dirname), (boolean: Boolean) => {
                if (!boolean) console.log(new Message('Commands folder does not exists!'))
                FS.readdir(PATH.join(__dirname), (error: Error, content: Array<string>) => {
                    if (error) console.log(new Message('Commands folder does not exists!'))
                    content = content.map(x => PATH.join(__dirname, x))
                    console.log(Chalk.red.bold('POPSCRIPT:\n'))
                    for (const file of content) {
                        import(file).then(value => {
                            const command = new value.default(),
                                  name    = PATH.basename(file).replace('.js', '')
    
                            console.log(Chalk.red('  • ') + Chalk.bold(name.slice(0, 1).toUpperCase() + name.slice(1)))
                            console.log('    - Description: ' + command.description)
                            console.log('    - Usage: ' + command.usage.split(', ').map(x => Chalk.grey(x)).join(', '))
                            console.log('\n')
                        })
                    }
                })
            })
        }
        

    }

}