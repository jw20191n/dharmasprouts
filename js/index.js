const tagsDiv = document.getElementById('tags');
let tags = {};
//object that keys are the name of the tags, values are the numbers of the tags appeared
const ulDisplay = document.getElementById('display-tags');

document.addEventListener('DOMContentLoaded', () => {

    fetch('http://localhost:3000/data')
    .then(resp => resp.json())
    .then(data => {
        printTags(data);
    })
});

function printTags(data){
    console.log(data);
    data.forEach( book => {
        let tagsOfABook = book.Tags;
        console.log(tagsOfABook);

        tagsOfABook.forEach(tag => {
            if (tags.hasOwnProperty(tag)){
                tags[tag] = tags[tag] + 1;
            }else{
                tags[tag] = 1;
            }
        })
    })
    
    for (keys in tags) {
        ulDisplay.innerHTML += "<a href='show_tags.html?" + "val=" + keys + "'>" + '<li>' + keys + " " + "(" + tags[keys]+ ")" +'</li>' + '</a>';
    }
    console.log(tags);
}