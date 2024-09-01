import { HStack, Button, Tag, Text, TagLabel, Stack } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import EditInterest  from "../modal/EditInterest";
import ShowInterest from "../modal/ShowInterest";
import Cookies from 'js-cookie'
import axios from "axios";
import { useNavigate } from 'react-router-dom'

const Interest = ({ interests }) => {
  const [interestList, setInterestList] = useState(interests.length === 0? []: interests.slice(0, 5));
  useEffect(() => {
    setInterestList(interests);
  }, [interests])
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [isOpen1, setIsOpen1] = useState(false);
  const isMore = interests.length > 5;

  const onSubmit = (newInterestList) => {
    console.log(newInterestList);
    axios.post('https://exp-assignment-api.vercel.app/api/user/addInterest', {interests: newInterestList}, {
      headers: {
        Authorization: "Bearer "+Cookies.get('token')
      }
    })
    .then((res) => {
      console.log(res);
      setIsOpen(false);
      window.location.reload();
      // navigate('/dashboard')
    })
    .catch((err) => {
      console.log(err);
    })
    //Post the list
    //make the current list a state and using the response from the post request update state
  }

  return (
    <>
      {interests.length > 0 ? (
        <>
          <Text
            mb={4}
            pl={1}
            style={{
              color: "teal",
              fontSize: "1.5rem",
              fontWeight: "bold",
            }}
          >
            Interests
          </Text>
          <HStack display={"flex"} flexWrap={"wrap"} mb={4}>
            {interestList.map((interest, index) => {
              return (
                <Tag
                size='lg'
                key={index}
                variant='solid'
                colorScheme='teal'
              >
                <TagLabel>{interest}</TagLabel>
              </Tag>
              );
            })}
          </HStack>
        </>
      ) : (
        <Text
          mb={4}
          pl={1}
          style={{
            color: "teal",
            fontSize: "1rem",
            fontWeight: "normal",
          }}
        >
          No interests added yet
        </Text>
      )}
      <Stack direction="row" spacing={2}>
      {
        isMore? (
          <Button bgColor="teal" mb={2} color={"white"} size={"md"} onClick={() => setIsOpen1(true)}>
          Show All
        </Button>
        ): null
      }
      <Button bgColor={"#319795"} color={"white"} size={"md"} onClick={() => setIsOpen(true)}>
        + Add More
      </Button>
      </Stack>
      <ShowInterest isOpen={isOpen1} onClose={() => setIsOpen1(false)} interestList={interests}/>
      <EditInterest isOpen={isOpen} onClose={() => setIsOpen(false)} interestList={interests} onSubmit={onSubmit}/>
    </>
  );
};

export default Interest;
