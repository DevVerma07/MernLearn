import React, { useState } from "react";
import "./App.css";

const Calculator = () => {
  const [display, setDisplay] = useState("");
  const [expression, setExpression] = useState("");

  const handleButtonClick = (value) => {
    if (value === "=") {
      try {
        const result = evaluateExpression(expression);
        setDisplay(result);
        setExpression(result);
      } catch (error) {
        setDisplay("Error");
        setExpression("");
      }
    } else if (value === "C") {
      setExpression("");
      setDisplay("");
    } else {
      if (expression === "Error") {
        // Reset if there was an error
        setExpression(value);
        setDisplay(value);
      } else {
        // Append the value to the expression
        setExpression(expression + value);
        setDisplay(expression + value);
      }
    }
  };

  const evaluateExpression = (exp) => {
    try {
      // You can use a custom expression evaluation function here
      return customEvaluate(exp);
    } catch (error) {
      throw error;
    }
  };

  const customEvaluate = (exp) => {
    // Implement your own expression evaluation logic here
    // This example uses the Function constructor
    const safeExpression = exp.replace(/[^-()\d/*+.]/g, "");
    return new Function("return " + safeExpression)();
  };

  return (
    <div>
      <div className="calculator">
        <div className="display">{display}</div>
        <div className="buttons">
          {[1, 2, 3, "*", 4, 5, 6, "-", 7, 8, 9, "+", 0, "/", "C", "="].map(
            (buttonValue) => (
              <button
                key={buttonValue}
                onClick={() => handleButtonClick(buttonValue)}
              >
                {buttonValue}
              </button>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default Calculator;