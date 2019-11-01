const displayDiv = document.getElementById('inner');
const info = document.createElement('p');
info.setAttribute('id', 'chn-info');


function displayDivs(){
    
    $.getJSON( "new-chn.json", function( json ) {
        info.innerText = `目前dharma sprouts网站共收录、评论了${json.data.length}份佛教中文材料。所有的中文书籍都收录在此页面。未来，我们网站还将继续收集更多的中文佛教材料。感谢您的支持！`
        displayDiv.appendChild(info);
        
        json.data.forEach( book => {
            let bookDiv = document.createElement('div');
            bookDiv.classList.add('addedDiv');
            bookDiv.setAttribute('id', `${book.id}`)
            bookDiv.innerHTML = `<img src="${book.Url}" class="covers">
                <h3>${book.Name}</h3>
                <p>作者: ${book.Author.join(" ")}</p>
                <p>出版方: ${book.Publisher} </p>
                <p>版本: ${book.Edition} </p>
                `
            let newP = document.createElement('p');
            newP.innerHTML = "Tags: ";
            book.Tags.forEach(tag => {
                newP.innerText += `${tag},`
            })
            bookDiv.appendChild(newP);
            bookDiv.innerHTML += `
                <div class="bookContent hideContent">
                    <p>语言: ${book.Language.join(" ")}</p>
                    <p>类型: ${book.CoverType}</p>
                    <p>页数: ${book.Pages}</p>
                    <p>绘者: ${book.Illustrator.join(" ")}</p>
                    <p>简介: ${book.Notes} <br> ${book.Access}</p>
                </div> 
                <div class="show-more" onclick="showmore()">
                    <a href="#${book.id}">... 更多</a>
                </div>`
            displayDiv.appendChild(bookDiv);
        })
       
    });//end of getJson

}//end of displayDivs


function showmore(){
    let linkText = event.target.innerText;
    let targetDiv = event.target.parentNode.previousElementSibling;
 

    if(linkText === '... 更多'){
        targetDiv.classList.remove('hideContent');
        targetDiv.classList.add('showContent');
        event.target.innerText = '... 关闭';
    }else if (linkText === '... 关闭'){
        targetDiv.classList.remove('showContent');
        targetDiv.classList.add('hideContent');
        event.target.innerText = '... 更多';
    }

}