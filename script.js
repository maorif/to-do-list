
//Adiciona uma tarefa à lista
function Add(){
    
    let newInput = document.querySelectorAll("input")[0];

    let newRow = NewRow(newInput.value);
    newInput.value = "";            //limpa o input após adicionar tarefa
    DeleteRow(newRow.children[2]);  //Aplica função de deletar à lista atualizada
    SaveListToLocalStorage();       //Salva a lista com a tarefa nova

}

//cria linha e appenda à lista de tarefas
function NewRow(newInput, done=false){

    
    if(newInput != ""){     //se o input estiver vazio não adiciona linha
        let newRow = document.createElement("li");
        newRow.className = "list-row";
    
        let newText = document.createElement("p");
        newText.className = "to-do";
        newText.textContent = newInput;
    
        if(done){   //se tarefa estiver feita (done = true) -> texto riscado
            newText.style.textDecoration = "line-through";
        }

        let newCheckBox = document.createElement("input");
        newCheckBox.className = "checkbox";
        newCheckBox.type = "checkbox";
        newCheckBox.checked = done;
        
        let newDeleteBtn = document.createElement("i");
        newDeleteBtn.className = "fas fa-trash fa-2x";
    
        newRow.appendChild(newText);
        newRow.appendChild(newCheckBox);
        newRow.appendChild(newDeleteBtn);

        document.querySelectorAll(".list")[0].prepend(newRow);

        return newRow;
    };
};

//Salva lista atualizada em mudanças na lista
SaveOnListChange();
function SaveOnListChange(){

    //adiciona evento de riscar tarefa se checar checkbox
    document.querySelectorAll('.list')[0].addEventListener("change", () => {
    
        let checkBoxes = document.querySelectorAll('.checkbox');
        let rows = document.querySelectorAll('.list-row');
        for(let i=0; i<checkBoxes.length; i++){
            
            if(checkBoxes[i].checked){
                rows[i].children[0].style.textDecoration = "line-through";
            }

            else{
                rows[i].children[0].style.textDecoration = "none";

            }
        }
        //Salva ao final
        SaveListToLocalStorage();
    })
}

//Função para salvar lista no localstorage
function SaveListToLocalStorage(){
    
    let list = document.querySelectorAll(".to-do");
    let checkBoxes = document.querySelectorAll(".checkbox");
    let toDoList = [];


    for(let i=0; i<list.length; i++){
        
        let toDo = {
            text : list[i].textContent,
            done : checkBoxes[i].checked
        }

        toDoList.push(toDo);
        console.log(toDoList);

    }
    
    localStorage.setItem("to-do-list", JSON.stringify(toDoList));
}

//Carrega a lista a partir do localstorage
LoadListFromLocalStorage();
function LoadListFromLocalStorage(){

    let toDoList = JSON.parse(localStorage.getItem("to-do-list"));

    if(toDoList == null){
        return;
    }

    for(let i=(toDoList.length-1); i>=0; i--){

        NewRow(toDoList[i].text, toDoList[i].done);
    }
}

//adiciona função de deletar tarefa da lista ao clicar botão lixeira
document.querySelectorAll(".fa-trash").forEach(btn => {
   DeleteRow(btn);
})
    
function DeleteRow(deleteBtn){

    deleteBtn.addEventListener("click", () => {
        let confirm = window.confirm("Tem certeza que deseja excluir esta tarefa?");
        
        if(confirm){
            deleteBtn.parentElement.remove();
            SaveListToLocalStorage();
        }
    })   
}

GoToTopPage();
function GoToTopPage(){
    document
        .querySelectorAll(".left-header")[0]
        .addEventListener("click", () => {
            window.scrollTo({
                top: 0,
                left: 0,
                behavior: "smooth"});
        })
}