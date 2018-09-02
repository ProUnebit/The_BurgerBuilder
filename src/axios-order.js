import axios from 'axios'


const instance = axios.create({
    baseURL: 'https://my-burgerbuilder.firebaseio.com/'
})

export default instance;
