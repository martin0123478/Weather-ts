
import styles from './App.module.css'
import { Form } from './components/Form/Form'
import { WeatherDetail } from './components/WeatherDetail/WeatherDetail'
import useWeather from './hooks/useWeather'
function App() {

  const { fetchWeather, weather, hasWeather } = useWeather()
  return (
    <>

      <h1 className={styles.title}>Buscador de Clima</h1>
      <div className={styles.container}>
        <Form
          fetchWeather={fetchWeather} />

        {
          hasWeather && (
            <WeatherDetail weather={weather} />
          )
        }


      </div>
    </>
  )
}

export default App
