import React, { useRef, useEffect } from "react";
import chalecoImage from './assets/chaleco-01.png'; // Importa la imagen

interface CanvasComponentProps {
  joystickX: number;
  joystickY: number;
  slider: number;
  light: number;
}

const CanvasComponent: React.FC<CanvasComponentProps> = ({
  joystickX,
  joystickY,
  slider,
  light,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const imageRef = useRef<HTMLImageElement | null>(null);

  useEffect(() => {
    const img = new Image();
    img.src = chalecoImage; // Usa la imagen importada
    img.onload = () => {
      imageRef.current = img;
      draw();
    };
  }, []);

  const draw = () => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext("2d");
      if (ctx) {
        const canvasWidth = canvas.width;
        const canvasHeight = canvas.height;

        // Limpiar el canvas
        ctx.clearRect(0, 0, canvasWidth, canvasHeight);

        // Dibujar la imagen si está cargada
        if (imageRef.current) {
          const img = imageRef.current;
          const imgWidth = 400; // Establece el ancho deseado
          const imgHeight = 300; // Establece la altura deseada
          ctx.drawImage(
            img,
            (canvasWidth - imgWidth) / 2, // Centrar horizontalmente
            (canvasHeight - imgHeight) / 2, // Centrar verticalmente
            imgWidth, // Ancho de la imagen
            imgHeight // Altura de la imagen
          );
        }

        // Mapear valores del joystick a coordenadas del canvas
        const x = ((512 - joystickX) / 1024) * canvasWidth;
        const y = ((512 + joystickY) / 1024) * canvasHeight;

        // Mapear valor de luz a opacidad (0 a 1)
        const opacity = Math.min(Math.max(light / 1023, 0), 1);

        // Dibujar el punto
        ctx.beginPath();
        ctx.arc(x, y, slider / 20, 0, 2 * Math.PI);
        ctx.fillStyle = `rgba(235, 0, 167, ${opacity})`;
        ctx.fill();
      }
    }
  };

  useEffect(() => {
    draw(); // Vuelve a dibujar cuando cambian los props
  }, [joystickX, joystickY, slider, light]);

  return (
    <canvas
      ref={canvasRef}
      width={800} // Ajusta el tamaño del canvas
      height={600} // Ajusta el tamaño del canvas
      className=""
    ></canvas>
  );
};

export default CanvasComponent;
