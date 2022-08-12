import './form-input.styles.scss'

const FormInput = ({ label, onChangeHandler, ...otherProps}) => {
  return (
    <div className="group">
        <input className='form-input' onChange={onChangeHandler} {...otherProps} />
        {
          label && (
            <label        //assign classes 'shrink' and/or 'form-input-label
              className={`${otherProps.value.length ? 'shrink' : ''} form-input-label`}>
              {label}
            </label>
        )
        }        
    </div>

  
);

};

export default FormInput