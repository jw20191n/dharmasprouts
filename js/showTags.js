const displayDiv = document.getElementById('inner');
const topBtn = document.getElementById("backToTop");

let contentWithTag =[];//array that store all the books that has the searched tag

let url = window.location.toString();
let contentTag = url.replace(/^.*?\=/,'');
let newContentTag = contentTag.split('%20').join(' ');
newContentTag = newContentTag.replace('%27', "'");
let newContentTags = [];
let bookContents = [];
let appContents = [];
let songContents= [];
let videoContents = [];


if (newContentTag.includes('&&')){
    newContentTags = newContentTag.split('&&');
    // console.log(newContentTags);
}

function displayDivs(){
    $.getJSON( "db.json", function( json ) {

        if (newContentTags.length>0){
            newContentTags.forEach(tag => {
                json.data.forEach( content => {
                    if(content.Tags.includes(tag) && !(contentWithTag.includes(content))){
                        contentWithTag.push(content);
                    }
                });
            });

            let string = newContentTags.join(', ');
            displayDiv.innerHTML += `<p class="prompt">You chosed <b>${string}.</b><br>Here is our recommendation based on your preferences.</p>`;

        }else{
            contentWithTag =  json.data.filter( content => content.Tags.includes(newContentTag));
            // console.log(contentWithTag.length);
            displayDiv.innerHTML += `<p class="prompt">You chose <b>${newContentTag}.</b><br>Here is our recommendation based on your preferences.</p>`;
        }
            
            contentWithTag.forEach( content => {
                let contentDiv = document.createElement('div');
                contentDiv.classList.add('addedDiv');
                contentDiv.setAttribute('id', `${content.id}`);
                contentDiv.innerHTML = `
                    <div class="covers-div">
                        <img src="${content.Url}" class="covers">
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
                            <p><strong>Source:</strong><a href="${content.Source}"> link to music</a></p>
                        </div>
                        `; 
                }else if (content.Tags.includes("Video")){
                    let link;
                    if(content.Source.includes('http')){
                        link = `<a href="${content.Source}">link to video</a>`
                    }else{
                        link = content.Source
                    }

                    contentDiv.innerHTML += `
                        <p><strong>Producer:</strong> ${content.Producer.join(" ")}</p>
                        <p><strong>Language:</strong> ${content.Language.join(" ")}</p> 
                        <div class="bookContent hideContent">
                            <p><strong>Description:</strong> ${content.Notes.split("/").join("</br>")}</p>
                            <p><strong>Source:</strong> ${link}</p>
                        </div>
                        `; 
                }

                let newP = document.createElement('p');
                newP.innerHTML = "<strong>Tags:</strong> ";
                content.Tags.forEach(tag => {
                    if(newContentTags.length > 0 && newContentTags.includes(tag)){
                        newP.innerHTML += `<a href="show_tags.html?val=${tag}" class="redLink">${tag}</a>&nbsp&nbsp&nbsp&nbsp`;
                    }else if (newContentTag == tag){
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

            })
       
    });//end of getJson

}//end of displayDivs


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