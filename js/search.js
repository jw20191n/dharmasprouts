const displayDiv = document.getElementById('inner');
let contentWithTags =[];//array that store all the books that has the searched tag

// //sorting url and save it to variable
// let url = window.location.toString();
// let urlString = url.replace(/^.*?\=/,'');
// let cleanTerms = urlString.split('+');
// let cleanTerm = cleanTerms.join(' ');
// cleanTerm = cleanTerm.replace('%27', "'");
// cleanTerm = cleanTerm.replace('%2C', ",");
// cleanTerm = cleanTerm.replace("%3A", ":");
// cleanTerm = cleanTerm.replace("%3F", "?");
// let searchedTerm = cleanTerm.toLowerCase();
// console.log(searchedTerm);
 

function displayResult(){

    //sorting url and save it to variable
    let url = window.location.toString();
    let urlString = url.replace(/^.*?\=/,'');
    let cleanTerms = urlString.split('+');
    let cleanTerm = cleanTerms.join(' ');
    cleanTerm = cleanTerm.replace("%27", "'");
    cleanTerm = cleanTerm.replace("%2C", ",");
    cleanTerm = cleanTerm.replace("%3A", ":");
    cleanTerm = cleanTerm.replace("%3F", "?");
    let searchedTerm = cleanTerm.toLowerCase();
    // console.log(searchedTerm);

    $.getJSON( "db.json", function( json ) {

        json.data.forEach( content => {

            if(!contentWithTags.includes(content)){
                let tags = content.Tags.map(tag => tag.toLowerCase());
                let language = content.Language.map(lang => lang.toLowerCase());

                if(content.Tags.includes('Book')){
                    let authors = content.Author.map(author => author.toLowerCase());
                    let illustrators = content.Illustrator.map(illustrator => illustrator.toLowerCase())
               
                    if(content.Name.toLowerCase().includes(searchedTerm) || content.Publisher.toLowerCase().includes(searchedTerm)){
                        contentWithTags.push(content)
                    }else if (content.Notes.toLowerCase().includes(searchedTerm)){
                        contentWithTags.push(content);
                    }else if(authors.filter(author=> author.includes(searchedTerm)).length > 0 ){
                        contentWithTags.push(content)
                    }else if (illustrators.filter(illustrator=> illustrator.includes(searchedTerm)).length > 0 ){
                        contentWithTags.push(content)
                    }else if(language.includes(searchedTerm)){
                        contentWithTags.push(content)
                    }else{
                        for(let i=0; i<tags.length;i++){
                            if(tags[i].includes(searchedTerm)){
                                contentWithTags.push(content);
                            }
                        } 
                    }
                }//end of if book
                
                if(content.Tags.includes('App')){
                    let seller = content.Seller.map(seller => seller.toLowerCase());
                    
                    if(content.Name.toLowerCase().includes(searchedTerm)){
                        contentWithTags.push(content)
                    }else if (content.Notes.toLowerCase().includes(searchedTerm)){
                        contentWithTags.push(content);
                    }else if(seller.filter(seller=> seller.includes(cleanTerm)).length > 0 ){
                        contentWithTags.push(content)
                    }else if(language.includes(searchedTerm)){
                        contentWithTags.push(content)
                    }else{
                        for(let i=0; i<tags.length;i++){
                            if(tags[i].includes(searchedTerm)){
                                contentWithTags.push(content);
                            }
                        } 
                    }
                }//end of if app

                if(content.Tags.includes('Song')){
                    let singer = content.Singer.map(singer => singer.toLowerCase());
                    
                    if(content.Name.toLowerCase().includes(searchedTerm)){
                        contentWithTags.push(content)
                    }else if (content.Lyrics.toLowerCase().includes(searchedTerm)){
                        contentWithTags.push(content);
                    }else if(singer.filter(singer=> singer.includes(cleanTerm)).length > 0 ){
                        contentWithTags.push(content)
                    }else if(language.includes(searchedTerm)){
                        contentWithTags.push(content)
                    }else{
                        for(let i=0; i<tags.length;i++){
                            if(tags[i].includes(searchedTerm)){
                                contentWithTags.push(content);
                            }
                        } 
                    }
                }//end of if song

                if(content.Tags.includes('Video')){
                    let producer = content.Producer.map(producer => producer.toLowerCase());
                    
                    if(content.Name.toLowerCase().includes(searchedTerm)){
                        contentWithTags.push(content)
                    }else if (content.Notes.toLowerCase().includes(searchedTerm)){
                        contentWithTags.push(content);
                    }else if(producer.filter(producer=> producer.includes(cleanTerm)).length > 0 ){
                        contentWithTags.push(content)
                    }else if(language.includes(searchedTerm)){
                        contentWithTags.push(content)
                    }else{
                        for(let i=0; i<tags.length;i++){
                            if(tags[i].includes(searchedTerm)){
                                contentWithTags.push(content);
                            }
                        } 
                    }
                }//end of if video

                if(content.Tags.includes('Website')){
                
                    if(content.Name.toLowerCase().includes(searchedTerm)){
                        contentWithTags.push(content)
                    }else if (content.Notes.toLowerCase().includes(searchedTerm)){
                        contentWithTags.push(content);
                    }else if(content.Publisher.toLowerCase().includes(searchedTerm)){
                        contentWithTags.push(content)
                    }else if(language.includes(searchedTerm)){
                        contentWithTags.push(content)
                    }else{
                        for(let i=0; i<tags.length;i++){
                            if(tags[i].includes(searchedTerm)){
                                contentWithTags.push(content);
                            }
                        } 
                    }
                }//end of if website

            }         
        })//end of json.data.forEach 

        console.log(cleanTerm);
        displayDiv.innerHTML += `<p id="testP" class="prompt">You searched for <b>"${cleanTerm}"</b><br>Here are the results based on your preferences.</p>`;
        
        //print out the search results
        contentWithTags.forEach( content => {
            let contentDiv = document.createElement('div');
            contentDiv.classList.add('addedDiv');
            contentDiv.setAttribute('id', `${content.id}`);
            contentDiv.innerHTML = `
                <div class="covers-div">
                    <img src="${content.Url}" class="covers" alt="${content.Name} Cover">
                </div>
                <h3>${content.Name}</h3>
            `;

            if(content.Tags.includes("Book")){
                contentDiv.innerHTML += `
                    <p><strong>Author:</strong> ${content.Author.join(" ")}</p>
                    <p><strong>Publisher:</strong> ${content.Publisher} </p>
                    <p><strong>Edition:</strong> ${content.Edition} </p>
                    <div class="bookContent hideContent">
                        <p><strong>Language:</strong> ${content.Language.join(" ")}</p>
                        <p><strong>Cover Type:</strong> ${content.CoverType}</p>
                        <p><strong>Pages:</strong> ${content.Pages}</p>
                        <p><strong>Illustrator:</strong> ${content.Illustrator.join(" ")}</p>
                        <p><strong>Description:</strong> ${content.Notes} <br> ${content.Access}</p>
                    </div>
                    `;
            }else if(content.Tags.includes("App")){
                contentDiv.innerHTML += `
                    <p><strong>Seller:</strong> ${content.Seller.join(" ")}</p>
                    <p><strong>Language:</strong> ${content.Language.join(" ")}</p> 
                    <div class="bookContent hideContent">
                        <p></strong>Description:</strong> ${content.Notes} </p>
                    </div>
                     `;         
            }else if(content.Tags.includes("Song")){
                contentDiv.innerHTML += `
                    <p><strong>Singer:</strong> ${content.Singer.join(" ")}</p>
                    <p><strong>Language:</strong> ${content.Language.join(" ")}</p> 
                    <div class="bookContent hideContent">
                        <p><strong>Lyrics:</strong> ${content.Lyrics.split("/").join("</br>")}</p>
                        <p><strong>Source:</strong><a target="_blank" rel="noopener noreferrer" href="${content.Access}"> link to music</a></p>
                    </div>
                    `; 
            }else if (content.Tags.includes("Video")){
                let link;
                if(content.Access.includes('http')){
                    link = `<a target="_blank" rel="noopener noreferrer" href="${content.Access}">link to video</a>`
                }else{
                    link = content.Access
                }

                contentDiv.innerHTML += `
                    <p><strong>Producer:</strong> ${content.Producer.join(" ")}</p>
                    <p><strong>Language:</strong> ${content.Language.join(" ")}</p> 
                    <div class="bookContent hideContent">
                        <p><strong>Description:</strong> ${content.Notes.split("/").join("</br>")}</p>
                        <p><strong>Source:</strong> ${link}</p>
                    </div>
                    `; 
            }else if(content.Tags.includes("Website")){
                contentDiv.innerHTML += `
                    <p><strong>Publisher:</strong> ${content.Publisher} </p>
                    <div class="bookContent hideContent">
                        <p><strong>Language:</strong> ${content.Language.join(" ")}</p>
                        <p><strong>Description:</strong> ${content.Notes} </p>
                        <p><strong>Access:</strong><a target="_blank" rel="noopener noreferrer" href="${content.Access}"> ${content.Access}</a></p>
                    </div>
                    `;
            }

            let newP = document.createElement('p');
            newP.innerHTML = "<strong>Tags:</strong> ";
            content.Tags.forEach(tag => {
                if(cleanTerms.length > 0 && cleanTerms.includes(tag)){
                    newP.innerHTML += `<a href="show_tags.html?val=${tag}" class="redLink">${tag}</a>&nbsp&nbsp&nbsp&nbsp`;
                }else if (cleanTerm == tag){
                    newP.innerHTML += `<a href="show_tags.html?val=${tag}" class="redLink">${tag}</a>&nbsp&nbsp&nbsp&nbsp`;
                } else{
                    newP.innerHTML += `<a href="show_tags.html?val=${tag}">${tag}</a>&nbsp&nbsp&nbsp&nbsp`;
                }
            })
            contentDiv.appendChild(newP);

            contentDiv.innerHTML+= `
                <div class="show-more" onclick="showmore()">
                    <a class="btn " type="button" href="#${content.id}">... show more</a>
                </div>`;
    

            displayDiv.appendChild(contentDiv);

        })//end of s.forEach    
        
        highlight();
    });//end of getJson
    
}//end of displayDivs

// ===================  find searchedTerm  =========================

function highlight(){
    var instance = new Mark(displayDiv);
    instance.mark(cleanTerm, {
        "accuracy": "partially",
        "separateWordSearch": false
    });
}


// =================== show more function ==========================
function showmore(){
    // console.log(event.target);
    let linkText = event.target.innerText;
    let targetDiv = event.target.parentNode.previousElementSibling.previousElementSibling;
 
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