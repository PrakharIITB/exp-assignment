import { useState } from "react";
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Text,
  Stack,
  Input,
  Button,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import { useToast } from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon, AtSignIcon } from "@chakra-ui/icons";
import axios from "axios"
import Cookies from "js-cookie"
import { useNavigate } from "react-router-dom";
import { loginValidation } from "../validators";


const Login = ({ changeComp }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const isError = email === "";
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const navigate = useNavigate();
  const toast = useToast();

  const onSubmit = () => {
    const { res, mes } = loginValidation(email, password);
    if(!res){
      toast({
        position: 'top',
        title: mes,
        status: 'error',
        duration: 2000,
      })
      return ;
    }
    axios.post("https://exp-assignment-api.vercel.app/api/login", {
      email: email,
      password: password
    })
    .then((res) => {
      const user = res.data.user;
      Cookies.set('email', user.email);
      Cookies.set('token', res.data.token);
      Cookies.set('first', user.first);
      toast({
        position: 'top',
        title: 'Log In Successful',
        status: 'success',
        duration: 2000,
      })
      navigate('/dashboard');
    })
    .catch((err) => {
      toast({
        position: 'top',
        title: err.response.data.message,
        status: 'error',
        duration: 2000,
      })
      
    })
  };

  return (
    <form
      style={{
        fontSize: "1rem",
        width: "30%",
        boxShadow: "0 25px 50px -12px rgb(255 255 255 / 0.25)",
        padding: "1rem 1rem 2rem",
        borderRadius: "10px",
        backgroundColor: "rgba(255, 255, 255)"
      }}
    >
      <Text
        color="teal.500"
        style={{ textAlign: "center", fontSize: "1.75rem", fontWeight: "bold" }}
      >
        Login
      </Text>
      <Stack spacing={3}>
        <FormControl isInvalid={isError} isRequired>
          <FormLabel fontSize={"large"}>Email</FormLabel>
          <InputGroup>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <InputRightElement>
              <AtSignIcon width="2.5rem" />
            </InputRightElement>
          </InputGroup>
          {!isError ? (
            <FormHelperText>We will never share your email.</FormHelperText>
          ) : (
            <FormErrorMessage>Email cannot be empty</FormErrorMessage>
          )}
        </FormControl>
        <FormControl isRequired>
          <FormLabel>Password</FormLabel>
          <InputGroup size="md">
            <Input
              type={showPass ? "text" : "password"}
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <InputRightElement width="2.5rem">
              {showPass ? (
                <ViewOffIcon
                  _hover={{ cursor: "pointer" }}
                  h="1.75rem"
                  onClick={() => setShowPass(!showPass)}
                />
              ) : (
                <ViewIcon
                  h="1.75rem"
                  onClick={() => setShowPass(!showPass)}
                  _hover={{ cursor: "pointer" }}
                />
              )}
            </InputRightElement>
          </InputGroup>
          {password === "" ? (
            <FormErrorMessage>Password cannot be empty</FormErrorMessage>
          ) : null}
        </FormControl>
      </Stack>
      <Text
        color="teal.500"
        textUnderlineOffset="2px"
        _hover={{ textDecoration: "underline" }}
        onClick={() => changeComp()}
      >
        Don't have an account? <strong>Register</strong>
      </Text>
      <Button
        mt={4}
        colorScheme="teal"
        isLoading={isSubmitting}
        onClick={onSubmit}
      >
        Submit
      </Button>
    </form>
  );
};

export default Login;
