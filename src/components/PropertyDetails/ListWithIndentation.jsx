import React from 'react';
import { Text, Box } from '@chakra-ui/react';

const ListWithIndentation = ({ items }) => {
  return items.split(/[\n]/).map((item, key) => {
    const trimmedItem = item.trim();
    if (trimmedItem === "") return null;

    const leadingSpaces = item.length - item.trimStart().length;
    const indentSize = leadingSpaces > 1 ? leadingSpaces * 4 : 0; // Assuming each space is equivalent to 4px indentation.

    return (
      <Box key={key} ml={`${indentSize}px`}>
        <Text fontSize="15px">
          {trimmedItem}
          <br />
        </Text>
      </Box>
    );
  });
};
export default ListWithIndentation