import { useState } from "react";
import SidebarWithHeader from "components/Sidebar";
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
  Alert,
  AlertIcon,
  CloseButton,
  AlertTitle,
  AlertDescription,
  Tooltip,
  Icon,
} from "@chakra-ui/react";
import { useFormik } from "formik";
import {  useLocation, useNavigate } from "react-router-dom";
import { ChevronLeftIcon } from "@chakra-ui/icons";


export default function MedicineForm() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);

  const navigate = useNavigate();
  const handleGoBack = () => navigate(-1);

  const {state}: any = useLocation();

  const formik = useFormik({
    initialValues: {
      id: state?.id || "",
      nama: state?.nama || "",
      harga: state?.harga || "",
    },
    onSubmit: (values, actions) => {
      if (state?.isEdit) {
        fetch(`http://localhost:3001/medicine/${state?.id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(values),
        }).then(() => {
          actions.resetForm({
            values: {
              id: "",
              nama: "",
              harga: "",
            },
          });
          setShow(true);
          setTimeout(() => {
            navigate("/medicine");
          }, 2000);
        });
        return;
      }

      fetch("http://localhost:3001/medicine", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      }).then(() => {
        actions.resetForm({
          values: {
            id: "",
            nama: "",
            harga: "",
          },
        });
        setShow(true);
        setTimeout(() => {
          navigate("/medicine");
        }, 2000);
      });
    },
  });

  return (
    <>
      <SidebarWithHeader>
        <Container maxW="container.xl" py={4}>
          <Box p={5} bg="white" rounded="md">
            <Tooltip label="Kembali">
              <Button onClick={handleGoBack} mb="4">
                <Icon as={ChevronLeftIcon} />
              </Button>
            </Tooltip>
            <Heading size="lg" mb="3">
              Tambah Obat
            </Heading>
            {show ? (
              <Alert status="success">
                <AlertIcon />
                <Box flex="2">
                  <AlertTitle>Berhasil!</AlertTitle>
                  <AlertDescription>
                    Data berhasil ditambahkan!
                  </AlertDescription>
                </Box>
                <CloseButton
                  alignSelf="flex-start"
                  position="relative"
                  right={-1}
                  top={-1}
                  onClick={handleClose}
                />
              </Alert>
            ) : null}
            <Stack>
              <form onSubmit={formik.handleSubmit}>
                <FormControl>
                  <FormLabel htmlFor="email" fontSize={14}>
                    Nama Obat
                  </FormLabel>
                  <Input
                    id="nama"
                    name="nama"
                    onChange={formik.handleChange}
                    value={formik.values.nama}
                    type="text"
                    size="sm"
                  />
                </FormControl>
                <FormControl>
                  <FormLabel htmlFor="email" fontSize={14}>
                    Harga Obat
                  </FormLabel>
                  <Input
                    id="harga"
                    name="harga"
                    onChange={formik.handleChange}
                    value={formik.values.harga}
                    type="number"
                    size="sm"
                  />
                  <FormHelperText fontSize={10}>
                    Pastikan harga sudah benar.
                  </FormHelperText>
                </FormControl>
                <Button size="sm" type="submit">
                  Save
                </Button>
              </form>
            </Stack>
          </Box>
        </Container>
      </SidebarWithHeader>
    </>
  );
}
