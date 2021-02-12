import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Container,
  FormControl,
  FormGroup,
  FormLabel,
  Input,
  TextField,
  Typography,
} from "@material-ui/core";
import { useRef } from "react";

import { useAuth } from "../../contexts/AuthContext";

export default function Register() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const repeatPasswordRef = useRef();
  const { register } = useAuth();

  const submit = () => {
    console.debug(9);
  };

  return (
    <Container maxWidth="sm">
      <Card variant="outlined">
        <CardHeader title="Register"></CardHeader>
        <form onSubmit={submit}>
          <CardContent>
            <FormGroup>
              <FormLabel>Email Address</FormLabel>
              <TextField ref={emailRef} required />
            </FormGroup>
            <FormGroup>
              <FormLabel>Password</FormLabel>
              <TextField ref={passwordRef} type="password" required />
            </FormGroup>
            <FormGroup>
              <FormLabel>Repeat Password</FormLabel>
              <TextField ref={repeatPasswordRef} type="password" required />
            </FormGroup>
          </CardContent>
          <CardActions>
            <Button variant="contained" color="primary">
              Register
            </Button>
            <Typography>Already have an account?</Typography>
          </CardActions>
        </form>
      </Card>
    </Container>
  );
}
