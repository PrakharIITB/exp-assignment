import Navbar from "../Navbar";
import { Box, Stack, Text } from "@chakra-ui/react";
import SingleRequest from "../SingleRequest";
import { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie"

const Requests = () => {

  const [requests, setRequests] = useState([]);
  const token = Cookies.get('token')

  useEffect(() => {
    if (token === undefined) {
      alert("Log in first");
      navigate("/");
    }
    axios
      .get("https://exp-assignment-api.vercel.app/api/user/getRequests", {
        headers: {
          Authorization: "bearer " + token,
        },
      })
      .then((res) => {
        const requests = res.data.data;
        setRequests(requests);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>
      <Navbar />
      <Box
        style={{
          width: "100vw",
          height: "100%",
          minHeight: "100vh",
          marginBottom: "1rem",
          padding: "1rem 6rem",
        }}
      >
        <Text
          color="teal"
          fontSize={"2rem"}
          fontWeight={"bold"}
          textAlign={"center"}
          mb={"1rem"}
        >
          Request Received
        </Text>
        <Stack>
          {requests.map((request, i) => {
            return (
              <SingleRequest
                key={i}
                name={request.from.firstName + " "+request.from.lastName}
                booksIn={[request.bookOut]}
                booksOut={[request.bookIn]}
                status={true}
              />
            );
          })}
        </Stack>
      </Box>
    </>
  );
};

export default Requests;
