import { Box } from "@chakra-ui/react";
import Navbar from "../Navbar";
import BookList from "../BookList";
import { useEffect, useState } from "react";
import axios from "axios";
import Cookies from 'js-cookie'
import { useToast } from "@chakra-ui/react";

const MyBooks = () => {
  const toast = useToast();
  const [ownedBooks, setOwnedBooks] = useState([]);
  const [booksForExchange, setBooksForExchange] = useState([]);
  const token = Cookies.get('token')

  useEffect(() =>{
    if(token === undefined) {
      alert("Log in first");
      navigate('/')
    }
    axios.get('http://localhost:8000/api/user/getMyBooks', {
      headers: {
        Authorization: 'Bearer '+token
      }
    })
    .then((res) => {
      const data = res.data.data;
      setOwnedBooks(data);
    })
    .catch((err) => {
      console.log(err);
    })
    axios.get('http://localhost:8000/api/user/getMyBookForExchange', {
      headers: {
        Authorization: 'Bearer '+token
      }
    })
    .then((res) => {
      const data = res.data.data;
      setBooksForExchange(data);
    })
    .catch((err) => {
      console.log(err);
    })
  },[])

  const addForExchange = (book) => {
    console.log(book);
    axios.post("http://localhost:8000/api/book/addExchange", {bookId: book._id}, {
      headers: {
        Authorization: 'bearer '+ token

      }
    })
    .then((res) =>{
      console.log(res);
      toast({
        position: 'top',
        title: 'Book added for exchange',
        status: 'success',
        duration: 1500,
      })
      window.location.reload();
    })
    .catch((err) => {
      console.log(err.response.data.message);
      toast({
        position: 'top',
        title: err.response.data.message,
        status: 'error',
        duration: 1500,
      })
    })
  }

  const removeFromExchange = (book) => {
    axios.post("http://localhost:8000/api/book/removeExchange", {bookId: book._id}, {
      headers: {
        Authorization: 'bearer '+token
      }
    })
    .then((res) =>{
      toast({
        position: 'top',
        title: 'Book removed',
        status: 'success',
        duration: 1500,
      })
      window.location.reload();
    })
    .catch((err) => {
      console.log(err);
    })
  }

  const deleteBook = (book) => {
    axios.delete(`http://localhost:8000/api/book?_id=${book._id}`,{
      headers: {
        Authorization: 'bearer '+token,
      },
    })
    .then((res) =>{
      toast({
        position: 'top',
        title: 'Book Deleted successfully',
        status: 'success',
        duration: 1500,
      })
      window.location.reload();
    })
    .catch((err) => {
      console.log(err);
    })
  }


  return (
    <>
      <Navbar></Navbar>
      <Box
        style={{
          width: "100vw",
          height: "100%",
          minHeight: "100vh",
          marginBottom: "2rem",
          display: "flex",
          justifyContent: "space-evenly",
        }}
      >
        <Box width={"60%"}>
          <BookList books={ownedBooks} isOwned={true} isExchange={false} addForExchange={addForExchange} deleteBook={deleteBook}/>
        </Box>
        <Box w={"35%"}>
          <BookList
            books={booksForExchange}
            isOwned={false}
            isExchange={true}
            removeFromExchange={removeFromExchange}
          />
        </Box>
      </Box>
    </>
  );
};

export default MyBooks;
