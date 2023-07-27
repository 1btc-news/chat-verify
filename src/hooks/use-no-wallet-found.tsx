import { useToast } from "@chakra-ui/react";

export const useNoWalletFound = () => {
  const toast = useToast();
  return () => {
    toast({
      title: "No wallet found",
      description: `Please install or enable the Hiro or Xverse wallet to continue.`,
      position: "top",
      variant: "1btc-orange",
      duration: 6000,
      isClosable: true,
    });
  };
};
