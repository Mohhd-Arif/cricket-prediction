
const xlsxj = require("xlsx-to-json");

exports.convertExcelToJson = async (filepath) => {

  return new Promise((resolve, reject) => {
    xlsxj({
      input: filepath,
      output: null,
      sheet: "Sheet1"
    }, (err, result) => {
      if (err) {
        console.error(err);
        reject(new Error(err))
      } else {
        //console.log(result);
        resolve(result)
      }
    });
  })

}