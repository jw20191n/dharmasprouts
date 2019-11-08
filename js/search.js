const displayDiv = document.getElementById('inner');

let booksWithTag =[];//array that store all the books that has the searched tag

let url = window.location.toString();
let bookTag = url.replace(/^.*?\=/,'');
let cleanTerms = bookTag.split('+');
// cleanTerm = cleanTerm.replace('%27', "'");
let cleanTerm = cleanTerms.join(' ');
 
// console.log(cleanTerms);

function displayResult(){
    $.getJSON( "db.json", function( json ) {

        let books = json.data.filter(content => content.Tags.includes("Book"));

        if (cleanTerms.length>0){
            cleanTerms.forEach(keyword => {
                books.forEach( book => {
                    let lower = keyword.toLowerCase()
                    if(!booksWithTag.includes(book)){
                        let tags = book.Tags.map(tag=>tag.toLowerCase())
                        let author = book.Author.map(author=>author.toLowerCase())
                        let publisher = book.Publisher.toLowerCase();
                        let notes = book.Notes.toLowerCase();
                        if(publisher.includes(lower)||notes.includes(lower)){
                            booksWithTag.push(book)
                        }else{
                            for(let i=0; i<tags.length;i++){
                                if(tags[i].includes(lower)){
                                    booksWithTag.push(book);
                                }
                            }
                            for(let n=0; n<author.length;n++){
                                if(author[n].includes(lower)){
                                    booksWithTag.push(book)
                                }
                            }
                        }     
                    }
                });
            });

            let string = cleanTerms.join(', ');
            displayDiv.innerHTML += `<p class="prompt">You searched for <b>"${string}"</b><br>Here is our recommendation based on your recommendation.</p>`;
        }
        // }else{
        //     booksWithTag =  json.data.filter( book => book.Tags.includes(cleanTerm));
        //     console.log(booksWithTag.length);
        //     displayDiv.innerHTML += `<p class="prompt">You chosed <b>${cleanTerm}.</b><br>Here is our recommendation based on your recommendation.</p>`;
        // }
        
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
                        <a class="btn " type="button" href="#${book.id}">... show more</a>
                    </div>`;


                // let innerText = bookDiv.innerText;

                // cleanTerms.forEach(keyword=> {
                //     let index = innerText.indexOf(keyword); 
                //     if (index >= 0) { 
                //         console.log('!')
                //         innerText = innerText.substring(0,index) + "<span class='redLink'>" + innerText.substring(index,index+keyword.length) + "</span>" + innerText.substring(index + keyword.length);
                //         bookDiv.innerText = innerText;
                //     }
                // })
             
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
const topBtn = document.getElementById('backToTop');

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