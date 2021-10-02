//function for Show all flash
function showFlashCard(){
    let contentArray = localStorage.getItem('items') ? JSON.parse(localStorage.getItem('items')) : [];

    let html = "";
    contentArray.forEach((element, index) => {
        html += `
        <div id="flashCard" style="justify-content: center;">
            <h3 class="question"> ${element.my_question}</h3>
            <div>
            <p class="answer"> ${element.my_answer}</p>
            <div>
            <button id="${index}"onclick="editCard(this.id)"class="edit">Edit</button>
            <button id="${index}"onclick="deleteFlashCard(this.id)"class="delete">Delete</button>
            </div>
            </div>
        </div>
        `;     
    });

    let flashCard = document.querySelector("#flashCards");
    if(contentArray.length > 0){   
        flashCard.innerHTML = html;
    } else{
        flashCard.innerHTML = `<p style='text-align:center;color:#346054;font-size:1.4rem'>No card available! Please add Card.</p>`;
    }
}


//add event listener for save button
let saveButton = document.getElementById("saveButton");

saveButton.addEventListener("click", (e) => {
    e.preventDefault();
    let question = document.getElementById("question");
    
    let answer = document.getElementById("answer");
    
    if(question.value == "" || answer.value == ""){
        return alert("Please add Question and Answer");
    }

    let contentArray = localStorage.getItem('items') ? JSON.parse(localStorage.getItem('items')) : [];
    

    let flash_info = {
        my_question : question.value,
        my_answer : answer.value
    }
    contentArray.push(flash_info);
    localStorage.setItem('items',JSON.stringify(contentArray));
    question.value = "";
    answer.value = "";
    // console.log(contentArray);

    let newCardBtn = document.querySelector(".hide") 
   
    if(newCardBtn){
         newCardBtn.style.display = 'none';
    } 
 
     showFlashCard();
    
});

//function for delete flashCard
function deleteFlashCard(index){
    // let delConfirm = document.querySelector('.flashCards').innerHTML += `<div><p>Confirm Delete: <button type='submit' value='yes'>Yes</button></p></div>`

    let delConfirm = confirm('Are you sure to Detele this  card')

    if(delConfirm){
        let contentArray = localStorage.getItem('items') ? JSON.parse(localStorage.getItem('items')) : [];
        contentArray.splice(index, 1);
        localStorage.setItem('items',JSON.stringify(contentArray));
}
      // contentArray.removeItem(index);
        showFlashCard(); 
}

//function for Edit The card
function editCard(index) {
    let contentArray = localStorage.getItem('items');
    let question = document.getElementById("question");
    let answer = document.getElementById("answer");

    let newCardBtn = document.querySelector(".hide") 
    
    if(newCardBtn){
        newCardBtn.style.display = 'block';
    // newCardBtn.classList.add('show');
    }

    if(question.value !== "" || answer.value !== ""){
        return alert("Please clear the form before Editing the card");
    }

    contentArray = localStorage.getItem('items') ? JSON.parse(localStorage.getItem('items')) : [];

    console.log(contentArray);
    contentArray.findIndex((element, index)=>{
        question.value = element.my_question;
        answer.value = element.my_answer;
        // console.log(question.value);
    });
    contentArray.splice(index, 1);
        localStorage.setItem('items',JSON.stringify(contentArray));
        showFlashCard();
}

showFlashCard();

