import { ChakraProvider, Flex } from "@chakra-ui/react";
import { ClientProvider } from "@micro-stacks/react";
import theme from "./theme";
import Header from "./components/page-header";
import Content from "./components/page-content";
import Footer from "./components/page-footer";
import { useNoWalletFound } from "./hooks/no-wallet-found";
import CustomFonts from "./components/custom-fonts";

export const App = () => (
  <ChakraProvider theme={theme}>
    <ClientProvider
      appName="1BTC"
      enableNetworkSwitching
      appIconUrl={`${window.origin}/logo512.png`}
      onNoWalletFound={useNoWalletFound()}
    >
      <CustomFonts />
      <Flex direction="column" minH="100vh" p={4}>
        <Header />
        <Flex flex="1" alignItems="center" justifyContent="center">
          <Content />
        </Flex>
        <Footer />
      </Flex>
    </ClientProvider>
  </ChakraProvider>
);
