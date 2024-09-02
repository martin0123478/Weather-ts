import axios from 'axios'
import { SearchTypes } from '../types'
export default function useWeather() {
    const fetchWeather = async (search: SearchTypes) => {
        try {
            const appId = import.meta.env.VITE_API_KEY
            const geoUrl = `https://api.openweathermap.org/data/2.5/weather?q=${search.city},${search.country}&appid=${appId}`
            const { data } = await axios(geoUrl)
            const lat = data.coord.lat
            const lon = data.coord.lon

            const weaterUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${appId}`
            const { data: wheaterReult } = await axios(weaterUrl)
            console.log(wheaterReult)

        } catch (error) {
            console.log(error)
        }
    }
    return {
        fetchWeather
    }
}