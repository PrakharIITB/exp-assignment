import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    ModalBody,
    ModalFooter,
    Button,
    HStack,
  } from "@chakra-ui/react";
  import { Tag, TagLabel} from "@chakra-ui/react";
  
  const ShowInterest = ({ isOpen, onClose, interestList }) => {
  
    return (
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Show Interests</ModalHeader>
          <ModalCloseButton />
          <ModalBody mb={2}>
              <HStack flexWrap={"wrap"}>
                {interestList.map((interest) => {
                  return (
                    <Tag
                      size="lg"
                      key={interest}
                      borderRadius="full"
                      variant="solid"
                      colorScheme="teal"
                    >
                      <TagLabel>{interest}</TagLabel>
                    </Tag>
                  );
                })}
              </HStack>
          </ModalBody>
        </ModalContent>
      </Modal>
    );
  };
  
  export default ShowInterest;
  