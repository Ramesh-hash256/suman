console.log("Welcome to Magic Notes");

showNotes();

//If user adds a note add it to the local storage
let addBtn=document.getElementById("addBtn");

addBtn.addEventListener("click",function(e){
    let addTxt=document.getElementById("addTxt");
    let addTitle=document.getElementById("addTitle");
    let notesObj=localStorage.getItem("notes");
    if(notesObj==null){
        notesObj=[];
    }
    else{
        notesObj=JSON.parse(notesObj);
    }
    let myObj={
        title:addTitle.value,
        text:addTxt.value
    };
    notesObj.push(myObj);
    localStorage.setItem("notes",JSON.stringify(notesObj));
    addTxt.value="";
    addTitle.value="";
    // console.log(notesObj);
    showNotes();

});

//Function to show notes from local storage
function showNotes(){
    let notesObj=localStorage.getItem("notes");
    if(notesObj==null){
        notesObj=[];
    }
    else{
        notesObj=JSON.parse(notesObj);
    }
    let html="";

    notesObj.forEach(function(element,index){
        html+=`
        <div class="noteCard my-2 mx-2 card" style="width: 18rem;">
                
                <div class="card-body">
                  <h5 class="card-title">${element.title}</h5>
                  <p class="card-text">${element.text}</p>
                  <button id="${index}" class="btn btn-primary" onclick="deleteNote(this.id)">Delete Note</button>
                </div> 
              </div>
        
        `;
    });
let notesElem=document.getElementById('notes');
if(notesObj.length!=0){
    notesElem.innerHTML=html;
}
else{
    notesElem.innerHTML=`Nothing to show, add some notes "add a note"`;
}

}

//Function to delete from localstorage as well as display

function deleteNote(index){
// console.log("Iam Deleting",index);
let notesObj=localStorage.getItem("notes");
    if(notesObj==null){
        notesObj=[];
    }
    else{
        notesObj=JSON.parse(notesObj);
    }
    notesObj.splice(index,1);
    localStorage.setItem("notes",JSON.stringify(notesObj));
    showNotes();
}


let search=document.getElementById("searchTxt");
search.addEventListener("input",function(){
let inputVal=search.value.toLowerCase();
// console.log("input event fired",inputVal);
let noteCards=document.getElementsByClassName("noteCard");
Array.from(noteCards).forEach(function(element){
let cardTxt=element.getElementsByTagName("p")[0].innerText;
if(cardTxt.includes(inputVal)){
    element.style.display="block";
}
else{
    element.style.display="none";

}
// console.log(cardTxt);
});
});

function clearStorage(){
    if (confirm("Do you really want to clear?")){
    // console.log('Clearing the storage');
    localStorage.clear();
    showNotes();
    }
    
}