// src/components/Example.tsx
import React from 'react';
import { View, Text } from 'react-native';
import { styled } from 'nativewind';

const StyledView = styled(View);
const StyledText = styled(Text);

const Example = () => (
  <StyledView className="flex-1 items-center justify-center">
    <StyledText className="text-xl text-blue-500">Hello, world!</StyledText>
  </StyledView>
);

export default Example;
