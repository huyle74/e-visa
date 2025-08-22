import { ReactNode } from "react";
import { Modal, Box, Typography } from "@mui/material";
import { red } from "@mui/material/colors";

interface ModalProps {
  onClose: () => void;
  open: boolean;
  content: { title: string; description: string };
}

const ModalComponent = ({ onClose, open, content }: ModalProps) => {
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
              color: red[900],
              fontSize: "1rem",
              textAlign: "center",
              fontWeight: 700,
            }}
          >
            {content.title}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            {content.description}
          </Typography>
        </Box>
      </Modal>
    </div>
  );
};

export default ModalComponent;

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};
