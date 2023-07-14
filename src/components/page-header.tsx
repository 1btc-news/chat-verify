import { Button, Flex, Heading } from "@chakra-ui/react";
import OneBtcLogo from "./1btc-logo";

function Header() {
  return (
    <Flex align="center">
      <OneBtcLogo width="75px" height="75px" />
      <Flex flexGrow="1" ml={2} align="center">
        <Heading>1btc</Heading>
      </Flex>
      <Button
        as="a"
        variant="ghost"
        href="https://1btc.chat"
        target="_blank"
        rel="noopener noreferrer"
      >
        About
      </Button>
      <Button
        as="a"
        variant="ghost"
        href="https://docs.1btc.chat"
        target="_blank"
        rel="noopener noreferrer"
      >
        Docs
      </Button>
    </Flex>
  );
}

export default Header;
