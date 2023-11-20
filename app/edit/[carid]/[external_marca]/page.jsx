"use client";

import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import message from "@/components/Message";
import { ERROR_MESSAGE } from "@/hooks/Constants";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import { getBrands, getCarById, updateCar } from "@/hooks/Api";
import { isSession } from "@/hooks/SessionUtils";

// Validation
const validationSchema = Yup.object().shape({
  // TODO INGRESAR LAS MARCAS
  foto: Yup.string().required("Debe una url"),
  placa: Yup.string().required("Debe ingresar una placa"),
  descripcion: Yup.string().required("Debe ingresar una descripcion"),
  marca: Yup.string().required("Debe ingresar una marca"),
  chasis: Yup.string().required("Debe ingresar un chasis"),
  subtotal: Yup.string().required("Debe ingresar un subtotal").min(1),
  iva: Yup.string()
    .required("Debe ingresar un porcentaje de IVA valido 0-100")
    .min(0)
    .max(100),
  // iva: Yup.string()
  //   .required("Debe ingresar un porcentaje de IVA")
  //   .matches(
  //     /^\d+(\.\d{1,2})?$/,
  //     "Debe ser un número flotante válido con punto decimal"
  //   ),
  descuento: Yup.string()
    .required("Debe ingresar un porcentaje de descuento 0-100")
    .min(0)
    .max(100),
  total: Yup.string().required("Debe haber un total").min(0.0),
});

export default function Edit({ params }) {
  const router = useRouter();
  const [car, setCar] = useState({});
  const [marcas, setMarcas] = useState([]);

  // YUP - Asignation of Yup Resolver
  const formOptions = { resolver: yupResolver(validationSchema) };
  // YUP - Importants events
  const { register, handleSubmit, reset, formState } = useForm(formOptions);
  // YUP - Error constanst
  const { errors } = formState;

  const onSubmit = async (data) => {
    const subtotal = parseFloat(data.subtotal);
    const iva = parseFloat(data.iva);
    const descuento = parseFloat(data.descuento);
    const total =
      subtotal + subtotal * (iva / 100) - subtotal * (descuento / 100);

    data.total = total;

    const response = await updateCar(params.carid, data);

    let body = "";
    let estado = "";

    if (response.code === 200) {
      body = "se actualizo los datos con exito";
      estado = "success";
    } else {
      body = "hubo un error";
      estado = ERROR_MESSAGE;
    }

    message(response.mensaje, body, (estado = "success"));

    router.push("/");
  };

  useEffect(() => {
    if (!isSession()) {
      router.push("/");
    }

    const cargarDAtos = async () => {
      const carId = params.carid;
      const externalMarca = params.external_marca;

      const carResponse = await getCarById(carId);
      const carData = carResponse.datos[0];

      const brandsResponse = await getBrands();
      const brandsData = brandsResponse.datos;

      const marcaCarro = brandsData.find(
        (marca) => marca.external_id === externalMarca
      );

      setMarcas(brandsData);

      setCar({
        ...carData,
        marca: marcaCarro.external_id,
      });

      reset({
        foto: carData.foto,
        placa: carData.placa,
        chasis: carData.chasis,
        descripcion: carData.descripcion,
        subtotal: carData.subtotal,
        iva: carData.iva,
        descuento: carData.descuento,
        total: carData.total,
      });
    };

    cargarDAtos();
  }, [params.carid, params.external_marca]);

  return (
    <>
      {car && marcas && (
        <div className="container col-4 mt-5 p-3 border border-1 rounded d-flex flex-column">
          <h2 className="mt-1 d-flex justify-content-center">Edicion</h2>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-outline mb-4">
              <label className="form-label">Foto</label>
              <input
                {...register("foto")}
                id="foto"
                type="url"
                name="foto"
                className={`form-control  ${errors.photo ? "is-invalid" : ""}`}
              />
              {errors.photo && (
                <div className="alert alert-danger invalid-feedback">
                  {errors.photo?.message}
                </div>
              )}
            </div>

            <div className="form-outline mb-4">
              <label className="form-label">Marca</label>
              <select {...register("marca")} id="brand" className="form-select">
                {marcas.map((marca) => (
                  <option
                    key={marca.external_id}
                    value={marca.external_id}
                    selected={marca.external_id === params.external_marca}
                  >
                    {marca.nombre}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-outline mb-4">
              <label className="form-label">Placa</label>
              <input
                {...register("placa")}
                id="placa"
                className={`form-control  ${errors.placa ? "is-invalid" : ""}`}
              />
              {errors.placa && (
                <div className="alert alert-danger invalid-feedback">
                  {errors.placa?.message}
                </div>
              )}
            </div>

            <div className="form-outline mb-4">
              <label className="form-label">Chasis</label>
              <input
                {...register("chasis")}
                id="chasis"
                className={`form-control  ${errors.chasis ? "is-invalid" : ""}`}
              />
              {errors.chasis && (
                <div className="alert alert-danger invalid-feedback">
                  {errors.chasis?.message}
                </div>
              )}
            </div>

            <div className="form-outline mb-4">
              <label className="form-label">Descripcion</label>
              <textarea
                {...register("descripcion")}
                id="description"
                className={`form-control  ${
                  errors.descripcion ? "is-invalid" : ""
                }`}
              />
              {errors.descripcion && (
                <div className="alert alert-danger invalid-feedback">
                  {errors.descripcion?.message}
                </div>
              )}
            </div>

            <div className="form-outline mb-4">
              <label className="form-label">Subtotal</label>
              <input
                {...register("subtotal")}
                id="subtotal"
                type="number"
                className={`form-control  ${
                  errors.subtotal ? "is-invalid" : ""
                }`}
                min={0}
              />
              {errors.subtotal && (
                <div className="alert alert-danger invalid-feedback">
                  {errors.subtotal?.message}
                </div>
              )}
            </div>

            <div className="form-outline mb-4">
              <label className="form-label">IVA</label>
              <input
                {...register("iva")}
                id="iva"
                type="number"
                className={`form-control  ${errors.iva ? "is-invalid" : ""}`}
              />
              {errors.iva && (
                <div className="alert alert-danger invalid-feedback">
                  {errors.iva?.message}
                </div>
              )}
            </div>

            <div className="form-outline mb-4">
              <label className="form-label">Descuento</label>
              <input
                {...register("descuento")}
                id="descuento"
                type="number"
                className={`form-control  ${
                  errors.descuento ? "is-invalid" : ""
                }`}
                min={0}
                max={100}
              />
              {errors.descuento && (
                <div className="alert alert-danger invalid-feedback">
                  {errors.descuento?.message}
                </div>
              )}
            </div>

            <div className="form-outline mb-4">
              <label className="form-label">Total</label>
              <input
                {...register("total")}
                id="total"
                type="number"
                min={0}
                disabled="true"
                className="form-control"
              />
            </div>

            <div className="mt-1 d-flex justify-content-between">
              <button
                className="btn btn-secondary btn-block mb-4"
                onClick={() => {
                  router.back();
                }}
              >
                Cancelar
              </button>
              <button type="submit" className="btn btn-primary btn-block mb-4">
                Guardar
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
}
