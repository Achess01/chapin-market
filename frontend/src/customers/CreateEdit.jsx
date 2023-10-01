import { useState, useEffect } from 'react';
import { Form, Field } from 'react-final-form';
import { useParams } from 'react-router-dom';
import { Button } from 'reactstrap';
import { InputField } from 'src/components/AppInput';
import { SmallContainer } from 'src/components/Container';

export const CreateEdit = () => {
  const { id } = useParams(); // Get the ID parameter from the URL
  const [initialValues, setInitialValues] = useState({});

  // Fetch data based on ID when in edit mode
  useEffect(() => {
    const fetchData = async () => {
      if (id) {
        // Fetch your data based on the ID (assuming you have an API)
        const data = { title: "esto es un titulo", description: "Esta es una descripcion" }
        setInitialValues(data);
      }
    };

    fetchData();
  }, [id]);

  const onSubmit = async (values) => {
    // Handle form submission (create or update) based on whether there is an ID
    if (id) {
      // Update data using the ID
      console.log('edit', values);
    } else {
      // Create new data
      console.log('create', values);
    }

    // Handle success or redirection after form submission
  };

  return (
    <SmallContainer className="mt-5 d-flex flex-column align-items-center justify-content-center">
      <h3 className="mokoto-font">Customers</h3>
      <Form
        initialValues={initialValues}
        onSubmit={onSubmit}
        render={({ handleSubmit, form, submitting }) => (
          <div className="d-flex flex-column justify-content-center align-items-center pb-4 col-12 col-md-10 col-lg-8 mx-auto mt-2">
            <form onSubmit={handleSubmit}>
              <div className="row mb-3">
                <div className="col-12">
                  <Field
                    name="title"
                    render={InputField}
                    type="text"
                    placeholder="Title"
                    label="Title"
                  />
                </div>
              </div>
              <div className="row mb-3">
                <div className="col-12">
                  <Field
                    name="description"
                    render={InputField}
                    placeholder="Description"
                    label="Description"
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
          </div>

        )}
      />
    </SmallContainer>
  );
};
