
const bookGrid = document.getElementById("bookGrid");
const addBookForm = document.getElementById("addBookForm");

addBookForm.addEventListener("submit", async(e) => {
    e.preventDefault();

    const title = document.getElementById("title").value;
    const author = document.getElementById("author").value;
    const category = document.getElementById("category").value;

    await fetch("https://midnight-enormous-sock.glitch.me/books" , {
        method: "POST",
        headers: { "content-Type": "application/json"},
        body: JSON.stringify({
            title,
            author,
            category,
            isAvailable: true,
            isVerified: false,
            borrowedDays: null,
            ImageUrl: "https://m.media-amazon.com/images/I/71ZB18P3inL._SY522_.jpg"
        }),
    });

    alert("Book Added Successfully");
    fetchBooks();
});

async function fetchBooks() {
    const response = await fetch("https://midnight-enormous-sock.glitch.me/books");
    const books = await response.json();

    bookGrid.innerHTML = books
    .map(
        (book) => `
        <div class="book-card">
            <img src="${book.ImageUrl}" alt=${book.title}">
            <h3>${book.title}</h3>
            <p>${book.author}</p>
            <button onclick="verifyBook(${book.id})" ${
                book.isVerified ? "disabled" : ""
            }>Verify Book</button>
            <button onclick="deleteBook(${book.id})">Delete Books</button>
            </div>
            `
        )
        .join("");
}
async function verifyBook(id) {
    const confirmVerify = confirm("Are you sure to verify");
    if (confirmVerify){
        await fetch('https://midnight-enormous-sock.glitch.me/books/${id}', {
            method: "PATCH",
            headers: { "content-Type": "application/json" },
            body: JSON.stringify({ isVerified: true }),
        });

        alert("Book Verified Successfully");
        fetchBooks();
    }
}

async function deleteBook(id) {
    const confirmDelete = confirm("Are you sure to Delete..?");
    if (confirmDelete) {
        await fetch('https://midnight-enormous-sock.glitch.me/books/${id}', {
            method: "DELETE",
        });
        alert("Book Deleted Successfully");
        fetchBooks();
    }
}
fetchBooks();