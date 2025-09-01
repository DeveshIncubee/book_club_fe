"use client";

import { ChakraProvider, createSystem, defaultSystem } from "@chakra-ui/react";
import { ColorModeProvider } from "./color-mode";

// Prevent Chakra UI from resetting/overwriting Tailwind classes
const system = createSystem(defaultSystem, {
  preflight: false,
});

export function Provider(props) {
  return (
    <ChakraProvider resetCSS={false} value={system}>
      <ColorModeProvider {...props} />
    </ChakraProvider>
  );
}
