let additionButton = document.getElementById('addTheNote');
var noteTitle = document.getElementById('noteTitle').value;
var noteText = document.getElementById('noteText').value;
const myNotes = JSON.parse(localStorage.getItem("newNote" || "[]"));
let notes ;
var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
var elementId;
console.log(document.getElementById("notesContainer").offsetHeight);
// Click on a (X) button to hide the current note item
if(localStorage.getItem("newNote")=== null){
    notes = [];
    elementId = 0;
}else{
    notes = myNotes;
    console.log(notes)
    createNewNote();
    if(notes.length === 0){
        elementId = notes.length;
    }else{
        elementId = notes.length;
    } 
}
if (localStorage.getItem("titleValue") != " ") {
    document.getElementById('noteTitle').value = localStorage.getItem("titleValue");
    document.getElementById('noteText').value = localStorage.getItem("bodyValue");
} else {
    document.getElementById('noteTitle').value = "";
    document.getElementById('noteText').value = "";
}
// add note to my notes div
function addToBody() {
    if(document.getElementById('noteTitle').value != "" && document.getElementById('noteText').value != ""){
        let title = document.getElementById('noteTitle').value;
        let text = document.getElementById('noteText').value;
        let myDate = new Date();
        let month = months[myDate.getMonth()];
        let day = myDate.getDate()
        let year = myDate.getFullYear();
        let currentTimeHour = myDate.getHours();
        let currentTimeMin = myDate.getMinutes();
        let myNoteInformation = {
            notetitle : title ,
            notetext: text,
            notedate: `Last Edit On:  ${day} ${month} ${year} AT  ${currentTimeHour} : ${currentTimeMin}`,
            noteId : elementId,
        } 
        notes.push(myNoteInformation);
        localStorage.setItem("newNote",JSON.stringify(notes));
        let div = document.createElement("div");
        div.innerHTML = 
        `<div class="mynoteHead"><h4>${title}</h4><span id="cancel">&#128473;</span></div>
        <p>${text}</p>
        <div class="note__adds__mynote__date">
            <span>Last Edit On:  ${ day } ${ month } ${ year } AT  ${ currentTimeHour } : ${ currentTimeMin }</span>
            <span id="edit"><i class="fa-solid fa-pen"></i></span>
        </div>`
        div.setAttribute("id",elementId)
        document.getElementById('noteTitle').value = "";
        document.getElementById('noteText').value = "";
        div.classList.add("note__adds__mynote");
        div.setAttribute("id",elementId);
        document.getElementById("notes").insertBefore(div,document.getElementById("notes").childNodes[0]);
        var cancle = document.getElementById("cancel");
        var updatebutton = document.getElementById("edit")
        let divId = Number(div.getAttribute("id"));
        let index;
        cancle.onclick=()=>{
            div.remove();
            for(let i = 0; i<notes.length;i++){
                if(divId == notes[i].noteId){
                    index = i;
                    break
                }
            }
            notes.splice(index, 1);
            localStorage.setItem("newNote",JSON.stringify(notes));
        }
        updatebutton.onclick = () => {
            if(additionButton.value == "update the note"){
                alert("you are update more than two notes in the same time please update current note first");
            }else{
                for(let i = 0; i<notes.length;i++){
                    if(divId == notes[i].noteId){
                        index = i;
                        break
                    }
                }
                document.getElementById('noteTitle').value = notes[index].notetitle;
                document.getElementById('noteText').value = notes[index].notetext;
                localStorage.setItem("titleValue", notes[index].notetitle);
                localStorage.setItem("bodyValue", notes[index].notetext);
                div.remove();
                notes.splice(index, 1);
                localStorage.setItem("newNote",JSON.stringify(notes));
                additionButton.value="update the note"
            }
        }
    }else{
        alert("you can't add this empty note");
    }
    elementId++;
}




additionButton.onclick= ()=>{
    addToBody()
    additionButton.value="add new note";
    localStorage.setItem("titleValue", " ");
    localStorage.setItem("bodyValue", " ");
};

function createNewNote(){
    myNotes.forEach((note) => {
        let div = document.createElement("div");
        div.innerHTML = 
        
        `<div class="mynoteHead"><h4>${note.notetitle}</h4><span id="cancel">&#128473;</span></div>
        <p>${note.notetext}</p>
        <div class="note__adds__mynote__date">
            <span>${note.notedate}</span>
            <span id="edit"><i class="fa-solid fa-pen"></i></span>
        </div>`
        document.getElementById('noteTitle').value = "";
        document.getElementById('noteText').value = "";
        div.classList.add("note__adds__mynote");
        div.setAttribute("id",Number(note.noteId))
        document.getElementById("notes").insertBefore(div,document.getElementById("notes").childNodes[0]);
        var cancle = document.getElementById("cancel");
        var updatebutton = document.getElementById("edit")
        let divId = Number(div.getAttribute("id"));
        let index;
        cancle.onclick=()=>{
            div.remove();
            for(let i = 0; i<notes.length;i++){
                if(divId == notes[i].noteId){
                    index = i;
                    break
                }
            }
            notes.splice(index, 1);
            localStorage.setItem("newNote",JSON.stringify(notes));
        }
        updatebutton.onclick = () => {
            if(additionButton.value == "update the note"){
                alert("you are update more than two notes in the same time please update current note first");
            }else{
                for(let i = 0; i<notes.length;i++){
                    if(divId == notes[i].noteId){
                        index = i;
                        break
                    }
                }
                document.getElementById('noteTitle').value = notes[index].notetitle;
                document.getElementById('noteText').value = notes[index].notetext;
                localStorage.setItem("titleValue", notes[index].notetitle);
                localStorage.setItem("bodyValue", notes[index].notetext);
                div.remove();
                notes.splice(index, 1);
                localStorage.setItem("newNote",JSON.stringify(notes));
                additionButton.value="update the note"
            }
        }
    });
}
// localStorage.clear();
