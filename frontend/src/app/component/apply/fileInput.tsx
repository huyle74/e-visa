import { useRef, forwardRef, DragEventHandler, ChangeEvent } from "react";
import { Button, Box, styled } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

interface FileInputProps {
  title: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

export type Ref = HTMLInputElement;

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

const FileInput = forwardRef<HTMLInputElement, FileInputProps>(
  ({ onChange, title }, ref) => (
    <Box sx={{ width: "100%", p: 1.5 }}>
      <Box sx={{ mb: 1, fontWeight: 900 }}>
        {title}
        <span style={{ color: "red", fontWeight: 900, marginLeft: "2px" }}>*</span>
      </Box>
      <Box
        sx={{
          display: "flex",
          width: "100%",
          backgroundColor: "#EBEBEB",
          border: "1px solid black",
          justifyContent: "center",
          p: 2,
        }}
      >
        <Button
          ref={ref}
          component="label"
          role={undefined}
          variant="contained"
          tabIndex={-1}
          startIcon={<CloudUploadIcon />}
          size="small"
        >
          Drag and drop file or browse
          <VisuallyHiddenInput type="file" onChange={onChange} multiple />
        </Button>
      </Box>
    </Box>
  )
);

export default FileInput;
