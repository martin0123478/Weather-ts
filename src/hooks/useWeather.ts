import axios from 'axios'
import { z } from 'zod'
//import { object, string, number, InferOutput, parse } from 'valibot'
import { SearchTypes } from '../types'
import { useState } from 'react'

//tytpe guard o assertion
/*       function isWeatherResult(weather: unknown): weather is Weather {
          return (
              Boolean(weather) &&
              typeof weather === 'object' &&
              typeof (weather as Weather).name === 'string' &&
              typeof (weather as Weather).main.temp_max === 'number' &&
              typeof (weather as Weather).main.temp_min === 'number'
          )
 
      } */



//valibot
/*  const WeatherSchema = object({
     name: string(),
     main: object({
         temp: number(),
         temp_max: number(),
         temp_min: number(),
 
     })
 
 })
 
 type Weather = InferOutput<typeof WeatherSchema> */


//zod
const Weather = z.object({
    name: z.string(),
    main: z.object({
        temp: z.number(),
        temp_max: z.number(),
        temp_min: z.number(),
    })
})

export type Weather = z.infer<typeof Weather>
export default function useWeather() {


    const [weather, setWeather] = useState<Weather>({
        name: '',
        main: {
            temp: 0,
            temp_max: 0,
            temp_min: 0
        }
    })

    const fetchWeather = async (search: SearchTypes) => {



        try {
            const appId = import.meta.env.VITE_API_KEY
            const geoUrl = `https://api.openweathermap.org/data/2.5/weather?q=${search.city},${search.country}&appid=${appId}`
            const { data } = await axios(geoUrl)
            const lat = data.coord.lat
            const lon = data.coord.lon

            const weaterUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${appId}`
            //Castear el type
            //  const { data: wheaterReult } = await axios<Weather>(weaterUrl)
            //  console.log(wheaterReult.name)
            // console.log(wheaterReult.main.temp_max)

            //Type Guards

            /* const { data: wheaterReult } = await axios(weaterUrl)
            const result = isWeatherResult(wheaterReult)
            if (result) {
                console.log(wheaterReult.name)
                console.log(wheaterReult.main.temp)
            } */

            //Zod
            const { data: wheaterReult } = await axios(weaterUrl)
            const result = Weather.safeParse(wheaterReult)
            if (result.success) {
                setWeather(result.data)
            }

            //valibot
            /* const { data: wheaterReult } = await axios(weaterUrl)
            const result = parse(WeatherSchema, wheaterReult)
            if (result) {
                console.log(result.name)
            } */


        } catch (error) {
            console.log(error)
        }
    }
    return {
        weather,
        fetchWeather
    }
}