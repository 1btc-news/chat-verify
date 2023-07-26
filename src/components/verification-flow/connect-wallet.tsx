import {
  IconButton,
  Link,
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
          Connect your Hiro or Xverse wallet to authenticate into 1btc's
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
              Connect your Wallet
            </PopoverHeader>
            <PopoverCloseButton />
            <PopoverBody p={4}>
              <UnorderedList>
                <ListItem>
                  To access the 1btc chat platform, connect your Bitcoin wallet
                  to use with the chat.
                </ListItem>
                <ListItem>
                  We currently support both{" "}
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
                  wallets.
                </ListItem>
                <ListItem>
                  By clicking the Connect Wallet button and selecting your
                  account from the wallet, you initiate the secure, standardized
                  connection process.
                </ListItem>
              </UnorderedList>
            </PopoverBody>
          </PopoverContent>
        </Popover>
      </Stack>
      <SignIn />
    </>
  );
}

export default ConnectWallet;
