import { ChakraProvider } from "@chakra-ui/react";

const withThemeProvider = (Story) => (
  <ChakraProvider>
      <Story />
  </ChakraProvider>
);

export const decorators = [
  withThemeProvider
];

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
}