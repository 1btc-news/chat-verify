import {
  Button,
  Popover,
  PopoverArrow,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  Stack,
  Text,
} from "@chakra-ui/react";

function SuccessfulVerification() {
  return (
    <>
      <Stack direction="row">
        <Text mb={4}>
          You made it! Celebrate by joining our exclusive 1BTC chat - just a
          click away.
        </Text>
        <Popover placement="bottom-start">
          <PopoverTrigger>
            <Button mr={4}>Learn More</Button>
          </PopoverTrigger>
          <PopoverContent width="100%" maxW="800px">
            <PopoverHeader bg="orange.500" fontWeight="bold">
              Join 1BTC Chat
            </PopoverHeader>
            <PopoverArrow bg="orange.500" />
            <PopoverCloseButton />
            <Text p={2}>
              Congratulations! You've successfully verified your ownership of
              more than 1 BTC. Now the fun begins - click on the link below to
              join our exclusive 1BTC console chat app. Get ready to mingle with
              other Bitcoin enthusiasts who have journeyed the same path as you.
              Welcome aboard!
            </Text>
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
        Join 1BTC
      </Button>
    </>
  );
}

export default SuccessfulVerification;
