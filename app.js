const chalk = require('chalk')
const yargs = require('yargs')
const notes = require('./notes.js')

yargs.version('1.0.0')

yargs.command({
    command: 'add',
    describe: 'Add a new note',
    builder: {
        title: {
            describe: 'Note title',
            demandOption: true,
            type: 'string'

        },
        body: {
            describe: 'Note body',
            demandOption: true,
            type: 'string'
        }

    },
    handler(argv) {
        notes.addNote(argv.title, argv.body)
    }
})

yargs.command({
    command: 'remove',
    describe: 'remove a note',
    builder: {
        title: {
            describe: 'note title to be removed',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv) {
        notes.deleteNote(argv.title)
    }
})

yargs.command({
    command: 'list',
    describe: 'listing all the notes',
    handler() {
        notes.listNotes()
    }
})

yargs.command({
    command: 'read',
    describe: 'reading a certain note',
    builder: {
        title: {
            describe: "Read note",
            demandOption: true,
            type: 'string'

        }
    },
    handler(argv) {
        notes.readNote(argv.title)
    }
})
yargs.parse()