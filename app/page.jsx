"use client";

import Login from "@/components/Login";
import CarItem from "@/components/CarItem";
import { isSession } from "@/hooks/SessionUtils";
import React, { useState, useEffect } from "react";
import { listCars } from "@/hooks/Api";

import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  const [carsList, setCarsList] = useState([]);

  useEffect(() => {
    const getCardList = async () => {
      const response = await listCars();
      setCarsList(response.datos);
      // console.log("res", response);
    };

    getCardList();
  }, []);

  return (
    <>
      {!isSession() && <Login />}
      {isSession() && carsList && (
        <div className="mt-5">
          <div className="col-7 container p-0 mb-4">
            <button
              className="btn btn-success"
              onClick={() => {
                router.push("/register");
              }}
            >
              Registrar nuevo carro
            </button>
          </div>
          {carsList.map((car, i) => (
            <div key={i}>
              <CarItem car={car} />
            </div>
          ))}
        </div>
      )}
    </>
  );
}
