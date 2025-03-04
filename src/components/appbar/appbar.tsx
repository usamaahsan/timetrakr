import { Box, Typography } from "@mui/material";

export const Appbar = () => {
  return (
    <Box
      display="flex"
      p={2}
      sx={{
        borderBottom: (theme) => `1px solid ${theme.palette.secondary.main}`,
      }}
    >
      <Typography variant="h6">Time Trakr</Typography>
    </Box>
  );
};
