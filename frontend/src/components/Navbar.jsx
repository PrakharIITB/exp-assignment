import { Box, Icon, Text, Stack, Button } from "@chakra-ui/react";
import { CgProfile } from "react-icons/cg";
import { useNavigate } from "react-router-dom";
import Cookies from 'js-cookie'

const Navbar = () => {
  const firstName = Cookies.get("first");
    const navigate = useNavigate();

    const handleLogOut = () => {
      Cookies.remove('token')
      Cookies.remove('email')
      navigate('/')
    }

  return (
    <Box
      w={"100%"}
      h={"60px"}
      style={{
        backgroundColor: 'lightcyan',
        padding: "0.5rem 1rem",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <Box p={2} w={"20%"} style={{display: "flex", alignItems: "center"}}>
        <Icon as={CgProfile} w={8} h={8} onClick={() => navigate('/dashboard')} _hover={{cursor: "pointer"}}/>
        <Text ml={3} fontWeight={"bold"} fontSize="lg">Welcome, {firstName}</Text>
      </Box>
      <Box>
        <Stack spacing={4} direction="row" align="center">
          <Button colorScheme="teal" size="md" onClick={() => navigate('/matching')}>
            Matching
          </Button>
          <Button  colorScheme="teal" size="md" onClick={() => navigate('/requests')}>
            Requests
          </Button>
          <Button colorScheme="teal" size="md" onClick={() => navigate('/myBooks')}>
            My Books
          </Button>
          <Button colorScheme="red" size="md" onClick={handleLogOut}>
            Log Out
          </Button>
        </Stack>
      </Box>
    </Box>
  );
};

export default Navbar;