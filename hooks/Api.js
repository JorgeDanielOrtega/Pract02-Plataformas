// 'use client';

import { COMPLETE_URL, QUERY_SYMBOL, GET_AUTO, CHANGE_STATE, LIST_CARS_FUNCTION, BRANDS_FUNCTION, LOGIN_FUNCTION, UPDATE_FUNCTION, SAVE_FUNCTION } from "./Constants";
import { getItem, saveToken, saveItem } from "./SessionUtils";
import { getToken } from "./SessionUtils";

// Metodo para obtener marcas
export async function getBrands() {
    const response = await fetch(COMPLETE_URL + QUERY_SYMBOL + 'funcion=' + BRANDS_FUNCTION, { cache: 'no-store' })
    return await response.json()
}

// Metodo para listar autos existentes
export async function listCars() {
    const jwt = getToken()
    const external = getItem('external')

    const headers = {
        "Accept": "application/json",
        "Content-type": "application/json",
        "TOKEN-KEY": jwt
    }

    const response = await fetch(COMPLETE_URL + QUERY_SYMBOL + 'funcion=' + LIST_CARS_FUNCTION + '&external=' + external, {
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