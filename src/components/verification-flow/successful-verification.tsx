import {
  Button,
  IconButton,
  Popover,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  Stack,
  Text,
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
          You made it! Celebrate by joining our exclusive 1BTC chat - just a
          click away.
        </Text>
        <Popover placement="bottom-end" variant="1btc-orange">
          <PopoverTrigger>
            <IconButton aria-label="Learn More" icon={<FaQuestion />} />
          </PopoverTrigger>
          <PopoverContent>
            <PopoverHeader pl={4} pt={4}>
              Join 1btc Chat
            </PopoverHeader>
            <PopoverCloseButton />
            <PopoverBody p={4}>
              <Text>
                Congratulations! You've successfully verified your ownership of
                more than 1 BTC. Now the fun begins - click on the link below to
                join our exclusive 1btc console chat app. Get ready to mingle
                with other Bitcoin enthusiasts who have journeyed the same path
                as you. Welcome aboard!
              </Text>
            </PopoverBody>
          </PopoverContent>
        </Popover>
      </Stack>
      <Button
        as="a"
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
