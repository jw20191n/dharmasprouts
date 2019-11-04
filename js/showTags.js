const displayDiv = document.getElementById('inner');
const topBtn = document.getElementById("backToTop");

let booksWithTag =[];//array that store all the books that has the searched tag

let url = window.location.toString();
let bookTag = url.replace(/^.*?\=/,'');
let newBookTag = bookTag.split('%20').join(' ');
newBookTag = newBookTag.replace('%27', "'");
let newBookTags = [];

if (newBookTag.includes('&&')){
    newBookTags = newBookTag.split('&&');
    console.log(newBookTags);
}

function displayDivs(){
    $.getJSON( "db.json", function( json ) {

        if (newBookTags.length>0){
            newBookTags.forEach(tag => {
                json.data.forEach( book => {
                    if(book.Tags.includes(tag) && !(booksWithTag.includes(book))){
                        booksWithTag.push(book);
                    }
                });
            });

            let string = newBookTags.join(', ');
            displayDiv.innerHTML += `<p class="prompt">You chosed <b>${string}.</b><br>Here is our recommendation based on your preferences.</p>`;

        }else{
            booksWithTag =  json.data.filter( book => book.Tags.includes(newBookTag));
            console.log(booksWithTag.length);
            displayDiv.innerHTML += `<p class="prompt">You chose <b>${newBookTag}.</b><br>Here is our recommendation based on your preferences.</p>`;
        }
        
            booksWithTag.forEach( book => {
                let bookDiv = document.createElement('div');
                bookDiv.classList.add('addedDiv');
                bookDiv.setAttribute('id', `${book.id}`)
                // console.log(book.Url);
                bookDiv.innerHTML = `
                    <div class="covers-div">
                        <img src="${book.Url}" class="covers">
                    </div>
                    <h3>${book.Name}</h3>
                    <p>Author: ${book.Author.join(" ")}</p>
                    <p>Publisher: ${book.Publisher} </p>
                    <p>Edition: ${book.Edition} </p>
                    `
                let newP = document.createElement('p');
                newP.innerHTML = "Tags: ";
                book.Tags.forEach(tag => {
                    if(newBookTags.length > 0 && newBookTags.includes(tag)){
                        newP.innerHTML += `<a href="show_tags.html?val=${tag}" class="redLink">${tag}</a>&nbsp&nbsp&nbsp&nbsp`;
                    }else if (newBookTag == tag){
                        newP.innerHTML += `<a href="show_tags.html?val=${tag}" class="redLink">${tag}</a>&nbsp&nbsp&nbsp&nbsp`;
                    } else{
                        newP.innerHTML += `<a href="show_tags.html?val=${tag}">${tag}</a>&nbsp&nbsp&nbsp&nbsp`;
                    }
                })
                bookDiv.appendChild(newP);
                bookDiv.innerHTML += `
                    <div class="bookContent hideContent">
                        <p>Language: ${book.Language.join(" ")}</p>
                        <p>Cover Type: ${book.CoverType}</p>
                        <p>Pages: ${book.Pages}</p>
                        <p>Illustrator: ${book.Illustrator.join(" ")}</p>
                        <p>Description: ${book.Notes} <br> ${book.Access}</p>
                    </div>
                    <div class="show-more" onclick="showmore()">
                        <a class="btn " type="button" href="#${book.id}">... show more</a>
                    </div>`;
                displayDiv.appendChild(bookDiv);
            })
       
    });//end of getJson

}//end of displayDivs


function showmore(){
    let linkText = event.target.innerText;
    let targetDiv = event.target.parentNode.previousElementSibling;
 

    if(linkText === '... show more'){
        targetDiv.classList.remove('hideContent');
        targetDiv.classList.add('showContent');
        event.target.innerText = '... show less';
    }else if (linkText === '... show less'){
        targetDiv.classList.remove('showContent');
        targetDiv.classList.add('hideContent');
        event.target.innerText = '... show more';
    }

}

//======================  back to top button ========================

// When the user scrolls down 20px from the top of the document, show the button
window.addEventListener('scroll', ()=>{
    scrollFunction();
})

function scrollFunction() {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        topBtn.style.display = "block";
    } else {
        topBtn.style.display = "none";
    }
}


function topFunction() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}