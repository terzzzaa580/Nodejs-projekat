const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const port = 3000;

app.use(bodyParser.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.post("/check-answers", (req, res) => {
  const correctAnswers = ["pariz", "plavi-kit", "1930", "lav-nikolajevic-tolstoj", "1997"];
  const userAnswers = [];

  for (let i = 1; i <= 5; i++) {
    const answer = req.body[`q${i}`];
    if (answer) {
      userAnswers.push(answer);
    }
  }

  const correct = userAnswers.filter((answer) => correctAnswers.includes(answer));
  const incorrect = userAnswers.filter((answer) => !correctAnswers.includes(answer));

  res.send(`Tačno si odgovorio/la na ${correct.length} od 5 pitanja.   Tacni odgovori su:   ${correct}.   Netacni odgovori su:   ${incorrect}.`);
});

app.listen(port, () => {
  console.log(`Server je pokrenut na http://localhost:${port}`);
});
