import SidebarWithHeader from 'components/Sidebar';
import {
  Box,
  Flex,
  Heading,
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableContainer,
  Button,
  ButtonGroup,
  Tooltip,
  Icon,
} from '@chakra-ui/react'
import {
  AddIcon,
  DeleteIcon,
  EditIcon
} from "@chakra-ui/icons"
import { Link as RouteLink } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Schedule from 'types/Schedule';
import { Link } from 'react-router-dom';
import { formatRupiah } from 'utils/helpers/formatRupiah';

export default function AdminSchedule() {
  const [ schedules, setSchedules ] = useState<Schedule[]>([])

  const handleDelete = (id: number, type: string) => {
    const confirmedDelete = confirm('Apakah anda yakin ingin menghapus jadwal ini?')
    if(confirmedDelete) {
      return fetch(`http://localhost:3001/${type}/${id}`, {
        method: "DELETE"
      })
        .then(() => {
          alert('Berhasil menghapus jadwal!')
          window.location.reload()
        })
    } else {
      return;
    }
  }

  useEffect(() => {
    fetch(`http://localhost:3001/schedule?_expand=user`, {
      method: 'GET'
    })
      .then(res => res.json())
      .then(data => {
        setSchedules(data);
      })
  }, []);

  return (
    <>
      <SidebarWithHeader>
        <Heading size='lg' mb='3'>
          Daftar Jadwal Dokter
        </Heading>
        <Flex justifyContent='right'>
          <Button
            leftIcon={<AddIcon/>}
            colorScheme='blue'
            mb={4}
            as={RouteLink}
            to="/schedule/create"
          >
            Tambah Data Baru
          </Button>
        </Flex>
        <Box
          bg='white'
          p={5}
          rounded="md"
          boxShadow="base"
        >
          <TableContainer>
            <Table size='sm'>
              <Thead>
                <Tr>
                  <Th>Nama Dokter</Th>
                  <Th>Jadwal</Th>
                  <Th>Harga</Th>
                  <Th>Actions</Th>
                </Tr>
              </Thead>
              <Tbody>
                {
                  schedules.map(schedule => (
                    <Tr key={ schedule.id }>
                      <Td>{ schedule.user?.name }</Td>
                      <Td>{ schedule.jadwal_praktek }</Td>
                      <Td>{ formatRupiah(schedule.biaya, 'Rp') }</Td>
                      <Td>
                        <ButtonGroup spacing={2}>
                          <Tooltip label='Delete Data'>
                            <Button
                              colorScheme='red'
                              size='sm'
                              onClick={() => handleDelete(schedule.id, 'schedule')}
                            >
                              <Icon as={DeleteIcon}/>
                            </Button>
                          </Tooltip>
                          <Tooltip label='Edit Data'>
                            <Link to={`/schedule/${schedule.id}`}>
                              <Button
                                colorScheme='green'
                                size='sm'
                              >
                                <Icon as={EditIcon}/>
                              </Button>
                            </Link>
                          </Tooltip>
                        </ButtonGroup>
                      </Td>
                    </Tr>
                  ))
                }
              </Tbody>
              <Tfoot>
                <Tr>
                  <Th>Nama Dokter</Th>
                  <Th>Jadwal</Th>
                  <Th>Harga</Th>
                  <Th>Actions</Th>
                </Tr>
              </Tfoot>
            </Table>
          </TableContainer>
        </Box>
      </SidebarWithHeader>
    </>
  )
}
