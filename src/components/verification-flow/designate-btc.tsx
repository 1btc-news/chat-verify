import { Button, ListItem, Stack, Text, UnorderedList } from "@chakra-ui/react";
import { useSetAtom } from "jotai";
import { isBtcDesignatedAtom } from "../../constants";
import LearnMore from "./learn-more";

// active step = 1
// user progresses by clicking the button

function DesignateBtc() {
  const setIsBtcDesignated = useSetAtom(isBtcDesignatedAtom);

  return (
    <Stack direction={["column-reverse", "column"]} gap={8}>
      <Stack
        direction={["column", "row"]}
        justifyContent={["center", "space-between"]}
      >
        <Stack>
          <Text fontWeight="bold">
            In your wallet with more than 1 BTC, designate an account for
            verification.
          </Text>
          <UnorderedList>
            <ListItem>
              This happens in the wallet of your choice, e.g. Ledger, Trezor
            </ListItem>
            <ListItem>
              This Bitcoin cannot be spent or access will be lost
            </ListItem>
            <ListItem>
              (optional) Label the account in the wallet software
            </ListItem>
          </UnorderedList>
          <Text>
            Create the new account and transfer a little more than 1 BTC to
            cover transaction fees.
          </Text>
        </Stack>
        <LearnMore href="https://docs.1btc.chat" />
      </Stack>
      <Button variant="1btc-orange" onClick={() => setIsBtcDesignated(true)}>
        Ready to Go
      </Button>
    </Stack>
  );
}

export default DesignateBtc;
