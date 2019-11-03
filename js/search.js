const displayDiv = document.getElementById('inner');

let booksWithTag =[];//array that store all the books that has the searched tag

let url = window.location.toString();
let bookTag = url.replace(/^.*?\=/,'');
let cleanTerms = bookTag.split('+');
// cleanTerm = cleanTerm.replace('%27', "'");
let cleanTerm = cleanTerms.join(' ');
 
console.log(cleanTerms);

function displayResult(){
    $.getJSON( "db.json", function( json ) {

        if (cleanTerms.length>0){
            cleanTerms.forEach(keyword => {
                json.data.forEach( book => {
                    if(!booksWithTag.includes(book)){
                        if(book.Tags.includes(keyword)||book.Author.includes(keyword))
                        booksWithTag.push(book);
                    }
                });
            });

            let string = cleanTerms.join(', ');
            displayDiv.innerHTML += `<p class="prompt">You searched for <b>"${string}"</b><br>Here is our recommendation based on your recommendation.</p>`;

        }else{
            booksWithTag =  json.data.filter( book => book.Tags.includes(cleanTerm));
            console.log(booksWithTag.length);
            displayDiv.innerHTML += `<p class="prompt">You chosed <b>${cleanTerm}.</b><br>Here is our recommendation based on your recommendation.</p>`;
        }
        
            booksWithTag.forEach( book => {
                let bookDiv = document.createElement('div');
                bookDiv.classList.add('addedDiv');
                bookDiv.setAttribute('id', `${book.id}`)
                // console.log(book.Url);
                bookDiv.innerHTML = `<img src="${book.Url}" class="covers">
                    <h3>${book.Name}</h3>
                    <p>Author: ${book.Author.join(" ")}</p>
                    <p>Publisher: ${book.Publisher} </p>
                    <p>Edition: ${book.Edition} </p>
                    `
                let newP = document.createElement('p');
                newP.innerHTML = "Tags: ";
                book.Tags.forEach(tag => {
                    if(cleanTerms.length > 0 && cleanTerms.includes(tag)){
                        newP.innerHTML += `<a href="show_tags.html?val=${tag}" class="redLink">${tag}</a>, `;
                    }else if (cleanTerm == tag){
                        newP.innerHTML += `<a href="show_tags.html?val=${tag}" class="redLink">${tag}</a>, `;
                    } else{
                        newP.innerHTML += `<a href="show_tags.html?val=${tag}">${tag}</a>, `;
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
                        <a href="#${book.id}">... show more</a>
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
