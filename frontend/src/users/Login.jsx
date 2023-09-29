import { Form, Field } from "react-final-form";
import { Button } from "reactstrap";

import { SmallContainer } from "src/components/Container";
import { InputField, InputNumberField } from "src/components/AppInput";
import logo from "src/assets/logo.png";

export const Login = () => {
  const onSubmit = (data) => console.log(data);
  return (
    <div
      style={{
        minHeight: "100vh",
      }}
      className="d-flex flex-column justify-content-center align-items-center"
    >
      <SmallContainer>
        <div className="d-flex flex-column justify-content-center align-items-center pb-4 col-5 mx-auto rounded bg-light">
          <img src={logo} alt="logo" width="300px" />
          <Form
            onSubmit={onSubmit}
            validate={(values) => {
              const errors = {};
              if (!values.username) {
                errors.username = "Required";
              }
              if (!values.password) {
                errors.password = "Required";
              }
              return errors;
            }}
            render={({ handleSubmit, form, submitting, values }) => (
              <form onSubmit={handleSubmit}>
                <div className="row mb-3">
                  <div className="col-12">
                    <Field
                      name="username"
                      render={InputNumberField}
                      type="text"
                      placeholder="123456789"
                      label="Nit"
                      labelClassNames="mokoto-font"
                      allowNegative={false}
                    />
                  </div>
                </div>
                <div className="row mb-4">
                  <div className="col-12">
                    <Field
                      name="password"
                      render={InputField}
                      type="password"
                      placeholder="Contraseña"
                      label="Contraseña"
                      labelClassNames="mokoto-font"
                    />
                  </div>
                </div>
                <div className="d-flex align-items-center justify-content-center mokoto-font">
                  <Button
                    color="dark"
                    type="submit"
                    disabled={submitting}
                    block
                  >
                    Ingresar
                  </Button>
                </div>
              </form>
            )}
          />
        </div>
      </SmallContainer>
    </div>
  );
};
