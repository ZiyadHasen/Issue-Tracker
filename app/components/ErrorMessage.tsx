import { Text } from '@radix-ui/themes';
import { PropsWithChildren } from 'react';
//* when you see PropsWithChildren,
//*think of it as React’s way of saying, “Hey, bring on the content—whatever it may be!”

//* This means children can be any valid React content passed between the opening and closing
// *tags of your component, making PropsWithChildren a handy utility type for components
// * that expect children.

const ErrorMessage = ({ children }: PropsWithChildren) => {
  return (
    <div>
      <Text color='red' as='p'>
        {children}
      </Text>
    </div>
  );
};

export default ErrorMessage;
