const ageSpan = document.getElementById('ageNumber');
const addbtn = document.getElementById('add');
const minusbtn = document.getElementById('minus');
const nextbtn = document.getElementById('nextModal');
const form = document.getElementById('tagsCheckbox');
let tags = {};
//object that keys are the name of the tags, values are the numbers of the tags appeared
let selected = [];// used to save checked tags in filter
const ulDisplay = document.getElementById('display-tags');


// document.addEventListener('DOMContentLoaded', () => {
//     fetch('http://localhost:3000/data')
//     .then(resp => resp.json())
//     .then(data => {
//         printTags(data);
//     })
// });

// function printTags(data){
//     console.log(data);
//     data.forEach( book => {
//         let tagsOfABook = book.Tags;
//         console.log(tagsOfABook);

//         tagsOfABook.forEach(tag => {
//             if (tags.hasOwnProperty(tag)){
//                 tags[tag] = tags[tag] + 1;
//             }else{
//                 tags[tag] = 1;
//             }
//         })
//     })
    
//     for (keys in tags) {
//         ulDisplay.innerHTML += "<a href='show_tags.html?" + "val=" + keys + "'>" + '<li>' + keys + " " + "(" + tags[keys]+ ")" +'</li>' + '</a>';
//     }
//     console.log(tags);
// }


// document.addEventListener('DOMContentLoaded', () => {
//     fetch('http://localhost:3000/data')
//     .then(resp => resp.json())
//     .then(data => {
//         printTags(data);
//     })
// });

function printTags(){
    $.getJSON( "db.json", function( json ) {
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
        
        for (keys in tags) {
            ulDisplay.innerHTML += `<a href="show_tags.html?val=${keys}"><li>${keys}(${tags[keys]})</li></a>`;
        }

    });//end of getJson
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
    if (age >= 1){
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
    for (keys in tags) {
        form.innerHTML += `
                            <input type="checkbox" name="${keys}" value="${keys}" class="checkboxes">${keys}<br>
                        `;
    }
  });

document.getElementById('submitModalInfo').addEventListener('click', ()=>{
    selected = [];
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
        // console.log(newUrl);
        document.getElementById('toTagPage').setAttribute('href', `${newUrl}`)
    }
    // $('.modal').modal('hide');
})