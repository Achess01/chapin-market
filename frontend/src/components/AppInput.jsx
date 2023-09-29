/* eslint-disable react/prop-types */
import classNames from "classnames";
import { NumericFormat } from "react-number-format";

export const InputField = ({
  input,
  meta: { touched, error },
  type = "text",
  placeholder = "...",
  label = "",
  labelClassNames = "",
}) => (
  <div className="form-group">
    <label
      className={classNames("form-label", {
        [labelClassNames]: labelClassNames,
      })}
    >
      {label}
    </label>
    <input
      type={type}
      placeholder={placeholder}
      className={classNames("form-control", { "is-invalid": touched && error })}
      {...input}
    />
    {error && touched && <span className="invalid-feedback">{error}</span>}
  </div>
);

export const InputNumberField = ({
  input,
  decimalScale,
  placeholder,
  meta: { touched, error },
  prefix = "",
  suffix = "",
  numberFormat,
  readOnly = false,
  labelClassNames = "",
  label,
  thousandSeparator = "",
  allowNegative = true,
}) => {
  const invalid = touched && error;

  return (
    <div className="form-group">
      <label
        className={classNames("form-label", {
          [labelClassNames]: labelClassNames,
        })}
      >
        {label}
      </label>
      <NumericFormat
        value={input.value}
        placeholder={placeholder}
        className={classNames("form-control", { "is-invalid": invalid })}
        decimalScale={decimalScale || 0}
        format={numberFormat}
        fixedDecimalScale
        thousandSeparator={thousandSeparator}
        prefix={prefix}
        suffix={suffix}
        onValueChange={(values) => {
          input.onChange(values.value);
        }}
        readOnly={readOnly}
        allowNegative={allowNegative}
      />
      {invalid && <div className="invalid-feedback">{error}</div>}
    </div>
  );
};
