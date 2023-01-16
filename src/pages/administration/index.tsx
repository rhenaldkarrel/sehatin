import {
  Box,
  SimpleGrid,
  Text
} from '@chakra-ui/react';
import { BsPerson, BsCurrencyDollar } from 'react-icons/bs';
import { TbMedicineSyrup } from 'react-icons/tb';
import  StatsCard  from 'components/atoms/StatsCard';
import SidebarWithHeader from 'components/Sidebar';
import { useEffect, useState } from 'react';
import BillingPaymentData from 'types/BillingPaymentData';
import { formatRupiah } from 'utils/helpers/formatRupiah';

export default function Administration() {
  const [doctor, setDoctor] = useState([])
  const [patient, setPatient] = useState([])
  const [revenue, setRevenue] = useState([])
  const [medicine, setMedicine] = useState([])
  const formattedRevenue = formatRupiah(
    revenue
      .map((item: BillingPaymentData) => item.billing)
      .reduce((a, b) => a + b, 0), 'Rp'
  )

  useEffect(()=> {
    fetch('http://localhost:3001/users?role=doctor', {
      method: 'GET',
    })
      .then(res => res.json())
      .then(data => setDoctor(data))

    fetch('http://localhost:3001/users?role=patient', {
      method: 'GET',
    })
      .then(res => res.json())
      .then(data => setPatient(data))

    fetch('http://localhost:3001/billing', {
      method: 'GET',
    })
      .then(res => res.json())
      .then(data => setRevenue(data))

    fetch('http://localhost:3001/medicine', {
      method: 'GET',
    })
      .then(res => res.json())
      .then(data => setMedicine(data))
  }, [])

  return (
    <SidebarWithHeader>
      <Box maxW="7xl" mx={'auto'} pt={5} px={{ base: 2, sm: 12, md: 17 }}>
        <Text fontSize='xl' fontWeight='bold' mb='10px'>
          Dashboard
        </Text>
        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={{ base: 5, lg: 8 }}>
          <StatsCard
            title={'Total Dokter'}
            stat={doctor.length.toString()}
            icon={<BsPerson size={'3em'} />}
          />
          <StatsCard
            title={'Total Pasien'}
            stat={patient.length.toString()}
            icon={<BsPerson size={'3em'} />}
          />
          <StatsCard
            title={'Total Obat'}
            stat={medicine.length.toString()}
            icon={<TbMedicineSyrup size={'3em'} />}
          />
          <StatsCard
            title={'Total Pendapatan'}
            stat={formattedRevenue}
            icon={<BsCurrencyDollar size={'3em'} />}
          />
        </SimpleGrid>
      </Box>
    </SidebarWithHeader>
  );
}