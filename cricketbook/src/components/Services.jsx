import axios from "axios";
const baseurl = 'http://localhost:3001/players';

const getlist = () => {
    const request = axios.get(baseurl);
    return request.then(response => response.data);
}

const addtolist = (newcricketer) => {
    const request = axios.post(baseurl, newcricketer);
    return request.then(response => response.data);
}

const deletefromlist = (id) => {
    const request = axios.delete(`${baseurl}/${id}`);
    return request.then(response => response.data);
}

const changebattingposn = (id, newbattingposn) => {
    const request = axios.put(`${baseurl}/${id}`, newbattingposn);
    return request.then(response => response.data);
}


export default { getlist, addtolist, deletefromlist, changebattingposn };