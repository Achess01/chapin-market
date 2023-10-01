import { SmallContainer } from "src/components/Container";
import logo from "src/assets/logo.png";

export const Home = () => {
  return (
    <div
      style={{
        minHeight: "70vh",
      }}
      className="d-flex flex-column justify-content-center align-items-center"
    >
      <SmallContainer>
        <div className="d-flex flex-column justify-content-center align-items-center">
          <h1 className="mokoto-font">
            Bienvenido a
          </h1>
          <img src={logo} alt="logo" width="300px" />
        </div>
      </SmallContainer>
    </div>
  );
};
