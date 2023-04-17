const fs = require('fs');
const axios = require('axios');

function handleOutput(output, content){
  if(output){
    fs.writeFile(output, content, 'utf8', function(err) {
      if (err) {
        console.error(`Couldn't write ${output}: ${err}`);
        process.exit(1);
      }
    });
  } else {
    console.log(content)
  }
}


function cat(path, output){
  fs.readFile(path, 'utf8', function(err, data){
    if (err) {
      console.error(err);
      process.exit(1);
    }
    handleOutput(output, data)
  })
}

async function webCat(url, output){
  try {
    let res = await axios.get(url);
    handleOutput(output, res.data);
  } catch (err) {
    console.error(`Error fetching ${url}: ${err}`)
    process.exit(1);
  }
}


let path; 
let output;

if (process.argv[2] === '--out'){
  path = process.argv[4];
  output = process.argv[3];
} else {
  path = process.argv[2];
}

if (path.slice(0,4) === 'http'){
  webCat(path, output);
} else {
  cat(path, output);
}



