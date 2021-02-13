import { Box } from "@material-ui/core";

import styles from "./Dashboard.module.scss";

export const Dashboard = () => (
  <Box className={styles.Dashboard} data-testid="Dashboard">
    Dashboard Component
  </Box>
);
