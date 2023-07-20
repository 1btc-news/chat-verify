import { Flex, Heading, Stack, Text } from "@chakra-ui/react";
import { useAccount } from "@micro-stacks/react";
import OneBtcLogo from "./1btc-logo";
import SignIn from "../auth/sign-in";
import SignOut from "../auth/sign-out";
import ClearData from "../auth/clear-data";
import { stxAddressAtom } from "../../constants";
import { useAtom } from "jotai";

function Header() {
  const { stxAddress } = useAccount();
  const [storedStxAddress] = useAtom(stxAddressAtom);

  return (
    <Flex align="center">
      <OneBtcLogo width="45px" height="45px" />
      <Flex flexGrow="1" ml={2} align="center">
        <Heading size="md">1btc</Heading>
      </Flex>
      <Stack direction="row" justifyContent="flex-end" alignItems="center">
        {stxAddress === undefined ? (
          <>
            {storedStxAddress && (
              <Text>{`${storedStxAddress.slice(
                0,
                5
              )}...${storedStxAddress.slice(-5)}`}</Text>
            )}
            <ClearData />
            <SignIn />
          </>
        ) : (
          <>
            <Text>{`${stxAddress.slice(0, 5)}...${stxAddress.slice(-5)}`}</Text>
            <ClearData />
            <SignOut />
          </>
        )}
      </Stack>
    </Flex>
  );
}

export default Header;
