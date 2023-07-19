import {
  Box,
  Text,
  Spinner,
  Stack,
  Popover,
  PopoverTrigger,
  PopoverContent,
  Button,
  PopoverHeader,
  PopoverArrow,
  PopoverCloseButton,
  Link,
} from "@chakra-ui/react";
import { useAccount } from "@micro-stacks/react";
import { useAtom } from "jotai";
import { storedStxAddressAtom, storedUserDataAtom } from "../constants";
import ConnectWallet from "./connect-wallet";
import SignOut from "./sign-out";
import VerificationFlow from "./verification-flow";
import ClearData from "./clear-data";
import { useAccountData } from "../hooks/account-data";

function Content() {
  const { stxAddress } = useAccount();
  const [storedStxAddress] = useAtom(storedStxAddressAtom);
  const [storedUserData] = useAtom(storedUserDataAtom);
  const { isLoading, hasError, hasData, error } = useAccountData();

  // if user is not logged in already
  if (!stxAddress || !storedStxAddress || !storedUserData) {
    return (
      <Box width="100%" maxW="1200px">
        <Text mb={4}>
          Start the process of unlocking the exclusive 1BTC chat by connecting
          your Hiro or Xverse wallet.
        </Text>
        <Popover placement="bottom-start">
          <PopoverTrigger>
            <Button mr={4}>Learn More</Button>
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
              <Link
                isExternal
                color="orange.500"
                href="https://www.xverse.app/"
              >
                Xverse
              </Link>{" "}
              wallets. By clicking the Connect Wallet button and selecting your
              account from the wallet, you initiate the secure, standardized
              connection process.
            </Text>
          </PopoverContent>
        </Popover>

        <ConnectWallet />
      </Box>
    );
  }

  // if user is logged in, check if account data is loaded
  return (
    <Box width="100%" maxW="1200px">
      {isLoading && (
        <>
          <Spinner color="orange.500" emptyColor="orange.200" />
          <Text>Loading account data...</Text>
        </>
      )}
      {hasError && (
        <>
          <Text>There was an error, please sign out and try again.</Text>
          <Text>{String(error)}</Text>
        </>
      )}
      {hasData && <VerificationFlow />}
      <Stack direction="row" justifyContent="flex-end">
        <ClearData />
        <SignOut />
      </Stack>
    </Box>
  );
}

export default Content;
