import { FlexProps } from '@chakra-ui/react';
import { IconType } from 'react-icons';
interface NavItemProps extends FlexProps {
	icon: IconType;
	children: React.ReactText;
  link: string;
}

export default NavItemProps;
