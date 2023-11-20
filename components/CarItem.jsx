import React, { useState } from 'react';
import { useRouter } from "next/navigation";

//TODO parsar el external al hacer click en algun item
export default function CarItem({car}) { // quitar mas tarde
  const router = useRouter();
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="container col-7  mt-2 d-flex align-items-center justify-content-between border rounded p-3 hover"
      style={{ cursor: "pointer", backgroundColor: hovered ? '#f3f3f3' : '#fff' }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => {
        router.push(`/details/${car.external}/${car.marca_external}`)
      }}
    >
      <div className="d-flex justify-content-between align-items-center">
        <img
          src= {car.foto}
          alt=""
          className="rounded float-start rounded-circle"
          style={{ width: "5rem" }}
        />
        <div className="d-flex flex-column ms-4">
          <span className="text-capitalize fs-5 fw-semibold">{car.nombre}</span>
          <span className="text-capitalize fs-6 fw-light">{car.placa}</span>
        </div>
      </div>

      <div className="d-flex justify-content-end">
        <span className="text-capitalize fs-5 fw-medium">$ {car.total}</span>
      </div>
    </div>
  );
}
