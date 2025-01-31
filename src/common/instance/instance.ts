import axios from "axios";

export const instance = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL,
    headers: {
        Authorization: `Bearer ${process.env.REACT_APP_AUTH_TOKEN}`,
        'API-KEY': process.env.REACT_APP_API_KEY,
    },
})
// Перехватчики (interceptors) позволяют выполнять определённые действия перед отправкой запроса
// или перед обработкой ответа. Это полезно для таких задач, как добавление заголовков
// , логирование, обработка ошибок и т.д.
instance.interceptors.request.use(function (config) {
    config.headers['Authorization'] = `Bearer ${localStorage.getItem('sn-token')}`

    return config
})