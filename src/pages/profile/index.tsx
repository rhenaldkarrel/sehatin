import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Text,
  FormHelperText
} from "@chakra-ui/react"
import { useFormik } from "formik"

import SidebarWithHeader from "components/Sidebar"
import useAuth from "hooks/useAuth"
import { useNavigate } from "react-router-dom"

const EditProfile = () => {
  const { auth, setAuth } = useAuth()
  const navigate = useNavigate()

  const formik = useFormik({
    initialValues: {
      name: auth.name,
      email: auth.email,
      password: "",
      role: auth.role
    },
    onSubmit: (values) => {
      fetch(`http://localhost:3001/users/${auth.id}`, {
        method: 'PATCH',
        headers: {'Content-Type' : 'application/json'},
        body: JSON.stringify(values)
      })
        .then(res => res.json())
        .then(data => {
          const { accessToken } = auth;
          const { id, name, email, role } = data;

          setAuth({id, name, email, role, accessToken})
          localStorage.setItem('user', JSON.stringify({id, name, email, role, accessToken}))
          alert("Profile berhasil diubah");
          navigate(0);
        })
    }
  })

  return(
    <SidebarWithHeader>
      <Text
        fontSize="xl"
        fontWeight="bold"
        mb="22px"
      >
        Ubah Profile
      </Text>

      <form onSubmit={formik.handleSubmit}>
        <FormControl>
          {
            auth.role === 'admin' ?
            (
              <>
                <FormLabel ms="4px" fontSize="sm" fontWeight="normal">
                  Nama Profile
                </FormLabel>
                <Input
                  id="name"
                  name="name"
                  variant="outline"
                  fontSize="sm"
                  ms="4px"
                  type="text"
                  placeholder="Nama name"
                  mb="24px"
                  size="lg"
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  isRequired
                />
              </>
            ) : null
          }
        </FormControl>

        <FormControl>
          <FormLabel ms="4px" fontSize="sm" fontWeight="normal">
            Email
          </FormLabel>
          <Input
            id="email"
            name="email"
            variant="outline"
            fontSize="sm"
            ms="4px"
            type="text"
            placeholder="Email"
            mb="24px"
            size="lg"
            value={formik.values.email}
            onChange={formik.handleChange}
            isRequired
          />
        </FormControl>

        <FormControl mb="24px">
          <FormLabel ms="4px" fontSize="sm" fontWeight="normal">
            Kata Sandi Baru
          </FormLabel>
          <Input
            id="password"
            name="password"
            variant="outline"
            fontSize="sm"
            ms="4px"
            type="password"
            placeholder="Kata sandi baru"
            size="lg"
            value={formik.values.password}
            onChange={formik.handleChange}
            isRequired
          />
          <FormHelperText>Ketik kata sandi lama jika tidak ingin merubah kata sandi.</FormHelperText>
        </FormControl>

        <Button
          variant="dark"
          fontWeight="bold"
          h="45"
          mb="24px"
          color="white"
          bg="blue.300"
          type="submit"
        >
          Simpan
        </Button>
      </form>
    </SidebarWithHeader>
  )
}

export default EditProfile;