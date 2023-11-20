// 'use client';

import { COMPLETE_URL, QUERY_SYMBOL, GET_AUTO, CHANGE_STATE, LIST_CARS_FUNCTION, BRANDS_FUNCTION, LOGIN_FUNCTION, UPDATE_FUNCTION, SAVE_FUNCTION } from "./Constants";
import { getItem, saveToken, saveItem } from "./SessionUtils";
import { getToken } from "./SessionUtils";


const data = [
    {
        "external": "1",
        "descripcion": "Descripcion 1",
        "subtotal": "100",
        "iva": "0.2",
        "total": "12300000",
        "descuento": "1",
        "chasis": "Chasis metalico",
        "placa": "FEE-8523",
        "foto": "https://st1.uvnimg.com/dims4/default/0102b2f/2147483647/resize/1093x820%3E/quality/75/?url=http%3A%2F%2Fuvn-brightspot.s3.amazonaws.com%2Fd4%2F4a%2F006304a74db4902c0b4d8d8026c8%2Fchevrolet-corvette-c8-stingray-2020-1280-08.jpg",
        "usuario": "ORTEGA ALBURQUEQUE JORGE DANIEL",
        "cuenta_external": "8c70dd35-83e1-11ee-8e9c-5254008b9e28",
        "nombre": "Toyota",
        "marca_external": "9843b3be-833d-11ee-a1d4-581122836c5f"
    },
    {
        "external": "2",
        "descripcion": "Descripcion 3",
        "subtotal": "10",
        "iva": "0.2",
        "total": "110",
        "descuento": "1",
        "chasis": "Chasis aleacion",
        "placa": "LAA-1564",
        "foto": "https://acroadtrip.blob.core.windows.net/catalogo-imagenes/m/RT_V_d71cdaceff82463c893d1d117fc2802d.jpg",
        "usuario": "ORTEGA ALBURQUEQUE JORGE DANIEL",
        "cuenta_external": "8c70dd35-83e1-11ee-8e9c-5254008b9e28",
        "nombre": "Nissan",
        "marca_external": "9843b6db-833d-11ee-a1d4-581122836c5f"
    },
    {
        "external": "3",
        "descripcion": "Descripcion 3",
        "subtotal": "5",
        "iva": "0.1",
        "total": "100000",
        "descuento": "60",
        "chasis": "Chasis alumino",
        "placa": "IOO-8523",
        "foto": "https://static.patiotuerca.com/ghost/ecuador/2023/02/Jetour-X70-Plus.jpg",
        "usuario": "ORTEGA ALBURQUEQUE JORGE DANIEL",
        "cuenta_external": "8c70dd35-83e1-11ee-8e9c-5254008b9e28",
        "nombre": "Toyota",
        "marca_external": "9843b3be-833d-11ee-a1d4-581122836c5f"
    }
]

// Metodo para obtener marcas
export async function getBrands() {
    const response = await fetch(COMPLETE_URL + QUERY_SYMBOL + 'funcion=' + BRANDS_FUNCTION, { cache: 'no-store' })
    return await response.json()
}

// Metodo para listar autos existentes
export async function listCars() {
    // const jwt = getToken()
    // const external = getItem('external')

    const headers = {
        "Accept": "application/json",
        "Content-type": "application/json",
        "TOKEN-KEY": "OGM3MGRkMzUtODNlMS0xMWVlLThlOWMtNTI1NDAwOGI5ZTI4LS0xNzAwMjg3NTUxLS0zMDUwMDkzNzc2"
    }

    const response = await fetch(COMPLETE_URL + QUERY_SYMBOL + 'funcion=' + LIST_CARS_FUNCTION + '&external=' + "8c70dd35-83e1-11ee-8e9c-5254008b9e28", {
        // method: "GET",
        headers: headers,
        cache: 'no-store' // La informacion se carga de forma dinamica, el cache no se guarda
    });



    return await response.json()
}

// Metodo para obtener auto por id
export async function getCarById(cardId) {
    const jwt = getToken()

    const headers = {
        "Accept": "application/json",
        "Content-type": "application/json",
        // "TOKEN-KEY": "OGM3MGRkMzUtODNlMS0xMWVlLThlOWMtNTI1NDAwOGI5ZTI4LS0xNzAwMjg3NTUxLS0zMDUwMDkzNzc2",
        "TOKEN-KEY": jwt
    }

    const response = await fetch(COMPLETE_URL + QUERY_SYMBOL + "funcion=" + GET_AUTO + "&external=" + cardId, {
        method: "GET",
        headers: headers,
        cache: 'no-store' // La informacion se carga de forma dinamica, el cache no se guarda
    });

    return await response.json()
}

// Metodo para modificar la disponibilidad de un auto: true(1): Disponible; false(0): No disponible
export async function changeStateCar(cardId, state) {
    const jwt = getToken()

    console.log("Nuevo estado dentro de changeStateCar:", state);

    const headers = {
        "Accept": "application/json",
        "Content-type": "application/json",
        // "TOKEN-KEY": "OGM3MGRkMzUtODNlMS0xMWVlLThlOWMtNTI1NDAwOGI5ZTI4LS0xNzAwMjg3NTUxLS0zMDUwMDkzNzc2"
        "TOKEN-KEY": jwt
    }

    const response = await fetch(COMPLETE_URL + QUERY_SYMBOL + 'funcion=' + CHANGE_STATE + '&external=' + cardId + '&estado=' + state, {
        method: "GET",
        headers: headers,
        cache: 'no-store' // La informacion se carga de forma dinamica, el cache no se guarda
    });

    return await response.json()
}

// Metodo para registrar un auto
export async function saveCar(data) {
    const jwt = getToken()
    const user = getItem("external")

    data = { ...data, user: user, funcion: SAVE_FUNCTION }

    console.log('la data', data);

    const headers = {
        "Accept": "application/json",
        "Content-type": "application/json",
        "TOKEN-KEY": jwt
    }

    const response = await fetch(COMPLETE_URL, {
        method: "POST",
        headers: headers,
        body: JSON.stringify(data)
    });

    console.log('la respuesta', response);

    return await response.json()
}

// Metodo para registrar un auto
export async function updateCar(cardId, newData) {
    const jwt = getToken()

    newData = { ...newData, external: cardId, funcion: UPDATE_FUNCTION }

    const headers = {
        "Accept": "application/json",
        "Content-type": "application/json",
        // "TOKEN-KEY": "OGM3MGRkMzUtODNlMS0xMWVlLThlOWMtNTI1NDAwOGI5ZTI4LS0xNzAwMjg3NTUxLS0zMDUwMDkzNzc2"
        "TOKEN-KEY": jwt
    }

    const response = await fetch(COMPLETE_URL, {
        method: "POST",
        headers: headers,
        body: JSON.stringify(newData)
    });

    return await response.json()
}

// Inicio de sesion
export async function login(dni) {
    const data = { funcion: LOGIN_FUNCTION, identificador: dni, clave: dni }

    const headers = {
        "Accept": "application/json",
        "Content-type": "application/json",
    }

    let response = await fetch(COMPLETE_URL, {
        method: "POST",
        headers: headers,
        body: JSON.stringify(data)
    });

    response = await response.json()


    if (response) {
        console.log('nooo', response);
        saveToken(response.jwt)
        saveItem('user', response.usuario);
        saveItem('external', response.external);
    }

    return response
}