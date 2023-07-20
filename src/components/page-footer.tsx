import { Button, Flex, Heading } from "@chakra-ui/react";
import OneBtcLogo from "./1btc-logo";

function Footer() {
  return (
    <Flex align="center">
      <OneBtcLogo width="45px" height="45px" />
      <Flex flexGrow="1" ml={2} align="center">
        <Heading size="md">1btc</Heading>
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
      <Button
        as="a"
        variant="ghost"
        href="https://docs.1btc.chat/1btc-chat-api"
        target="_blank"
        rel="noopener noreferrer"
      >
        API
      </Button>
      <Button
        as="a"
        variant="ghost"
        href="https://github.com/1btc-news"
        target="_blank"
        rel="noopener noreferrer"
      >
        GitHub
      </Button>
      <Button
        as="a"
        variant="ghost"
        href="https://www.twitter.com/1btcnews"
        target="_blank"
        rel="noopener noreferrer"
      >
        Twitter
      </Button>
    </Flex>
  );
}

export default Footer;
