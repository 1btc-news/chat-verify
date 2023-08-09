import { Button, ListItem, Stack, Text, UnorderedList } from "@chakra-ui/react";
import Fireworks from "./fireworks";
import LearnMore from "./learn-more";

// active step = 4
// user can join the chat using the link

function SuccessfulVerification() {
  return (
    <Stack gap={8}>
      <Fireworks />
      <Stack direction="row" justifyContent="space-between">
        <Stack>
          <Text fontWeight="bold">
            Welcome to 1btc, you're one click away from joining our verified
            Fullcoiner chat
          </Text>
          <UnorderedList>
            <ListItem>
              Congratulations! You've successfully verified your ownership of
              more than 1 BTC
            </ListItem>
            <ListItem>
              Now the fun begins - click on the link below to join our exclusive
              1btc chat app
            </ListItem>
            <ListItem>
              Get ready to mingle with other Bitcoin enthusiasts who have
              journeyed the same path as you
            </ListItem>
          </UnorderedList>
        </Stack>
        <LearnMore href="https://docs.1btc.chat" />
      </Stack>
      <Button
        as="a"
        title="Join 1btc Chat"
        variant="1btc-orange"
        href="https://app.console.xyz/c/1btc/chat"
        target="_blank"
        rel="noopener noreferrer"
      >
        Join 1btc Chat
      </Button>
    </Stack>
  );
}

export default SuccessfulVerification;
