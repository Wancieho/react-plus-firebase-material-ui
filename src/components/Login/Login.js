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

export const Login = () => {
  const { logIn } = useAuth();
  const emailRef = useRef();
  const passwordRef = useRef();
  const [email, setEmail] = useState(``);
  const [password, setPassword] = useState(``);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [dirty, setDirty] = useState();
  const history = useHistory();

  const handleLogIn = async () => {
    try {
      setLoading(true);

      const loggedIn = await logIn(email, password);

      if (!loggedIn.user.emailVerified) {
        setErrors({
          ...errors,
          ...{ error: `Your email is not verified` },
        });
      } else {
        return history.push("/");
      }
    } catch (e) {
      setErrors({
        ...errors,
        ...{ error: e.message },
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

    if (hasErrors) {
      setErrors(hasErrors);
    }
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
                  (Object.keys(errors).length > 0 && !errors.error) || loading
                }
              >
                {!loading ? "Login" : "loading..."}
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
