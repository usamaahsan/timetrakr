import React, { useState } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Menu,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { AddCircle } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/reduxStore";
import { AddProject, SetSelectedProject } from "../../redux/projectsSlice";

export const ProjectSelector: React.FC = () => {
  const { projects, selectedProject, currentTimer } = useSelector(
    (state: RootState) => state.projects
  );
  const dispatch = useDispatch();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const openMenu = Boolean(anchorEl);
  const [newProjectTitle, setNewProjectTitle] = useState("");

  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleDropdownClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleDialogClose = () => {
    setNewProjectTitle("");
    setIsDialogOpen(false);
  };

  return (
    <Box>
      <Button
        variant="contained"
        disabled={currentTimer === "00:00:00" ? false : true}
        onClick={handleDropdownClick}
        sx={{
          backgroundColor: "#2a2c30",
          borderRadius: "12px",
          color: "white",
          "&:hover": {
            backgroundColor: "#232528",
          },
        }}
      >
        <Typography variant="body2" component="span" sx={{ mr: 1 }}>
          Project:
        </Typography>
        <Typography
          variant="body2"
          component="span"
          sx={{ color: "white", mr: 1 }}
        >
          {!selectedProject ? "Select Project" : selectedProject}
        </Typography>
        <ArrowDropDownIcon />
      </Button>

      {/* Dropdown Menu */}
      <Menu anchorEl={anchorEl} open={openMenu} onClose={handleMenuClose}>
        {projects.map((project, index) => {
          return (
            <MenuItem
              key={`project:${project}${index}`}
              onClick={() => {
                dispatch(SetSelectedProject(project));
                handleMenuClose();
              }}
              sx={{
                backgroundColor: "#2a2c30",
              }}
            >
              <Typography
                sx={{
                  fontSize: "14px",
                }}
              >
                {project}
              </Typography>
            </MenuItem>
          );
        })}
        <MenuItem
          onClick={() => {
            setIsDialogOpen(true);
            handleMenuClose();
          }}
          sx={{
            backgroundColor: "#2a2c30",
          }}
        >
          <AddCircle />
          <Typography
            ml={1}
            sx={{
              fontSize: "14px",
            }}
          >
            Create New Project
          </Typography>
        </MenuItem>
      </Menu>

      <Dialog
        onClose={handleDialogClose}
        open={isDialogOpen}
        slotProps={{
          paper: {
            sx: {
              backgroundColor: "#2a2c30",
              width: "500px",
              maxWidth: "none",
            },
          },
        }}
      >
        <DialogTitle>Create New Project</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            placeholder="Project Title"
            value={newProjectTitle}
            onChange={(event) => {
              setNewProjectTitle(event.target.value);
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose}>Cancel</Button>
          <Button
            variant="outlined"
            onClick={() => {
              if (!newProjectTitle) {
                alert("Enter Project Title");
              } else {
                dispatch(AddProject(newProjectTitle));
                handleDialogClose();
              }
            }}
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};
