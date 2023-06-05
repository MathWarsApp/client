

import './formInput.scss'

const FormInput = ({htmlFor, label, name, value, onChange, type}) => {
    return(
        <>
            <label htmlFor={htmlFor} className='auth-form__label'>{label}</label>
            <input type={type} name={name} className='auth-form__input' value={value} onChange={e => onChange(e)} required />
        </>
    )
}

export default FormInput