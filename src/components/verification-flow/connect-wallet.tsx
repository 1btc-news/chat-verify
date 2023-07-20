import {
  Button,
  Link,
  Popover,
  PopoverArrow,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  Stack,
  Text,
} from "@chakra-ui/react";

// active step = 0
// uses sign-in.tsx to progress to next step

function ConnectWallet() {
  return (
    <Stack
      direction="row"
      justifyContent="space-between"
      alignItems="center"
      mb={8}
    >
      <Text>
        Start the process of unlocking the exclusive 1BTC chat by connecting
        your Hiro or Xverse wallet.
      </Text>
      <Popover placement="bottom-start">
        <PopoverTrigger>
          <Button>Learn More</Button>
        </PopoverTrigger>
        <PopoverContent width="100%" maxW="800px">
          <PopoverHeader bg="orange.500" fontWeight="bold">
            Connect your Wallet
          </PopoverHeader>
          <PopoverArrow bg="orange.500" />
          <PopoverCloseButton />
          <Text p={2}>
            In order to access our exclusive 1BTC chat platform, connect your
            Bitcoin wallet with our platform. We currently support both{" "}
            <Link
              isExternal
              color="orange.500"
              href="https://wallet.hiro.so/wallet/install-web"
            >
              Hiro
            </Link>{" "}
            and{" "}
            <Link isExternal color="orange.500" href="https://www.xverse.app/">
              Xverse
            </Link>{" "}
            wallets. By clicking the Connect Wallet button and selecting your
            account from the wallet, you initiate the secure, standardized
            connection process.
          </Text>
        </PopoverContent>
      </Popover>
    </Stack>
  );
}

export default ConnectWallet;
