import axios from 'axios'

const baseUrl = '/persons'

const getAll = () => { 
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

const insert = (resource) => {
    const request =  axios.post(baseUrl, resource)
    return request.then(response => response.data)
}

const update = (url, resource) => {
    const request = axios.put(url, resource)
    return request.then(response => response.data)
}

const printMe = () => console.log(`Hi I am services`)

export default {
    getAll, 
    insert,
    update, 
    printMe
}

