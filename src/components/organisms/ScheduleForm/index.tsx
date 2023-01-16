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
  Select,
  HStack,
  Icon,
  Tooltip,
} from "@chakra-ui/react";
import { useNavigate, useParams } from "react-router-dom";
import { ChevronLeftIcon } from "@chakra-ui/icons";
import { useEffect, useState } from "react";
import { useFormik } from "formik";

export default function ScheduleForm() {
  const navigate = useNavigate();
  const [selections, setSelections] = useState([]);
  const handleGoBack = () => navigate(-1);
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [showMessage, setShowMessage] = useState(false);
  const { id }: { id?: number } = useParams();

  const getSelections = () => {
    return fetch("http://localhost:3001/users?role=doctor")
      .then((res) => res.json())
      .then((data) => {
        const doctors = data.map((d: any) => {
          return {
            id: d.id,
            name: d.name,
          };
        });

        setSelections(doctors);
      });
  };

  const getDetail = async () => {
    await getSelections();

    fetch(`http://localhost:3001/schedule/${id}`)
      .then((res) => res.json())
      .then((data) => {
        const splitJadwal = data.jadwal_praktek.split(" - ");
        const startTime = splitJadwal[0].replace(".", ":");
        const endTime = splitJadwal[1].replace(".", ":");
        setStartTime(startTime);
        setEndTime(endTime);
        formik.setValues({
          userId: data.userId,
          jadwal_praktek: "",
          biaya: data.biaya,
        });
      });
  };

  useEffect(() => {
    if (id) {
      getDetail();
      return;
    }

    getSelections();
  }, []);

  const onSave = (values: any, actions: any) => {
    const payload = values;
    payload.jadwal_praktek = `${startTime} - ${endTime}`;

    fetch("http://localhost:3001/schedule", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    }).then(() => {
      setShowMessage(true);
      setStartTime("");
      setEndTime("");
      actions.resetForm({
        values: {
          userId: "",
          jadwal_praktek: "",
          biaya: "",
        },
      });

      setTimeout(() => {
        setShowMessage(false);
      }, 1500);
    });
  };

  const onUpdate = (values: any, actions: any) => {
    const payload = values;
    payload.jadwal_praktek = `${startTime} - ${endTime}`;

    fetch(`http://localhost:3001/schedule/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    }).then(() => {
      setShowMessage(true);
      setStartTime("");
      setEndTime("");
      actions.resetForm({
        values: {
          userId: "",
          jadwal_praktek: "",
          biaya: "",
        },
      });

      setTimeout(() => {
        setShowMessage(false);
        handleGoBack();
      }, 1500);
    });
  };
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      userId: "",
      jadwal_praktek: "",
      biaya: "",
    },
    onSubmit: id ? onUpdate : onSave,
  });

  return (
    <>
      <SidebarWithHeader>
        <Container maxW="container.xl" py={4}>
          <Box bg="white" p={5} rounded="md" boxShadow="base">
            <Tooltip label="Kembali">
              <Button onClick={handleGoBack} mb="4">
                <Icon as={ChevronLeftIcon} />
              </Button>
            </Tooltip>
            <Heading size="md" mb={3}>
              Tambah Jadwal
            </Heading>
            {showMessage && (
              <Alert status="success" mb={3}>
                <AlertIcon />
                Data berhasil ditambahkan!
              </Alert>
            )}
            <Stack>
              <form onSubmit={formik.handleSubmit}>
                <FormControl>
                  <FormLabel fontSize={14}>Dokter</FormLabel>
                  <Select
                    value={formik.values.userId}
                    name="userId"
                    onChange={formik.handleChange}
                    placeholder="Select option"
                    size="sm"
                  >
                    {selections.map((r: any) => (
                      <option key={r.id.toString()} value={r.id}>
                        {r.name}
                      </option>
                    ))}
                  </Select>
                </FormControl>
                <FormControl>
                  <FormLabel fontSize={14}>Jam Praktek</FormLabel>
                  <HStack>
                    <Input
                      id="hargaobat"
                      type="time"
                      size="sm"
                      placeholder="Jam Mulai"
                      defaultValue={startTime}
                      onChange={(e) => setStartTime(e.currentTarget.value)}
                      value={startTime}
                    />
                    <Input
                      id="hargaobat"
                      type="time"
                      size="sm"
                      onChange={(e) => setEndTime(e.currentTarget.value)}
                      placeholder="Jam Berakhir"
                      value={endTime}
                      defaultValue={endTime}
                    />
                  </HStack>
                  <FormHelperText fontSize={10}>
                    Dalam Format 24 jam.
                  </FormHelperText>
                </FormControl>
                <FormControl>
                  <FormLabel htmlFor="email" fontSize={14}>
                    Biaya
                  </FormLabel>
                  <Input
                    name="biaya"
                    id="hargaobat"
                    onChange={formik.handleChange}
                    value={formik.values.biaya}
                    type="number"
                    size="sm"
                  />
                  <FormHelperText fontSize={10}>
                    Pastikan harga sudah benar.
                  </FormHelperText>
                </FormControl>
                <Button
                  type="submit"
                  w="fit-content"
                  bg="blue.300"
                  color="white"
                >
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
