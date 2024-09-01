import Navbar from "../Navbar";
import { Box, Text, Stack, Button, HStack } from "@chakra-ui/react";
import SingleRequest from "../SingleRequest";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import { useToast } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const Matching = () => {
  const [possibleExchanges, setPossibleExchanges] = useState([]);
  const token = Cookies.get("token");
  const toast = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    if (token === undefined) {
      alert("Log in first");
      navigate("/");
    }
    axios
      .get("http://localhost:8000/api/user/possibleMatches", {
        headers: {
          Authorization: "bearer " + token,
        },
      })
      .then((res) => {
        console.log(res);
        const matches = res.data.data;
        setPossibleExchanges(matches);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const emails = Object.keys(possibleExchanges);

  const initiateRequest = (details, email) => {
    axios.post('http://localhost:8000/api/user/initiateRequest', {
      requestTo: details.booksIn[0].ownedBy,
      bookIn: details.booksIn[0]._id,
      bookOut: details.booksOut[0]._id
    },{
      headers: {
        Authorization: "Bearer "+token
      }
    })
    .then((res) => {
      toast({
        position: 'top',
        title: 'Request initiated successfully',
        status: 'success',
        duration: 2000,
      })
    })
    .catch((err) => {
      console.log(err);
      if(err.response.data.message === "Request already exists")
        toast({
          position: 'top',
          title: 'Request already exists',
          status: 'error',
          duration: 2000,
        })
    })
  };

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
          Possible Matches
        </Text>
        <Stack>
          {
            emails.length === 0 ?
            <Box w={"100%"} display={"flex"} justifyContent={'center'} alignItems={'center'} >
            <Text fontWeight={'bold'} fontSize={'1.2rem'}>No matches available, try adding interests and books for exchange:</Text>
            <Button
                    bgColor={"#319795"}
                    color={"white"}
                    size={"sm"}
                    ml={'1rem'}
                    onClick={() => navigate('/dashboard')}
                  >
                    Add Interests
                  </Button>
                  </Box>: null
          }
          {emails.map((email, i) => {
            return (
              <SingleRequest
                key={i}
                name={possibleExchanges[email].ownerName}
                booksIn={possibleExchanges[email].booksIn}
                booksOut={possibleExchanges[email].booksOut}
                status={false}
                initiateRequest={() =>
                  initiateRequest(possibleExchanges[email], email)
                }
              />
            );
          })}
        </Stack>
      </Box>
    </>
  );
};

export default Matching;
