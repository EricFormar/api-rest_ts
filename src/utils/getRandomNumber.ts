export function getRandomNumber(min: number, max: number): number {
    // Asegúrate de que min sea menor o igual que max
    if (min > max) {
      [min, max] = [max, min]; // Intercambia los valores si están al revés
    }
  
    // Math.random() devuelve un número de punto flotante pseudo-aleatorio
    // en el rango [0, 1) (es decir, de 0 inclusive a 1 exclusive).
    //
    // Multiplicamos por (max - min + 1) para obtener un rango que incluya 'max'.
    // Por ejemplo, si min = 1 y max = 10, (10 - 1 + 1) = 10, lo que nos da 10 posibles valores.
    //
    // Luego, sumamos 'min' para desplazar el rango al punto de inicio deseado.
    //
    // Finalmente, Math.floor() redondea el número hacia abajo al entero más cercano.
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }