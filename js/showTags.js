const displayDiv = document.getElementById('inner');
const topBtn = document.getElementById("backToTop");

let contentWithTag =[];//array that store all the books that has the searched tag

//parse url to get the tags that user chose
let url = window.location.toString();
let contentTag = url.replace(/^.*?\=/,'');
let newContentTag = contentTag.split('%20').join(' ');
newContentTag = newContentTag.replace('%27', "'");//string that user sent 
let newContentTags = [];//if the string above contains '&&', split string into array


if (newContentTag.includes('&&')){
    newContentTags = newContentTag.split('&&');
}

function displayDivs(){
    $.getJSON( "db.json", function( json ) {
        //if this page is directed from 'set preference modal'
        let data = json.data;
        let checker = (tags, target) => target.every(tag => tags.includes(tag));

        if(newContentTags.length>0){
            for(let i=0; i< data.length; i++){
                if(checker(data[i].Tags, newContentTags)){
                    contentWithTag.push(data[i]);
                }
            }

            let string = newContentTags.join(', ');
            if(contentWithTag.length === 0){
    
                displayDiv.innerHTML += `<p class="prompt">You chose <b>${string}.</b><br>No exact result found. Here are materials relevant to your preferences.</p>`;

                // below show broader result that if one of tags your set is met
                // item would appear on the screen
                let object = {};
                newContentTags.forEach(tag => {
                    json.data.forEach( content => {
                        if(content.Tags.includes(tag)){
                            if(contentWithTag.includes(content)){
                                if(!object[content.Name]){
                                    object[content.Name] = 1;
                                }else{
                                    object[content.Name] += 1;
                                }
                            }else{
                                contentWithTag.push(content);
                            }   
                        }
                    });
                });//end of newContentTags.forEach

                //sortedObject is an array of object names
                let sortedObject = Object.keys(object).sort(function(a,b){return object[a]-object[b]})
                // console.log(sortedObject.length);
                
                //delete items that fufill multiple tags and add then to the beginning of the contentWithTag array
                let objectArray = [];
                for(i=0;i<sortedObject.length;i++){
                    let item = contentWithTag.find(content=> content.Name === sortedObject[i]);
                    let index = contentWithTag.indexOf(item);
                    contentWithTag.splice(index, 1);
                    objectArray.push(item);
                }
                for(i=0;i<objectArray.length;i++){
                    contentWithTag.unshift(objectArray[i]);
                }
                
          
            }else{
                displayDiv.innerHTML += `<p class="prompt">You chose <b>${string}.</b><br>Here are the results based on your preferences.</p>`;
            }
            
        }else{
            //if this page is reached by clicking on tags in index.html
            contentWithTag =  json.data.filter( content => content.Tags.includes(newContentTag));
            displayDiv.innerHTML += `<p class="prompt">You chose <b>${newContentTag}.</b><br>Here are the results based on your preferences.</p>`;
        }
            
            contentWithTag.forEach( content => {
                
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
                            <p><strong>Description:</strong> ${content.Notes} </p>
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
                            <p><strong>Access:</strong><a target="_blank" rel="noopener noreferrer" href="https://${content.Access}"> ${content.Access}</a></p>
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

            })//end of contentWithTag.forEach
       
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