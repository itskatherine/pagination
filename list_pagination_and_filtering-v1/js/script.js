/******************************************
Treehouse Techdegree:
FSJS project 2 - List Filter and Pagination
******************************************/

let listItems = document.getElementsByClassName("student-item");
let itemsPerPage = 10;

/**
 * showPage() determines which list elements from the list provided
 * will be displayed, calculated using the the number of items
 * displayed per page, and the number of the page to
 * be displayed.
 *
 * @param {array} list - An array of list elements containing student info
 * @param {int} page - The number of the page to be displayed (1 will display the 1st page of results).
 */

function showPage(list, page) {
  const startIndex = page * itemsPerPage - itemsPerPage;
  const endIndex = page * itemsPerPage;

  //After calculating the startIndex and endIndex based on the number
  //of items per page, the provided list is looped through
  //and displays the elements within bounds, hiding those that.

  for (let i = 0; i < list.length; i++)
    if (i >= startIndex && i < endIndex) {
      list[i].style.display = "block";
    } else {
      list[i].style.display = "none";
    }
}

/**
 * appendLinks accepts a list of page elements, dynamically
 * creates them and determines how many pagination
 * links should be made, as well as adding
 * functionality to them.
 *
 * @param {array} list - An array of list elements containing student info
 */

function appendLinks(list) {
  //first the pagination link elements are created and
  //appended to existing div with the class "page"
  let containerDiv = document.createElement("div");
  containerDiv.className = "pagination";
  let pageDiv = document.querySelector(".page");
  pageDiv.appendChild(containerDiv);

  //an unordered list is created to contain the list
  //elements (which will contain pagination links)
  let ul = document.createElement("ul");
  containerDiv.appendChild(ul);

  const numberOfPages = Math.ceil(list.length / itemsPerPage);

  //for each page that is created, the list element,
  //is appended, and its text content is determined
  //by the index
  //the active class is initialised on the first list element
  //otherwise class is inactive
  //when clicked, the showPage function is called, using the
  //text Content on the clicked element to determine which
  //page is fed to the function.
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

/*
 *the makeSearchBar function dynamically creates the search
 *bar, adds click and keyup events to which calls searchFunc, and then also creates
 *a message box (p element) which will be used to display a message if
 *no results are found.
 *
 */

function makeSearchBar() {
  let header = document.querySelector(".page-header");
  let searchDiv = document.createElement("div");
  searchDiv.className = "student-search";
  let searchInput = document.createElement("input");
  searchInput.placeholder = "Search for students...";
  let searchButton = document.createElement("button");
  searchButton.innerHTML = "Search";

  header.appendChild(searchDiv);

  searchDiv.appendChild(searchInput);
  searchDiv.appendChild(searchButton);

  //event listeners are created for the keyup and click events
  //this means the searchFunc will be called whenever the
  //user types, or if they click the search button after
  //copying and pasting the input
  searchInput.addEventListener("keyup", searchFunc);
  searchButton.addEventListener("click", searchFunc);

  //this creates a paragraph element to display a message
  //to the user if there are no search results.
  let list = document.querySelector(".student-list");
  let message = document.createElement("p");
  message.className = "searchMessage";
  list.append(message);
}

/**
 * searchFunc is used to determine if the user input can be matched with
 * any of the student names, create a new array from these elements,
 * which will then be initialised.
 *
 * @param {object} e - The event object is passed from the click and keyup event added to the
 * search bar
 */

function searchFunc(e) {
  let nameArray = []; //initialise an array which will contain and array of strings, the names of the students
  let newItemList = []; //the new array to be constructed in this function

  //collects all the h3 elements which include the student's names
  let nameElements = document.getElementsByTagName("h3");

  //populates the name array with the names contains in the h3 elements
  for (i = 0; i < nameElements.length; i++) {
    nameArray[i] = nameElements[i].innerHTML;
  } //let pageDiv = document.querySelector(".page");

  //selects the search bar created earlier
  let inputBar = document.querySelector("input");
  //takes the value of the input and also transforms
  //it to lowercase so uppercase input is valid
  input = inputBar.value.toLowerCase();

  //if there isn't any input, initialise the page
  if (!input) {
    initialise(listItems);
    return;
  }

  //check all the strings in the name array with the input
  //and populate the newItemList array with the ones that match
  for (let i = 0; i < listItems.length; i++) {
    if (nameArray[i].includes(input)) {
      newItemList.push(listItems[i]);
    } //let pageDiv = document.querySelector(".page");
  }

  //initialise the the page with the newItemList array of elements that match the search query
  initialise(newItemList);

  //select the p element we dynamically created earlier
  let message = document.querySelector(".searchMessage");
  //change its text content depending on if any names match the input and have been added to the array
  if (newItemList.length === 0) {
    message.textContent = "Nothing to display";
  } else {
    message.textContent = "";
  }
}

/**
 * The initialise function, removes or hides any elements created by other functions
 * so the page can be re-created without multiple elements being made. It then
 * initialises the page by calling functions showPage and appendLinks
 *
 * @param {array} list - An array of list elements containing student info
 */

function initialise(list) {
  //makes all list items invisible
  for (let i = 0; i < listItems.length; i++) {
    listItems[i].style.display = "none";
  }
  //creates the page
  showPage(list, 1);
  let containerDiv = document.querySelector(".pagination");

  if (containerDiv) {
    containerDiv.parentNode.removeChild(containerDiv); //removes the pagination div created previously if it exists
  }
  appendLinks(list);
}

initialise(listItems);
makeSearchBar();
