import { Modal, Box, Typography } from "@mui/material";
import { red, blue } from "@mui/material/colors";
import PriorityHighIcon from "@mui/icons-material/PriorityHigh";
import DoneOutlineIcon from "@mui/icons-material/DoneOutline";

interface ModalProps {
  onClose: () => void;
  open: boolean;
  content: {
    title: string;
    description: string;
    status?: string | undefined;
  };
}

const ModalComponent = ({ onClose, open, content }: ModalProps) => {
  const color = content.status === "error" ? red[900] : blue[600];
  const status =
    content.status === "error" ? <PriorityHighIcon /> : <DoneOutlineIcon />;

  return (
    <div>
      <Modal
        open={open}
        onClose={onClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            border: color,
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography
            id="modal-modal-title"
            component="h2"
            sx={{
              color,
              fontSize: "1rem",
              textAlign: "center",
              fontWeight: 700,
              display: "flex",
              justifyContent: "center",
            }}
          >
            {content.title}
            <Box sx={{ ml: 1 }}>{status}</Box>
          </Typography>
          {content.description.length !== 0 && (
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              {content.description}
            </Typography>
          )}
        </Box>
      </Modal>
    </div>
  );
};

export default ModalComponent;
