const form = document.querySelector(".input-form");
const ul = document.querySelector(".list");
// const delBtn = document.querySelector(".");

const userInput = form.elements.userInput;
console.dir(userInput);

form.addEventListener('submit', (e) => {
    e.preventDefault();
    if(userInput.value){
        if(ul.childElementCount < 8){
        const newLi = document.createElement('li');
        const newDoneBtn = document.createElement('button');
        newDoneBtn.innerHTML ='<ion-icon name="checkbox-outline"></ion-icon>';
        const newDelBtn = document.createElement('button');
        newDelBtn.innerHTML ='<ion-icon name="trash-outline"></ion-icon>';
        const btnWrap = document.createElement('div');
        newDelBtn.classList.toggle('delete-btn');
        newDoneBtn.classList.toggle('done-btn');
        
        newLi.innerText = `${userInput.value}`;
        newLi.append(btnWrap);
        btnWrap.append(newDoneBtn, newDelBtn);
        ul.append(newLi);
        userInput.value = "";
        }else{
            alert('list is full')
        }
    }else {
    alert('You need to type sth to add it to the list')
    }
})
ul.addEventListener('click', (e) => {
    console.log(e);
    const liParent = e.target.parentElement.parentElement;
    if(e.target && e.target.className === "delete-btn"){
        liParent.classList.add('fall');
        liParent.addEventListener('transitionend', ()=> {
            console.log('transition ended');
            liParent.remove();
        })
        
    }else if(e.target && e.target.className === "done-btn"){
        liParent.classList.toggle("strikethrough");
       
    }

})
