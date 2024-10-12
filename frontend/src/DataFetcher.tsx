import React, { useEffect, useState } from "react";
import axios from "axios";

interface DataFetcherProps {
  onDataFetched: (
    joystickX: number,
    joystickY: number,
    light: number,
    slider: number
  ) => void;
}

const DataFetcher: React.FC<DataFetcherProps> = ({ onDataFetched }) => {
  const [leftPressed, setLeftPressed] = useState(0);
  const [rightPressed, setRightPressed] = useState(0);

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:4000/api/serial-data");
      const data = response.data.data.split(",");
      const joystickX = parseInt(data[0], 10);
      const joystickY = parseInt(data[1], 10);
      const light = Math.min(Math.max(parseInt(data[2], 10), 0), 1024);
      const slider = parseInt(data[4], 10);
      onDataFetched(joystickX, joystickY, light, slider);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleLeftMouseDown = () => {
    setLeftPressed(1);
    // Aquí puedes agregar la lógica para el sensor data (10)
  };

  const handleLeftMouseUp = () => {
    setLeftPressed(0);
  };

  const handleRightMouseDown = () => {
    setRightPressed(1);
    // Aquí puedes agregar la lógica para el sensor data (12)
  };

  const handleRightMouseUp = () => {
    setRightPressed(0);
  };

  return (
    <div className="flechitas">
      <button
        onMouseDown={handleLeftMouseDown}
        onMouseUp={handleLeftMouseUp}
      >
        Izquierda: {leftPressed}
      </button>
      <button
        onMouseDown={handleRightMouseDown}
        onMouseUp={handleRightMouseUp}
      >
        Derecha: {rightPressed}
      </button>
    </div>
  );
};

export default DataFetcher;
