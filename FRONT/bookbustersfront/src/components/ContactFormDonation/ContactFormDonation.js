// Imports REACT
import React, { useState, useContext } from "react";
// Imports MUI
import {
  FormControl,
  Select,
  InputLabel,
  MenuItem,
  Avatar,
  Button,
  Grid,
  Box,
  CssBaseline,
  TextField,
  Typography,
  Container,
} from "@mui/material";
import ImportContactsIcon from "@mui/icons-material/ImportContacts";
import bookContext from "../../contexts/BookContext";
import authContext from "../../contexts/AuthContext";

// Import Composants
import Header from "../Header/Header";
import Copyright from "../Copyright/Copyright";

// Import React-Router-Dom
import { Link, useNavigate } from "react-router-dom";

import alertContext from "../../contexts/AlertContext";

function ContactFormDonation() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");

  const { setErrorAlert, setSuccessAlert } = useContext(alertContext);
  const { openedBook, setOpenedBook } = useContext(bookContext);
  const [connected, setConnected] = useState(false);
  console.log(connected);

  console.log(openedBook);
  return (
    <div>
      <Header />
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <ImportContactsIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Contactez le donateur
          </Typography>
          <Box
            component="form"
            noValidate
            // onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  name="pseudo"
                  required
                  fullWidth
                  id="pseudo"
                  label="Pseudo"
                  value={username}
                  autoFocus
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Votre adresse email"
                  name="email"
                  autoComplete="email"
                  value={email}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  multiline
                  rows={5}
                  defaultValue="Bonjour, votre livre est-il toujours au don ? "
                  required
                  fullWidth
                  id="message"
                  label="Votre message au donateur"
                  name="message"

                  // onChange={}
                  // value={email}
                />
              </Grid>
            </Grid>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Envoyer la demande
            </Button>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </div>
  );
}

export default ContactFormDonation;
