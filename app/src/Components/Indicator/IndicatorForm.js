import React from 'react';
import { withFormik, Formik } from 'formik';
import * as Yup from 'yup';
import TextInput from './../FormInput/TextInput';
import SelectInput from './../FormInput/SelectInput';
import SimpleButton from './../FormInput/SimpleButton';
import SwitchInput from './../FormInput/SwitchInput';

const IndicatorFormFields = props => {
  const {
    data,
    mutationCallback,
    values,
    touched,
    errors,
    dirty,
    handleChange,
    handleBlur,
    handleSubmit,
    handleReset,
    isSubmitting,
  } = props;
  return (
    <form onSubmit={handleSubmit} style={{marginLeft: '5%', marginRight: '5%', marginTop: '5%'}}>
      <div>
        <TextInput
          id="name"
          label="Indicator name"
          helperText=""
          placeholder="Enter indicator name"
          touched={touched.name}
          error={touched.name && errors.name}
          value={values.name}
          onChange={handleChange}
          onBlur={handleBlur}
          style={{float: 'left'}}
        />
        <TextInput
          id="description"
          label="Indicator Description"
          helperText=""
          placeholder="Enter decription name"
          touched={touched.description}
          error={touched.description && errors.description}
          value={values.description}
          onChange={handleChange}
          onBlur={handleBlur}
        />
      </div>
      <div>
        <SelectInput
          id="indicatorTypeId"
          label="Indicator Type"
          items={data.allIndicatorTypes.nodes}
          touched={touched.indicatorTypeId}
          error={touched.indicatorTypeId && errors.indicatorTypeId}
          value={values.indicatorTypeId}
          onChange={handleChange}
          onBlur={handleBlur}
          style={{float: 'left'}}
        />
        <SelectInput
          id="indicatorGroupId"
          label="Indicator Group"
          items={data.allIndicatorGroups.nodes}
          touched={touched.indicatorGroupId}
          error={touched.indicatorGroupId && errors.indicatorGroupId}
          value={values.indicatorGroupId}
          onChange={handleChange}
          onBlur={handleBlur}
        />
      </div>
      <div>
        <TextInput
          id="executionOrder"
          label="Execution Order"
          helperText=""
          numeric={true}
          touched={touched.executionOrder}
          error={touched.executionOrder && errors.executionOrder}
          value={values.executionOrder}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        <SwitchInput
          id="flagActive"
          label="Active"
          helperText="Active"
          touched={touched.flagActive}
          error={touched.flagActive && errors.flagActive}
          value={values.flagActive}
          onChange={handleChange}
          onBlur={handleBlur}
        />
      </div>
      <div>
        <SimpleButton
          type="reset"
          label="Reset"
          onClick={handleReset}
          disabled={!dirty || isSubmitting}
        />
        <SimpleButton
          type="submit"
          disabled={isSubmitting}
          label="Submit"
        />
      </div>
    </form>
  );
};

const formikEnhancer = withFormik({
  validationSchema: Yup.object().shape({
    indicatorTypeId: Yup.number().integer()
      .min(1, "You need to select an indicator type")
      .required("You need to select an indicator type"),
    indicatorGroupId: Yup.number().integer()
      .min(1, "You need to select an indicator group")
      .required("You need to select an indicator group"),
    executionOrder: Yup.number().integer()
      .min(0, "Execution order has to be a non-negative integer")
      .required("You need to input execution order."),
    name: Yup.string()
      .required('Name cannot be blank'),
    description: Yup.string()
      .required('Description cannot be blank'),
  }),

  mapPropsToValues: ({ indicator }) => ({
      name: '', description: '', executionOrder: 0, indicatorTypeId: 0, indicatorGroupId: 0, flagActive: false
  }),
  handleSubmit: (payload, { props, setSubmitting, setErrors }) => {
    setSubmitting(false);
    props.mutate({
        variables: { indicator: payload } },
        );
  },
  displayName: 'IndicatorForm',
});


const EnhancedIndicatorForm = formikEnhancer(IndicatorFormFields);

export default EnhancedIndicatorForm;