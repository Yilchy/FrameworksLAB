import {
  Button,
  Card,
  Modal,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";
import React, { useState } from "react";

const BookTable = ({ books, onUpdateBook, onDeleteBook }) => {
  const [selectedBook, setSelectedBook] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleUpdateClick = (book) => {
    setSelectedBook(book);
    setIsModalOpen(true);
  };

  const handleDeleteClick = (bookId) => {
    onDeleteBook(bookId);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedBook(null);
  };

  const handleUpdateBook = () => {
    onUpdateBook(selectedBook);
    handleModalClose();
  };

  return (
    <div>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Назва</TableCell>
              <TableCell>Автор</TableCell>
              <TableCell>Рік видання</TableCell>
              <TableCell>Дії</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {books.map((book) => (
              <TableRow key={book._id}>
                <TableCell>{book.title}</TableCell>
                <TableCell>{book.author}</TableCell>
                <TableCell>{book.year}</TableCell>
                <TableCell>
                  <Button onClick={() => handleUpdateClick(book)}>
                    Оновити
                  </Button>
                  <Button onClick={() => handleDeleteClick(book._id)}>
                    Видалити
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Modal open={isModalOpen} onClose={handleModalClose}>
        <Card style={{ margin: "10%", padding: "2%" }}>
          <div>
            <TextField
              label="Назва"
              value={selectedBook?.title}
              onChange={(e) =>
                setSelectedBook((prev) => ({ ...prev, title: e.target.value }))
              }
            />
            <TextField
              label="Автор"
              value={selectedBook?.author}
              onChange={(e) =>
                setSelectedBook((prev) => ({ ...prev, author: e.target.value }))
              }
            />
            <TextField
              label="Рік видання"
              value={selectedBook?.year}
              onChange={(e) =>
                setSelectedBook((prev) => ({ ...prev, year: e.target.value }))
              }
            />
            <Button onClick={handleUpdateBook}>Оновити</Button>
          </div>
        </Card>
      </Modal>
    </div>
  );
};

export default BookTable;
