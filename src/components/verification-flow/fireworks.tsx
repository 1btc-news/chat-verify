/** @jsxImportSource @emotion/react */
import { css, keyframes } from "@emotion/react";
import { useEffect, useState } from "react";

const particles = 50;
const width = 500;
const height = 500;

const generateBoxShadow = () => {
  let boxShadow = "";
  for (let i = 0; i < particles; i++) {
    boxShadow += `${Math.random() * width - width / 2}px ${
      Math.random() * height - height / 1.2
    }px rgba(242, 116, 0, 1), `;
  }
  return boxShadow.slice(0, -2);
};

const boxShadow2 = "0 0 #fff";

const bang = keyframes`
  0% {
    box-shadow: 0 0 rgba(242, 116, 0, 1);
  }
  50%, 100% {
    box-shadow: ${generateBoxShadow()};
  }
`;

const gravity = keyframes`
  0% {
    transform: translateY(0);
    opacity: 1;
  }
  100% {
    transform: translateY(200px);
    opacity: 0;
  }
`;

const position = keyframes`
  0%, 19.9% {
    margin-top: 10%;
    margin-left: 40%;
  }
  20%, 39.9% {
    margin-top: 40%;
    margin-left: 30%;
  }
  40%, 59.9% {  
    margin-top: 20%;
    margin-left: 70%
  }
  60%, 79.9% {  
    margin-top: 30%;
    margin-left: 20%;
  }
  80%, 99.9% {  
    margin-top: 30%;
    margin-left: 80%;
  }
`;

const pyroStyles = css`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 9999;
`;

const fireworkStyles = (delay: number) => css`
  position: absolute;
  width: 5px;
  height: 5px;
  border-radius: 50%;
  box-shadow: ${boxShadow2};
  animation: 2s ${bang} ease-out ${delay}s infinite backwards,
    2s ${gravity} ease-in ${delay}s infinite backwards,
    10s ${position} linear ${delay}s infinite backwards;
`;

type FireworkProps = {
  delay: number;
};

const Firework: React.FC<FireworkProps> = ({ delay }) => (
  <div css={fireworkStyles(delay)}></div>
);

const maxFireworks = 1; // Set maximum number of fireworks

const Fireworks: React.FC = () => {
  const [fireworks, setFireworks] = useState<number[]>([0]); // Initialize with one firework

  useEffect(() => {
    const intervalId = setInterval(() => {
      setFireworks((prevFireworks: number[]) => {
        let newFireworks = [...prevFireworks, Math.max(...prevFireworks) + 1];
        if (newFireworks.length > maxFireworks) {
          newFireworks = newFireworks.slice(-maxFireworks); // Keep the last 'maxFireworks' elements
        }
        return newFireworks;
      });
    }, 5000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div css={pyroStyles} className="pyro">
      {fireworks.map((id: number, index: number) => (
        <Firework key={id} delay={index * 2.5} />
      ))}
    </div>
  );
};

export default Fireworks;
