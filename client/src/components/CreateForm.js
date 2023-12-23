import { Button, Container, Grid, TextField } from "@mui/material";
import React, { useState } from "react";

export default function CreateForm() {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [year, setYear] = useState("");

  const onAddBook = async (newBook) => {
    try {
      // Використовуйте функцію fetch для відправлення POST-запиту
      const response = await fetch("http://localhost:3001/books", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newBook),
      });

      // Перевірте, чи запит був успішним (можна додати додаткову обробку помилок)
      if (response.ok) {
        console.log("Книга успішно додана!");
      } else {
        console.error("Помилка при додаванні книги");
      }
    } catch (error) {
      console.error("Помилка при виконанні POST-запиту:", error);
    }
  };

  const handleAddBook = () => {
    const newBook = { title, author, year };
    onAddBook(newBook);
    setTitle("");
    setAuthor("");
    setYear("");
  };

  return (
    <Container>
      <Grid
        container
        direction="row"
        justifyContent="space-around"
        alignItems=""
      >
        <TextField
          label="Назва"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <TextField
          label="Автор"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
        />
        <TextField
          label="Рік видання"
          value={year}
          onChange={(e) => setYear(e.target.value)}
        />
        <Button variant="contained" onClick={handleAddBook}>
          Додати книгу
        </Button>
      </Grid>
    </Container>
  );
}
