# Web Scraping Project

This project is a web scraper designed to extract catalog information from the [Tus website](https://www.tus.si/). The scraper collects details such as the catalog name, PDF link, and date range, then saves the data to a JSON file.

## Installation

1. **Clone the repository**:
    ```bash
    git clone https://github.com/viacheslavdev/scrapper-test-task.git
    cd scrapper-project
    ```

2. **Install dependencies**:
    ```bash
    npm install
    ```

## Usage

To run the scraper, execute the following command:

```bash
node scraper.js
```

This will launch a headless browser, navigate to the Tus website, scrape the catalog information, and save it to a JSON file in the `./catalogs` directory.

## Configuration

The main configuration options can be found in the `scraper.js` file. By default, the scraper targets the [Tus website](https://www.tus.si/).

### Example Output

The output is saved as a JSON file in the `./catalogs` directory. Below is an example of the expected JSON format:

```json
[
  {
    "name": "Catalog 1",
    "link": "https://www.tus.si/app/uploads/catalogues/catalog1.pdf",
    "date": "12.06.2023 - 18.06.2023"
  },
  {
    "name": "Catalog 2",
    "link": "https://www.tus.si/app/uploads/catalogues/catalog2.pdf",
    "date": "19.06.2023 - 25.06.2023"
  }
]

