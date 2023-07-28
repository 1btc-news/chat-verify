import {
  Alert,
  AlertIcon,
  Box,
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
import { FiCopy, FiSearch } from "react-icons/fi";
import { useClipboardToast } from "../../hooks/use-clipboard-toast";

function DuplicateOrigin() {
  const accountData = useAtomValue(accountDataAtom);
  const copyText = useClipboardToast();

  return (
    <>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        mb={8}
      >
        <Box my={4} fontWeight="bold">
          The address below that sent the dust transaction to verify has already
          been used.
          {accountData && (
            <Text mt={4} color="orange.500" overflowWrap="anywhere">
              {accountData.origin}{" "}
              <IconButton
                variant="1btc-orange"
                size="sm"
                ml={4}
                aria-label="Copy Bitcoin address"
                title="Copy Bitcoin address"
                icon={<FiCopy />}
                onClick={() => copyText(accountData.origin)}
              />
              <IconButton
                variant="1btc-orange"
                ml={4}
                aria-label="View on mempool.space"
                title="View on mempool.space"
                icon={<FiSearch />}
                size="sm"
                as="a"
                href={`https://mempool.space/address/${accountData.origin}`}
                target="_blank"
                rel="noopener noreferrer"
              />
            </Text>
          )}
        </Box>
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
                  To participate in 1btc chat a balance of more than 1 BTC must
                  be verified.
                </ListItem>
                <ListItem>
                  The wallet used to verify this account has already been used
                  by someone else.
                </ListItem>
                <ListItem>
                  You will need to try again from a new account to verify your
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

      <Alert mb={8} variant="1btc-orange" status="warning">
        <AlertIcon boxSize="6" />
        Please sign out and create a new account in your wallet to use with 1btc
        Chat.
      </Alert>
    </>
  );
}

export default DuplicateOrigin;
