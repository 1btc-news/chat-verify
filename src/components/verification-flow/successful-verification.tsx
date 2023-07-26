import {
  Button,
  IconButton,
  ListItem,
  Popover,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  Stack,
  Text,
  UnorderedList,
} from "@chakra-ui/react";
import { FaQuestion } from "react-icons/fa";
import Fireworks from "./fireworks";

function SuccessfulVerification() {
  return (
    <>
      <Fireworks />
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        mb={8}
      >
        <Text>
          Welcome to 1btc, you're one click away from joining our verified
          Fullcoiner chat.
        </Text>
        <Popover placement="bottom-end" variant="1btc-orange">
          <PopoverTrigger>
            <IconButton
              aria-label="Learn More"
              title="Learn More"
              icon={<FaQuestion />}
            />
          </PopoverTrigger>
          <PopoverContent>
            <PopoverHeader pl={4} pt={4}>
              Join 1btc Chat
            </PopoverHeader>
            <PopoverCloseButton />
            <PopoverBody p={4}>
              <UnorderedList>
                <ListItem>
                  Congratulations! You've successfully verified your ownership
                  of more than 1 BTC.
                </ListItem>
                <ListItem>
                  Now the fun begins - click on the link below to join our
                  exclusive 1btc chat app.
                </ListItem>
                <ListItem>
                  Get ready to mingle with other Bitcoin enthusiasts who have
                  journeyed the same path as you. Welcome aboard!
                </ListItem>
              </UnorderedList>
            </PopoverBody>
          </PopoverContent>
        </Popover>
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
    </>
  );
}

export default SuccessfulVerification;
