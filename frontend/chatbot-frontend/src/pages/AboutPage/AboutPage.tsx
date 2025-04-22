import React from "react";
import { Container, Typography, Paper, Box, Grid } from "@mui/material";
import NavigationBar from "../../components/NavigationBar";

const AboutPage: React.FC = () => {
  return (
    <div>
      <NavigationBar />
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
          <Typography variant="h4" component="h1" gutterBottom>
            About Us
          </Typography>

          <Box sx={{ my: 4 }}>
            <Typography variant="h5" gutterBottom>
              Our Mission
            </Typography>
            <Typography variant="body1" paragraph>
              We are dedicated to providing accessible and accurate medical
              information through our advanced AI chatbot. Our mission is to
              help people get quick answers to their medical questions, while
              encouraging them to seek professional medical advice when needed.
            </Typography>
          </Box>

          <Grid container spacing={4} sx={{ my: 4 }}>
            <Grid item xs={12} md={6}>
              <Typography variant="h5" gutterBottom>
                Our Technology
              </Typography>
              <Typography variant="body1" paragraph>
                Our chatbot is powered by state-of-the-art natural language
                processing and machine learning algorithms. We continuously
                train our models with the latest medical research and
                information to ensure the highest level of accuracy.
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="h5" gutterBottom>
                Our Team
              </Typography>
              <Typography variant="body1" paragraph>
                Our team consists of experienced software engineers, data
                scientists, and medical professionals who work together to
                create a reliable and user-friendly medical information service.
              </Typography>
            </Grid>
          </Grid>

          <Box sx={{ my: 4 }}>
            <Typography variant="h5" gutterBottom>
              Disclaimer
            </Typography>
            <Typography variant="body1" paragraph>
              While we strive to provide accurate information, our chatbot is
              not a substitute for professional medical advice, diagnosis, or
              treatment. Always consult with a qualified healthcare provider for
              medical concerns.
            </Typography>
          </Box>
        </Paper>
      </Container>
    </div>
  );
};

export default AboutPage;
