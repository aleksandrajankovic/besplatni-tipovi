import React, { useState, useEffect } from "react";
import {
  MDBInput,
  MDBCardFooter,
  MDBValidation,
  MDBBtn,
  MDBIcon,
  MDBSpinner,
} from "mdb-react-ui-kit";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { register } from "../redux/features/authSlice";

const initialState = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
};
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const passwordRegex = /^(?=.*\d)(?=.*[A-Z]).{12,}$/;
const Register = () => {
  const [formValue, setFormValue] = useState(initialState);
  const { loading, error } = useSelector((state) => ({ ...state.auth }));
  const { email, password, firstName, lastName, confirmPassword } = formValue;
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    error && toast.error(error);
  }, [error]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      return toast.error("Password should match");
    }

    if (!emailRegex.test(email)) {
      return toast.error("Please provide a valid email address");
    }

    if (!passwordRegex.test(password)) {
      return toast.error(
        "Password must have at least 12 characters, including a digit and an uppercase letter"
      );
    }

    if (email && password && firstName && lastName && confirmPassword) {
      dispatch(register({ formValue, navigate, toast }));
    }
  };

  const [fieldValidity, setFieldValidity] = useState({
    firstName: true,
    lastName: true,
    email: true,
    password: true,
    confirmPassword: true,
  });
  const onInputChange = (e) => {
    let { name, value } = e.target;
    const isValid = validateField(name, value);
    setFieldValidity({ ...fieldValidity, [name]: isValid });
    setFormValue({ ...formValue, [name]: value });
  };

  const validateField = (fieldName, value) => {
    switch (fieldName) {
      case "email":
        return emailRegex.test(value);
      case "password":
        return passwordRegex.test(value);

      default:
        return true;
    }
  };
  const [currentYear] = useState(new Date().getFullYear());
  return (
    <div className="flex full-height column">
      <div className="login">
        <div className="login-wrapper">
          <img src="/logo.png" alt="Tipster logo" />
          <h5 className="register margin-top">Registruj se</h5>
          <p>Welcome back! Please enter your details.</p>
          <MDBValidation onSubmit={handleSubmit} noValidate className="row g-3">
            <div className="col-md-12">
              <label className="margin-top" htmlFor="firstName">
                Vaše ime:
              </label>
              <MDBInput
                id="firstName"
                label="Unesite ime"
                type="text"
                value={firstName}
                name="firstName"
                onChange={onInputChange}
                required
                invalid={!fieldValidity.firstName}
                validation="Please provide first name"
              />
            </div>
            <div className="col-md-12">
              <label className="margin-top" htmlFor="lastName">
                Vaše prezime:
              </label>
              <MDBInput
                id="lastName"
                label="Unesite prezime"
                type="text"
                value={lastName}
                name="lastName"
                onChange={onInputChange}
                required
                invalid={!fieldValidity.lastName}
                validation="Please provide last name"
              />
            </div>
            <div className="col-md-12">
              <label className="margin-top" htmlFor="email">
                Vaše prezime:
              </label>
              <MDBInput
                id="email"
                label="Email"
                type="email"
                value={email}
                name="email"
                onChange={onInputChange}
                required
                invalid={!fieldValidity.email}
                validation="Please provide a valid email"
              />
            </div>
            <div className="col-md-12">
              <label className="margin-top" htmlFor="password">
                Vaša šifra:
              </label>
              <MDBInput
                id="password"
                label="Unesite šifru"
                type="password"
                value={password}
                name="password"
                onChange={onInputChange}
                required
                invalid={!fieldValidity.password}
                validation="Please provide a valid password"
              />
            </div>
            <div className="col-md-12">
              <label className="margin-top" htmlFor="confirmPassword">
                Potvrdite šifru:
              </label>
              <MDBInput
                id="confirmPassword"
                label="Potvrdite šifru"
                type="password"
                value={confirmPassword}
                name="confirmPassword"
                onChange={onInputChange}
                required
                invalid={!fieldValidity.confirmPassword}
                validation="Please provide a valid confirmation password"
              />
            </div>
            <div className="col-12">
              <MDBBtn style={{ width: "100%" }} className="mt-2 blueColor">
                {loading && (
                  <MDBSpinner
                    size="sm"
                    role="status"
                    tag="span"
                    className="me-2"
                  />
                )}
                Registruj se
              </MDBBtn>
            </div>
          </MDBValidation>
          <MDBCardFooter>
            <Link to="/login">
              <p className="text-center">Already have an account ? Sign In</p>
            </Link>
          </MDBCardFooter>
        </div>
        <div className="flex-spaceB g-3">
          <div className="register-footer">
            <div className="register-copyright">
              <p>@Tipster {currentYear}</p>
            </div>
          </div>
          <div className="register-copyright">
            <MDBIcon far icon="envelope" />
            <p>help@tipster.com</p>
          </div>
        </div>
      </div>
      <div className="right"></div>
    </div>
  );
};

export default Register;