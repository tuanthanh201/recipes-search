import { useEffect, useState } from "react";
import { useParams } from "react-router";

import Card from "../UI/Card";
import classes from "./Instructions.module.css";
import apiKey from "../../apiKey";
import TasteChart from "./TasteChart";

const Instructions = () => {
  const [instructionsLoading, setInstructionsLoading] = useState(false);
  const [instructions, setInstructions] = useState(null);
  const [tastesLoading, setTastesLoading] = useState(false);
  const [tastes, setTastes] = useState(null);
  const params = useParams();
  const recipeId = params.recipe_id;
  console.log(instructions);
  console.log(tastes);

  // instructions
  useEffect(() => {
    const url = `https://api.spoonacular.com/recipes/${recipeId}/analyzedInstructions?apiKey=${apiKey}`;
    setInstructionsLoading(true);
    fetch(url)
      .then((response) => {
        setInstructionsLoading(false);
        if (response.ok) {
          return response.json();
        } else {
          return response.json().then((data) => {
            let errorMessage = "Couldn't get instructions";
            if (data && data.error && data.error.message) {
              errorMessage = data.error.message;
            }
            throw new Error(errorMessage);
          });
        }
      })
      .then((data) => {
        const receivedInstructions = data[0].steps;
        setInstructions(receivedInstructions);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [recipeId]);

  // tastes
  useEffect(() => {
    const url = `https://api.spoonacular.com/recipes/${recipeId}/tasteWidget.json?apiKey=${apiKey}`;
    setTastesLoading(true);
    fetch(url)
      .then((response) => {
        setTastesLoading(false);
        if (response.ok) {
          return response.json();
        } else {
          return response.json().then((data) => {
            let errorMessage = "Couldn't get instructions";
            if (data && data.error && data.error.message) {
              errorMessage = data.error.message;
            }
            throw new Error(errorMessage);
          });
        }
      })
      .then((data) => {
        setTastes(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [recipeId]);

  const convertTaste = (value) => {
    while (value > 100) {
      value /= 10;
    }
    return value;
  };

  let pageContent;
  if (instructionsLoading || tastesLoading) {
    return <p style={{ textAlign: "center" }}>Loading...</p>;
  } else if (!instructions || !tastes) {
    pageContent = <p>Couldn't find recipe. Maximum quota reached, sorry :(</p>;
  } else {
    //#region instructions and tastes
    const instructionsList = instructions.map((step) => (
      <li id={step.number} key={step.number} className={classes["text-left"]}>
        <h3>Step {step.number}:</h3>
        <p>{step.step}</p>
      </li>
    ));

    const chartData = {
      labels: [
        "Sweetness",
        "Saltiness",
        "Sourness",
        "Bitterness",
        "Savoriness",
        "Fattiness",
        "Spiciness",
      ],
      datasets: [
        {
          label: "",
          backgroundColor: "rgb(75, 192, 192, 0.2)",
          borderColor: "rgb(75, 192, 192)",
          pointBackgroundColor: "rgb(75, 192, 192)",
          data: [
            convertTaste(tastes.sweetness),
            convertTaste(tastes.saltiness),
            convertTaste(tastes.sourness),
            convertTaste(tastes.bitterness),
            convertTaste(tastes.savoriness),
            convertTaste(tastes.fattiness),
            convertTaste(tastes.spiciness),
          ],
        },
      ],
    };
    chartData.datasets[0].label = "Taste";

    const chartOptions = {
      legend: {
        display: false,
      },
      title: {
        display: false,
      },
      scale: {
        pointLabels: {
          fontSize: 25,
        },
        angleLines: {
          display: true,
        },
        ticks: {
          display: false,
          min: 0,
          max: 100,
          stepSize: 10,
        },
      },
    };
    //#endregion

    console.log(tastes);

    pageContent = (
      <>
        <ul>{instructionsList}</ul>
        <h3>Taste:</h3>
        <div style={{ width: "600px", height: "600px", margin: "auto" }}>
          <TasteChart data={chartData} options={chartOptions} />
        </div>
      </>
    );
  }

  return (
    <section className={classes.meals}>
      <Card>{pageContent}</Card>
    </section>
  );
};

export default Instructions;
