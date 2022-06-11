const spreadsheetsID = "spreadsheetsID";
const listName = "listName";
const googleAPIsheetKEY = "googleAPIsheetKEY";

class Team {
  constructor(name, data) {
    this.name = name;
    this.score = 0;

    data.forEach((value) => {
      this.score += value[0];
    });

    this.data = data;
  }
}

async function render() {
  /* Fetch data */
  const data = await fetch(
    `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetsID}/values/${listName}?key=${googleAPIsheetKEY}`
  )
    .then((response) => response.json())
    .then((data) => {
      return data;
    })
    .catch((err) => console.warn("Fetch warning", err));

  console.log(data);

  let outHtml = ""; // output html string

  for (let col = 0; col < data.values[0].length; col += 2) {
    let log = new Array();
    for (let row = 1; row < data.values.length; ++row) {
      if (data.values[row][col] === undefined) break;
      log.push([parseInt(data.values[row][col]), data.values[row][col + 1]]);
    }

    const team = new Team(data.values[0][col], log);
    console.log(team);
  }

  /* Redner data */
  const app = document.getElementById("app");
  app.innerHTML = outHtml;
}

render();
