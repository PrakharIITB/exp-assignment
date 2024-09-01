import Navbar from "../Navbar";
import { Box, Text } from "@chakra-ui/react";
import ProfileBox from "../Profile/ProfileBox";
import { useEffect, useState } from "react";
import BookList from "../BookList";
import axios from "axios";
import Cookies from 'js-cookie'
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [availableBooks, setAvailableBooks] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const token = Cookies.get('token')
    if(token === undefined) {
      alert("Log in first");
      navigate('/')
    }
    axios.get('http://localhost:8000/api/user/getExchangeBooks', {
      headers: {
        Authorization: "Bearer "+token
      }
    })
    .then((res) => {
      setAvailableBooks(res.data.data)
    })
    .catch((err) => {
      console.log(err);
    })
  }, []);

  return (
    <>
      <div
        style={{
          width: "100vw",
          height: "100%",
          minHeight: "100vh",
          marginBottom: "1rem",
        }}
      >
        <Navbar />
        <Box display="flex">
          <ProfileBox />
          {availableBooks.length === 0 ? (
            <Text
              color="teal"
              fontSize={"2rem"}
              fontWeight={"bold"}
              textAlign={"center"}
            >
              No Books To Display
            </Text>
          ) : (
            <BookList
              books={availableBooks}
              isOwned={false}
              isExchange={false}
            />
          )}
        </Box>
      </div>
    </>
  );
};

export default Dashboard;
