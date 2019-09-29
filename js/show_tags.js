

var books_with_tag =[];
var book_tag = document.location.search.replace(/^.*?\=/,'');
console.log(book_tag);

if (book_tag == 'karma,%20virtues%20and%20non-virtues'){
    book_tag = 'karma, virtues and non-virtues'
} else if (book_tag.includes("%20")){
   book_tag = book_tag.replace("%20", " ");
} 
console.log(book_tag);

// var book_tag = 'meditation';

function display_tags_divs(){
    $.getJSON( "test.json", function( json ) {
        var n=0;
        var books = json.books;

        while( n<books.length){
            if (books[n].Tags.includes(book_tag)){
                books_with_tag.push(books[n]);
            }
            n++;
        }//end of whie

        console.log(books_with_tag);

        document.getElementById('inner').innerHTML += "<p class='prompt'>" 
        + "You chosed " + "<a href='show_tags.html'>"+ "'" + book_tag + ".'" + "</a>" + "<br>" 
        + "Here is our recommendation based on your recommendation."  + "</p>";

        for (i=0;i<books_with_tag.length;i++) {
            document.getElementById('inner').innerHTML += '<br>' + "<div class='added_div'>" 
            + '<img src=' + "'" + books_with_tag[i].Url + "'" + " class='covers'>"
            + "<h3>" + books_with_tag[i].Name + '</h3>'
            + "Author: " + books_with_tag[i].Author.join(" ") + '<br>'
            + "Publisher: " + books_with_tag[i].Publisher + '<br>'
            + "Language: " + books_with_tag[i].Language.join(" ") + '<br>'
            + "Description: " + books_with_tag[i].Notes + '<br>'
            + '</div>';
        }

    });//end of getJson

}//end of print_all_tags()

