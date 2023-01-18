
const notesContainer = document.getElementById('app');
const addNoteButton = notesContainer.querySelector('.add-note');


getNotes().forEach(note =>{
    const notesElement =   createNoteElement(note.id, note.content);
    notesContainer.insertBefore(notesElement, addNoteButton); 
});

addNoteButton.addEventListener("click", ()=>{
    addNote();
});
// hello world
// added
//Retrive all the existing notes from local storage in the client's browser
function getNotes(){
    return JSON.parse(localStorage.getItem("stickynotes-notes") || "[]");
}

// Save new notes on the local storage
function saveNotes(notes){
    localStorage.setItem("stickynotes-notes", JSON.stringify(notes))
}

//Build a new element to represent a note
function createNoteElement(id, content){
    const element = document.createElement("textarea");

    element.classList.add("note");
    element.value = content;
    element.placeholder = "Empty Note";

    element.addEventListener("change", ()=>{
        updateNote(id, element.value);
    });

    element.addEventListener("dblclick", ()=>{
        const doDelete = confirm("Are you sure you want to delete this note");

        if(doDelete){
            deleteNote(id, element);
        }
    })

    return element;

}

//Add new note and save to local storage
function addNote(){
    const notes = getNotes();
    const noteObjects = {
        id: Math.floor(Math.random() * 1000),
        content: ""
    };

    const notesElement = createNoteElement(noteObjects.id, noteObjects.content);
    notesContainer.insertBefore(notesElement, addNoteButton); 

    notes.push(noteObjects);
    saveNotes(notes);

}

//Update any existing note
function updateNote(id, newContent){
    const notes = getNotes();
    const targetNote = notes.filter(note => note.id == id)[0];
    
    targetNote.content = newContent;
    saveNotes(notes);
}

function deleteNote(id, element){
    const notes =getNotes().filter(notes => notes.id != id);
    saveNotes(notes);
    notesContainer.removeChild(element);
}