const fs = require('fs');

function cat(){
  let path;
  path = process.argv[2]
  
  fs.readFile(path, 'utf8', function(err, data){
    if (err) {
      console.error(err);
      process.exit(1);
    }
    
    console.log(data)
  })
}

cat();