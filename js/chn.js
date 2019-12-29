const displayDiv = document.getElementById('inner');
const info = document.createElement('p');
info.setAttribute('id', 'chn-info');

let url = window.location.toString();
let sortedUrl = url.replace(/^.*?\=/,'');

console.log(sortedUrl);

function displayDivs(){
    
    $.getJSON( "new-chn.json", function( json ) {

        let filterData = [];

        switch(sortedUrl){
            case '':
                info.innerText = `目前dharma sprouts网站共收录、评论了${json.data.length}份佛教中文材料。所有的中文书籍都收录在此页面。未来，我们网站还将继续收集更多的中文佛教材料。感谢您的支持！`;
                filterData = json.data;
                break;
            case 'comnpassionchn':
                info.innerText = `您选择了"慈悲"。以下是根据您的选择筛选的内容。`;
                filterData = json.data.filter(book => book.Tags.includes("慈悲"));
                break;
            case 'wisdomchn':
                info.innerText = `您选择了"智慧"。以下是根据您的选择筛选的内容。`;
                filterData = json.data.filter(book => book.Tags.includes("智慧"));
                break;
            case 'karmachn':
                info.innerText = `您选择了"业力、善业与恶业"。以下是根据您的选择筛选的内容。`;
                filterData = json.data.filter(book => book.Tags.includes("业力、善业与恶业"));
                break;
            case 'masterchn':
                info.innerText = `您选择了"大师"。以下是根据您的选择筛选的内容。`;
                filterData = json.data.filter(book => book.Tags.includes("大师"));
                break;
            case 'familychn':
                info.innerText = `您选择了"家庭关系"。以下是根据您的选择筛选的内容。`;
                filterData = json.data.filter(book => book.Tags.includes("家庭关系"));
                break;
            case '9to12chn':
                info.innerText = `您选择了"适读年龄 9-12岁"。以下是根据您的选择筛选的内容。`;
                filterData = json.data.filter(book => book.Tags.includes("适读年龄 9-12岁"));
                break;
            case '13upchn':
                info.innerText = `您选择了"适读年龄 13岁以上"。以下是根据您的选择筛选的内容。`;
                filterData = json.data.filter(book => book.Tags.includes("适读年龄 13岁以上"));
                break;
            case '6to8chn':
                info.innerText = `您选择了"适读年龄 6-8岁"。以下是根据您的选择筛选的内容。`;
                filterData = json.data.filter(book => book.Tags.includes("适读年龄 6-8岁"));
                break;
            case 'buddhalifechn':
                info.innerText = `您选择了"佛陀的一生"。以下是根据您的选择筛选的内容。`;
                filterData = json.data.filter(book => book.Tags.includes("佛陀的一生"));
                break;
            case 'storychn':
                info.innerText = `您选择了"佛教故事"。以下是根据您的选择筛选的内容。`;
                filterData = json.data.filter(book => book.Tags.includes("佛教故事"));
                break;
        }

        displayDiv.appendChild(info);

        filterData.forEach( book => {
            let bookDiv = document.createElement('div');
            bookDiv.classList.add('addedDiv');
            bookDiv.setAttribute('id', `${book.id}`)
            bookDiv.innerHTML = `
                <div class="covers-div">
                    <img src="${book.Url}" class="covers">
                </div>
                <h3>${book.Name}</h3>
                <p>作者: ${book.Author.join(" ")}</p>
                <p>出版方: ${book.Publisher} </p>
                <p>版本: ${book.Edition} </p>
                `
            let newP = document.createElement('p');
            newP.innerHTML = "Tags: ";

            for(let i=0; i<book.Tags.length; i++){
                if (i === book.Tags.length-1){
                    newP.innerText += `${book.Tags[i]}`
                }else {
                    newP.innerText += `${book.Tags[i]}, `
                }   
            }
            // book.Tags.forEach(tag => {
            //     newP.innerText += `${tag},`
            // })

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
                    <a class="btn" type="button"  href="#${book.id}">... 更多</a>
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