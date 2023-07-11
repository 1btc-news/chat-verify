import { ChakraProvider, Flex, theme } from "@chakra-ui/react";
import Header from "./components/page-header";
import Content from "./components/page-content";
import Footer from "./components/page-footer";

export const App = () => (
  <ChakraProvider theme={theme}>
    <Flex direction="column" minH="100vh" p={8}>
      <Header />
      <Flex flex="1">
        <Content />
      </Flex>
      <Footer />
    </Flex>
  </ChakraProvider>
);

// header
// content
// footer
