import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { Box, Button, Paper, styled } from "@mui/material";
import { teal } from "@mui/material/colors";
import Image from "next/image";
import { ReactNode } from "react";
import FormContainer from "../containerForm";

const primary = teal[800];

const ApplicationInformation = () => {
  return (
    <Box sx={{ position: "relative" }}>
      <Box
        sx={{
          display: "flex",
          gap: 3,
          width: "100%",
          justifyContent: "space-between",
          position: "relative",
          height: "100%",
        }}>
        <FormContainer title="Upload Biodata Page of Passport">
          <PaperDiv>
            Please upload the biodata page of your travel document. After the successful completion of the upload, your
            biographic information will be populated in the corresponding fields of the application. For accurate
            results, make sure the MRZ is contained within the full width of the photograph and the photograph is not
            blurry.
          </PaperDiv>
          <PaperDiv>
            Applicant is required to submit his/her travel document that is valid for at least six months from the date
            of visa application for single entry and one year for multiple entry (18 months for OA Visa).
          </PaperDiv>
          <Box sx={{ m: 2, mb: 1 }}>
            {/* UPLOAD BUTTON */}
            <Button fullWidth variant="outlined" tabIndex={-1} startIcon={<CloudUploadIcon />}>
              Drag and drop file or browse from computer
              <VisuallyHiddenInput type="file" onChange={(event) => console.log(event.target.files)} multiple />
            </Button>
          </Box>
          <Box sx={{ textAlign: "center", mb: 3 }}>(.JPG, .JPEG Limit Size is 3 MB)</Box>

          {/* PASSPORT PICTURE */}
          <Box sx={{ display: "flex", mb: 3, justifyContent: "center" }}>
            <Image
              src="https://www.thaievisa.go.th/static/media/dummy_passport.f34bd0bb.jpg"
              alt="passport Pic"
              width={460}
              height={270}
            />
          </Box>
        </FormContainer>

        <Box sx={{ display: "flex", height: "100%", width: "100%", mt: "auto" }}>
          <FormContainer title="Upload a photograph">
            <PaperDiv>
              Please upload an appropriate photograph taken within six months. Failure to do so may result in rejection
              of visa request.
            </PaperDiv>

            <Box sx={{ m: 2 }}>
              <Button fullWidth color="secondary">
                Download Example Photograph
              </Button>
            </Box>

            <Box sx={{ m: 2, mb: 1 }}>
              {/* UPLOAD BUTTON */}
              <Button
                sx={{ fontSize: "1rem" }}
                fullWidth
                variant="outlined"
                tabIndex={-1}
                startIcon={<CloudUploadIcon />}>
                Drag and drop file or browse from computer
                <VisuallyHiddenInput type="file" onChange={(event) => console.log(event.target.files)} multiple />
              </Button>
            </Box>
            <Box sx={{ display: "flex", justifyContent: "center", mb: 4 }}>
              <Image
                src="https://cdn4.iconfinder.com/data/icons/flat-pro-business-set-1/32/people-customer-unknown-512.png"
                width={250}
                height={250}
                alt="photo"
              />
            </Box>
          </FormContainer>
        </Box>
      </Box>
    </Box>
  );
};

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

const PaperDiv = ({ children }: { children: ReactNode }) => {
  return (
    <Paper elevation={3} sx={{ m: 2, p: 2 }}>
      {children}
    </Paper>
  );
};

export default ApplicationInformation;
