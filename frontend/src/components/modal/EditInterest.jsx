import {
  Input,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  Stack,
  HStack,
  InputGroup,
  InputRightElement
} from "@chakra-ui/react";
import { Tag, TagLabel, TagCloseButton } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { AddIcon } from "@chakra-ui/icons"
import { useToast } from "@chakra-ui/react";

const EditInterest = ({ isOpen, onClose, interestList, onSubmit }) => {
  const toast = useToast();
  const [newInterest, setNewInterest] = useState("");
  const [newInterestList, setNewInterestList] = useState(interestList)
  useEffect(() => {
    setNewInterestList(interestList);
  }, [interestList])

  const handleAdd = () => {
    if(newInterest === ""){
      toast({
        position: 'top',
        title: "Interest field cannot be empty",
        status: 'error',
        duration: 2000,
      })
      return;
    }
    const updatedInterests = [ ...newInterestList, newInterest ]
    setNewInterestList(updatedInterests);
    setNewInterest("");
  }

  const handleRemove = (interest) => {
    const updatedInterests = newInterestList.filter((i) => {
      return interest !== i;
    })
    setNewInterestList(updatedInterests)
  }

  const onExit = () => {
    setNewInterestList(interestList);
    onClose();
  }

  return (
    <Modal isOpen={isOpen} onClose={onExit}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Edit Interest</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Stack gap={2}>
            <InputGroup>
              <Input
                type="text"
                placeholder="New Interest"
                value={newInterest}
                onChange={(e) => setNewInterest(e.target.value)}
              />
              <InputRightElement>
                <AddIcon width="2.5rem" onClick={handleAdd}/>
              </InputRightElement>
            </InputGroup>
            <HStack flexWrap={"wrap"}>
              {newInterestList.map((interest) => {
                return (
                  <Tag
                    size="lg"
                    key={interest}
                    borderRadius="full"
                    variant="solid"
                    colorScheme="teal"
                  >
                    <TagLabel>{interest}</TagLabel>
                    <TagCloseButton onClick={() => handleRemove(interest)} />
                  </Tag>
                );
              })}
            </HStack>
          </Stack>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="red" mr={3} onClick={onExit}>
            Close
          </Button>
          <Button
            colorScheme="teal"
            mr={3}
            onClick={() => onSubmit(newInterestList)}
          >
            Updated Interests
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default EditInterest;
