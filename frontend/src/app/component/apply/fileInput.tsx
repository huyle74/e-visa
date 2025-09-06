import { forwardRef, useEffect, ChangeEvent, useState, DragEvent } from "react";
import { Button, Box, styled, IconButton, Tooltip, Modal } from "@mui/material";
import EditNoteRoundedIcon from "@mui/icons-material/EditNoteRounded";
import PreviewIcon from "@mui/icons-material/Preview";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { FileInputDto } from "@/app/libs/types";

interface FileInputProps {
  title: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  fileValue: FileInputDto;
  handleDropFile: (e: DragEvent<HTMLInputElement>) => void;
  name: string;
  disabled: boolean;
}

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
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  height: 500,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 1,
  overFlowY: "scroll",
  display: "flex",
  alignItems: "center",
  flexDirection: "column",
  justifyContent: "center",
};

const FileInput = forwardRef<HTMLInputElement, FileInputProps>(function FileInput(
  { onChange, title, fileValue, handleDropFile, name, disabled },
  ref
) {
  const [open, setOpen] = useState<boolean>(false);
  const [preview, setPreview] = useState<string | null>(null);

  useEffect(() => {
    setPreview((prevFile) => {
      if (prevFile) URL.revokeObjectURL(prevFile);
      if (fileValue) {
        return URL.createObjectURL(fileValue);
      } else {
        return null;
      }
    });
  }, [fileValue]);

  const handleDragOVer = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  return (
    <Box sx={{ width: "100%", p: 1.5 }}>
      <div draggable={true} onDragOver={handleDragOVer} onDrop={handleDropFile}>
        <Box sx={{ mb: 1, fontWeight: 900 }}>
          {title}
          <span style={{ color: "red", fontWeight: 900, marginLeft: "2px" }}>*</span>
        </Box>
        {fileValue === null ? (
          <Box>
            <Box
              sx={{
                display: "flex",
                width: "100%",
                backgroundColor: "#FAFAFA",
                border: "1px solid gray",
                justifyContent: "center",
                p: 2,
              }}
            >
              <Button
                component="label"
                role={undefined}
                variant="outlined"
                tabIndex={-1}
                startIcon={<CloudUploadIcon />}
                size="small"
              >
                Drag and drop file or browse
                <VisuallyHiddenInput
                  type="file"
                  onChange={onChange}
                  multiple
                  ref={ref}
                  accept=".png, .jpg, .jpeg, .pdf"
                  required
                  name={name}
                  disabled={disabled}
                />
              </Button>
            </Box>
          </Box>
        ) : (
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              p: 2,
              border: "1px gray solid",
            }}
          >
            <Box sx={{ fontWeight: 600, color: "seagreen" }}>
              <em>{fileValue.name}</em>
            </Box>
            <Box
              sx={{
                display: "flex",
              }}
            >
              <Tooltip title="Edit">
                <IconButton component="label" role={undefined} tabIndex={-1}>
                  <VisuallyHiddenInput
                    type="file"
                    onChange={onChange}
                    multiple
                    ref={ref}
                    accept=".png, .jpg, .jpeg, .pdf"
                    required
                    name={name}
                  />
                  <EditNoteRoundedIcon color="primary" fontSize="large" />
                </IconButton>
              </Tooltip>
              <Tooltip title="View">
                <IconButton onClick={() => setOpen(true)}>
                  <PreviewIcon fontSize="large" sx={{ color: "#ff1744" }} />
                </IconButton>
              </Tooltip>
            </Box>
            <Modal open={open} onClose={() => setOpen(false)}>
              <Box>
                <Box sx={style}>
                  {fileValue.type !== "application/pdf" ? (
                    <img
                      src={preview || ""}
                      alt="Image"
                      style={{
                        objectFit: "cover",
                        width: "100%",
                        height: "40%",
                      }}
                    />
                  ) : (
                    <iframe
                      src={preview || ""}
                      style={{ width: "100%", height: "100%" }}
                    />
                  )}
                  <Box sx={{ position: "absolute", bottom: -50, right: 1 }}>
                    <Button
                      variant="contained"
                      size="small"
                      color="secondary"
                      onClick={() => setOpen(false)}
                    >
                      Close
                    </Button>
                  </Box>
                </Box>
              </Box>
            </Modal>
          </Box>
        )}
      </div>
    </Box>
  );
});

export default FileInput;
