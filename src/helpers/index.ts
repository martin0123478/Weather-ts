export const formatTemperature = (temaperature: number): number => {
    const kelvin = 273
    return parseInt((temaperature - kelvin).toString())

}