import { useCreateOfferForm } from "../../hooks/createOffer/useCreateOfferForm";
import { CreateOfferFrom } from "./CreateOfferForm"
import { Formik } from "formik"

export const CreateOffer = () => {
    const { initialValues, validationSchema, onSubmit } = useCreateOfferForm();

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
            validateOnBlur={false}
            validateOnChange={false}
        >
            <CreateOfferFrom />
        </Formik>
    )
}