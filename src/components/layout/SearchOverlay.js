import React from "react";
import { 
  Box, 
  IconButton, 
  Modal,
  Backdrop,
  Fade, 
  alpha,
  useTheme } from "@mui/material";
import { Close } from "@mui/icons-material";
import SearchContainer from "./SearchContainer";

const SearchOverlay = ({ open, onClose }) => {
  const theme = useTheme();

  return (
    <Modal
      open={open}
      onClose={onClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
        sx: { backdropFilter: "blur(6px)", bgcolor: alpha(theme.palette.background.default, 0.5) }
      }}
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        p: { xs: 1, md: 3 }
      }}
    >
      <Fade in={open}>
        <Box 
          sx={{ 
            width: "100%", 
            maxWidth: "md",
            mx: "auto",
            p: { xs: 3, md: 5 },
            outline: 'none',
            bgcolor: alpha(theme.palette.background.paper, 1),
            backdropFilter: "blur(12px)",
            borderRadius: 8,
            border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
            boxShadow: theme.palette.mode === 'light' 
              ? '0 30px 60px -12px rgba(0, 0, 0, 0.18)' 
              : '0 30px 60px -12px rgba(0, 0, 0, 0.7)',
            minHeight: { xs: 'auto', md: '500px' },
            maxHeight: '90vh',
            overflowY: 'auto',
            display: 'flex',
            flexDirection: 'column'
          }}
        >
          <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 1 }}>
            <IconButton onClick={onClose} size="medium" sx={{ color: 'text.secondary' }}>
              <Close />
            </IconButton>
          </Box>
          <SearchContainer autoFocus={open} onResultClick={onClose} />
        </Box>
      </Fade>
    </Modal>
  );
};

export default SearchOverlay;
