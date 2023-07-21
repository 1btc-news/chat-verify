import {
  IconButton,
  Link,
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
import SignIn from "../auth/sign-in";

// active step = 0
// uses sign-in.tsx to progress to next step

function ConnectWallet() {
  return (
    <>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        mb={8}
      >
        <Text>
          Start the process of unlocking the exclusive 1btc chat by connecting
          your Hiro or Xverse wallet.
        </Text>
        <Popover placement="bottom-end" variant="1btc-orange">
          <PopoverTrigger>
            <IconButton aria-label="Learn More" icon={<FaQuestion />} />
          </PopoverTrigger>
          <PopoverContent>
            <PopoverHeader pl={4} pt={4}>
              Connect your Wallet
            </PopoverHeader>
            <PopoverCloseButton />
            <PopoverBody p={4}>
              <Text>
                In order to access our exclusive 1btc chat platform, connect
                your Bitcoin wallet with our platform. We currently support both{" "}
                <Link
                  isExternal
                  color="orange.500"
                  href="https://wallet.hiro.so/wallet/install-web"
                >
                  Hiro
                </Link>{" "}
                and{" "}
                <Link
                  isExternal
                  color="orange.500"
                  href="https://www.xverse.app/"
                >
                  Xverse
                </Link>{" "}
                wallets. By clicking the Connect Wallet button and selecting
                your account from the wallet, you initiate the secure,
                standardized connection process.
              </Text>
            </PopoverBody>
          </PopoverContent>
        </Popover>
      </Stack>
      <SignIn />
    </>
  );
}

export default ConnectWallet;
