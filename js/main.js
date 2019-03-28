// Listen for form submit

document.getElementById('myForm').addEventListener('submit', saveBookmark);
//Save bookmark
function saveBookmark(e){
    //get form values
    var siteName = document.getElementById('siteName').value;
    var siteUrl = document.getElementById('siteUrl').value;

   if(!validateForm(siteName, siteUrl)){
    return false;
   }
    var bookmark = {
        name: siteName,
        url : siteUrl
    }

  /*   //Local Storage Test
    localStorage.setItem('test', 'Hello World');
    //Get Item From LocalStorage
    localStorage.getItem('test');
    //Delete Item from Local Storage
    localStorage.removeItem('test'); */

    //Test if bookk=mark is null
    if(localStorage.getItem('bookmarks')=== null){
        //initialize array
        var bookmarks = [];
        // Add to array
        bookmarks.push(bookmark);

        // Set to LocalStorage
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    } else {
        // Get bookmarks from local Storage
        var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
        // Add bookmatk to array
        bookmarks.push(bookmark);
        // Re-set back to localStorage
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks));

    }
  //Clear all fields on submit
 document.getElementById('myForm').reset();
    


     //Fetch the bookmark
    fetchBookmarks();

  





// Prevents form from submitting
    e.preventDefault();
}
// Delete Bookmark
function deleteBookmark(url){
   //Get Bookmarks from localStorage
   var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
   //Loop through bookmarks
   for(var i = 0; i < bookmarks.length; i++){
    if(bookmarks[i].url == url){
        //remove from array
        bookmarks.splice(i, 1);
    }
   }
   // Re-set back to localStorage
   localStorage.setItem('bookmarks', JSON.stringify(bookmarks));

   //Re-fetch bookmarks
   fetchBookmarks()
}
// Fetch Bookmarks
function fetchBookmarks(){
    // Get bookmarks from local Storage
    var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));

 //Get oyutput id
 var bookmarksResults = document.getElementById('bookmarksResults');

 //Build Output
 bookmarksResults.innerHTML = '';

 for(var i = 0; i < bookmarks.length; i++){
    var name = bookmarks[i].name;
    var url = bookmarks[i].url;

    bookmarksResults.innerHTML += '<div class="well">'+
    '<h3>'+name+
    ' <a class="btn btn-default" target="_blank" href="'+url+'">Visit</a> ' +
    ' <a onclick="deleteBookmark(\''+url+'\')" class="btn btn-danger"  href="#">Delete</a> '
    '</h3>'+
    '</div>'
 }
}

//Validate form
function validateForm(siteName, siteUrl){
    if(!siteName || !siteUrl){
        alert('Please fill in the form');
        return false;
    }

    var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
var regex = new RegExp(expression);

if(!siteUrl.match(regex)){
    alert('Please use a vilid URL');
    return false;
}
return true
}