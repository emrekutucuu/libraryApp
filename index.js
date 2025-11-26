//Change the form based on dropdown
const select = document.getElementById("formSelect");
const addBook = document.getElementById("addBook");
const addMagazine = document.getElementById("addMagazine");

function showForm(selectedValue) {
  if (selectedValue === "book") {
    addBook.style.display = "block";
    addMagazine.style.display = "none";
  } else if (selectedValue === "magazine") {
    addBook.style.display = "none";
    addMagazine.style.display = "block";
  }
}

select.addEventListener("change", function () {
  const selectedValue = this.value;
  showForm(selectedValue);
});

showForm("book");

//Add new item, Delete item, Edit item

class Item {
  constructor(name, page, year) {
    this.name = name;
    this.page = page;
    this.year = year;
  }
}

class Book extends Item {
  constructor(name, page, year, writer) {
    super(name, page, year);
    this.writer = writer;
  }
}
let book = new Book();

class Magazine extends Item {
  constructor(name, page, year, organizator) {
    super(name, page, year);
    this.organizator = organizator;
  }
}
let magazine = new Magazine();

const bookAll = [];
const mgAll = [];

addBook.addEventListener("submit", function (event) {
  event.preventDefault();
  const bookName = document.getElementById("bookName").value;
  const bookPage = document.getElementById("bookPage").value;
  const bookYear = document.getElementById("bookYear").value;
  const bookWriter = document.getElementById("bookWriter").value;

  const book = new Book(bookName, bookPage, bookYear, bookWriter);

  if(isEditing) {

    bookAll[editingIndex] = book;

    isEditing = false;
    editingIndex = -1;

    document.getElementById("formBookAdd").textContent = "Add";

  }

  else bookAll.push(book);
  
  renderBook();
  addBook.reset();

});

addMagazine.addEventListener("submit", function (event) {

  event.preventDefault();
  const mgName = document.getElementById("mgName").value;
  const mgPage = document.getElementById("mgPage").value;
  const mgYear = document.getElementById("mgYear").value;
  const mgOrganizator = document.getElementById("mgOrganizator").value;

  const mg = new Magazine(mgName, mgPage, mgYear, mgOrganizator);

  if(isEditing){

    mgAll[editingIndex] = mg;

    isEditing = false;
    editingIndex = -1;

    document.getElementById("formMagazineAdd").textContent = "Add";
  }

  else mgAll.push(mg);

  renderMagazine();
  addMagazine.reset();

});

const outBook = document.getElementById("outBook");

function renderBook(bookRender = bookAll) {

    outBook.innerHTML = "";
    
    bookRender.forEach((book, index) => {
        const actualIndex = bookAll.indexOf(book);

        if(actualIndex === -1) return;

        const bookDiv = document.createElement("div");

        bookDiv.classList.add("book-item");

        bookDiv.innerHTML = `
        <div style="display: flex;">
            <button class="edit-btn" onclick="editBook(${actualIndex})">
                Edit
            </button>
            <button class="delete-btn" data-index="${actualIndex}" onclick= "deleteBook(${index})">
                X
            </button>
        </div>
        <strong>Book name: ${book.name}</strong>
        <br>
        <p>Book Page: ${book.page}
        <p>Book Year: ${book.year}
        <p>Book Writer: ${book.writer}</p>
        <hr>
        `;
        
        outBook.appendChild(bookDiv);
    });
}


const outMg= document.getElementById("outMg");

function renderMagazine(mgRender = mgAll) {
  outMg.innerHTML = "";

  mgRender.forEach((mg, index) => {
    const actualIndex = mgAll.indexOf(mg);

    if(actualIndex === -1) return;

    const mgDiv = document.createElement("div");
    mgDiv.classList.add("magazine-item");
    
    mgDiv.innerHTML = `
                <div style="display: flex;">
                    <button class="edit-btn" onclick="editMagazine(${actualIndex})">
                        Edit
                    </button>
                    <button class="delete-btn" data-index="${actualIndex}" onclick= "deleteMagazine(${index})">
                        X
                    </button>
                </div>
                <strong>Magazine name: ${mg.name}</strong>
                <br>
                <p>Magazine Page: ${mg.page}
                <p>Magazine Year: ${mg.year}
                <p>Magazine Organizator: ${mg.organizator}</p>

            <hr>
        `;

    outMg.appendChild(mgDiv);
  });
}

// Delete functions

function deleteBook(index){
    bookAll.splice(index, 1);
    renderBook();
}

function deleteMagazine(index){
    mgAll.splice(index, 1);
    renderMagazine();
}

// Edit functions

let isEditing = false;
let editingIndex = -1;

function editBook(index){
    isEditing = true;
    editingIndex = index;

    showForm("book");
    document.getElementById("formSelect").value = "book";

    const bookIndex = bookAll[index];

    document.getElementById("bookName").value = bookIndex.name;
    document.getElementById("bookPage").value = bookIndex.page;
    document.getElementById("bookYear").value = bookIndex.year;
    document.getElementById("bookWriter").value = bookIndex.writer;
    document.getElementById("formBookAdd").textContent = "Edit";
}

function editMagazine(index){
    isEditing = true;
    editingIndex = index;

    showForm("magazine");
    document.getElementById("formSelect").value = "magazine";

    const mgIndex = mgAll[index];

    document.getElementById("mgName").value = mgIndex.name;
    document.getElementById("mgPage").value = mgIndex.page;
    document.getElementById("mgYear").value = mgIndex.year;
    document.getElementById("mgOrganizator").value = mgIndex.organizator;
    document.getElementById("formMagazineAdd").textContent = "Edit";
}

const searchInput = document.getElementById("search-input");

function search(item, searchText){
    const lowerCaseSearch = searchText.toLowerCase().trim();

    for(const key in item){
        if (item.hasOwnProperty(key)){
            const value = item[key];

            if(String(value).toLowerCase().includes(lowerCaseSearch)){
                return true;
            }
        }

    }
    return false;
}

function performSearch(){
    const searchValue = searchInput.value;

    if(searchValue.trim() === ""){
        renderBook(bookAll);
        renderMagazine(mgAll);
    } else {
        const filterBook = bookAll.filter(book => search(book, searchValue));
        renderBook(filterBook);
        const filterMg = mgAll.filter(magazine => search(magazine, searchValue));
        renderMagazine(filterMg);
    }
}

searchInput.addEventListener("input", performSearch);

performSearch();