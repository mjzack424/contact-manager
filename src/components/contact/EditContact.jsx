import { useEffect, useContext } from "react";
import { useImmer } from "use-immer";
import { Link, useNavigate, useParams } from "react-router-dom";

import { getContact, updateContact } from "../../services/contactServices";

import { Spinner } from "../";
import { comment, orange, purple } from "../../helpers/colors";
import { ContactContext } from "../../context/ContactContext";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { contactSchema } from "../../validations/contactValidation";
import { toast } from "react-toastify";

const EditContact = ({}) => {
  const { contactId } = useParams();
  const navigate = useNavigate();

  const {
    contacts,
    setContacts,
    setFilteredContacts,
    loading,
    setLoading,
    groups,
  } = useContext(ContactContext);

  const [contact, setContact] = useImmer({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const { data: contactData } = await getContact(contactId);
        setLoading(false);
        setContact(contactData);
      } catch (err) {
        console.log(err);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const submitForm = async (values) => {
    try {
      setLoading(true);
      const { data, status } = await updateContact(values, contactId);
      setLoading(false);
      if (status === 200) {
        toast.info("مخاطب با موفقیت ویرایش شد.", {
          icon: () => <span>✌️</span>,
        });
        setContacts((draft) => {
          const contactIndex = draft.findIndex(
            (c) => c.id === parseInt(contactId)
          );
          draft[contactIndex] = { ...data };
        });
        setFilteredContacts((draft) => {
          const contactIndex = draft.findIndex(
            (c) => c.id === parseInt(contactId)
          );
          draft[contactIndex] = { ...data };
        });

        navigate("/contacts");
      }
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <>
          <section className="p-3">
            <div className="container">
              <div className="row my-2">
                <div className="col text-center">
                  <p className="h4 fw-bold" style={{ color: orange }}>
                    ویرایش مخاطب
                  </p>
                </div>
              </div>
              <hr style={{ backgroundColor: orange }} />
              <div
                className="row p-2 w-75 mx-auto align-items-center"
                style={{ backgroundColor: "#44475a", borderRadius: "1em" }}
              >
                <div className="col-md-8">
                  <Formik
                    initialValues={{
                      fullname: contact.fullname,
                      photo: contact.photo,
                      mobile: contact.mobile,
                      email: contact.email,
                      job: contact.job,
                      group: contact.group,
                    }}
                    validationSchema={contactSchema}
                    onSubmit={(values) => {
                      console.log(values);
                      submitForm(values);
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
                        <ErrorMessage
                          render={(msg) => (
                            <span className="text-danger text-end">{msg}</span>
                          )}
                          name="fullname"
                        />
                      </div>
                      <div className="mb-2 text-end">
                        <Field
                          name="photo"
                          type="text"
                          className="form-control"
                          placeholder="آدرس تصویر"
                        />
                        <ErrorMessage
                          render={(msg) => (
                            <span className="text-danger text-end">{msg}</span>
                          )}
                          name="photo"
                        />
                      </div>
                      <div className="mb-2 text-end">
                        <Field
                          name="mobile"
                          type="number"
                          className="form-control"
                          placeholder="شماره موبایل"
                        />
                        <ErrorMessage
                          name="mobile"
                          render={(msg) => (
                            <span className="text-danger text-end">{msg}</span>
                          )}
                        />
                      </div>
                      <div className="mb-2 text-end">
                        <Field
                          type="email"
                          name="email"
                          className="form-control"
                          placeholder="آدرس ایمیل"
                        />
                        <ErrorMessage
                          render={(msg) => (
                            <span className="text-danger text-end">{msg}</span>
                          )}
                          name="email"
                        />
                      </div>
                      <div className="mb-2 text-end">
                        <Field
                          type="text"
                          name="job"
                          className="form-control"
                          placeholder="شغل"
                        />
                        <ErrorMessage
                          render={(msg) => (
                            <span className="text-danger text-end">{msg}</span>
                          )}
                          name="job"
                        />
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
                        <ErrorMessage
                          render={(msg) => (
                            <span className="text-danger text-end">{msg}</span>
                          )}
                          name="group"
                        />
                      </div>
                      <div className="mx-2">
                        <input
                          type="submit"
                          className="btn"
                          style={{ backgroundColor: purple }}
                          value="ویرایش مخاطب"
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
                <div className="col-md-4">
                  <img
                    src={contact.photo}
                    className="img-fluid rounded"
                    alt={contact.fullname}
                    style={{ border: `1px solid ${purple}` }}
                  />
                </div>
              </div>
            </div>

            <div className="text-center mt-1">
              <img
                src={require("../../assets/man-taking-note.png")}
                height="300px"
                alt="man-taking-note"
                style={{ opacity: "60%" }}
              />
            </div>
          </section>
        </>
      )}
    </>
  );
};

export default EditContact;
