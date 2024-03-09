import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const bookSchema = Yup.object().shape({
  title: Yup.string().required("Title is required"),
  author: Yup.string().required("Author name is required"),
  isbn: Yup.string().matches(
    /^\d{9}[\d|X]$|^\d{13}$/,
    "ISBN must be 10 or 13 digits long"
  ),
  publicationDate: Yup.date()
    .max(new Date(), "Provide a valid publication date")
    .required("Publication date is required"),
});

const authorSchema = Yup.object().shape({
  authorName: Yup.string().required("Author name is required"),
  birthDate: Yup.date()
    .max(new Date(), "Birth date cannot be in the future")
    .required("Birth date is required"),
  biography: Yup.string().min(
    100,
    "Biography must be at most 100 characters long"
  ),
});

const AdminDashboard = () => {
  // State for books and authors
  const [books, setBooks] = useState([]);
  const [authors, setAuthors] = useState([]);
  const [editingBookIndex, setEditingBookIndex] = useState(null);
  const [editingAuthorIndex, setEditingAuthorIndex] = useState(null);

  // Initial values for book form fields
  const initialBookValues = {
    title: "",
    author: "",
    isbn: "",
    publicationDate: "",
  };

  // Initial values for author form fields
  const initialAuthorValues = {
    authorName: "",
    birthDate: "",
    biography: "",
  };

  const validateBook = (values) => {
    const errors = {};
    if (!values.title) {
      errors.title = "Required";
    }

    return errors;
  };

  // Validation for author form
  const validateAuthor = (values) => {
    const errors = {};
    if (!values.authorName) {
      errors.authorName = "Required";
    }

    return errors;
  };

  // Function to handle book form submission
  const handleBookSubmit = (values, { resetForm }) => {
    if (editingBookIndex !== null) {
      // Editing existing book
      const updatedBooks = [...books];
      updatedBooks[editingBookIndex] = values;
      setBooks(updatedBooks);
      setEditingBookIndex(null);
    } else {
      // Adding new book
      setBooks([...books, values]);
    }
    resetForm();
  };

  // Function to handle author form submission
  const handleAuthorSubmit = (values, { resetForm }) => {
    if (editingAuthorIndex !== null) {
      // Editing existing author
      const updatedAuthors = [...authors];
      updatedAuthors[editingAuthorIndex] = values;
      setAuthors(updatedAuthors);
      setEditingAuthorIndex(null);
    } else {
      // Adding new author
      setAuthors([...authors, values]);
    }
    resetForm();
  };

  // Function to edit a book
  const editBook = (index) => {
    setEditingBookIndex(index);
  };

  // Function to edit an author
  const editAuthor = (index) => {
    setEditingAuthorIndex(index);
  };

  // Function to delete a book
  const deleteBook = (index) => {
    const updatedBooks = [...books];
    updatedBooks.splice(index, 1);
    setBooks(updatedBooks);
  };

  // Function to delete an author
  const deleteAuthor = (index) => {
    const updatedAuthors = [...authors];
    updatedAuthors.splice(index, 1);
    setAuthors(updatedAuthors);
  };

  return (
    <div>
      <h1 className="book">Admin Dashboard</h1>

      {/* Add/Edit Book Form */}
      <h2 className="book">
        {editingBookIndex !== null ? "Edit Book" : "Add Book"}
      </h2>
      <Formik
        initialValues={initialBookValues}
        validate={validateBook}
        validationSchema={bookSchema}
        onSubmit={handleBookSubmit}>
        {({ values, handleChange }) => (
          <Form>
            <div className="book">
              <label className="title">Title:</label>
              <Field
                type="text"
                name="title"
                value={values.title}
                onChange={handleChange}
              />
              <ErrorMessage name="title" component="div" />
            </div>
            <div className="book">
              <label className="author">Author:</label>
              <Field
                type="text"
                name="author"
                value={values.author}
                onChange={handleChange}
              />
              <ErrorMessage name="author" component="div" />
            </div>
            <div className="book">
              <label className="isbn">ISBN:</label>
              <Field
                type="text"
                name="isbn"
                value={values.isbn}
                onChange={handleChange}
              />
              <ErrorMessage name="isbn" component="div" />
            </div>
            <div className="book">
              <label className="publication">Publication Date:</label>
              <Field
                type="date"
                name="publicationDate"
                value={values.publicationDate}
                onChange={handleChange}
              />
              <ErrorMessage name="publicationDate" component="div" />
            </div>
            <button className="book1" type="submit">
              {editingBookIndex !== null ? "Update" : "Add"}
            </button>
          </Form>
        )}
      </Formik>

      {/* Add/Edit Author Form */}
      <h2 className="book">
        {editingAuthorIndex !== null ? "Edit Author" : "Add Author"}
      </h2>
      <Formik
        initialValues={
          editingAuthorIndex !== null
            ? authors[editingAuthorIndex]
            : initialAuthorValues
        }
        validate={validateAuthor}
        validationSchema={authorSchema}
        onSubmit={handleAuthorSubmit}>
        {({ values, handleChange }) => (
          <Form>
            <div className="book">
              <label className="authorname">Author Name:</label>
              <Field
                type="text"
                name="authorName"
                value={values.authorName}
                onChange={handleChange}
              />
              <ErrorMessage name="authorName" component="div" />
            </div>

            <div className="book">
              <label className="biography">Biography:</label>
              <Field
                type="text"
                name="biography"
                value={values.biography}
                onChange={handleChange}
              />
              <ErrorMessage name="biography" component="div" />
            </div>
            <div className="book">
              <label className="birthdate">Birth Date:</label>
              <Field
                type="date"
                name="birthDate"
                value={values.birthDate}
                onChange={handleChange}
              />
              <ErrorMessage name="birthDate" component="div" />
            </div>
            <button className="book1" type="submit">
              {editingAuthorIndex !== null ? "Update" : "Add"}
            </button>
          </Form>
        )}
      </Formik>

      {/* Display Books */}
      <h2 className="book">Books</h2>
      <ul className="booklist">
        {books.map((book, index) => (
          <li key={index}>
            {book.title} by {book.author} (ISBN: {book.isbn}) -{" "}
            {book.publicationDate}
            <button onClick={() => editBook(index)}>Edit</button>
            <button onClick={() => deleteBook(index)}>Delete</button>
          </li>
        ))}
      </ul>

      {/* Display Authors */}
      <h2 className="book">Authors</h2>
      <ul className="authlist">
        {authors.map((author, index) => (
          <li key={index}>
            {author.authorName} (Born: {author.birthDate}) - {author.biography}
            <button onClick={() => editAuthor(index)}>Edit</button>
            <button onClick={() => deleteAuthor(index)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminDashboard;
