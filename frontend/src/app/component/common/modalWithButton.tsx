import { Modal, Box, Typography, Button } from "@mui/material";
import { red } from "@mui/material/colors";

interface ModalProps {
  onClose: () => void;
  title: string;
  open: boolean;
  onClick: () => void;
  loading: boolean;
}

const ModalWithButton = ({
  onClose,
  title,
  onClick,
  open,
  loading,
}: ModalProps) => {
  return (
    <div>
      <Modal
        open={open}
        onClose={onClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography
            id="modal-modal-title"
            component="h2"
            sx={{
              color: red[700],
              fontSize: "1rem",
              textAlign: "center",
              fontWeight: 600,
            }}
          >
            {title}
          </Typography>
          <Box sx={{ display: "flex", ml: "auto", mt: 4 }}>
            <Button
              onClick={onClick}
              variant="contained"
              color="primary"
              sx={{ mr: 1 }}
              loading={loading}
            >
              Yes
            </Button>
            <Button onClick={onClose} variant="contained" color="secondary">
              No
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
};

export default ModalWithButton;

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  display: "flex",
  flexDirection: "column",
  borderRadius: "5px",
};
