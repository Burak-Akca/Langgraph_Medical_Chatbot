import React, { useState } from "react";
import {
  Container,
  Typography,
  Paper,
  Box,
  Grid,
  TextField,
  Button,
  Snackbar,
  Alert,
  Card,
  CardContent,
  IconButton,
} from "@mui/material";
import {
  Email as EmailIcon,
  Phone as PhoneIcon,
  LocationOn as LocationIcon,
  Facebook as FacebookIcon,
  Twitter as TwitterIcon,
  LinkedIn as LinkedInIcon,
} from "@mui/icons-material";
import NavigationBar from "../../components/NavigationBar";
import axios from "axios";

interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [errors, setErrors] = useState<Partial<ContactFormData>>({});
  const [snackbarOpen, setSnackbarOpen] = useState<boolean>(false);
  const [snackbarMessage, setSnackbarMessage] = useState<string>("");
  const [snackbarSeverity, setSnackbarSeverity] = useState<"success" | "error">("success");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ): void => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error when user types
    if (errors[name as keyof ContactFormData]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<ContactFormData> = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }

    if (!formData.subject.trim()) {
      newErrors.subject = "Subject is required";
    }

    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // eslint-disable-next-line no-debugger
  const handleSubmit = async (e: React.FormEvent): Promise<void> => {debugger
    e.preventDefault();

    if (validateForm()) {
      setIsSubmitting(true);
      try {
        const response = await axios.post("http://localhost:8002/api/contact", formData);
        
        // Reset form
        setFormData({
          name: "",
          email: "",
          subject: "",
          message: "",
        });

        // Show success message
        setSnackbarMessage("Your message has been sent successfully! We'll get back to you soon.");
        setSnackbarSeverity("success");
        setSnackbarOpen(true);
      } catch (error) {
        console.error("Error sending message:", error);
        setSnackbarMessage("Failed to send message. Please try again later.");
        setSnackbarSeverity("error");
        setSnackbarOpen(true);
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const handleSnackbarClose = (): void => {
    setSnackbarOpen(false);
  };

  return (
    <div>
      <NavigationBar />
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Typography
          variant="h4"
          component="h1"
          gutterBottom
          sx={{ textAlign: "center", mb: 4 }}
        >
          Contact Us
        </Typography>

        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Box>
              <Typography variant="h5" gutterBottom>
                Get In Touch
              </Typography>
              <Typography variant="body1" paragraph>
                Have questions about our services? Want to learn more about how
                our medical chatbot can help you? Fill out the form and we'll
                get back to you as soon as possible.
              </Typography>

              <Box sx={{ mt: 4 }}>
                <Card sx={{ mb: 2 }}>
                  <CardContent sx={{ display: "flex", alignItems: "center" }}>
                    <EmailIcon color="primary" sx={{ mr: 2 }} />
                    <Typography variant="body1">
                      burakakca51@gmail.com
                    </Typography>
                  </CardContent>
                </Card>

                <Card sx={{ mb: 2 }}>
                  <CardContent sx={{ display: "flex", alignItems: "center" }}>
                    <PhoneIcon color="primary" sx={{ mr: 2 }} />
                    <Typography variant="body1">+1 (555) 123-4567</Typography>
                  </CardContent>
                </Card>

                <Card sx={{ mb: 2 }}>
                  <CardContent sx={{ display: "flex", alignItems: "center" }}>
                    <LocationIcon color="primary" sx={{ mr: 2 }} />
                    <Typography variant="body1">
                      123 AI Boulevard, Tech City, TC 12345
                    </Typography>
                  </CardContent>
                </Card>
              </Box>

              <Box sx={{ mt: 4 }}>
                <Typography variant="h6" gutterBottom>
                  Follow Us
                </Typography>
                <Box sx={{ display: "flex", gap: 1 }}>
                  <IconButton color="primary" aria-label="Facebook">
                    <FacebookIcon />
                  </IconButton>
                  <IconButton color="primary" aria-label="Twitter">
                    <TwitterIcon />
                  </IconButton>
                  <IconButton color="primary" aria-label="LinkedIn">
                    <LinkedInIcon />
                  </IconButton>
                </Box>
              </Box>
            </Box>
          </Grid>

          <Grid item xs={12} md={8}>
            <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
              <Typography variant="h5" gutterBottom>
                Send Us a Message
              </Typography>

              <Box
                component="form"
                onSubmit={handleSubmit}
                noValidate
                sx={{ mt: 2 }}
              >
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      fullWidth
                      label="Your Name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      error={!!errors.name}
                      helperText={errors.name}
                      disabled={isSubmitting}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      fullWidth
                      label="Email Address"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      error={!!errors.email}
                      helperText={errors.email}
                      disabled={isSubmitting}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      label="Subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      error={!!errors.subject}
                      helperText={errors.subject}
                      disabled={isSubmitting}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      label="Message"
                      name="message"
                      multiline
                      rows={6}
                      value={formData.message}
                      onChange={handleChange}
                      error={!!errors.message}
                      helperText={errors.message}
                      disabled={isSubmitting}
                    />
                  </Grid>
                </Grid>

                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  size="large"
                  sx={{ mt: 3 }}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Sending..." : "Send Message"}
                </Button>
              </Box>
            </Paper>
          </Grid>
        </Grid>

        <Snackbar
          open={snackbarOpen}
          autoHideDuration={6000}
          onClose={handleSnackbarClose}
        >
          <Alert
            onClose={handleSnackbarClose}
            severity={snackbarSeverity}
            sx={{ width: "100%" }}
          >
            {snackbarMessage}
          </Alert>
        </Snackbar>
      </Container>
    </div>
  );
};

export default ContactPage;
