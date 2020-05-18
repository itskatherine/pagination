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

  let ul = document.createElement("ul");
  containerDiv.appendChild(ul);

  const numberOfPages = Math.ceil(list.length / itemsPerPage);

  for (let i = 0; i < numberOfPages; i++) {
    let li = document.createElement("li");
    ul.appendChild(li);
    let a = document.createElement("a");
    a.href = "#";
    a.textContent = i + 1;
    a.addEventListener("click", (e) => {
      let aArray = document.getElementsByTagName("a");
      for (let child in aArray) {
        aArray[child].className = "inactive";
      }
      e.target.className = "active";
      showPage(list, parseInt(e.target.textContent));
    });
    if (i === 0) {
      a.className = "active";
    }
    li.appendChild(a);
  }
}

function makeSearchBar() {
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
  let nameArray = [];
  let newItemList = [];
  let nameElements = document.getElementsByTagName("h3");
  for (i = 0; i < nameElements.length; i++) {
    nameArray[i] = nameElements[i].innerHTML;
  }
  let input = e.target.value.toLowerCase();

  if (!input) {
    initialise(listItems);
    return;
  }

  for (let i = 0; i < listItems.length; i++) {
    if (nameArray[i].includes(input)) {
      newItemList.push(listItems[i]);
    }
  }

  for (let i = 0; i < listItems.length; i++) {
    listItems[i].style.display = "none";
  }

  initialise(newItemList);
  if (newItemList.length === 0) {
    console.log("No results to show");
  }
}

function initialise(list) {
  showPage(list, 1);
  let containerDiv = document.querySelector(".pagination");
  let pageDiv = document.querySelector(".page");
  if (containerDiv) {
    containerDiv.parentNode.removeChild(containerDiv);
  }
  appendLinks(list);
}

initialise(listItems);
makeSearchBar();
