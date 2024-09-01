import { HStack, Box, Icon, Text } from "@chakra-ui/react";
import { ImProfile } from "react-icons/im"

const Intro = ({name}) => {
    return (
        <HStack h="20%" w="100%" gap={4}  >
            <Box>
                <Icon as={ImProfile} w={12} h={12} color={"#319795"}/>
            </Box>
            <Box color={"#319795"} gap={0} fontSize={"2rem"} fontWeight={"bold"}>
                <Text>{name}</Text>
            </Box>
        </HStack>
    )
}

export default Intro;