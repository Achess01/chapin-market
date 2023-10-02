import { useState, useEffect } from 'react';
import { Form, Field } from 'react-final-form';
import { useParams, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { Button } from 'reactstrap';
import { validate, validators, combine } from 'validate-redux-form';
import { InputField, InputNumberField } from 'src/components/AppInput';
import { SmallContainer } from 'src/components/Container';
import { useUser } from 'src/utils/useUser';
import { getProduct, updateProduct, createProduct } from 'src/config/api';


const validateForm = (values) => validate(values, {
  name: validators.exists()("Ingrese el nombre"),
  barcode: combine(validators.exists()("Ingrese el código"), validators.length({ min: 12, max: 12 })("El nit es un numero de 12 dígitos")),
  price: validators.exists()("Ingrese el precio"),
});

export const CreateEdit = () => {
  const navigate = useNavigate();
  const user = useUser();
  const { id } = useParams(); // Get the ID parameter from the URL
  const [initialValues, setInitialValues] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      if (id) {
        try {
          const data = await getProduct({ id, token: user.token })
          setInitialValues(data);
        } catch (error) {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: error,
          });
          setInitialValues({});
        }
      }
    };

    fetchData();
  }, [id, user]);

  const onSubmit = async (data) => {
    if (id) {
      try {
        await updateProduct({ id, token: user.token, data })
        Swal.fire({
          icon: 'success',
          title: 'Guardado con éxito',
          showConfirmButton: false,
          timer: 1500
        })
        navigate('/products')
      } catch (error) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: error,
        });
      }
    } else {
      try {
        await createProduct({ token: user.token, data });
        Swal.fire({
          icon: 'success',
          title: 'Guardado con éxito',
          showConfirmButton: false,
          timer: 1500
        })
        navigate('/products')
      } catch (error) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: error,
        });
      }
    }
  };

  return (
    <SmallContainer className="mt-5 d-flex flex-column align-items-center justify-content-center">
      <h3 className="mokoto-font">{`${id ? "Editar" : "Crear"} producto`} </h3>
      <Form
        initialValues={initialValues}
        validate={validateForm}
        onSubmit={onSubmit}
        render={({ handleSubmit, form, submitting }) => (
          <div className="d-flex flex-column justify-content-center align-items-center pb-4 col-12 col-md-10 col-lg-8 mx-auto mt-2">
            <form onSubmit={handleSubmit} className="w-50">
              <div className="row mb-3">
                <div className="col-12">
                  <Field
                    name="name"
                    render={InputField}
                    type="text"
                    placeholder="Pasta de dientes "
                    label="Nombre"
                  />
                </div>
              </div>
              <div className="row mb-3">
                <div className="col-12">
                  <Field
                    name="barcode"
                    render={InputNumberField}
                    placeholder="000000000000"
                    label="Código de barras"
                    allowNegative={false}
                    allowLeadingZeros={true}
                  />
                </div>
              </div>
              <div className="row mb-3">
                <div className="col-12">
                  <Field
                    name="price"
                    render={InputNumberField}
                    decimalScale={2}
                    placeholder="Q10.00"
                    label="Precio"
                    prefix="Q"
                    allowNegative={false}
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
                  {id ? "Editar" : "Agregar"}
                </Button>
              </div>
            </form>
          </div>

        )}
      />
    </SmallContainer>
  );
};
