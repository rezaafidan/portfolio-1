import React, { useRef, useState, useEffect } from 'react';
import '../assets/styles/Contact.scss';
import emailjs from '@emailjs/browser';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import TextField from '@mui/material/TextField';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { ThemeProvider, createTheme, useTheme } from '@mui/material/styles';

function Contact() {
  useEffect(() => {
    // Remove initialization as we'll use the form reference method
  }, []);

  const mainTheme = useTheme();
  const formTheme = createTheme({
    palette: {
      mode: mainTheme.palette.mode,
      primary: {
        main: mainTheme.palette.mode === 'dark' ? '#fff' : '#1976d2',
      },
    },
    components: {
      MuiTextField: {
        styleOverrides: {
          root: {
            backgroundColor: mainTheme.palette.mode === 'dark' ? 'rgba(255,255,255,0.05)' : '#fff',
            borderRadius: '4px',
            '& .MuiOutlinedInput-root': {
              '& fieldset': {
                borderColor: mainTheme.palette.mode === 'dark' ? 'rgba(255,255,255,0.23)' : 'rgba(0,0,0,0.23)',
              },
              '&:hover fieldset': {
                borderColor: mainTheme.palette.mode === 'dark' ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.5)',
              },
              '&.Mui-focused fieldset': {
                borderColor: mainTheme.palette.mode === 'dark' ? '#fff' : '#1976d2',
              },
            },
            '& .MuiInputBase-input': {
              color: mainTheme.palette.mode === 'dark' ? '#fff' : 'rgba(0,0,0,0.87)',
            },
            '& .MuiInputLabel-root': {
              color: mainTheme.palette.mode === 'dark' ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.6)',
              '&.Mui-focused': {
                color: mainTheme.palette.mode === 'dark' ? '#fff' : '#1976d2',
              },
            },
            '& .MuiFormHelperText-root': {
              color: mainTheme.palette.mode === 'dark' ? '#ff6b6b' : '#d32f2f',
            },
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            color: mainTheme.palette.mode === 'dark' ? '#fff' : '#fff',
            backgroundColor: mainTheme.palette.mode === 'dark' ? '#1976d2' : '#1976d2',
            '&:hover': {
              backgroundColor: mainTheme.palette.mode === 'dark' ? '#1565c0' : '#1565c0',
            },
          },
        },
      },
    },
  });

  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const [nameError, setNameError] = useState<boolean>(false);
  const [emailError, setEmailError] = useState<boolean>(false);
  const [messageError, setMessageError] = useState<boolean>(false);
  const [openSnackbar, setOpenSnackbar] = useState<boolean>(false);
  const [snackbarMessage, setSnackbarMessage] = useState<string>('');
  const [snackbarSeverity, setSnackbarSeverity] = useState<'success' | 'error'>('success');

  const form = useRef<HTMLFormElement>(null);

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  const sendEmail = (e: React.FormEvent) => {
    e.preventDefault();

    setNameError(name === '');
    setEmailError(email === '');
    setMessageError(message === '');

    if (name !== '' && email !== '' && message !== '' && form.current) {
      emailjs.sendForm(
        'service_6vty9m5',
        'template_qd74snn',
        form.current,
        'Z1UFc12sx7ZwuBAcw'
      ).then(
        (response) => {
          console.log('SUCCESS!', response.status, response.text);
          setSnackbarMessage('Message sent successfully!');
          setSnackbarSeverity('success');
          setOpenSnackbar(true);
          setName('');
          setEmail('');
          setMessage('');
        },
        (error) => {
          console.log('FAILED...', error);
          setSnackbarMessage('Failed to send message. Please try again.');
          setSnackbarSeverity('error');
          setOpenSnackbar(true);
        }
      );
    }
  };

  return (
    <div id="contact">
      <div className="items-container">
        <div className="contact_wrapper">
          <h1>Contact Me</h1>
          <p>Got a project waiting to be realized? Let's collaborate and make it happen!</p>
          <ThemeProvider theme={formTheme}>
            <Box
              component="form"
              ref={form}
              noValidate
              autoComplete="off"
              className='contact-form'
              onSubmit={sendEmail}
            >
              <div className='form-flex'>
                <TextField
                  required
                  name="from_name"
                  id="outlined-required"
                  label="Your Name"
                  placeholder="What's your name?"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                  error={nameError}
                  helperText={nameError ? "Please enter your name" : ""}
                />
                <TextField
                  required
                  name="reply_to"
                  id="outlined-required"
                  label="Email / Phone"
                  placeholder="How can I reach you?"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                  error={emailError}
                  helperText={emailError ? "Please enter your email or phone number" : ""}
                />
              </div>
              <TextField
                required
                name="message"
                id="outlined-multiline-static"
                label="Message"
                placeholder="Send me any inquiries or questions"
                multiline
                rows={10}
                className="body-form"
                value={message}
                onChange={(e) => {
                  setMessage(e.target.value);
                }}
                error={messageError}
                helperText={messageError ? "Please enter the message" : ""}
              />
              <Button 
                variant="contained" 
                endIcon={<SendIcon />} 
                type="submit"
              >
                Send
              </Button>
            </Box>
          </ThemeProvider>
        </div>
      </div>
      <Snackbar 
        open={openSnackbar} 
        autoHideDuration={6000} 
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert 
          onClose={handleCloseSnackbar} 
          severity={snackbarSeverity}
          sx={{ width: '100%' }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </div>
  );
}

export default Contact;