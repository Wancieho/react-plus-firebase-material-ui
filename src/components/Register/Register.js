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
import { registerValidation } from "./Register.validation";

export const Register = () => {
  const { register } = useAuth();
  const emailRef = useRef();
  const passwordRef = useRef();
  const repeatPasswordRef = useRef();
  const [email, setEmail] = useState(``);
  const [password, setPassword] = useState(``);
  const [repeatPassword, setRepeatPassword] = useState(``);
  const [errors, setErrors] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [dirty, setDirty] = useState();
  const [success, setSuccess] = useState();

  const handleSubmit = async () => {
    setSuccess(null);
    setErrors(null);
    setSubmitting(true);

    try {
      await register(email, password);

      setSuccess(
        "You have successfully registered. Please check your inbox to activate."
      );
      setEmail("");
      setPassword("");
      setRepeatPassword("");
    } catch (error) {
      setErrors({
        ...errors,
        ...{ error: error.message },
      });
    }

    setErrors(null);
    setSubmitting(false);
  };

  useEffect(() => {
    setErrors(registerValidation(email, password, repeatPassword));
  }, [email, password, repeatPassword]);

  return (
    <Box className={styles.Register} data-testid="Register">
      <Container maxWidth="sm">
        <Card variant="outlined">
          <CardHeader title="Register"></CardHeader>
          <CardContent>
            {JSON.stringify(errors)}
            {success && <Alert color="success">{success}</Alert>}
            {errors?.error && <Alert severity="error">{errors.error}</Alert>}
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
                {dirty?.email && errors?.email && (
                  <Alert severity="error">{errors?.email}</Alert>
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
                {dirty?.password && errors?.password && (
                  <Alert severity="error">{errors?.password}</Alert>
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
                {dirty?.repeatPassword && errors?.repeatPassword && (
                  <Alert severity="error">{errors?.repeatPassword}</Alert>
                )}
              </FormGroup>
              <Button
                variant="contained"
                color="primary"
                onClick={handleSubmit}
                disabled={errors ?? submitting}
              >
                {!submitting ? "Register" : "Submitting..."}
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
