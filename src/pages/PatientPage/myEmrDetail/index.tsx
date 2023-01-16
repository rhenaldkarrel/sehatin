import {
  Container,
  Text,
  Button,
  ListItem,
  UnorderedList,
} from '@chakra-ui/react';
import { useParams, Link } from 'react-router-dom';
import SidebarWithHeader from 'components/Sidebar';
import EmrHistoryData from 'types/EmrHistoryData';
import { useEffect, useState } from 'react';
import { formatRupiah } from 'utils/helpers/formatRupiah';

const MyEmrDetail = () => {

  const { id } = useParams();
  const [data, setData] = useState<EmrHistoryData>({
    id: 0,
    pasien: '',
    examinationDate: '',
    diagnosa: '',
    obat: '',
    birthday: '',
    birthplace: '',
    gender: '',
    dokter: ''
  });
  const [price, setPrice] = useState(0)

  useEffect(() => {
    fetch(`http://localhost:3001/emr/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(res => res.json())
      .then(data => setData(data))

    fetch(`http://localhost:3001/billing?idEmr=${id}`, {
      method: 'GET',
    })
      .then(res => res.json())
      .then(data => setPrice(data[0].billing))
  }, [])

  return (
    <>
      <SidebarWithHeader>
        <Container maxW='90vw'>
          <Text fontSize='xl' fontWeight='bold' mb='8px'>
            Detail EMR Pasien {data.pasien}
          </Text>
          <Link to='/my-emr'>
            <Button mb='8px'>Kembali</Button>
          </Link>
          <UnorderedList display='table' listStyleType='none' mt='1rem'>
            <ListItem display='table-row'>
              <Text display='table-cell' pr='4em' fontWeight='bold'>
                Nama Dokter
              </Text>
              : {data.dokter}
            </ListItem>
            <ListItem display='table-row'>
              <Text display='table-cell' pr='4em' fontWeight='bold'>
                Nama Pasien
              </Text>
              : {data.pasien}
            </ListItem>
            <ListItem display='table-row'>
              <Text display='table-cell' pr='4em' fontWeight='bold'>
                Tanggal Pemeriksaan
              </Text>
              : {data.examinationDate}
            </ListItem>
            <ListItem display='table-row'>
              <Text display='table-cell' pr='4em' fontWeight='bold'>
                Diagnosis
              </Text>
              : {data.diagnosa}
            </ListItem>
            <ListItem display='table-row'>
              <Text display='table-cell' pr='4em' fontWeight='bold'>
                Obat
              </Text>
              : {typeof data.obat === 'string' ? data.obat : data.obat.join(', ')}
            </ListItem>
            <ListItem display='table-row'>
              <Text display='table-cell' pr='4em' fontWeight='bold'>
                Jenis Kelamin
              </Text>
              : {data.gender}
            </ListItem>
            <ListItem display='table-row'>
              <Text display='table-cell' pr='4em' fontWeight='bold'>
                Tempat Tanggal Lahir
              </Text>
              : {data.birthplace}, {data.birthday}
            </ListItem>
            <ListItem display='table-row'>
              <Text display='table-cell' pr='4em' fontWeight='bold'>
                Total Pembayaran
              </Text>
              : {formatRupiah(price, 'Rp')}
            </ListItem>
          </UnorderedList>
        </Container>
      </SidebarWithHeader>
    </>
  );
};

export default MyEmrDetail;
