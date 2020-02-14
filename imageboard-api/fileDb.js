const fs = require('fs');

const nanoid = require('nanoid');

const readFile = filename => {
    return new Promise(((resolve, reject) => {
        fs.readFile(filename, (err, data) => {
            if(err){
                reject(err);
            } else{
                resolve(data);
            }
        })
    }))
};

const writeFile = (filename, data) => {
    return new Promise((resolve, reject) => {
        fs.writeFile(filename, data, err => {
            if(err){
                reject(err);
            } else {
                resolve();
            }
        })
    })
};
const filename = './db.json';
let data = [];

module.exports = {
    async init() {
        try {
            const fileData = await readFile(filename);
            data = JSON.parse(fileData.toString());
        } catch(e){
            data = [];
        }
    },
    async getAllThreads(){
        return data;
    },
    async addThread(thread){
        thread.id = nanoid();
        thread.responses = [];
        data.push(thread);
        this.save();
    },
    async save(){
        const fileContents = JSON.stringify(data, null, 2);
        await writeFile(filename, fileContents)
    }
};
