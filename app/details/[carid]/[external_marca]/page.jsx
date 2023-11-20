"use client";

import { getBrands } from "@/hooks/Api";
import { getCarById, changeStateCar } from "@/hooks/Api";

import React, { useState, useEffect } from "react";
import message from "@/components/Message";
import { useRouter } from "next/navigation";
import { isSession } from "@/hooks/SessionUtils";

export default function Details({ params }) {
  const router = useRouter();
  const [car, setCar] = useState({});
  const [marca, setMarca] = useState({});

  useEffect(() => {
    if (!isSession()) {
      router.push("/");
    }

    const carId = params.carid;
    const externalMarca = params.external_marca;

    const getCar = async () => {
      const response = await getCarById(carId);
      setCar(response.datos[0]);
    };

    const getBrandsList = async () => {
      const response = await getBrands();
      const marcas = response.datos;
      setMarca(
        marcas.find((marca) => {
          return marca.external_id === externalMarca;
        })
      );
    };

    getBrandsList();
    getCar();
  }, []);

  return (
    <>
      {car && marca && (
        <div className="container col-4 mt-5 p-3 border border-1 rounded d-flex flex-column">
          <h2 className="mt-1 d-flex justify-content-center">Detalles</h2>
          <div className="m-3 d-flex justify-content-center">
            <img
              className="rounded float-start rounded-circle"
              style={{ width: "10rem" }}
              src={car.foto}
              alt={car.nombre}
            />
          </div>
          <div className="mt-1">
            <p>
              <span className="fw-semibold fs-6">Marca: </span>
              <span>{marca.nombre}</span>
            </p>
            <p>
              <span className="fw-semibold fs-6">Placa: </span>
              <span>{car.placa}</span>
            </p>
            <p>
              <span className="fw-semibold fs-6">Descripcion: </span>
              <span>{car.descripcion}</span>
            </p>
            <p>
              <span className="fw-semibold fs-6">Chasis: </span>
              <span>{car.chasis}</span>
            </p>
            <hr />
            <p>
              <span className="fw-semibold fs-6">Subtotal: </span>
              <span>${car.subtotal}</span>
            </p>
            <p>
              <span className="fw-semibold fs-6">IVA: </span>
              <span>{car.iva} %</span>
            </p>
            <p>
              <span className="fw-semibold fs-6">Descuento: </span>
              <span>{car.descuento} %</span>
            </p>
            <p>
              <span className="fw-semibold fs-6">Total: </span>
              <span>${car.total}</span>
            </p>
          </div>

          <div className=" mt-1 d-flex justify-content-between">
            <button
              className="btn btn-secondary"
              onClick={() => {
                router.back();
              }}
            >
              Regresar
            </button>
            <button
              className={`btn ${
                car.estado === "1" ? "btn-success" : "btn-danger"
              }`}
              onClick={async () => {
                const response = await changeStateCar(
                  params.carid,
                  car.estado === "0" ? true : false
                );
                message(response.mensaje, response.data);

                router.back();
              }}
            >
              {car.estado === "1" ? "Disponible" : "Agotado"}
            </button>

            <button
              className="btn btn-primary"
              onClick={() => {
                router.push(`/edit/${params.carid}/${params.external_marca}`);
              }}
            >
              Editar
            </button>
          </div>
        </div>
      )}
    </>
  );
}
