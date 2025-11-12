import { useContext } from "react";
import { Link } from "react-router-dom";
import Spinner from "../Spinner";
import { comment, green, purple } from "../../helpers/colors";
import { ContactContext } from "../../context/ContactContext";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { contactSchema } from "../../validations/contactValidation";

const AddContact = () => {
  const {
    loading,
    groups,
    createContact,
    // errors,
  } = useContext(ContactContext);

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <>
          <section className="p-3">
            <img
              src={require("../../assets/man-taking-note.png")}
              alt="man-taking-note"
              height="400px"
              style={{
                position: "absolute",
                zIndex: "-1",
                top: "130px",
                left: "100px",
                opacity: "50%",
              }}
            />
            <div className="container">
              <div className="row">
                <div className="col">
                  <p
                    className="h4 fw-bold text-center"
                    style={{ color: green }}
                  >
                    ساخت مخاطب جدید
                  </p>
                </div>
              </div>
              <hr style={{ backgroundColor: green }} />
              <div className="row mt-5">
                <div className="col-md-4">
                  {/* old way */}
                  {/* {errors?.map((error, index) => (
                    <p className="text-danger" key={index}>
                      {error.message}
                    </p>
                  ))} */}
                  <Formik
                    initialValues={{
                      fullname: "",
                      photo: "",
                      mobile: "",
                      email: "",
                      job: "",
                      group: "",
                    }}
                    validationSchema={contactSchema}
                    onSubmit={(values) => {
                      console.log(values);
                      createContact(values);
                    }}
                  >
                    <Form>
                        <div className="mb-2 text-end">
                          <Field
                            name="fullname"
                            type="text"
                            className="form-control"
                            placeholder="نام و نام خانوادگی"
                          />
                          <ErrorMessage render={msg => <span className="text-danger text-end">{msg}</span>} name="fullname" />
                        </div>
                        <div className="mb-2 text-end">
                          <Field
                            name="photo"
                            type="text"
                            className="form-control"
                            placeholder="آدرس تصویر"
                          />
                          <ErrorMessage render={msg => <span className="text-danger text-end">{msg}</span>} name="photo" />
                        </div>
                        <div className="mb-2 text-end">
                          <Field
                            name="mobile"
                            type="number"
                            className="form-control"
                            placeholder="شماره موبایل"
                          />
                          <ErrorMessage  name="mobile" render={msg => <span className="text-danger text-end">{msg}</span>} />
                        </div>
                        <div className="mb-2 text-end">
                          <Field
                            type="email"
                            name="email"
                            className="form-control"
                            placeholder="آدرس ایمیل"
                          />
                          <ErrorMessage render={msg => <span className="text-danger text-end">{msg}</span>} name="email" />
                        </div>
                        <div className="mb-2 text-end">
                          <Field
                            type="text"
                            name="job"
                            className="form-control"
                            placeholder="شغل"
                          />
                          <ErrorMessage render={msg => <span className="text-danger text-end">{msg}</span>} name="job" />
                        </div>
                        <div className="mb-2 text-end">
                          <Field
                          as="select"
                            name="group"
                            // required={true}
                            className="form-control"
                          >
                            <option value="">انتخاب گروه</option>
                            {groups.length > 0 &&
                              groups.map((group) => (
                                <option key={group.id} value={group.id}>
                                  {group.name}
                                </option>
                              ))}
                          </Field>
                          <ErrorMessage render={msg => <span className="text-danger text-end">{msg}</span>} name="group" />
                        </div>
                        <div className="mx-2">
                          <input
                            type="submit"
                            className="btn"
                            style={{ backgroundColor: purple }}
                            value="ساخت مخاطب"
                          />
                          <Link
                            to={"/contacts"} 
                            className="btn mx-2"
                            style={{ backgroundColor: comment }}
                          >
                            انصراف
                          </Link>
                        </div>
                      </Form>
                  </Formik>
                </div>
              </div>
            </div>
          </section>
        </>
      )}
    </>
  );
};
export default AddContact;
