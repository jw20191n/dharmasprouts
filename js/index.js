//for modal
const ageSpan = document.getElementById('ageNumber');
const addbtn = document.getElementById('add');
const minusbtn = document.getElementById('minus');
const nextbtn = document.getElementById('nextModal');
const form = document.getElementById('tagsCheckbox');

//language choice initialized as false; toggle to true when user click on 'chn' button
let chn = false;
const firstModal = document.getElementById('firstModal');
const secondModal = document.getElementById('secondModal');

//for page renders
let tags = {}; //object keys are the name of the tags, values are the numbers of the tags appeared
const ulDisplay = document.getElementById('display-tags');
let books = []; //store db.json into an array;


//====================         print tags when page first renders     ===========================
function printTags(){
    chn = false;
    checkScreen();
    $.getJSON('db.json', function( json ) {
        books = json.data;
        books.forEach( book => {
            let tagsOfABook = book.Tags;//an array of a book's tags

            tagsOfABook.forEach(tag => {
                let newTag = tag.charAt(0).toUpperCase() + tag.slice(1);
                // console.log(newTag)
                if (tags.hasOwnProperty(newTag)){
                    tags[newTag] = tags[newTag] + 1;
                }else{
                    tags[newTag] = 1;
                }
            })
        })

        const tagDiv = document.createElement('div');
        tagDiv.classList.add('tagLess');
        tagDiv.setAttribute('id', 'tag-div');
        ulDisplay.appendChild(tagDiv);

        Object.keys(tags).sort().forEach(function(key, value){
            // console.log(key, tags[key])
            tagDiv.innerHTML += `<a class="tagsLink" href="show_tags.html?val=${key}"><li>${key}(${tags[key]})</li></a>`;
        })

        ulDisplay.innerHTML += `<div class="show-more" onclick="showmore()">
        <span>... view full list<span>
        </div>`
    });//end of getJson

}

//=======================    click on "show more" button to see more content       ==============
function showmore() {
    let linkText = event.target.innerText;
    let targetDiv = event.target.parentNode.previousElementSibling;
    // console.log(targetDiv)

    if(linkText === '... view full list'){
        targetDiv.classList.remove('tagLess');
        targetDiv.classList.add('tagMore');
        event.target.innerText = '... show less';
    }else if (linkText === '... show less'){
        targetDiv.classList.remove('tagMore');
        targetDiv.classList.add('tagLess');
        event.target.innerText = '... view full list';
    }
}


//<!--------------         Modal             ---------->
let age = 5;
ageSpan.innerText = age.toString();

addbtn.addEventListener('click', (event)=>{
    age += 1;
    ageSpan.innerText = age.toString();
    event.preventDefault();
})

minusbtn.addEventListener('click', (event)=>{
    if (age >= 3){
        age -= 1;
    }
    ageSpan.innerText = age.toString();
    event.preventDefault();
})

document.getElementById('closeModal').addEventListener('click', ()=>{
    age = 5;
    ageSpan.innerText = age.toString();
})

nextbtn.addEventListener('click', ()=>{
    event.target.setAttribute('data-toggle', 'modal');
    event.target.setAttribute('data-target', '#secondModal');
})

document.getElementById('close').addEventListener('click', ()=>{
    age = 5;
    ageSpan.innerText = age.toString();
    $('.modal').modal('hide');
})


$('#secondModal').on('show.bs.modal', function (e) {
    form.innerHTML = '';
    let n = 0;
    for (keys in tags) {
        form.innerHTML += `<div class="form-group">
            <input type="checkbox" id="checkbox-${n}" name="${keys}" value="${keys}" class="checkboxes">
           ${keys}
            </div>`
        // <label for="checkbox-${n}">${keys}</label>
        // ${keys}&nbsp&nbsp&nbsp&nbsp;
        n++;
    }
  });


// document.getElementById('tagsCheckbox').addEventListener('input',()=>{
//     let checkboxes = document.querySelectorAll('.checkboxes');
//     for(let i=0; i<checkboxes.length; i++){
//         if(checkboxes[i].checked){
//             checkboxes[i].classList.add('box-checked');
//             console.log(checkboxes[i].classList)
//         }
//     }
// })
 
document.getElementById('submitModalInfo').addEventListener('click', ()=>{
    let selected = [];
    let inputs = document.getElementsByClassName('checkboxes');

    for (let i=0; i<inputs.length; i++){
        if(inputs[i].checked){
            selected.push(inputs[i].value);
        }
    }

    if (age >=2 && age <= 5){
        selected.push('Age 2-5');
    }else if (age >= 6 && age <= 8){
        selected.push('Age 6-8');
    }else if (age >= 9 && age <= 12){
        selected.push('Age 9-12');
    }else if (age >= 13){
        selected.push('Age 13+');
    }
    console.log(age);
    console.log(selected);

    if (selected.length>0){
        let tagString = selected.join('&&');
        let newUrl =   'show_tags.html?val=' + tagString;
        document.getElementById('toTagPage').setAttribute('href', `${newUrl}`)
    }
    // $('.modal').modal('hide');
})


//  ===================         Language choice       ====================

document.getElementById('chn').addEventListener('click', ()=>{
    chn = true;
    changeToChinses();
})

function changeToChinses() {
    //search
    document.getElementById('searchInfo').search.placeholder = "请输入搜索内容";

    //nav
    let ul = document.querySelector('.nav');

    for(let i=0; i<ul.childNodes.length; i++){
        switch(i){
            case 1: 
                ul.childNodes[i].childNodes[0].innerText = "2-5岁";
                break;
            case 3:
                ul.childNodes[i].childNodes[0].innerText = "6-8岁";
                break;
            case 5: 
                ul.childNodes[i].childNodes[0].innerText = "9-12岁";
                break;
            case 7: 
                ul.childNodes[i].childNodes[0].innerText = "13岁以上";
                break;
            case 9:
                ul.childNodes[i].childNodes[0].innerText = "教师用材料"
        }
    }

    //personalized_bar left and right
    let left = document.getElementById('left');
    left.innerHTML = '<h5>想寻找适合儿童、青少年阅读浏览的佛教内容吗?</h5><h6>点击右边按钮，查看为您的需求量身定制的个性化推荐</h6>';
    document.getElementById('yellow_button').innerText = '点击获得个性化推荐';

    //intro
    document.getElementById('left-side').innerHTML = '<p>我们的网站收录了适合儿童及青少年的中英文佛教出版物。家长及佛教中心等教育者可以通过年龄、感兴趣主题获得量身定制的个性化推荐，从而寻找到最适合小读者的佛教书籍、视频或者音乐。</p>'

    //tag search
    document.getElementById('search2-label').innerText = '根据主题浏览';
    document.getElementById('tag-filter').search.placeholder = '搜索佛教主题';
    tags = {};
    ulDisplay.innerHTML = '';
    printChnTags('new-chn.json');

    //modals
    firstModal.innerHTML = '';
    secondModal.innerHTML = '';
}


function printChnTags(file){
    $.getJSON(file, function( json ) {
        // console.log(json.data);
        json.data.forEach( book => {
            let tagsOfABook = book.Tags;//an array of a book's tags

            tagsOfABook.forEach(tag => {
                if (tags.hasOwnProperty(tag)){
                    tags[tag] = tags[tag] + 1;
                }else{
                    tags[tag] = 1;
                }
            })
        })

        const tagDiv = document.createElement('div');
        tagDiv.classList.add('tagLess');
        tagDiv.setAttribute('id', 'tag-div');
        ulDisplay.appendChild(tagDiv);

        for (keys in tags) {
            if (keys === '适读年龄 13岁以上' || keys === '适读年龄 9-12岁'){
                tagDiv.innerHTML += `<a href="chn.html"><span>${keys}(${tags[keys]}) | </span></a>`
            }else{
                tagDiv.innerHTML += `<span>${keys}(${tags[keys]}) | </span>`;
            }
        }

        ulDisplay.innerHTML += `<div class="show-more" onclick="showmore()">
        <span>... view full list</span>
        </div>`

    });//end of getJson
}


document.getElementById('yellow_button').addEventListener('click', ()=>{
    // console.log(chn)
    if(chn === true){
        firstModal.innerHTML = `
            <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-body">
                    <span>很抱歉，目前本功能只限于英语材料。请您切换到英文页面进行选择。</span>
                </div>
                <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal" id="closeModal">Close</button>
            </div>
            </div>   
        `;
    }
})
//===============================     filter by topic    ==================================
document.getElementById('tag-filter').addEventListener('input', ()=>{
    let input = event.target.value;
    // console.log(input);
    const children = document.getElementById('tag-div').childNodes
    for(let i=0; i< children.length; i++){
        if (!children[i].innerText.toLowerCase().includes(input.toLowerCase())){
            children[i].setAttribute('style', 'display:none')
        }else{
            children[i].setAttribute('style', 'display:inline')
        }
    }
})



// ===============================            search             =============================
document.getElementById('searchInfo').addEventListener('submit', (event)=>{
    // event.preventDefault();
    let input = event.target.search.value;
    console.log(input);
})


// ===============================            responsive             =============================
window.addEventListener('resize', ()=>{
    checkScreen()
})

function checkScreen(){
    if (window.innerWidth <= 765){
        document.getElementById('chn').innerText = '中';
        document.getElementById('eng').innerText = 'Eng';
    }else{
        document.getElementById('chn').innerText = '中文';
        document.getElementById('eng').innerText = 'English';
    }
}