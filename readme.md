# GitHub Repo Search CLI

A Node.js CLI application to fetch the most starred GitHub repositories created within a specific date range.

---

## Installation

1. Clone the repository:
    git clone <your-repo-url>
    cd github-repo-cli

2. Install dependencies:
    npm install

## Usage

    node index.js --start <START_DATE> [--end <END_DATE>] [--number <NUMBER>] [--output <FILE>]

### Options
- `-s, --start` → Start date of the search in `dd/mm/yyyy` format (required)  
- `-e, --end` → End date of the search in `dd/mm/yyyy` format (optional, defaults to today)  
- `-n, --number` → Number of results to fetch (optional, default: 5, max: 100)  
- `-o, --output` → Optional file to save the results  

### Example

    node index.js -s 01/08/2025 -e 31/08/2025
    node index.js -s 01/08/2025 -n 10 -o results.json

### Notes
- The script fetches repositories sorted by stars in descending order.
- Results include repository name, description, URL, owner, and owner profile URL.
- If an output file is specified, results are saved in JSON format; otherwise, they are printed to the console.

## How it works
1. **Date parsing** — Converts `dd/mm/yyyy` strings to JavaScript `Date` objects.
2. **Query construction** — Builds a GitHub search query of the form `created:YYYY-MM-DD..YYYY-MM-DD`.
3. **API request** — Uses `axios` to fetch repositories from the GitHub Search API, sorted by stars.
4. **Output** — Maps the API response to a simplified JSON structure and either prints it or writes it to a file.

## Example output structure
A saved JSON file contains an array whose first element is the query string and subsequent elements are objects like:
- `repo_name` — repository name  
- `repo_desc` — repository description  
- `repo` — repository HTML URL  
- `owner` — owner login  
- `owner_profil` — owner profile URL

## Dependencies
This project uses the following Node.js modules:

- **axios** — for making HTTP requests to the GitHub API  
- **yargs** — for parsing CLI arguments  
- **fs** — for saving results to a file

## Running locally (quick)
1. Ensure Node.js (v14+) is installed.
2. Create `index.js` with the CLI script.
3. Install dependencies:
    npm install axios yargs
4. Run:
    node index.js -s 01/08/2025 -n 5

## Shoutout
Inspired by [roadmap.sh Full-Stack Roadmap](https://roadmap.sh/full-stack).
