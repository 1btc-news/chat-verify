import { Flex, Heading, Stack, Text } from "@chakra-ui/react";
import OneBtcLogo from "./1btc-logo";
import SignIn from "./sign-in";
import ClearData from "./clear-data";
import SignOut from "./sign-out";
import { useAccount } from "@micro-stacks/react";

function Header() {
  const { stxAddress } = useAccount();
  return (
    <Flex align="center">
      <OneBtcLogo width="75px" height="75px" />
      <Flex flexGrow="1" ml={2} align="center">
        <Heading>1btc</Heading>
      </Flex>
      <Stack direction="row" justifyContent="flex-end" alignItems="center">
        {stxAddress === undefined ? (
          <SignIn />
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
