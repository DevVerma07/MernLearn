import React, { useState } from "react";

function BMICalculator() {
  const [weight, setWeight] = useState(0);
  const [height, setHeight] = useState(0);
  const [bmi, setBMI] = useState(null);

  const calculateBMI = () => {
    const heightInMeters = height / 100;
    const bmiValue = weight / (heightInMeters * heightInMeters);
    setBMI(bmiValue.toFixed(2));
  };

  return (
    <div>
      <h1>BMI Calculator</h1>

      <div>
        <span>Weight (kg):</span>
        <input
          type="number"
          value={weight}
          onChange={(e) => {
            setWeight(e.target.value);
          }}
        />
      </div>
      <div>
        <p>Height (cm):</p>
        <input
          type="number"
          value={height}
          onChange={(e) => {
            setHeight(e.target.value);
          }}
        />
      </div>
      <div>
        <button onClick={calculateBMI}>Calculate BMI</button>
      </div>
      <p>Your BMI is: {bmi}</p>
    </div>
  );
}

export default BMICalculator;
