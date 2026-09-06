# Data Visualisation Gallery

An interactive data visualisation gallery built with p5.js. Select a visualisation from the menu to explore different datasets, ranging from gender pay gaps and tech industry diversity to climate change, food surveys, and rainfall patterns.

## Visualisations Included

- Tech Diversity: Race — pie chart breakdown of employee race demographics by company
- Tech Diversity: Gender — comparative bar chart of male vs female employee percentages
- Pay Gap by Job (2017) — scatter plot of gender pay gap against proportion of female employees, by job type
- Pay Gap Time Series (1997-2017) — line chart tracking the gender pay gap over two decades
- Climate Change — line chart of global surface temperature with an adjustable year range slider
- UK Food Survey (2018) — pie chart of survey responses on food attitudes
- UK Nutrient Intake (1974-2016) — time series of nutrient intake percentages, selectable by nutrient
- UK Household Purchases (1997-2022) — animated bubble chart of household purchase volumes by category and year
- SG Rainfall (1982-2012) — heatmap of Singapore rainfall frequency, selectable by year

## How to Use

1. Open the page in a browser.
2. Click a visualisation name from the menu on the left.
3. Some visualisations include dropdown selectors or sliders to filter the data being displayed.

## Built With

- p5.js — canvas rendering and interaction
- p5.dom.js — UI elements (dropdowns, sliders, buttons)

## Running Locally

1. Clone this repository:
   ```
   git clone https://github.com/WeiKeong12/data-visualisation-gallery.git
   ```
2. Serve the folder with a local server, since the CSV data files are loaded via fetch and most browsers block this from a local file path directly:
   ```
   npx http-server .
   ```
3. Open the served address in your browser.

## Project Structure

```
├── index.html                    # Entry point, loads all scripts
├── sketch.js                     # Main setup/draw loop, registers all visualisations
├── gallery.js                    # Gallery class - manages menu and visualisation switching
├── pie-chart.js                  # Reusable pie chart component
├── helper-functions.js           # Shared data processing and axis-drawing utilities
├── style.css                     # Menu and layout styling
├── tech-diversity-race.js        # Tech Diversity: Race visualisation
├── tech-diversity-gender.js      # Tech Diversity: Gender visualisation
├── pay-gap-by-job-2017.js        # Pay Gap by Job visualisation
├── pay-gap-1997-2017.js          # Pay Gap Time Series visualisation
├── climate-change.js             # Climate Change visualisation
├── uk-food-survey.js             # UK Food Survey visualisation
├── nutrientIntake-74-16.js       # UK Nutrient Intake visualisation
├── household-purchases.js        # UK Household Purchases visualisation
├── sg-rain-frequency.js          # SG Rainfall visualisation
├── lib/                          # p5.js and p5.dom.js libraries
└── data/                         # CSV datasets used by each visualisation
```

## Notes

This project was built as a case study in data visualisation, focused on translating raw datasets into clear, interactive charts using p5.js.

## License

This project is licensed under the MIT License.
