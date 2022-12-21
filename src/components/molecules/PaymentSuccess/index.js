import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Container from "@atoms/GridContainer";
import Item from "@components/atoms/GridItem";
import QRCode from "react-qr-code";
import NextImage from "next/image";

export default function PaymentSuccess() {
  const registrationId = sessionStorage.getItem("registrationId");

  const handleClick = () => {
    const svg = document.getElementById("QRCode");
    const svgData = new XMLSerializer().serializeToString(svg);
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const img = new Image();
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);
      const pngFile = canvas.toDataURL("image/png");
      const downloadLink = document.createElement("a");
      downloadLink.download = "entry-pass";
      downloadLink.href = `${pngFile}`;
      downloadLink.click();
    };
    img.src = `data:image/svg+xml;base64,${btoa(svgData)}`;
  };

  return (
    <Box
      sx={{
        minHeight: "80vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
      }}
    >
      <Container
        rowSpacing={{ xs: 2 }}
        flexDirection="column"
        alignItems="center"
      >
        <Item>
          <Typography>
            {
              // eslint-disable-next-line quotes
              "Download your entry QR code and don't share it to anyone. It will work only for single entry."
            }
          </Typography>
        </Item>
        {registrationId && (
          <>
            <Item>
              <Box component={Paper} sx={{ p: 2, border: "5px solid #2b81be" }} id="QRCode">
                <Item>
                  <NextImage
                    src="https://mhsosa.in/img/logo.png"
                    width={100}
                    height={100}
                    alt=""
                  />
                </Item>
                <Box sx={{ m: 2 }}>
                  <QRCode
                    // id="QRCode"
                    title="Entry Pass"
                    value={registrationId}
                  />
                </Box>
                <Item>
                  <Typography variant="h6">2nd Alumni Meet</Typography>
                  <Typography sx={{ fontWeight: 500 }}>
                    8 Jan 2023, Sunday
                  </Typography>
                  <Typography sx={{ fontWeight: 500 }}>
                    4:30 PM Onwards
                  </Typography>
                  <Typography sx={{ fontWeight: 500 }}>
                    MHS School, Tilak Nagar, Jaipur
                  </Typography>
                </Item>
              </Box>
            </Item>
            <Item>
              <Button onClick={handleClick}>Download Ticket</Button>
            </Item>
          </>
        )}
      </Container>
    </Box>
  );
}
