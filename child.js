const process =  require('process');

// process.send('this is a message from child');



process.on('message', function (data) {
    const fnIIFE = `(${data.fn})()`;
    const result = eval(fnIIFE);
    process.send({result});
    process.exit();
});