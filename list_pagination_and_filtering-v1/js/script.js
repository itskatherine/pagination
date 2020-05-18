/******************************************
Treehouse Techdegree:
FSJS project 2 - List Filter and Pagination
******************************************/

// Study guide for this project - https://drive.google.com/file/d/1OD1diUsTMdpfMDv677TfL1xO2CEkykSz/view?usp=sharing

let listItems = document.getElementsByClassName("student-item");
let itemsPerPage = 10;

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
  let newItemList = [];
  let nameArray = [];

  let nameElements = document.getElementsByTagName("h3");
  for (i = 0; i < nameElements.length; i++) {
    nameArray[i] = nameElements[i].innerHTML;
  }
  let input = e.target.value.toLowerCase();

  if (!input) {
    showPage(listItems, 1);
    return;
  }

  for (let i = 0; i < listItems.length; i++) {
    match = true;

    if (!nameArray[i].includes(input)) {
      match = false;
    } else {
      newItemList.push(listItems[i]);
    }

    if (match) {
      listItems[i].style.display = "block";
    } else {
      listItems[i].style.display = "none";
    }
  }
}

showPage(listItems, 1);
appendLinks(listItems);
searchBar();
