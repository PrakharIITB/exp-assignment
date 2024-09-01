import { Stack, HStack, Text, Box, Icon, Button } from "@chakra-ui/react";
import { ImBook } from "react-icons/im";
import AddBook from "../modal/AddBook";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from 'js-cookie'
import { useToast } from "@chakra-ui/react";
import { addBookValidation } from "../validators";

const BookList = ({ books }) => {
  const [bookList, setBookList] = useState(books.length > 0 ? books.slice(0,2): [])
  useEffect(() => {
    setBookList(books.length > 0 ? books.slice(0,2): [])
  }, [books])
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const isMore = books.length > 2;
  const toast = useToast();

  const onSubmit = (data) => {
    const { res, mes } = addBookValidation(data);
    if(!res) {
      toast({
        position: 'top',
        title: mes,
        status: 'error',
        duration: 2000,
      })
      return;
    }
    data = {...data, pageCount: Number(data.pageCount)}
    console.log(data);
    axios.post('https://exp-assignment-api.vercel.app/api/book/', data, {
      headers: {
        Authorization: "Bearer "+ Cookies.get('token')
      }
    })
    .then((res) => {
      console.log(res);
      toast({
        position: 'top',
        title: 'Book Added Successfully',
        status: 'success',
        duration: 2500,
      })
      setIsOpen(false)
      window.location.reload();
    })
    .catch((err) => {
      if(err.status == 400)
        toast({
          position: 'top',
          title: err.response.data.message,
          status: 'error',
          duration: 2500,
        })
    })
  }

  return (
    <Stack>{ bookList.length === 0 ? <Text>No book added yet</Text>: null}
      {bookList.map((book, i) => {
        return (
          <HStack key={i}>
            <Box>
              <Icon as={ImBook} w={8} h={8} color={"#319795"} />
            </Box>
            <Stack
              color={"#319795"}
              fontSize={"1rem"}
              fontWeight={"bold"}
              gap={0}
            >
              <Text>{book.title}</Text>
              <Text>By: {book.author}</Text>
            </Stack>
          </HStack>
        );
      })}
    
      <Stack direction={"row"} spacing={4}>
      {isMore ? (
        <Button bgColor={"#319795"} color={"white"} size={'md'} onClick={() => navigate("/myBooks") }>
          Show All
        </Button>
      ) : null}
      <Button
        bgColor={"#319795"}
        color={"white"}
        size={"md"}
        onClick={() => setIsOpen(true)}
      >
        + Add More
      </Button>
      </Stack>
      <AddBook isOpen={isOpen} onClose={() => setIsOpen(false)} onSubmit={onSubmit} />
    </Stack>
  );
};

export default BookList;
