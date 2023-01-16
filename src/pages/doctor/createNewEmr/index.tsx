/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Select,
  Text,
  Textarea,
  Checkbox,
  Stack,
  FormHelperText
} from "@chakra-ui/react"
import { useFormik } from "formik"

import SidebarWithHeader from "components/Sidebar"
import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import PatientScheduleData from "types/PatientScheduleData"
import Medicine from "types/Medicine"
import EmrHistoryData from "types/EmrHistoryData"
import useAuth from "hooks/useAuth"

const CreateNewEmr = () => {
  const [data, setData] = useState([])
  const [medicine, setMedicine] = useState([])
  const { auth } = useAuth()

  useEffect(() => {
    fetch(`http://localhost:3001/patients?status=Dalam antrian&dokter=${auth.name}`, {
      method: "GET",
    })
      .then(res => res.json())
      .then(data => setData(data))

    fetch("http://localhost:3001/medicine", {
      method: "GET",
    })
      .then(res => res.json())
      .then(data => setMedicine(data))
  }, [])

  const navigate = useNavigate()
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      pasien: "",
      diagnosa: "",
      obat: [],
      examinationDate: "",
      dokter: auth.name
    },
    onSubmit: async (values) => {
      const users = await fetch(`http://localhost:3001/users?name=${values.pasien}`, {
        method: "GET",
      })
      const user = await users.json()
      const { birthday, birthplace, gender, name } = user[0];

      const emr = await fetch("http://localhost:3001/emr", {
        method: 'POST',
        headers: {'Content-Type' : 'application/json'},
        body: JSON.stringify({...values, birthday, birthplace, gender})
      })
      const emrData = await emr.json() as unknown as EmrHistoryData
      const idEmr = await emrData.id
      let billing = 0;
      let url = "http://localhost:3001/medicine"

      if(values.obat.length > 0 ) {
        url += "?"

        for(let i = 0; i < values.obat.length; i++) {
          url += `nama=${values.obat[i]}&`
        }

        const medicine = await fetch(url, {
          method: "GET",
        })
        const medicineData = await medicine.json()

        for(let i = 0; i < medicineData.length; i++) {
          billing += medicineData[i].harga
        }

        const doctor = await fetch(`http://localhost:3001/schedule?userId=${auth.id}`, {
          method: "GET",
        })
        const doctorData = await doctor.json()
        const doctorBill = doctorData[0].biaya
        billing += doctorBill

        const bill = await fetch("http://localhost:3001/billing", {
          method: 'POST',
          headers: {'Content-Type' : 'application/json'},
          body: JSON.stringify({idEmr, billing, name})
        })

        const patients = await
        fetch(`http://localhost:3001/patients?nama=${values.pasien}&tanggal=${values.examinationDate}`, {
          method: "GET",
        })
        const patientData = await patients.json()
        const { id } = patientData[0]
        const updatePatient = await fetch(`http://localhost:3001/patients/${id}`, {
          method: 'PATCH',
          headers: {'Content-Type' : 'application/json'},
          body: JSON.stringify({status: "Menunggu pembayaran"})
        })

        navigate("/emr-history");

      } else {
        const medicine = await fetch(`http://localhost:3001/medicine?nama=${values.obat[0]}`, {
          method: "GET",
        })
        const medicineData = await medicine.json()
        billing = await medicineData[0].harga

        const bill = await fetch("http://localhost:3001/billing", {
          method: 'POST',
          headers: {'Content-Type' : 'application/json'},
          body: JSON.stringify({idEmr, billing, name})
        })

        const patients = await
        fetch(`http://localhost:3001/patients?nama=${values.pasien}&tanggal=${values.examinationDate}`, {
          method: "GET",
        })
        const patientData = await patients.json()
        const { id } = await patientData[0]
        const updatePatient = await fetch(`http://localhost:3001/patients/${id}`, {
          method: 'PATCH',
          headers: {'Content-Type' : 'application/json'},
          body: JSON.stringify({status: "Menunggu pembayaran"})
        })

        navigate("/emr-history");
      }
    }
  })

  return(
    <SidebarWithHeader>
      <Text
        fontSize="xl"
        fontWeight="bold"
        mb="22px"
      >
        Buat EMR Baru
      </Text>

      <form onSubmit={formik.handleSubmit}>
        <FormControl>
          <FormLabel ms="4px" fontSize="sm" fontWeight="normal">
            Nama Pasien
          </FormLabel>
          <Select
            name="pasien"
            id="pasien"
            mb="24px"
            onChange={formik.handleChange}
            value={formik.values.pasien}
          >
            <option value="">Pilih pasien</option>
            {data.map((item: PatientScheduleData, index) => (
              <option key={index} value={item.nama}>
                {item.nama} - {item.tanggal}
              </option>
            ))}
          </Select>
        </FormControl>

        <FormControl>
          <FormLabel ms="4px" fontSize="sm" fontWeight="normal">
            Diagnosa
          </FormLabel>
          <Textarea
            id="diagnosa"
            name="diagnosa"
            variant="outline"
            fontSize="sm"
            ms="4px"
            placeholder="Diagnosa"
            mb="24px"
            size="lg"
            value={formik.values.diagnosa}
            onChange={formik.handleChange}
            isRequired
          />
        </FormControl>

        <FormControl mb='24px'>
          <FormLabel ms="4px" fontSize="sm" fontWeight="normal">
            Nama Obat
          </FormLabel>
          <Stack spacing={5} paddingInline={2} direction='row'>
            {medicine.map((item: Medicine, index) => (
              <Checkbox
                key={index}
                value={item.nama}
                name='obat'
                id='obat'
                onChange={formik.handleChange}
              >
                {item.nama}
              </Checkbox>
            ))}
          </Stack>
        </FormControl>

        <FormControl mb="24px">
          <FormLabel ms="4px" fontSize="sm" fontWeight="normal">
            Tanggal Pemeriksaan
          </FormLabel>
          <Input
            id="examinationDate"
            name="examinationDate"
            variant="outline"
            fontSize="sm"
            ms="4px"
            type="date"
            placeholder="Diagnosa"
            size="lg"
            value={formik.values.examinationDate}
            onChange={formik.handleChange}
            isRequired
          />
          <FormHelperText>Pastikan tanggal sudah sesuai!</FormHelperText>
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

export default CreateNewEmr;