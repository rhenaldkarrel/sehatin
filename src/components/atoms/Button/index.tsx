import { Button as ChakraButton } from '@chakra-ui/react'
import { ButtonProps } from './types';

const Button: React.FC<ButtonProps> = ({
  children,
  variant
}) => {
  if (variant === 'text') return <ChakraButton variant='link'>{children}</ChakraButton>;

  return <ChakraButton>{children}</ChakraButton>;
};

export default Button;
