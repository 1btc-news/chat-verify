import {
  Alert,
  AlertIcon,
  ListItem,
  Stack,
  Text,
  UnorderedList,
} from "@chakra-ui/react";
import { accountDataAtom } from "../../constants";
import { useAtomValue } from "jotai";
import LearnMore from "./learn-more";
import ClearData from "../auth/clear-data";

function DuplicateOrigin() {
  const accountData = useAtomValue(accountDataAtom);

  return (
    <Stack gap={8}>
      <Stack direction="row" justifyContent="space-between">
        <Stack>
          <Text fontWeight="bold">
            The linked address that sent the dust transaction to verify has
            already been used.
          </Text>
          <UnorderedList>
            <ListItem>
              One Bitcoin address can only be linked to one account used for
              1btc Chat
            </ListItem>
            <ListItem>
              The wallet used to verify this account has already been used by
              someone else
            </ListItem>
            <ListItem>
              You will need to start again from a new account in your Hiro or
              Xverse wallet
            </ListItem>
          </UnorderedList>
          {accountData && (
            <Alert mb={8} variant="1btc-orange" status="warning">
              <AlertIcon boxSize="6" />
              <Text
                color="orange.500"
                overflowWrap="anywhere"
                fontWeight="bold"
              >
                Detected address: {accountData.origin}
              </Text>
            </Alert>
          )}
        </Stack>
        <LearnMore href="https://docs.1btc.chat" />
      </Stack>
      <ClearData />
    </Stack>
  );
}

export default DuplicateOrigin;
