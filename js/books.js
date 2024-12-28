const loginDataUser = JSON.parse(localStorage.getItem("loginData"));

if (!loginDataUser || loginDataUser.email !== "user@empher.com") {
    alert("User Not Logged In");
    window.location.href = "index.html";
}

const BookGridUser = document.getElementById("bookGrid");

document.getElementById("showAvailable").addEventListener("click", async () => {
    const response = await fetch("https://midnight-enormous-sock.glitch.me/books?isAvailable=true");

const books = await response.json();

BookGridUser.innerHTML = books 
    .map(
        (book) => `
        <div class="book-card">
        <img src="${book.ImageUrl}" alt="${book.title}">
        <h3>${book.title}</h3>
        <p>${book.author}</p>
        <p>${book.category}</p>
        <button onclick="borrowBook(${book.id})">Borrow Book</button>
        </div>
        `
        )
        .join("");
});

async function borrowBook(id) {
    const days = prompt("Enter Borrowing duration (Max 10 days", 10);
    if (days && days <= 10) {
        await fetch('https://midnight-enormous-sock.glitch.me/books/${id}', {
            method: "PATCH",
            headers: { "content-Type": "application/json" },
            body: JSON.stringify({ borrowedDays: days, isAvailable: false }),
        });

        alert("Book Borrowed Successfully");
        document.getElementById("showAvailable").click();
    } else {
        alert("Invalid duration entered");
    }
}

document.getElementById("showBorrowed").addEventListener("click", async () => {
    const response = await fetch(
        "https://midnight-enormous-sock.glitch.me/books?isAvailable=false"
    );
    const books = await response.json();

    BookGridUser.innerHTML = books
        .map(
            (book) => `
        <div class="book-card">
            <img src="${book.ImageUrl}" alt="${book.title}">
            <h3>${book.title}</h3>
            <p>${book.author}</p>
            <p>${book.category}</p>
            <p>Borrowed Days: ${book.borrowedDays}</p>
            <button onclick="returnBook(${book.id})">Return Book</button>
        </div>
        `
        )
        .join("");
});

async function returnBook(id){
    const confirmReturn = confirm("Are you sure to return the book..?");
    if (confirmReturn) {
        await fetch('https://midnight-enormous-sock.glitch.me/books/${id', {
            method: "PATCH",
            headers: { "content-Type": "application/json" },
            body: JSON.stringify({ borrowedDays: null, isAvailable: true}),
        });
        alert("Book Returned Successfullt");
        document.getElementById("showBorrowed").click();
    }
}