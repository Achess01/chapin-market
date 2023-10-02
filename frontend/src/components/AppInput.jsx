/* eslint-disable react/prop-types */
import classNames from "classnames";
import { NumericFormat } from "react-number-format";
import Select from "react-select";

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
  allowLeadingZeros = false
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
        allowLeadingZeros={allowLeadingZeros}
      />
      {invalid && <div className="invalid-feedback">{error}</div>}
    </div>
  );
};


export const InputSelect = (
  {
    input,
    disabled,
    isClearable,
    isMulti,
    isSearchable,
    options = [],
    extra_change,
    extraChange,
    select_style = {},
    placeholder,
    labelKey = "label",
    valueKey = "value",
    meta: { touched, error },
    label = "",
    labelClassNames = "",
  }) => {

  const invalid = touched && error;

  const _options = options.map(option =>
    ({ ...option, label: option[labelKey], value: option[valueKey] })
  );

  let value = input.value;
  if (value !== null && value !== undefined) {
    value = _options.find(opt => opt.value === value);
  }

  return (
    <div className="form-group">
      <label
        className={classNames("form-label", {
          [labelClassNames]: labelClassNames,
        })}
      >
        {label}
      </label>
      <Select
        styles={select_style}
        isClearable={isClearable}
        className={classNames({ 'is-invalid': invalid })}
        backspaceRemovesValue={false}
        isMulti={isMulti}
        isSearchable={isSearchable}
        options={_options}
        placeholder={placeholder}
        onChange={(e) => {
          if (extra_change) {
            extraChange(e[valueKey])
          }
          input.onChange(e ? e[valueKey] : null);
        }}
        value={value || ''}
        isDisabled={disabled}
        menuPlacement="auto"
      />
      {invalid && (
        <div className="invalid-feedback">
          {error}
        </div>
      )}
    </div>
  )
};