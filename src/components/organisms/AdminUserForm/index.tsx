import SidebarWithHeader from 'components/Sidebar';
import {
  Box,
  Stack,
  Container,
  Heading,
  Button,
  FormControl,
  FormLabel,
  FormHelperText,
  Input,
  Select,
  Icon,
  Tooltip
} from '@chakra-ui/react'
import { useNavigate, useParams } from 'react-router-dom';
import { useFormik } from 'formik';
import { useEffect, useState } from 'react';
import { ChevronLeftIcon } from '@chakra-ui/icons';

export default function AdminUserForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const handleGoBack = () => navigate(-1);
  const [data, setData] = useState({
    id: '',
    name: '',
    email: '',
    role: '',
  });

  useEffect(() => {
    if(id) {
      fetch(`http://localhost:3001/users/${id}`, {
        method: 'GET',
      })
        .then(res => res.json())
        .then(data => setData(data))
    }
  }, [])

  const formik = useFormik({
    initialValues: {
      name: data.name,
      email: data.email,
      password: '',
      role: data.role,
      password2: '',
    },
    enableReinitialize: true,
    onSubmit: (values) => {
      if(values.password === values.password2) {
        const { name, email, password, role } = values;

        if(id){
          fetch(`http://localhost:3001/users/${id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, email, password, role }),
          })
            .then(() => {
              alert('Berhasil menyimpan perubahan!')
              window.location.reload();
            })
        } else {
          fetch('http://localhost:3001/users', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, email, password, role }),
          })
            .then(() => {
              alert('Berhasil menambahkan pengguna baru!')
              window.location.reload();
            })
        }
      } else {
        alert('Konfirmasi password tidak sama!')
      }
    }
  })

  return (
    <>
      <SidebarWithHeader>
        <Container
          maxW='container.xl'
          py={4}
        >
          <Box
            bg="white"
            p={5}
            rounded="md"
            boxShadow="base"
          >
            <Tooltip label='Kembali'>
              <Button onClick={handleGoBack} mb='4'>
                <Icon as={ ChevronLeftIcon }/>
              </Button>
            </Tooltip>
            <Heading size='lg' mb={3}>
              {id ? 'Edit Pengguna' : 'Tambah Pengguna'}
            </Heading>
            <Stack>
              <form onSubmit={formik.handleSubmit}>
                <FormControl mb='24px'>
                  <FormLabel htmlFor='role'>Role</FormLabel>
                  <Select
                    placeholder='Select option'
                    variant="outline"
                    fontSize="sm"
                    ms="4px"
                    size="lg"
                    name="role"
                    id="role"
                    value={formik.values.role}
                    onChange={formik.handleChange}
                  >
                    <option value='doctor'>Dokter</option>
                    <option value='receptionist'>Resepsionis</option>
                    <option value='patient'>Pasien</option>
                  </Select>
                </FormControl>
                <FormControl mb="24px">
                  <FormLabel htmlFor='name'>Nama</FormLabel>
                  <Input
                    id='name'
                    name='name'
                    type='text'
                    variant="outline"
                    fontSize="sm"
                    ms="4px"
                    size="lg"
                    placeholder='Nama'
                    value={formik.values.name}
                    onChange={formik.handleChange}
                  />
                </FormControl>
                <FormControl mb="24px">
                  <FormLabel htmlFor='email'>Email</FormLabel>
                  <Input
                    id='email'
                    name='email'
                    type='email'
                    variant="outline"
                    fontSize="sm"
                    ms="4px"
                    size="lg"
                    placeholder='Email'
                    value={formik.values.email}
                    onChange={formik.handleChange}
                  />
                  <FormHelperText>Pastikan email sudah benar.</FormHelperText>
                </FormControl>
                <FormControl mb="24px">
                  <FormLabel htmlFor='password'>Password</FormLabel>
                  <Input
                    id='password'
                    name='password'
                    type='password'
                    variant="outline"
                    fontSize="sm"
                    ms="4px"
                    size="lg"
                    placeholder='Password'
                    value={formik.values.password}
                    onChange={formik.handleChange}
                  />
                  <FormHelperText>
                    {
                    id
                    ? 'Masukkan kata sandi lama jika tidak ingin merubah kata sandi.'
                    : ''
                    }
                  </FormHelperText>
                </FormControl>
                <FormControl mb="24px">
                  <FormLabel htmlFor='password2'>Konfirmasi Password</FormLabel>
                  <Input
                    id='password2'
                    name='password2'
                    type='password'
                    size='lg'
                    placeholder='Konfirmasi Password'
                    variant="outline"
                    fontSize="sm"
                    ms="4px"
                    value={formik.values.password2}
                    onChange={formik.handleChange}
                  />
                  <FormHelperText>Konfirmasi kembali kata sandi.</FormHelperText>
                </FormControl>
                <Button
                  w="fit-content"
                  colorScheme='blue'
                  color='white'
                  type='submit'
                >{id ? 'Simpan' : 'Tambahkan Pengguna'}</Button>
              </form>
            </Stack>
          </Box>
        </Container>
      </SidebarWithHeader>
    </>
  )
}
