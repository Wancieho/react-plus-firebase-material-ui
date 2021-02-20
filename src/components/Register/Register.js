import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Container,
  FormGroup,
  FormLabel,
  TextField,
  Typography,
} from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

import styles from "./Register.module.scss";
import { useAuth } from "../../contexts/AuthContext";

export const Register = () => {
  const { register } = useAuth();
  const emailRef = useRef();
  const passwordRef = useRef();
  const repeatPasswordRef = useRef();
  const [email, setEmail] = useState(``);
  const [password, setPassword] = useState(``);
  const [repeatPassword, setRepeatPassword] = useState(``);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [dirty, setDirty] = useState();
  const [success, setSuccess] = useState();

  const handleSubmit = async () => {
    setSuccess(null);
    setErrors({});

    try {
      setLoading(true);

      await register(email, password).then(() => {
        setSuccess(
          "You have successfully registered. Please check your inbox to activate."
        );

        setEmail("");
        setPassword("");
        setRepeatPassword("");
      });
    } catch (error) {
      setErrors({
        ...errors,
        ...{ error: error.message },
      });
    }

    setLoading(false);
  };

  useEffect(() => {
    let hasErrors = {};

    if (!email) {
      hasErrors = { ...hasErrors, email: "Email is required" };
    }

    if (!password) {
      hasErrors = { ...hasErrors, password: "Password is required" };
    }

    if (!repeatPassword) {
      hasErrors = {
        ...hasErrors,
        repeatPassword: "Repeat Password is required",
      };
    }

    if (password !== repeatPassword) {
      hasErrors = {
        ...hasErrors,
        repeatPassword: "Password and Repeat Password must match",
      };
    }

    if (hasErrors) {
      setErrors(hasErrors);
    }
  }, [email, password, repeatPassword]);

  return (
    <Box className={styles.Register} data-testid="Register">
      <Container maxWidth="sm">
        <Card variant="outlined">
          <CardHeader title="Register"></CardHeader>
          <CardContent>
            {success && <Alert color="success">{success}</Alert>}
            {errors.error && <Alert severity="error">{errors.error}</Alert>}
            <form>
              <FormGroup>
                <FormLabel>Email Address</FormLabel>
                <TextField
                  ref={emailRef}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onBlur={() => setDirty((prev) => ({ ...prev, email: true }))}
                  required
                />
                {dirty && dirty.email && errors.email && (
                  <Alert severity="error">{errors.email}</Alert>
                )}
              </FormGroup>
              <FormGroup>
                <FormLabel>Password</FormLabel>
                <TextField
                  ref={passwordRef}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onBlur={() =>
                    setDirty((prev) => ({ ...prev, password: true }))
                  }
                  type="password"
                  required
                />
                {dirty && dirty.password && errors.password && (
                  <Alert severity="error">{errors.password}</Alert>
                )}
              </FormGroup>
              <FormGroup>
                <FormLabel>Repeat Password</FormLabel>
                <TextField
                  ref={repeatPasswordRef}
                  value={repeatPassword}
                  onChange={(e) => setRepeatPassword(e.target.value)}
                  onBlur={() =>
                    setDirty((prev) => ({ ...prev, repeatPassword: true }))
                  }
                  type="password"
                  required
                />
                {dirty && dirty.repeatPassword && errors.repeatPassword && (
                  <Alert severity="error">{errors.repeatPassword}</Alert>
                )}
              </FormGroup>
              <Button
                variant="contained"
                color="primary"
                onClick={handleSubmit}
                disabled={
                  (Object.keys(errors).length > 0 && !errors.error) || loading
                }
              >
                {!loading ? "Register" : "loading..."}
              </Button>
              <Typography>
                Already have an account? <Link to="/login">Log In</Link>
              </Typography>
            </form>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
};
