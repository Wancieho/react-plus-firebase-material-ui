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
import { Link, useHistory } from "react-router-dom";

import styles from "./Login.module.scss";
import { useAuth } from "../../contexts/AuthContext";
import { loginValidation } from "./Login.validation";

export const Login = () => {
  const { logIn } = useAuth();
  const emailRef = useRef();
  const passwordRef = useRef();
  const [email, setEmail] = useState(``);
  const [password, setPassword] = useState(``);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [dirty, setDirty] = useState();
  const history = useHistory();

  const handleLogIn = async () => {
    setSubmitting(true);

    try {
      const loggedIn = await logIn(email, password);

      if (!loggedIn.user.emailVerified) {
        setErrors({
          ...errors,
          ...{ error: `Your email is not verified` },
        });
      } else {
        return history.push("/");
      }
    } catch (err) {
      setErrors({
        ...errors,
        ...{
          error:
            err.response?.data?.error || err.message || JSON.stringify(err),
        },
      });

      setSubmitting(false);
    }
  };

  useEffect(() => {
    setErrors(loginValidation(email, password) || null);
  }, [email, password]);

  return (
    <Box className={styles.Login} data-testid="Login">
      <Container maxWidth="sm">
        <Card variant="outlined">
          <CardHeader title="Login"></CardHeader>
          <CardContent>
            {errors.error && <Alert severity="error">{errors.error}</Alert>}
            <form>
              <FormGroup>
                <FormLabel>Email Address</FormLabel>
                <TextField
                  ref={emailRef}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onBlur={() => setDirty((prev) => ({ ...prev, email: true }))}
                  type="email"
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
              <Button
                variant="contained"
                color="primary"
                onClick={handleLogIn}
                disabled={
                  (Object.keys(errors).length > 0 && !errors.error) ||
                  submitting
                }
              >
                {!submitting ? "Login" : "Submitting..."}
              </Button>
            </form>
            <Typography>
              Don't have an account? <Link to="/register">Register</Link>
            </Typography>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
};
