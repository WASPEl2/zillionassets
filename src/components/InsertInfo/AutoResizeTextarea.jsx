import React, { useEffect, useRef } from 'react';
import {  Textarea } from "@chakra-ui/react";

const AutoResizeTextarea = ({ value, onChange, ...props }) => {
  const textareaRef = useRef(null);

  useEffect(() => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const resizeTextarea = () => {
      // Reset the height to auto to properly reduce its size when necessary
      textarea.style.height = 'auto';
      // Set the height to the scroll height to expand as needed
      textarea.style.height = `${textarea.scrollHeight}px`;
    };

    resizeTextarea();
  }, [value]);

  return (
    <Textarea
      ref={textareaRef}
      value={value}
      onChange={onChange}
      overflow="hidden"
      {...props}
    />
  );
};

export default AutoResizeTextarea;