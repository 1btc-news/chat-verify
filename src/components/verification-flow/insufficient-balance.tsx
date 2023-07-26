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

function InsufficientBalance() {
  return (
    <Stack
      direction="row"
      justifyContent="space-between"
      alignItems="center"
      mb={8}
    >
      <Text>
        Ensure your wallet holds over 1 BTC to enter 1btc's Fullcoiner chat.
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
            Insufficient Balance
          </PopoverHeader>
          <PopoverCloseButton />
          <PopoverBody p={4}>
            <UnorderedList>
              <ListItem>
                To participate in the 1btc chat, a balance of more than 1 BTC
                must be verified from another wallet.
              </ListItem>
              <ListItem>
                If you are seeing this message, your current balance does not
                meet this requirement.
              </ListItem>
              <ListItem>
                By depositing more Bitcoin into your wallet, you will be able to
                retry the verification process.
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

export default InsufficientBalance;
