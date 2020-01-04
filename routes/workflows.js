

const wfRoutes = (app, fs) => {

    // variables
    const dataPath = './data/workflows.json';


    // refactored helper methods
    const readFile = (callback, returnJson = false, filePath = dataPath, encoding = 'utf8') => {
        fs.readFile(filePath, encoding, (err, data) => {
            if (err) {
                throw err;
            }

            callback(returnJson ? JSON.parse(data) : data);
        });
    };

    const writeFile = (fileData, callback, filePath = dataPath, encoding = 'utf8') => {

        fs.writeFile(filePath, fileData, encoding, (err) => {
            if (err) {
                throw err;
            }

            callback();
        });
    };

    // UPDATE
    app.put('/workflows/:name', (req, res) => {

        readFile(data => {

            // add the new user
            const name = req.params["name"];
            index = 
            data['workflows'] = JSON.parse(req.body.data);

            writeFile(JSON.stringify(data, null, 2), () => {
                res.status(200).send(`users id:${userId} updated`);
            });
        },
            true);
    });

    //WRITE
    app.post('/workflows', (req, res) => {

        readFile(data => {
            console.log(data['workflows'])
            // add the new user
            data['workflows'].push(req.body);
            writeFile(JSON.stringify(data, null, 2), () => {
                res.status(200).send('new workflow added');
            });
        },
            true);
    });



    // READ
    app.get('/workflows', (req, res) => {
        fs.readFile(dataPath, 'utf8', (err, data) => {
            if (err) {
                throw err;
            }
            res.send(JSON.parse(data));
        });
    });
};

module.exports = wfRoutes;

