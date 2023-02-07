const readline = require('readline');
const fs = require('fs');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// check if directory data exists then create folder

const dirPath = './data';
const dataPath = './data/contacts.json';

if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath);
    // if contacts.json not exists then create file
    if (!fs.existsSync(dataPath)) {
        fs.writeFileSync(dataPath, '[]', 'utf-8');
    }
}

// create a function for asking question
function ask(question) {
    return new Promise((resolve) => {
        rl.question(question, (answer) => {
            resolve(answer)
        })
    })
}

const main = async () => {
    const nama = await ask('Nama? ');
    const email = await ask('Email? ');
    const notelp = await ask('NoTelp? ');
    const data = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));
    data.push({ nama, email, notelp });
    fs.writeFileSync(dataPath, JSON.stringify(data));
    rl.close()
}

main();