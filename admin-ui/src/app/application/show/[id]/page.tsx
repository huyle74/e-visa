"use client";

import { useState } from "react";
import { Show, Breadcrumb } from "@refinedev/mui";
import { useShow } from "@refinedev/core";
import {
  Box,
  Button,
  Grid,
  Tab,
  Table,
  TableCell,
  TableBody,
  TableRow,
  TableContainer,
} from "@mui/material";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { dateFormat } from "@app/libs/date";

export default function ApplicationDetail() {
  const {
    query: { isFetching },
    result: data,
  } = useShow({
    resource: "application",
  });
  const [tab, setTab] = useState("1");

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setTab(newValue);
  };

  const applyInformationRows =
    data?.ApplyInformation &&
    Object.entries(data.ApplyInformation).filter(
      ([key]) =>
        key !== "biodata" &&
        key !== "photograph" &&
        key !== "applicationId" &&
        key !== "id"
    );

  const travelInformationRows =
    data?.travelInformation &&
    Object.entries(data.travelInformation).filter(
      ([key]) => key !== "applicationId" && key !== "id"
    );

  return (
    <Show canDelete={false} isLoading={isFetching}>
      <Grid container spacing={2} columns={{ xs: 4, md: 12 }}>
        <Grid size={6}>
          <TextLine name="From" value={data?.fromCountry} />
        </Grid>
        <Grid size={6}>
          <TextLine name="To" value={data?.toCountry} />
        </Grid>
        <Grid size={6}>
          <TextLine name="Price" value={data?.price + " $"} />
        </Grid>
        <Grid size={6}>
          <TextLine name="Payment" value={data?.payment ? "Yes" : "No"} />
        </Grid>
        <Grid size={6}>
          <TextLine name="Create At" value={dateFormat(data?.createdAt)} />
        </Grid>
        <Grid size={6}>
          <TextLine name="Last update At" value={dateFormat(data?.updatedAt)} />
        </Grid>
      </Grid>

      <Box sx={{ mt: 5 }}>
        <TabContext value={tab}>
          <Box
            sx={{
              borderBottom: 1,
              borderColor: "divider",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <TabList onChange={handleChange} aria-label="lab API tabs example">
              <Tab label="Eligibility" value="1" />
              <Tab label="Apply Information" value="2" />
              <Tab label="Travel Information" value="3" />
              <Tab label="Supporting Document" value="4" />
            </TabList>
          </Box>

          {/* Eligibility */}
          <TabPanel value="1">
            <TableContainer>
              <Table sx={{ width: "100%" }}>
                <TableBody>
                  <TableRow>
                    <TableCell>Apply At</TableCell>
                    <TableCell>{data?.Eligibility?.applyAt || ""}</TableCell>
                  </TableRow>

                  <TableRow>
                    <TableCell>Current location</TableCell>
                    <TableCell>
                      {data?.Eligibility?.currentLocation || ""}
                    </TableCell>
                  </TableRow>

                  <TableRow>
                    <TableCell>Visa type</TableCell>
                    <TableCell>
                      {valueConvert(data?.Eligibility?.visaType) || ""}
                    </TableCell>
                  </TableRow>

                  <TableRow>
                    <TableCell>Country Passport</TableCell>
                    <TableCell>
                      {data?.Eligibility?.inputCountryPassport || ""}
                    </TableCell>
                  </TableRow>

                  <TableRow>
                    <TableCell>Visit purpose</TableCell>
                    <TableCell>
                      {valueConvert(data?.Eligibility?.visitPurpose) || ""}
                    </TableCell>
                  </TableRow>

                  <TableRow>
                    <TableCell>Document Type</TableCell>
                    <TableCell>
                      {valueConvert(data?.Eligibility?.documentType) || ""}
                    </TableCell>
                  </TableRow>

                  <TableRow>
                    <TableCell>Number of entries</TableCell>
                    <TableCell>
                      {data?.Eligibility?.numberOfEntries || ""}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </TabPanel>

          {/* Apply Information */}
          <TabPanel value="2">
            <TableContainer>
              <Table sx={{ width: "100%" }}>
                <TableBody>
                  {applyInformationRows?.map(([key, value]: any, i: number) => {
                    return (
                      <TableRow key={i}>
                        <TableCell>{keyConvert(key)}</TableCell>
                        <TableCell>{valueConvert(value)}</TableCell>
                      </TableRow>
                    );
                  }) || <MissingForm />}
                </TableBody>
              </Table>
            </TableContainer>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                width: "100%",
              }}
            >
              <FileDisplay data={data?.ApplyInformation?.biodata} label="Bio" />
              <FileDisplay
                data={data?.ApplyInformation?.photograph}
                label="Photograph"
              />
            </Box>
          </TabPanel>

          {/* Travel Information */}
          <TabPanel value="3">
            <TableContainer>
              <Table sx={{ width: "100%" }}>
                <TableBody>
                  {travelInformationRows?.map(
                    ([key, value]: any, i: number) => {
                      return (
                        <TableRow key={i}>
                          <TableCell>{keyConvert(key)}</TableCell>
                          <TableCell>{valueConvert(value)}</TableCell>
                        </TableRow>
                      );
                    }
                  ) || <MissingForm />}
                </TableBody>
              </Table>
            </TableContainer>
          </TabPanel>

          {/* Supporting Document */}
          <TabPanel value="4">
            <Grid columns={{ xs: 4, md: 12 }} container sx={{ width: "100%" }}>
              {(data?.supportingDocument &&
                data.supportingDocument.map((data: any, i: number) => {
                  const [key] = Object.entries(data);
                  const label = valueConvert(key[0]);
                  return (
                    <Grid key={i} size={6}>
                      <FileDisplay label={label} data={key[1]} />
                    </Grid>
                  );
                })) || <MissingForm />}
            </Grid>
          </TabPanel>
        </TabContext>
      </Box>
    </Show>
  );
}

const TextLine = ({
  name,
  value,
}: {
  name: string;
  value: string | number;
}) => {
  return (
    <Box
      sx={{
        display: "flex",
        height: "20px",
        alignItems: "center",
        fontSize: "1rem",
      }}
    >
      <p>{name}</p>
      {":"}
      <p style={{ marginLeft: "10px", fontWeight: 300 }}>{value}</p>
    </Box>
  );
};

const valueConvert = (value: any) => {
  if (typeof value === "string" && !isNaN(Date.parse(value))) {
    return dateFormat(value);
  }
  if (typeof value === "boolean") {
    return value === true ? "Yes" : "No";
  }
  if (value && value.includes("_")) {
    const converted = value.split("_").map((word: string) => {
      if (word === "USD") return word;
      return word[0].toUpperCase() + word.slice(1).toLocaleLowerCase();
    });
    return converted.join(" ").replace(/(\d+)\s+(\d+)/, "$1 - $2");
  }

  if (value && value === value.toUpperCase()) {
    return value[0] + value.slice(1).toLowerCase();
  }

  return value;
};

const keyConvert = (key: any) => {
  if (key) {
    const replace = key.replace(/([a-z])([A-Z])/g, "$1 $2");
    return replace[0].toUpperCase() + replace.slice(1);
  }
};

const MissingForm = () => {
  return (
    <Box
      sx={{
        height: "50vh",
        textAlign: "center",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        border: "0.1px grey solid",
        width: "100%",
      }}
    >
      Customer did not submit form yet
    </Box>
  );
};

const FileDisplay = ({ data, label }: { data: any; label: string }) => {
  if (!data) return null;
  let url: string;
  if (data instanceof Blob) {
    url = URL.createObjectURL(data);
  } else {
    const blob = new File(
      [Uint8Array.from(atob(data?.data), (c) => c.charCodeAt(0))],
      data.name,
      {
        type: data.type,
      }
    );
    url = URL.createObjectURL(blob);
  }

  return (
    <Box sx={{ height: "80vh", width: "100%" }}>
      <p style={{ height: "20px" }}>{label}</p>
      {data.type === "application/pdf" ? (
        <iframe src={url} style={{ height: "70vh", width: "95%" }} />
      ) : (
        <img
          src={url}
          style={{
            width: "97%",
            objectFit: "cover",
            height: "70vh",
            border: "1px white solid",
          }}
        />
      )}
    </Box>
  );
};
