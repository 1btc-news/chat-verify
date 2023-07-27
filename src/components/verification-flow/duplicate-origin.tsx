import {
  IconButton,
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
import { accountDataAtom } from "../../constants";
import { useAtomValue } from "jotai";

function DuplicateOrigin() {
  const accountData = useAtomValue(accountDataAtom);

  return (
    <Stack
      direction="row"
      justifyContent="space-between"
      alignItems="center"
      mb={8}
    >
      <Text>
        The account that sent the dust used for verification has already been
        used.
      </Text>
      {accountData && <Text as="b">{accountData.origin}</Text>}
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
            Duplicate Origin
          </PopoverHeader>
          <PopoverCloseButton />
          <PopoverBody p={4}>
            <UnorderedList>
              <ListItem>
                To participate in the 1btc chat, a balance of more than 1 BTC
                must be verified from another wallet.
              </ListItem>
              <ListItem>
                If you are seeing this message, the wallet used to verify this
                account has already been used by someone else.
              </ListItem>
              <ListItem>
                You will need to restart from a new account to verify your
                access to 1btc Chat.
              </ListItem>
              <ListItem>
                Remember, this ensures that all members of our exclusive chat
                are Fullcoiners.
              </ListItem>
            </UnorderedList>
          </PopoverBody>
        </PopoverContent>
      </Popover>
    </Stack>
  );
}

export default DuplicateOrigin;
