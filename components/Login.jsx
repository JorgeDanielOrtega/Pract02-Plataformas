"use client";

import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";

import { login } from "@/hooks/Api";
import { isSession } from "@/hooks/SessionUtils";
import message from "@/components/Message";
import { ERROR_MESSAGE } from "@/hooks/Constants";

import { useRouter } from "next/navigation";

export default function Login() {
  const router = useRouter();

  // Validation
  const validationSchema = Yup.object().shape({
    username: Yup.string().required("Por favor ingrese su numero de cedula"),
    password: Yup.string().required("Por favor ingrese su clave"),
  });

  // YUP - Asignation of Yup Resolver
  const formOptions = { resolver: yupResolver(validationSchema) };
  // YUP - Importants events
  const { register, handleSubmit, reset, formState } = useForm(formOptions);
  // YUP - Error constanst
  const { errors } = formState;

  const onSubmit = (data) => {
    if (data.username != data.password) {
      message("Error", "El usuario o la contraseña es invalido", ERROR_MESSAGE);
    } else {
      const dni = data.username;

      login(dni).then((response) => {
        console.log('su lgoin', response);
        if (!isSession()) {
          message("Error", response.msg, ERROR_MESSAGE);
        } else {
          message("Exito", "Has iniciado sesion correctamente");
          // router.refresh();
          window.location.reload();
        }
      });
    }
  };

  return (
    <div className="container col-4 mt-5">
      <div className="d-flex justify-content-center">
        <h2>Iniciar Sesion</h2>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-outline mb-4">
          <label className="form-label">Usuario</label>
          <input
            {...register("username")}
            id="username"
            className={`form-control  ${errors.username ? "is-invalid" : ""}`}
          />
          {errors.username && (
            <div className="alert alert-danger invalid-feedback">
              {errors.username?.message}
            </div>
          )}
        </div>

        <div className="form-outline mb-4">
          <label className="form-label">Clave</label>
          <input
            {...register("password")}
            id="password"
            className={`form-control  ${errors.password ? "is-invalid" : ""}`}
          />
          {errors.password && (
            <div className="alert alert-danger invalid-feedback">
              {errors.password?.message}
            </div>
          )}
        </div>

        <button type="submit" className="btn btn-primary btn-block mb-4">
          Iniciar sesion
        </button>
      </form>
    </div>
  );
}
