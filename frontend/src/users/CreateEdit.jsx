import { useState, useEffect } from 'react';
import { Form, Field } from 'react-final-form';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from 'reactstrap';
import { validate, validators, combine } from 'validate-redux-form';
import Swal from 'sweetalert2';
import { InputField, InputNumberField, InputSelect } from 'src/components/AppInput';
import { SmallContainer } from 'src/components/Container';
import { ADMIN, STAFF, STORE, INVENTORY, CASHIER } from 'src/utils/constants';
import { useUser } from 'src/utils/useUser';
import { getUser, updateUser, signUpUser, getBranches, getCashiers } from 'src/config/api';


const validateForm = (values) => validate(values, {
  first_name: validators.exists()("Ingrese el nombre"),
  last_name: validators.exists()("Ingrese el nombre"),
  username: combine(validators.exists()("Ingrese el nit"), validators.length({ min: 9, max: 9 })("El nit es un numero de 9 dígitos")),
  dpi: combine(validators.exists()("Ingrese el dpi"), validators.length({ min: 13, max: 13 })("El nit es un numero de 13 dígitos")),
  date_of_birth: validators.exists()("Ingrese la fecha de nacimiento"),
  role: validators.exists()("Ingrese el nombre"),
  cashier: values && (values.role === CASHIER) ? validators.exists()("Campo requerido") : null,
  branch: values && values.role !== CASHIER && values.role !== ADMIN ? validators.exists()("Campo requerido") : null,
});

export const CreateEdit = () => {
  const navigate = useNavigate();
  const user = useUser();
  const { id } = useParams(); // Get the ID parameter from the URL
  const [initialValues, setInitialValues] = useState({});

  const [branches, setBranches] = useState([]);
  const [cashiers, setCashiers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseBranches = await getBranches(user.token);
        const responseCashiers = await getCashiers(user.token);
        setBranches(responseBranches);
        setCashiers(responseCashiers);
      } catch (error) {
        setBranches([]);
        setCashiers([]);
      }
    }

    fetchData();
  }, [user]);

  useEffect(() => {
    const fetchData = async () => {
      if (id) {
        try {
          const data = await getUser({ id, token: user.token })
          if (data.is_admin) data.role = ADMIN;
          else if (data.is_cashierman) data.role = CASHIER;
          else if (data.is_inventory) data.role = INVENTORY;
          else if (data.is_storeman) data.role = STORE;

          if (data.profile && data.profile.cashier) data.cashier = data.profile.cashier;
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
        await updateUser({ id, token: user.token, data })
        Swal.fire({
          icon: 'success',
          title: 'Guardado con éxito',
          timer: 1500
        })
        navigate('/users')
      } catch (error) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: error,
        });
      }
    } else {
      try {
        switch (data.role) {
          case ADMIN: data.is_admin = true; break;
          case CASHIER: data.is_cashierman = true; break;
          case INVENTORY: data.is_inventory = true; break;
          case STORE: data.is_storeman = true; break;
        }
        const response = await signUpUser({ token: user.token, data });
        Swal.fire({
          icon: 'success',
          title: 'Creado con éxito',
          text: `${response.username} - ${response.password}`,
          showConfirmButton: true,
        })
        navigate('/users')
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
      <h3 className="mokoto-font">{`${id ? "Editar" : "Crear"} usuario`} </h3>
      <Form
        initialValues={initialValues}
        validate={validateForm}
        onSubmit={onSubmit}
        render={({ handleSubmit, form, submitting, values }) => (
          <div className="d-flex flex-column justify-content-center align-items-center pb-4 col-12 col-md-10 col-lg-8 mx-auto mt-2">
            <form onSubmit={handleSubmit} className="w-50">
              <div className="row mb-3">
                <div className="col-12">
                  <Field
                    name="username"
                    render={InputNumberField}
                    type="text"
                    placeholder="123456789"
                    label="Usuario (nit)"
                    allowNegative={false}
                  />
                </div>
              </div>
              <div className="row mb-3">
                <div className="col-12">
                  <Field
                    name="first_name"
                    render={InputField}
                    type="text"
                    placeholder="Alexander"
                    label="Nombre"
                  />
                </div>
              </div>
              <div className="row mb-3">
                <div className="col-12">
                  <Field
                    name="last_name"
                    render={InputField}
                    type="text"
                    placeholder="Tzoc"
                    label="Apellido"
                  />
                </div>
              </div>
              <div className="row mb-3">
                <div className="col-12">
                  <Field
                    name="date_of_birth"
                    render={InputField}
                    type="date"
                    label="Fecha de nacimiento"
                  />
                </div>
              </div>
              <div className="row mb-3">
                <div className="col-12">
                  <Field
                    name="dpi"
                    render={InputNumberField}
                    type="text"
                    placeholder="3233723900801"
                    label="DPI"
                    allowNegative={false}
                  />
                </div>
              </div>
              <div className="row mb-3">
                <div className="col-12">
                  <Field
                    name="role"
                    render={InputSelect}
                    disabled={!!id}
                    placeholder="Tipo"
                    label="Tipo de usuario"
                    options={[{ value: ADMIN, label: 'Admin' }, { value: CASHIER, label: 'Cajero' }, { value: STORE, label: 'Bodega' }, { value: INVENTORY, label: 'Inventario' }]}
                  />
                </div>
              </div>
              {values.role === CASHIER ? (
                <div className="row mb-3">
                  <div className="col-12">
                    <Field
                      name="cashier"
                      render={InputSelect}
                      placeholder="Caja"
                      label="Caja"
                      options={cashiers}
                      disabled={!!id}
                      labelKey="label"
                      valueKey="id"
                    />
                  </div>
                </div>
              ) : null}
              {values.role !== ADMIN && values.role !== CASHIER ? (
                <div className="row mb-3">
                  <div className="col-12">
                    <Field
                      name="branch"
                      render={InputSelect}
                      placeholder="Sucursal"
                      label="Sucursal"
                      options={branches}
                      labelKey="name"
                      disabled={!!id}
                      valueKey="id"
                    />
                  </div>
                </div>
              ) : null}


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
