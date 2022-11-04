'use strict'

const _ = require('lodash') // https://lodash.com/docs/4.17.4
const assert = require('assert')

const database = require('./database.json')

var sold = {}
var soldHats = 0
var maxSolds = 0

//Funcion que determina los 3 Sombreros mas vendidos
function top3(numbers) {  
  numbers = numbers.sort((a,b) => b - a);
  return [numbers[0], numbers[1], numbers[2]]
}

//Bucle que permite ordenar e incluye en un array nuevo los sobreros vendidos juntos a las cantidades de los mismos segun su id
Object.entries(database).forEach(([key,value]) => {
  value.hats.forEach(function(numero){
    sold[numero.id] = (sold[numero.id] || 0) + 1
  })
})

soldHats =  Object.values(sold)

//Bucle que permite escribir en consola por Clave Valor los id's de los Sombreros vendidos junto a las cantidades vendidas de los mismos
Object.entries(sold).forEach(([key,value]) => {
  console.log("Hat (" + key + ") sold " + value)
})

maxSolds = top3(soldHats)    // Calculamos los 3 Sombreros mas vendidos y los insertamos en un array

const total = maxSolds.reduce((a, b) => a + b, 0) // TODO   // Sumamos los 3 Sombreros mas vendidos

console.log("**************************Resultado de Ejecucion del Codigo ****************************")
console.log("->" + maxSolds + " => " + total)


// Throws error on failure
assert.equal(total, 23, `Invalid result: ${total} != 23`)

console.log('Success!')

/**
 * Time and space complexity in O() notation is:
 *   - time complexity: TODO
 *   - space complexity: TODO
 */
