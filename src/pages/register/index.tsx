import { useFormik } from "formik";

import RegisterForm from "components/Register";
import ModalDialogue from "components/ModalDialogue";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Register(){
  const [ show, setShow ] = useState(false);
  const navigate = useNavigate();

  const handleCloseModal = () => {
    navigate("/");
  }

  const formik = useFormik({
    initialValues: {
      name: "",
      gender: "",
      birthplace: "",
      birthday: "",
      phone: 0,
      email:"",
      password: "",
      password2: "",
      role: "patient"
    },
    onSubmit: (values) => {
      if(values.password === values.password2){
        const { name, gender, birthplace, birthday, phone, email, password, role } = values
        fetch('http://localhost:3001/users', {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({ name, gender, birthplace, birthday, phone, email, password, role })
        })
          .then(res => {
            res.json()
            setShow(true);
          })
      } else {
        alert('Password tidak sama, silahkan coba lagi!');
      }
    }
  });

  return (
    <>
      <RegisterForm
        nameValue={formik.values.name}
        genderValue={formik.values.gender}
        birthplaceValue={formik.values.birthplace}
        birthdayValue={formik.values.birthday}
        phoneValue={formik.values.phone}
        emailValue={formik.values.email}
        passValue={formik.values.password}
        secondPassValue={formik.values.password2}
        onChange={formik.handleChange}
        onSubmit={formik.handleSubmit}
      />
      {show ?
        <ModalDialogue
          title='Pendaftaran akun berhasil!'
          message='Kamu telah berhasil membuat akun kamu, silahkan lakukan login terlebih dahulu.'
          onClose={handleCloseModal}
        /> : null}
    </>
  )
}

export default Register;