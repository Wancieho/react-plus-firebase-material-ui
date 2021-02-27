import { Box, Button, Card, Typography } from "@material-ui/core";
import { useState } from "react";
import Alert from "@material-ui/lab/Alert";
import { useHistory } from "react-router-dom";
import { useMount } from "react-use";

import styles from "./Dashboard.module.scss";
import { useAuth } from "../../contexts/AuthContext";

export const Dashboard = () => {
  const { currentUser, logOut, refreshToken } = useAuth();
  const [error, setError] = useState();
  const history = useHistory();

  const handleLogOut = async () => {
    setError("");

    try {
      await logOut();

      history.push("/login");
    } catch (e) {
      setError(e.message);
    }
  };

  useMount(() => {
    try {
      refreshToken();
    } catch (err) {
      console.error(err);
    }
  });

  return (
    <Box className={styles.Dashboard} data-testid="Dashboard">
      <Typography variant="h1">Dashboard</Typography>
      {error && <Alert severity="error">{error}</Alert>}({currentUser.email})
      <Card></Card>
      <Button
        variant="contained"
        color="secondary"
        fullWidth
        onClick={handleLogOut}
      >
        Log Out
      </Button>
    </Box>
  );
};
