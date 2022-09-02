/** @format */

import csvToJson from 'convert-csv-to-json'
import fs from 'fs'

const fileInputName = 'adidas_sample.csv'
const fileOutputName = 'products.json'
csvToJson.generateJsonFileFromCsv(fileInputName, fileOutputName)

// const jsonData = fileOutputName

// const jsonContent = JSON.stringify(jsonData)
// console.log(jsonContent)

// fs.writeFile('products.json', jsonContent, 'utf8', function (err) {
//   if (err) {
//     console.log('An error occurred while writing JSON Object to File.')
//     return console.log(err)
//   }

//   console.log('JSON file has been saved.')
// })
