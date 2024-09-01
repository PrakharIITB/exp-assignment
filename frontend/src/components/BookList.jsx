import {
  Box,
  Stack,
  Icon,
  Text,
  HStack,
  Divider,
  Button,
} from "@chakra-ui/react";
import { FaBook } from "react-icons/fa6";

const BookList = ({
  books,
  isOwned,
  isExchange,
  addForExchange,
  removeFromExchange,
  editBook,
  deleteBook,
}) => {
  const text = isOwned
    ? "My Books:"
    : isExchange
    ? "Books For Exchange:"
    : "Books available for Exchange:";

  return (
    <Stack mt={"1.5rem"} w={"100%"} pr={"1rem"}>
      <Text
        color="teal"
        fontSize={"2rem"}
        fontWeight={"bold"}
        textAlign={"center"}
      >
        {text}
      </Text>
      {books.map((book, i) => {
        return (
          <Box
            key={i}
            p={3}
            bgColor={"lightcyan"}
            display={"flex"}
            justifyContent={"space-between"}
            alignItems={"cneter"}
          >
            <HStack>
              <Icon as={FaBook} w={16} h={16} color={"#319795"} />
              <Stack gap={0}>
                <Text
                  color={"teal"}
                  fontSize={"1.6rem"}
                  fontWeight={700}
                  mt={0}
                >
                  {book.title}
                </Text>
                <Text color={"teal"} fontSize={"1.2rem"} fontWeight={600}>
                  <strong>By, </strong>
                  {book.author}
                </Text>
                <Text color={"teal"} fontSize={"1rem"} fontWeight={600}>
                  {book.language}, {book.pageCount} pages
                </Text>
              </Stack>
            </HStack>
            <Box display={"flex"} alignItems={"flex-start"}>
              {!isOwned && !isExchange ? (
                <Divider
                  orientation="vertical"
                  mr={"0.5rem"}
                  borderColor={"teal"}
                  borderWidth={"1px"}
                />
              ) : null}
              <Stack gap={0}>
                {!isOwned && !isExchange ? (
                  <>
                    <Text color={"teal"} fontSize={"0.8rem"} fontWeight={600}>
                      Owned By:{" "}
                    </Text>
                    <Text color={"teal"} fontSize={"1.2rem"} fontWeight={600}>
                      {book.ownedBy.firstName + " " + book.ownedBy.lastName}
                    </Text>
                  </>
                ) : null}
                {/* REPLACE BY THE FIRST AND LAST NAME OF OWNER */}
                {isOwned ? (
                  <Button
                    bgColor={"#319795"}
                    color={"white"}
                    size={"sm"}
                    mt={"0.5rem"}
                    onClick={() => addForExchange(book)}
                  >
                    Add for Exchange
                  </Button>
                ) : null}
                {isExchange ? (
                  <Button
                    bgColor={"#E32636"}
                    color={"white"}
                    size={"sm"}
                    mt={"0.5rem"}
                    onClick={() => removeFromExchange(book)}
                  >
                    Remove
                  </Button>
                ) : null}
                {isOwned ? (
                  <>
                    <Box
                      height={"100%"}
                      display={"flex"}
                      alignItems={"flex-end"}
                    >
                      <Button
                        bgColor={"#E32636"}
                        color={"white"}
                        size={"sm"}
                        mt={"0.5rem"}
                        onClick={() => deleteBook(book)}
                      >
                        Delete
                      </Button>
                    </Box>
                  </>
                ) : null}
              </Stack>
            </Box>
          </Box>
        );
      })}
    </Stack>
  );
};

export default BookList;
