import {useFormik, yupToFormErrors} from 'formik';
import * as Yup from 'yup';

const validate = values => {
    const errors = {};

    if(!values.name) {
        errors.name = 'не может быть пустым'
    } else if (values.name.length < 3) {
        errors.name = 'минимум 3 simbols'
    }

    if (!values.email) {
        errors.email = 'не может быть пустым';
      } else if (
        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email))
        {
        errors.email = 'не правильный емеил адресс';
        }

    return errors;
}

const Form = () => {

    const formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            amount: 0,
            currency: '',
            text: '',
            terns: false
        },
        validationSchema: Yup.object({
            name: Yup.string()
                    .min(3, ' min 3 simols')
                    .required('objazatelnoe pole'),
            email: Yup.string()     
                    .email('neprawilny email addres')   
                    .required('objazatelnoe pole'),
            amount: Yup.number()
                    .min(5,'nie menie 5')
                    .required('objazatelnoe pole'),
            currency: Yup.string().required('wyberite Walutu'),
            text: Yup.string().min(10, 'nie menie 10 simbols'),
            terms: Yup.boolean().required('nugno soglasitsa, ili nikak')
                    .oneOf([true], 'neobhodimo soglasie')
        }),
        onSubmit: values => console.log(JSON.stringify(values, null, 2))
    })
    return (
        <form className="form" onSubmit={formik.handleSubmit}>
            <h2>Отправить пожертвование</h2>
            <label htmlFor="name">Ваше имя</label>
            <input
                id="name"
                name="name"
                type="text"
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
            />
            {formik.errors.name && formik.touched.name ? <div className="errors">{formik.errors.name}</div> : null}
            <label htmlFor="email">Ваша почта</label>
            <input
                id="email"
                name="email"
                type="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
            />
            {formik.errors.email && formik.touched.email ? <div className="errors">{formik.errors.email}</div> : null}
            <label htmlFor="amount">Количество</label>
            <input
                id="amount"
                name="amount"
                type="number"
                value={formik.values.amount}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
            />
            {formik.errors.amount && formik.touched.amount ? <div className="errors">{formik.errors.amount}</div> : null}
            <label htmlFor="currency">Валюта</label>
            <select
                id="currency"
                name="currency"
                value={formik.values.currency}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}>
                    
                    <option value="">Выберите валюту</option>
                    <option value="USD">USD</option>
                    <option value="UAH">UAH</option>
                    <option value="RUB">RUB</option>
            </select>
            {formik.errors.currency && formik.touched.currency ? <div className="errors">{formik.errors.currency}</div> : null}
            <label htmlFor="text">Ваше сообщение</label>
            <textarea 
                id="text"
                name="text"
                value={formik.values.text}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
            />
            {formik.errors.text && formik.touched.text ? <div className="errors">{formik.errors.text}</div> : null}
            <label className="checkbox">
                <input 
                name="terms" 
                type="checkbox"
                value={formik.values.terns}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                 />
                Соглашаетесь с политикой конфиденциальности?
            </label>
            {formik.errors.terms && formik.touched.terms ? <div className="errors">{formik.errors.terms}</div> : null}
            <button type="submit">Отправить</button>
        </form>
    )
}

export default Form;