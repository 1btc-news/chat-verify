import {
  Alert,
  AlertIcon,
  ListItem,
  Stack,
  Text,
  UnorderedList,
} from "@chakra-ui/react";

function AccessInfoAlert() {
  return (
    <Alert
      mb={8}
      variant="1btc-orange"
      status="info"
      flexDirection={["column", "row"]}
    >
      <Stack
        mb={[8, 0]}
        direction={["row", "column", "row"]}
        justifyContent="space-between"
        alignItems="center"
      >
        <AlertIcon boxSize="6" />
        <Text fontWeight="bold">Before you gain access</Text>
      </Stack>
      <UnorderedList>
        <ListItem>
          <Text fontWeight="bold" color="orange.500">
            Do not spend the Bitcoin used to verify.
          </Text>
          <Text>
            If the balance drops below 1 BTC, you will lose access to the chat.
            Access can be restored by topping up the origin address.
          </Text>
        </ListItem>
        <ListItem>
          <Text fontWeight="bold" color="orange.500">
            Do not send dust from an exchange.
          </Text>
          <Text>
            Your balance is in their software, not on the blockchain, so we
            can't verify it.
          </Text>
        </ListItem>
        <ListItem>
          <Text fontWeight="bold" color="orange.500">
            Do be sovereign and inspire others.
          </Text>
          <Text>This is a special group of high-signal Bitcoiners.</Text>
        </ListItem>
      </UnorderedList>
    </Alert>
  );
}

export default AccessInfoAlert;
