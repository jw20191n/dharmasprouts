const displayDiv = document.getElementById('inner');

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
            displayDiv.innerHTML += `<p class="prompt">You chosed <b>${string}.</b><br>Here is our recommendation based on your recommendation.</p>`;

        }else{
            booksWithTag =  json.data.filter( book => book.Tags.includes(newBookTag));
            console.log(booksWithTag.length);
            displayDiv.innerHTML += `<p class="prompt">You chosed <b>${newBookTag}.</b><br>Here is our recommendation based on your recommendation.</p>`;
        }
        
            booksWithTag.forEach( book => {
                let bookDiv = document.createElement('div');
                bookDiv.classList.add('addedDiv');
                // console.log(book.Url);
                bookDiv.innerHTML = `<img src="${book.Url}" class="covers">
                    <h3>${book.Name}</h3>
                    <p>Author: ${book.Author.join(" ")}</p>
                    <p>Publisher: ${book.Publisher}</p>
                    <p>Language: ${book.Language.join(" ")}</p>
                    <p>Description: ${book.Notes} <br> ${book.Access}</p>
                    `
                let newP = document.createElement('p');
                newP.innerHTML = "Tags: ";
                book.Tags.forEach(tag => {
                    if(newBookTags.length > 0 && newBookTags.includes(tag)){
                        newP.innerHTML += `<a href="show_tags.html?val=${tag}" class="redLink">${tag}</a>, `;
                    }else if (newBookTag == tag){
                        newP.innerHTML += `<a href="show_tags.html?val=${tag}" class="redLink">${tag}</a>, `;
                    } else{
                        newP.innerHTML += `<a href="show_tags.html?val=${tag}">${tag}</a>, `;
                    }
                    
                })
                bookDiv.appendChild(newP);
                displayDiv.appendChild(bookDiv);
            })
       
    });//end of getJson

}//end of displayDivs

