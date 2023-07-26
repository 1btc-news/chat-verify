import { Button, Flex, Heading } from "@chakra-ui/react";
import OneBtcLogo from "./1btc-logo";

function Footer() {
  return (
    <Flex align="center" direction={["column", "row"]}>
      <Flex flexGrow="1" align="center">
        <OneBtcLogo width="45px" height="45px" />
        <Heading size="md" ml={2}>
          1btc
        </Heading>
      </Flex>
      <Button
        as="a"
        title="About"
        variant="ghost"
        href="https://1btc.chat"
        target="_blank"
        rel="noopener noreferrer"
      >
        About
      </Button>
      <Button
        as="a"
        title="Docs"
        variant="ghost"
        href="https://docs.1btc.chat"
        target="_blank"
        rel="noopener noreferrer"
      >
        Docs
      </Button>
      <Button
        as="a"
        title="API"
        variant="ghost"
        href="https://docs.1btc.chat/1btc-chat-api"
        target="_blank"
        rel="noopener noreferrer"
      >
        API
      </Button>
      <Button
        as="a"
        title="GitHub"
        variant="ghost"
        href="https://github.com/1btc-news"
        target="_blank"
        rel="noopener noreferrer"
      >
        GitHub
      </Button>
      <Button
        as="a"
        title="Twitter"
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
