import {
  Box,
  Flex,
  Stat,
  StatLabel,
  StatNumber
} from '@chakra-ui/react';
import { StatsCardProps } from './types';

export default function StatsCard(props: StatsCardProps) {
  const { title, stat, icon } = props;
  return (
    <Stat
      px={{ base: 2, md: 4 }}
      py={'5'}
      bgGradient='linear(to-r, blue.400, blue.200)'
      color='white'
      rounded={'lg'}>
      <Flex justifyContent={'space-between'}>
        <Box pl={{ base: 2, md: 4 }}>
          <StatLabel>
            {title}
          </StatLabel>
          <StatNumber fontSize={'2xl'} fontWeight={'medium'}>
            {stat}
          </StatNumber>
        </Box>
        <Box my={'auto'} >
          {icon}
        </Box>
      </Flex>
    </Stat>
  );
}
