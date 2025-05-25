import { expect } from "chai";
import { bookService } from "../function/BooksService.js"

describe("Book Service Tests", function() {

    describe("getBooks()", function() {
        // Test: Should return a status 200 and an array of books
        // 1. Verify that the response status is 200.
        // 2. Check that the first book includes the required keys: 'id', 'title', 'author', 'year', 'genre'.

        it("should return a successful responce with a list of 3 books", function(){
            const response = bookService.getBooks();

            expect(response.status).to.equal(200)
            expect(response.data).to.be.an('array').that.has.lengthOf(3)
            expect(response.data[0]).to.have.all.keys("id", "title", "author", "year", "genre");
            expect(response.data[1]).to.have.all.keys("id", "title", "author", "year", "genre");
            expect(response.data[2]).to.have.all.keys("id", "title", "author", "year", "genre");
            
        })

    });

    describe("addBook()", function() {
        // Test: Should add a new book successfully
        // 1. Create a new valid book object.
        // 2. Verify the response status is 201 and the success message is correct.
        // 3. Verify that the newly added book is present in the book list.

        it("should add a new book successfully", function(){
            const newBook = {
                id: "4",
                title: "Game of Thrones",
                author: "George Martin",
                year: 1999,
                genre: "faqntasy"
            }

            const response = bookService.addBook(newBook);
            expect(response.status).to.equal(201)
            expect(response.message).to.equal("Book added successfully.")

            const allBooks = bookService.getBooks().data;
            expect(allBooks).to.deep.include(newBook);
            
        })

        // Test: Should return status 400 when adding a book with missing fields
        // 1. Create an invalid book object with missing fields.
        // 2. Check if the response status is 400 and the error message is "Invalid Book Data!".

        it("Should return status 400 when adding a book with missing fields", function(){
            const newBook = {
                id: "4",
                title: "Game of Thrones"
            }

            const response = bookService.addBook(newBook);
            expect(response.status).to.equal(400)
            expect(response.error).to.equal("Invalid Book Data!")  
        })
    });

    describe("deleteBook()", function() {
        // Test: Should delete a book by id successfully
        // 1. Add a book and then delete it by its ID.
        // 2. Verify the response status is 200 and the success message is correct.
        // 3. Ensure the book count returns the sum of the initial count of the books and the count of the added books from the tests

        it("Should delete a book by id successfully", function() {

            const newBook = {
                id: "5",
                title: "Game of The thrones",
                author: "Martin",
                year: 2000,
                genre: "faqntasy"
            }

            const response = bookService.addBook(newBook);
            expect(response.status).to.equal(201)
            expect(response.message).to.equal("Book added successfully.")
            const allBooks = bookService.getBooks().data;
            expect(allBooks.length).to.equal(4);
            expect(allBooks).to.deep.include(newBook);

            const gameIdToBeDeleted = "5";
            const responseDelete = bookService.deleteBook(gameIdToBeDeleted);
            expect(responseDelete.status).to.equal(200);
            expect(responseDelete.message).to.equal("Book deleted successfully.")
            

        })

        // Test: Should return status 404 when deleting a book with a non-existent id
        // 1. Attempt to delete a book with a non-existent ID.
        // 2. Check that the response status is 404 and the error message is "Book Not Found!".

        it("Should delete a book with a non-existent id", function() {
            
            const gameIdToBeDeleted = "5";
            const responseDelete = bookService.deleteBook(gameIdToBeDeleted);
            expect(responseDelete.status).to.equal(404);
            expect(responseDelete.error).to.equal("Book Not Found!")
        })
    });

    describe("updateBook()", function() {
        // Test: Should update a book successfully
        // 1. Create updated data for an existing book.
        // 2. Verify the response status is 200 and the success message is correct.
        // 3. Ensure that the updated book fields reflect the new data.

        it("Should update a book successfully", function(){
            const oldId = "2";
            const newBook = {
                id: oldId,
                title: "Pride and Prejudice",
                author: "Jane Ostin",
                year: 1987,
                genre: "novel"
            }

            const response = bookService.updateBook(oldId, newBook)
            expect(response.status).to.equal(200);
            expect(response.message).to.equal("Book updated successfully.")

            const allBooks = bookService.getBooks().data;
            expect(allBooks).to.deep.include(newBook);
        })

        // Test: Should return status 404 when updating a non-existent book
        // 1. Attempt to update a book that doesn't exist.
        // 2. Check that the response status is 404 and the error message is "Book Not Found!".

        it("Should update a a non-existent book", function(){
            const oldId = "999";
            const newBook = {
                id: oldId,
                title: "Pride and Prejudice",
                author: "Jane Ostin",
                year: 1987,
                genre: "novel"
            }

            const response = bookService.updateBook(oldId, newBook)
            expect(response.status).to.equal(404);
            expect(response.error).to.equal("Book Not Found!")

            
        })

        // Test: Should return status 400 when updating with incomplete book data
        // 1. Provide an incomplete book object with missing fields.
        // 2. Verify that the response status is 400 and the error message is "Invalid Book Data!".

        it("Should update with incomplete book data", function(){
            const oldId = "1";
            const newBook = {
                id: oldId,
                title: "Pride and Prejudice",
            }

            const response = bookService.updateBook(oldId, newBook)
            expect(response.status).to.equal(400);
            expect(response.error).to.equal("Invalid Book Data!")

            
        })

    });
});
