const fs = require('fs')
const chalk = require('chalk')

const listNotes = () => {
    const notes = loadNotes()
    if (notes.length === 0) {
        console.log(chalk.red.inverse("No notes to list"))
    } else {
        console.log(chalk.blue.inverse("Your notes"))
        notes.forEach((note) => console.log(chalk.white.inverse("Note title => " + note.title)))
    }

}

const readNote = (title) => {
    const notes = loadNotes()
    const noteToRead = notes.find((note) => note.title === title)
    if (noteToRead) {
        console.log(chalk.blue.inverse(noteToRead.title))
        console.log(chalk.white.inverse(noteToRead.body))
    } else {
        console.log(chalk.red.inverse("No note found!"))
    }
}

const deleteNote = (title) => {
    const notes = loadNotes()
    const notesToKeep = notes.filter((note) => note.title !== title)
    if (notesToKeep.length === notes.length) {
        console.log(chalk.inverse.red('No note found!'))
    } else {
        saveNotes(notesToKeep)
        console.log(chalk.inverse.green('Note deleted successfuly!'))
    }

}

const addNote = (title, body) => {
    const notes = loadNotes()
    const duplicateNote = notes.find((note) => note.title === title)

    if (!duplicateNote) {
        notes.push({
            title: title,
            body: body
        })
        saveNotes(notes)
        console.log(chalk.green.inverse('New note added!'))
    } else {
        console.log(chalk.red.inverse('Note title taken!'))
    }
}

const saveNotes = (notes) => {
    const dataJSON = JSON.stringify(notes)
    fs.writeFileSync('notes.json', dataJSON)

}
const loadNotes = () => {
    try {
        const bufferNotes = fs.readFileSync('notes.json')
        const dataJSON = bufferNotes.toString()
        return JSON.parse(dataJSON)
    } catch (error) {
        return []
    }

}

module.exports = {
    addNote: addNote,
    deleteNote: deleteNote,
    listNotes: listNotes,
    readNote: readNote
}