import * as yup from "yup";

export const newsSchemaValidation = yup.object().shape({
  title: yup.string().required("Title is Required"),
  imageURL: yup.string().required("Image URL is Required"),
  details: yup.string().required("Details is Required"),
  category: yup.string().required("Select the Category"),
  type: yup.string().required("Select the Type"),
});
