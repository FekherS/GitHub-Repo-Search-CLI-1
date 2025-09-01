import fs from 'fs';
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import axios from 'axios';

const argv = yargs(hideBin(process.argv))
    .option('start', {
        alias: 's',
        type: 'string',
        description: 'Start date of the search dd/mm/yyyy',
        demandOption: true // makes it required
    })
    .option('end', {
        alias: 'e',
        type: 'string',
        description: 'Start date of the search dd/mm/yyyy, if not provided defaults to today',
        // demandOption: true
    })
    .option('output', {
        alias: 'o',
        type: 'string',
        description: 'Optional file to save the result'
    })
    .option('number', {
        alias: 'n',
        type: 'number',
        description: 'number of results, default is 5 max is 100'
    })
    .help() // adds --help
    .argv;

function parseDate(str) {
    const [day, month, year] = str.split('/').map(Number);
    return new Date(year, month - 1, day);
}

const startDate = parseDate(argv.start);
const endDate = argv.end ? parseDate(argv.end) : new Date();
const number = argv.number ? argv.number : 5;


const url = 'https://api.github.com/search/repositories?';
function formatDate(date) {
	const year = date.getFullYear();
	const month = String(date.getMonth() + 1).padStart(2, '0'); // ensures 01, 02, ..., 12
	const day = String(date.getDate()).padStart(2, '0');        // ensures 01, 02, ..., 31
	return `${year}-${month}-${day}`;
}

const query = `created:${formatDate(startDate)}..${formatDate(endDate)}`;
const queryString = `q=${query}&sort=stars&order=desc&per_page=${number}`;

try {
    const response = await axios.get(url + queryString, {
    headers: {
        "X-GitHub-Api-Version": "2022-11-28",
        "User-Agent": "Github_API_CLI"
    }
    });
    const data = response.data;
    
    const finalData =[queryString]
    finalData.push(...data.items.map(elem => {
        return {
            "repo_name": elem.name,
            "repo_desc": elem.description,
            "repo": elem.html_url,
            "owner": elem.owner.login,
            "owner_profil": elem.owner.html_url
        }
    }))
    const outputFile = argv.output;
    if (outputFile) {
        fs.writeFileSync(outputFile, JSON.stringify(finalData, null, 4), 'utf-8');
        console.log(`Saved output to ${outputFile}`);
    } else {
        console.log(finalData);
    }
} catch (err) {
    console.error("error:", err);
}