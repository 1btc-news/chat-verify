import { useToast } from "@chakra-ui/react";

export const useNoWalletFound = () => {
  const toast = useToast();
  return () => {
    toast({
      title: "No wallet found",
      description: `Please install either the Hiro or Xverse Stacks wallet to continue.`,
      position: "top",
      status: "warning",
      variant: "left-accent",
      duration: 9000,
      isClosable: true,
    });
  };
};
