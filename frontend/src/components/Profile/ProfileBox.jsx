import { Box } from "@chakra-ui/react";
import axios from "axios";
import Intro from "./Intro";
import BookList from "./BooksOwned";
import Interest from "./Interest";
import { useEffect, useState } from "react";
import Cookies from 'js-cookie'

const ProfileBox = () => {

  const [profile, setProfile] = useState();
  const [name, setName] = useState("")
  const [bookList, setBookList] = useState([])
  const [interestList, setInterestList] = useState([])

  useEffect(() => {
    const token = Cookies.get('token');
    axios.get('http://localhost:8000/api/user', {
      headers: {
        Authorization: "Bearer "+token
      }
    })
    .then((res) => {
      const user = res.data.data[0];
      setProfile(user);
      setName(user.firstName + " " + user.lastName)
      setBookList(user.bookList);
      setInterestList(user.interest)
    })
    .catch((err) => {
      console.log(err);
    })
  }, [])

  // const name = profile.firstName + " " + profile.lastName;
  // console.log(profile.bookList);
  // const bookList = profile.bookList === undefined ? []: profile.bookList;

    return (
        <Box
            h="50%"
            width={"30%"}
            style={{
              display: "flex",
              flexDirection: "column",
              margin: "1.5rem",
              backgroundColor: "lightcyan",
              borderRadius: "10px",
              padding: "1rem"
            }}
          >
            {/* FOR PHOTO AND NAME */}
            <Intro name={name}/>
            <hr style={{ margin: "1rem 0", borderColor: "#319795" }} />
            {/* LIST OF BOOKS AND OPTION TO ADD MORE */}
            {
              bookList === undefined || bookList.length === 0? 
              <BookList books={bookList}/>:

            <BookList books={bookList}/>
            }
            <hr style={{ margin: "1rem 0", borderColor: "#319795" }} />
            {/* LIST OF INTEREST AND OPTION TO ADD MORE */}
            <Interest interests={ interestList }/>
          </Box>
    )
}

export default ProfileBox;