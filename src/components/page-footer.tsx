import { Flex, Heading, Text } from "@chakra-ui/react";
import OneBtcLogo from "./1btc-logo";

function Footer() {
  return (
    <Flex align="center">
      <OneBtcLogo width="100px" height="100px" />
      <Flex flex="1" ml={2} align="center">
        <Heading size="md">1btc</Heading>
      </Flex>
      <Text fontSize="sm" justifySelf="flex-end">
        Footer links can go here
      </Text>
    </Flex>
  );
}

export default Footer;
