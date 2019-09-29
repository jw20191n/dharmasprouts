
var age_group_1_books = [];
var tags = {};//array of objects 

// function print_book_names(){
//     $.getJSON( "test.json", function( json ) {
//         var n=0;
//         var books = json.books
//         while( n<books.length){
//             if (books[n].Tags.includes("Age 2-5")){
//                 age_group_1_books.push(books[n])
//             }            
//             n++;
//         }
//         console.log(age_group_1_books.length);
//        });
// }


function print_all_tags(){
    $.getJSON( "test.json", function( json ) {
        var n=0;
        var tags_of_a_book = [];
        var books = json.books;

        while( n<books.length){
            tags_of_a_book = books[n].Tags;   
            var i=0; 
            while ( i<tags_of_a_book.length ){
                if ( tags.hasOwnProperty(tags_of_a_book[i]) ){
                    tags[tags_of_a_book[i]] = tags[tags_of_a_book[i]] + 1;
                }else{
                    tags[tags_of_a_book[i]] = 1;                        
                }
                i++;
            }
            n++;
        }
        

        for (keys in tags) {
            document.getElementById('display-tags').innerHTML += "<a href='show_tags.html?" + "val=" + keys + "'>" + '<li>' + keys + " " + "(" + tags[keys]+ ")" +'</li>' + '</a>';
            // console.log(keys);
        }
        // console.log(tags);
    });//end of getJson

}//end of print_all_tags()





