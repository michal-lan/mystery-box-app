import { useSelector, useDispatch } from 'react-redux'
import { useEffect, useState } from 'react'
import { RootState } from '../redux/store';
import { useNavigate } from 'react-router-dom';
import getSelectedFigure from "../api/get-selected-figure"
import MinifigPartsList from '../components/MinifigPartsList';
import { Controller, useForm, SubmitHandler } from 'react-hook-form';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FormData } from '../types/components/Form/form.type';
import validator from 'validator'
import postSummaryForm from '../api/post-summary-form';
import { setResetAction } from '../redux/minifigs/minifigs.actions';

export default function SummaryPage() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {currentMinifigs, currentMSelectedMinifig} = useSelector((state : RootState) => state.minifigsReducer)
    const [ parts, setParts ] = useState<object[] | null>(null);

    const selectedFigureLoader = async () => {
        if ( currentMSelectedMinifig.hasOwnProperty('set_num') ) {
            const getParts = await getSelectedFigure(currentMSelectedMinifig.set_num);
            setParts(getParts);
        }
    }

    const {
        control,
        register,
        handleSubmit,
        formState: {errors, isSubmitting},
        reset
    } = useForm<FormData>();
    const [ formIsValid, setFormIsValid ] = useState(false);
    const [ msg, setMsg ] = useState("");

    const formSubmit: SubmitHandler<FormData> = async ( values ) => {
        const sendingStatus = await postSummaryForm(values);

        // if sent successfully - reset everything!
        if ( sendingStatus ) {
            dispatch(setResetAction());
            reset();
            setFormIsValid(true);
            navigate("/");
        } else {
            setMsg( 'Problem while sending...' );
            setFormIsValid(false);
        }
    }

    // prevent access to this page without redux state from step one
    useEffect(() => {
        if ( currentMinifigs === null ) {
            navigate("/");
        } else {
            selectedFigureLoader();
        }
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <form onSubmit={handleSubmit(formSubmit)} className="grid items-center justify-center grid-cols-12 gap-6">

            {/* Form controls */}
            <div className="col-span-12 xl:col-span-8">
                <h1 className="text-4xl font-extrabold uppercase font-open-sans">Shipping details</h1>
                
                <div className="py-12">
                        
                    <div className="grid grid-cols-12 gap-4 mt-3">
                        <div className="col-span-12 lg:col-span-6">
                            <label htmlFor="name" className="block text-sm font-medium text-white font-poppins">Name</label>
                            <div className="relative mt-1">
                                <input
                                    {...register("name", { required: { value: true, message: 'Name is required' } })}
                                    type="text"
                                    id="name"
                                    className={"block w-full rounded-lg border-2 text-base font-poppins py-3 px-4 " + ( errors.name ? 'text-red-500 border-red-500' : 'border-gray-400 text-black' )}
                                    placeholder="e.g. John"
                                />
                            </div>
                            {errors.name && <p className="mt-1 text-xs text-red-500 font-poppins" id="name-error">{errors.name?.message}</p>}
                        </div>

                        <div className="col-span-12 lg:col-span-6">
                            <label htmlFor="surname" className="block text-sm font-medium text-white font-poppins">Surname</label>
                            <div className="relative mt-1">
                                <input
                                    {...register("surname", { required: { value: true, message: 'Surname is required' } })}
                                    type="text"
                                    id="surname"
                                    className={"block w-full rounded-lg border-2 text-base font-poppins py-3 px-4 " + ( errors.surname ? 'text-red-500 border-red-500' : 'border-gray-400 text-black' )}
                                    placeholder="e.g. Smith"
                                />
                            </div>
                            {errors.surname && <p className="mt-1 text-xs text-red-500 font-poppins" id="surname-error">{errors.surname?.message}</p>}
                        </div>
                    </div>

                    <div className="mt-3">
                        <label htmlFor="phone" className="block text-sm font-medium text-white font-poppins">Phone number</label>
                        <div className="relative mt-1">
                            <input
                                {...register("phone", { 
                                    required: { value: true, message: 'Phone number is required' },
                                    validate: (value) => validator.isMobilePhone(value) || 'Please enter a valid phone number',
                                })}
                                type="tel"
                                id="phone"
                                className={"block w-full rounded-lg border text-base font-poppins py-3 px-4 " + ( errors.phone ? 'text-red-500 border-red-500' : 'border-gray-400 text-black' )}
                                placeholder="e.g. you@example.com"
                            />
                        </div>
                        {errors.phone && <p className="mt-1 text-xs text-red-500 font-poppins" id="phone-error">{errors.phone?.message}</p>}
                    </div>

                    <div className="mt-3">
                        <label htmlFor="email" className="block text-sm font-medium text-white font-poppins">Email Address</label>
                        <div className="relative mt-1">
                            <input
                                {...register("email", { 
                                    required: { value: true, message: 'Email is required' },
                                    validate: (value) => validator.isEmail(value) || 'Please enter a valid email',
                                })}
                                type="email"
                                id="email"
                                className={"block w-full rounded-lg border text-base font-poppins py-3 px-4 " + ( errors.email ? 'text-red-500 border-red-500' : 'border-gray-400 text-black' )}
                                placeholder="e.g. you@example.com"
                            />
                        </div>
                        {errors.email && <p className="mt-1 text-xs text-red-500 font-poppins" id="email-error">{errors.email?.message}</p>}
                    </div>

                    <div className="mt-3">
                        <label htmlFor="dateOfBirth" className="block text-sm font-medium text-white font-poppins">Date Of Birth</label>
                        <div className="relative mt-1">
                            <Controller
                                control={control}
                                name='dateOfBirth'
                                defaultValue={new Date()}
                                render={({ field: { onChange, value } }) => (
                                    <DatePicker
                                        wrapperClassName="w-full"
                                        dateFormat="dd/MM/yyyy"
                                        placeholderText="Select date"
                                        disabledKeyboardNavigation
                                        onChange={onChange}
                                        selected={value}
                                        className={"block w-full rounded-lg border text-base font-poppins py-3 px-4 " + ( errors.dateOfBirth ? 'text-red-500 border-red-500' : 'border-gray-400 text-black' )}
                                    />
                                )}
                                rules={{
                                    required: { value: true, message: 'Date is required' },
                                    pattern: {
                                        // eslint-disable-next-line no-useless-escape
                                        value: /^(0?[1-9]|[12][0-9]|3[01])[\/](0?[1-9]|1[012])[\/]\d{4}$/,
                                        message: 'Please enter a valid date',
                                    }
                                }}
                            />
                        </div>

                        {errors.dateOfBirth && <p className="mt-1 text-xs text-red-500 font-poppins" id="dateOfBirth-error">{errors.dateOfBirth?.message}</p>}
                    </div>

                    <div className="mt-3">
                        <label htmlFor="address" className="block text-sm font-medium text-white font-poppins">Address</label>
                        <div className="relative mt-1">
                            <input
                                {...register("address", { required: { value: true, message: 'Address is required' } })}
                                type="text"
                                id="address"
                                className={"block w-full rounded-lg border text-base font-poppins py-3 px-4 " + ( errors.address ? 'text-red-500 border-red-500' : 'border-gray-400 text-black' )}
                                placeholder="Type in your address..."
                            />
                        </div>
                        {errors.address && <p className="mt-1 text-xs text-red-500 font-poppins" id="address-error">{errors.address?.message}</p>}
                    </div>

                    <div className="mt-3">
                        <label htmlFor="city" className="block text-sm font-medium text-white font-poppins">City</label>
                        <div className="relative mt-1">
                            <input
                                {...register("city", { required: { value: true, message: 'City is required' } })}
                                type="text"
                                id="city"
                                className={"block w-full rounded-lg border text-base font-poppins py-3 px-4 " + ( errors.city ? 'text-red-500 border-red-500' : 'border-gray-400 text-black' )}
                                placeholder="Type in your city..."
                            />
                        </div>
                        {errors.city && <p className="mt-1 text-xs text-red-500 font-poppins" id="city-error">{errors.city?.message}</p>}
                    </div>

                    <div className="grid grid-cols-12 gap-4 mt-3">
                        <div className="col-span-12 lg:col-span-6">
                            <label htmlFor="state" className="block text-sm font-medium text-white font-poppins">State</label>
                            <div className="relative mt-1">
                                <input
                                    {...register("state", { required: { value: true, message: 'State is required' } })}
                                    type="text"
                                    id="state"
                                    className={"block w-full rounded-lg border-2 text-base font-poppins py-3 px-4 " + ( errors.state ? 'text-red-500 border-red-500' : 'border-gray-400 text-black' )}
                                    placeholder="e.g. Arizona"
                                />
                            </div>
                            {errors.state && <p className="mt-1 text-xs text-red-500 font-poppins" id="state-error">{errors.state?.message}</p>}
                        </div>

                        <div className="col-span-12 lg:col-span-6">
                            <label htmlFor="zipCode" className="block text-sm font-medium text-white font-poppins">Zip Code</label>
                            <div className="relative mt-1">
                                <input
                                    {...register("zipCode", { required: { value: true, message: 'Zip Code is required' } })}
                                    type="text"
                                    id="zipCode"
                                    className={"block w-full rounded-lg border-2 text-base font-poppins py-3 px-4 " + ( errors.zipCode ? 'text-red-500 border-red-500' : 'border-gray-400 text-black' )}
                                    placeholder="e.g. Smith"
                                />
                            </div>
                            {errors.zipCode && <p className="mt-1 text-xs text-red-500 font-poppins" id="zipCode-error">{errors.zipCode?.message}</p>}
                        </div>
                    </div>

                </div>
            </div>

            {/* Summary */}
            <div className="col-span-12 p-6 bg-white xl:col-span-4 rounded-2xl">
                <h2 className="text-2xl font-extrabold text-black uppercase font-open-sans">Summary</h2>

                <div className="flex flex-col items-center mt-6 text-center">
                    { currentMSelectedMinifig && (
                        <>
                            <img src={currentMSelectedMinifig.set_img_url} alt={currentMSelectedMinifig.name} width="128" height="128" className="object-contain w-32 h-32" />
                            <span className="mt-4 text-base font-semibold text-black font-poppins">{currentMSelectedMinifig.name}</span>
                        </>
                    )}
                </div>

                <div className="mt-12">
                    { parts && ( <MinifigPartsList parts={parts} /> )}
                </div>

                { msg && (
                    <div className={"w-full px-4 py-4 my-8 text-base border font-poppins text-black relative pl-12 " + ( formIsValid ? 'border-green-500' : 'border-red-500')}>{msg}</div>
                )}

                <button type="submit" disabled={isSubmitting} className="block px-6 py-2 mx-auto mt-12 text-lg font-bold uppercase transition duration-300 ease-in-out rounded-full hover:bg-btn-hover font-poppins bg-btn-default">{isSubmitting ? 'Loading..' : 'Submit' }</button>
                
            </div>
        </form>
    )
}