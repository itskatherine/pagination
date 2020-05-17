/******************************************
Treehouse Techdegree:
FSJS project 2 - List Filter and Pagination
******************************************/

// Study guide for this project - https://drive.google.com/file/d/1OD1diUsTMdpfMDv677TfL1xO2CEkykSz/view?usp=sharing

/*** 
   Add your global variables that store the DOM elements you will 
   need to reference and/or manipulate. 
   
   But be mindful of which variables should be global and which 
   should be locally scoped to one of the two main functions you're 
   going to create. A good general rule of thumb is if the variable 
   will only be used inside of a function, then it can be locally 
   scoped to that function.
***/

let listItems = document.getElementsByClassName("student-item");
let itemsPerPage = 10;

/*** 
   Create the `showPage` function to hide all of the items in the 
   list except for the ten you want to show.

   Pro Tips: 
     - Keep in mind that with a list of 54 students, the last page 
       will only display four.
     - Remember that the first student has an index of 0.
     - Remember that a function `parameter` goes in the parens when 
       you initially define the function, and it acts as a variable 
       or a placeholder to represent the actual function `argument` 
       that will be passed into the parens later when you call or 
       "invoke" the function 
***/

function showPage(list, page) {
  const startIndex = page * itemsPerPage - itemsPerPage;
  const endIndex = page * itemsPerPage;

  for (let i = 0; i < list.length; i++)
    if (i >= startIndex && i < endIndex) {
      list[i].style.display = "block";
    } else {
      list[i].style.display = "none";
    }
}

/*** 
   Create the `appendPageLinks function` to generate, append, and add 
   functionality to the pagination buttons.
***/

function appendLinks(list) {
  let containerDiv = document.createElement("div");
  containerDiv.className = "pagination";
  let pageDiv = document.querySelector(".page");
  pageDiv.appendChild(containerDiv);

  const numberOfPages = Math.ceil(list.length / itemsPerPage);

  let ul = document.createElement("ul");
  containerDiv.appendChild(ul);

  for (let i = 0; i < numberOfPages; i++) {
    let li = document.createElement("li");
    ul.appendChild(li);
    let a = document.createElement("a");
    a.href = "#";
    a.textContent = i + 1;
    a.addEventListener("click", clickHandler);
    if (i === 0) {
      a.className = "active";
    }
    li.appendChild(a);
  }
}

function clickHandler(e) {
  let aArray = document.getElementsByTagName("a");
  for (let child in aArray) {
    aArray[child].className = "inactive";
  }
  e.target.className = "active";
  showPage(listItems, parseInt(e.target.textContent));
}

function searchBar() {
  let header = document.querySelector(".page-header");
  let searchDiv = document.createElement("div");
  searchDiv.className = "student-search";
  let searchInput = document.createElement("input");
  searchInput.placeholder = "Search for students";
  let searchButton = document.createElement("button");
  searchButton.innerHTML = "Search";

  header.appendChild(searchDiv);
  searchDiv.appendChild(searchInput);
  searchDiv.appendChild(searchButton);

  searchInput.addEventListener("keyup", searchFunc);
}

function searchFunc(e) {
  let match;
  let nameArray = [];
  let nameElements = document.getElementsByTagName("h3");
  for (i = 0; i < nameElements.length; i++) {
    nameArray[i] = nameElements[i].innerHTML;
  }
  let input = e.target.value;
  //console.log("input: " + input);
  //console.log(input[0]);

  for (let i = 0; i < listItems.length; i++) {
    match = true;
    for (j = 0; j < input.length; j++) {
      if (input[j] !== nameArray[i][j]) {
        match = false;
      }
    }

    if (match) {
      listItems[i].style.display = "block";
    } else {
      listItems[i].style.display = "none";
    }
  }
}

searchBar();

showPage(listItems, 1);
appendLinks(listItems);
