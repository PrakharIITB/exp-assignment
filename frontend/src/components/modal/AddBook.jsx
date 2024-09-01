import { useState } from "react";
import {
  InputGroup,
  Input,
  InputRightElement,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  Stack,
} from "@chakra-ui/react";
import { InfoIcon } from "@chakra-ui/icons";

const AddBook = ({ isOpen, onClose, onSubmit }) => {
  const [bookDetails, setBookDetails] = useState({
    title: "",
    genre: "",
    author: "",
    language: "",
    pageCount: "",
    publisher: "",
  });

  const inputs = Object.keys(bookDetails);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setBookDetails((prev) => ({
        ...prev,
        [name]: value
    }))
  };

  const resetDetails = () => {
    setBookDetails({
      title: "",
      genre: "",
      author: "",
      language: "",
      pageCount: "",
      publisher: "",
    })
  }

  const onExit = () => {
    resetDetails();
    onClose();
  }

  const onSub = (book) => {
    resetDetails();
    onSubmit(book)
  }

  return (
    <Modal isOpen={isOpen} onClose={onExit}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Add Book</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Stack gap={2}>
            {inputs.map((input, index) => {
              return (
                <InputGroup key={index}>
                  <Input
                    type="text"
                    name={input}
                    placeholder={String(input[0].toUpperCase() + input.substring(1))}
                    value={bookDetails[input]}
                    onChange={handleChange}
                  />
                  <InputRightElement>
                    <InfoIcon width="2.5rem" />
                  </InputRightElement>
                </InputGroup>
              );
            })}
          </Stack>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="red" mr={3} onClick={onExit}>
            Close
          </Button>
          <Button colorScheme="teal" mr={3} onClick={() => onSub(bookDetails)}>
            Add Book
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default AddBook;
