import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { Container, Paper, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import "./App.css";
import BookTable from "./components/BooksTable";
import CreateForm from "./components/CreateForm";
import SearchMenu from "./components/SearchMenu";

function App() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    // Завантаження даних при входженні на сайт
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3001/books");
        const data = await response.json();
        setBooks(data);
        console.log(data);
      } catch (error) {
        console.error("Помилка при завантаженні даних:", error);
      }
    };

    fetchData();
  }, []);

  const handleUpdateBook = async (updatedBook) => {
    try {
      const response = await fetch(
        `http://localhost:3001/books/${updatedBook._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedBook),
        }
      );

      if (response.ok) {
        // Оновити дані в стані компонента
        setBooks((prevBooks) =>
          prevBooks.map((book) =>
            book._id === updatedBook._id ? updatedBook : book
          )
        );
      } else {
        console.error("Помилка при оновленні книги");
      }
    } catch (error) {
      console.error("Помилка при виконанні PUT-запиту:", error);
    }
  };

  const handleDeleteBook = async (bookId) => {
    try {
      const response = await fetch(`http://localhost:3001/books/${bookId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        // Видалити книгу зі стану компонента
        setBooks((prevBooks) =>
          prevBooks.filter((book) => book._id !== bookId)
        );
      } else {
        console.error("Помилка при видаленні книги");
      }
    } catch (error) {
      console.error("Помилка при виконанні DELETE-запиту:", error);
    }
  };
  const handleSearch = async (data) => {
    // Обробка даних для пошуку (наприклад, можна вивести їх або використати для фільтрації книг)
    console.log("Дані для пошуку:", data);

    try {
      data = !data || data === undefined ? "" : data;
      const response = await fetch(`http://localhost:3001/books`);
      console.log(response);
      const resp = await response.json();
      const res1 = resp.filter((book) => {
        return (
          book.title && book.title.toLowerCase().includes(data.toLowerCase())
        );
      });

      //setBooks(data);

      //setSearchData(data);
      // const filteredBooks = data.filter((book) => {
      //   // за назвою
      //   return (
      //     books.title &&
      //     searchData.title &&
      //     book.title.toLowerCase().includes(searchData.title.toLowerCase())
      //   );
      // });
      // console.log(data);
      setBooks(res1);
    } catch (error) {
      console.error("Помилка при завантаженні даних:", error);
    }
  };

  return (
    <Container>
      <Paper
        variant="elevation"
        style={{ alignContent: "center", padding: "1%", marginTop: "1%" }}
      >
        <Typography variant="h2" align="center" padding="1%">
          Додати книгу
        </Typography>
        <CreateForm></CreateForm>
        <Typography variant="h2" align="center" padding="1%">
          Знайти книгу
        </Typography>
        <SearchMenu onSearch={handleSearch}></SearchMenu>
        <BookTable
          books={books}
          onUpdateBook={handleUpdateBook}
          onDeleteBook={handleDeleteBook}
        />
      </Paper>
    </Container>
  );
}

export default App;
