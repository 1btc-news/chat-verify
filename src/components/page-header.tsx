import { Button, Flex, Heading, Stack, Text } from "@chakra-ui/react";
import OneBtcLogo from "./1btc-logo";
import SignIn from "./sign-in";
import ClearData from "./clear-data";
import SignOut from "./sign-out";
import { useAccount } from "@micro-stacks/react";
import { storedUserDataAtom } from "../constants";
import { useAtom } from "jotai";

function Header() {
  const { stxAddress } = useAccount();
  const [storedUserData] = useAtom(storedUserDataAtom);
  return (
    <Flex align="center">
      <OneBtcLogo width="45px" height="45px" />
      <Flex flexGrow="1" ml={2} align="center">
        <Heading size="md">1btc</Heading>
      </Flex>
      <Stack direction="row" justifyContent="flex-end" alignItems="center">
        {stxAddress === undefined ? (
          <>
            <Button
              variant="1btc-orange"
              onClick={() => {
                console.log("storedUserData: ", storedUserData);
              }}
            >
              View User Data
            </Button>
            <SignIn />
          </>
        ) : (
          <>
            <Text>{`${stxAddress.slice(0, 5)}...${stxAddress.slice(-5)}`}</Text>
            <Button
              variant="1btc-orange"
              onClick={() => {
                console.log("storedUserData: ", storedUserData);
              }}
            >
              View User Data
            </Button>
            <ClearData />
            <SignOut />
          </>
        )}
      </Stack>
    </Flex>
  );
}

export default Header;
