import { countries } from "../../data/countries"

export const Form = () => {
    return (
        <form>
            <div>
                <label htmlFor="city">Ciudad</label>
                <input id="city" type="text" name="city" placeholder="Ciudad" />
            </div>
            <div>
                <label htmlFor="country">Pis</label>
                <select name="" id="">
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
            <input type="submit" value='Consultar Clima' />
        </form>
    )
}
