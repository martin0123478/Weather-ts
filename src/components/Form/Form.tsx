
import type { SearchTypes } from "../../types"
import { useState } from "react"
import { countries } from "../../data/countries"
import styles from './Form.module.css'
import { Alert } from "../Alert/Alert"
export const Form = () => {
    const [search, setSearch] = useState<SearchTypes>({
        city: '',
        country: ''
    })
    const [alert, setAlert] = useState('')

    const handleChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) => {
        setSearch({
            ...search,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (Object.values(search).includes('')) {
            setAlert('Todos los campos son obligatorios')
            return
        }

    }
    return (
        <form className={styles.form}
            onSubmit={handleSubmit}>
            {
                alert && <Alert>
                    {alert}
                </Alert>
            }
            <div className={styles.field}>
                <label htmlFor="city">Ciudad</label>
                <input id="city" type="text" name="city" placeholder="Ciudad"
                    value={search.city}
                    onChange={handleChange} />
            </div>
            <div className={styles.field}>
                <label htmlFor="country">Pais</label>
                <select value={search.country} onChange={handleChange} name="country" id="country">
                    <option value="">--Seleccione un País--</option>
                    {countries.map(country => (
                        <option
                            id={country.code}
                            value={country.name}>
                            {country.name}
                        </option>
                    ))}
                </select>
            </div>
            <input className={styles.submit} type="submit" value='Consultar Clima' />
        </form>
    )
}
