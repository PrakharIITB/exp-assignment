import { Box, Text, Stack, Button} from "@chakra-ui/react";

const SingleRequest = ( {name, booksIn, booksOut, status, initiateRequest} ) => {

    const text = status === false ? "Request for Exchange": "Accept Request";
    console.log(booksIn);
    console.log(booksOut);
    console.log(name);

    return (
        <Stack padding={"1rem"} bgColor={'lightcyan'}>
                <Box display={"flex"} justifyContent={"space-between"}>
                  <Text fontSize={"1.7rem"} fontWeight={"bold"} color={'teal'}>{name}</Text>
                  <Button
                    bgColor={"#319795"}
                    color={"white"}
                    size={"md"}
                    onClick={() => initiateRequest()}
                  >
                    {text}
                  </Button>
                </Box>
                <Box display={'flex'} justifyContent={'space-evenly'}>
                    <Box>
                        <Text fontSize={"1.4rem"} fontWeight={"bold"} color={'teal'}>Book Receiving</Text>
                        <Stack spacing={0}>
                        {
                            booksIn.map((book, i) => {
                                return (
                                    <Text key={i} fontSize={"1.2rem"} fontWeight={"500"} color={'gray'}>- {book.title}</Text>
                                )
                            })
                        }
                        </Stack>
                    </Box>
                    <Box>
                    <Text fontSize={"1.3rem"} fontWeight={"bold"} color={'teal'}>Book Giving</Text>
                    <Stack spacing={0}>
                        {
                            booksOut.map((book, i) => {
                                return (
                                    <Text key={i} fontSize={"1.2rem"} fontWeight={"500"} color={'gray'}>- {book.title}</Text>
                                )
                            })
                        }
                        </Stack>
                    </Box>
                </Box>
              </Stack>
    )
}

export default SingleRequest;