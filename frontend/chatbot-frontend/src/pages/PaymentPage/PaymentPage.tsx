import React, { useState } from "react";
import {
  Container,
  Typography,
  Paper,
  Box,
  TextField,
  Button,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import NavigationBar from "../../components/NavigationBar";
import { SelectChangeEvent } from "@mui/material/Select";

const PaymentPage: React.FC = () => {
  const [formData, setFormData] = useState({
    cardNumber: "",
    cardHolder: "",
    expiryDate: "",
    cvv: "",
    plan: "premium",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isFlipped, setIsFlipped] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    let formattedValue = value;

    // Format card number with spaces
    if (name === "cardNumber") {
      formattedValue = value
        .replace(/\s/g, "")
        .replace(/(\d{4})/g, "$1 ")
        .trim()
        .slice(0, 19);
    }
    // Format expiry date
    else if (name === "expiryDate") {
      // Remove all non-digits
      const digits = value.replace(/\D/g, "");
      
      // Format with slash
      if (digits.length > 2) {
        formattedValue = `${digits.slice(0, 2)}/${digits.slice(2, 4)}`;
      } else {
        formattedValue = digits;
      }
    }
    // Format CVV
    else if (name === "cvv") {
      formattedValue = value.replace(/\D/g, "").slice(0, 3);
      // Flip card when entering CVV
      setIsFlipped(value.length > 0);
    }

    setFormData((prev) => ({
      ...prev,
      [name]: formattedValue,
    }));
  };

  const handleSelectChange = (e: SelectChangeEvent) => {
    setFormData((prev) => ({
      ...prev,
      plan: e.target.value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Add payment processing logic here
    console.log("Payment submitted:", formData);
  };

  // Get card type based on number
  const getCardType = (number: string) => {
    const firstDigit = number.charAt(0);
    const firstTwoDigits = number.substring(0, 2);
    
    if (firstDigit === "4") return "visa";
    if (["51", "52", "53", "54", "55"].includes(firstTwoDigits)) return "mastercard";
    if (["34", "37"].includes(firstTwoDigits)) return "amex";
    return "unknown";
  };

  const cardType = getCardType(formData.cardNumber.replace(/\s/g, ""));

  return (
    <div>
      <NavigationBar />
      <Container 
        maxWidth="lg" 
        sx={{ 
          mt: 4, 
          mb: 4,
          px: { xs: 2, sm: 3, md: 4 } // Add responsive padding
        }}
      >
        <Grid container spacing={4}>
          {/* Card Preview */}
          <Grid item xs={12} md={5}>
            <Box
              sx={{
                perspective: "1000px",
                width: "100%",
                maxWidth: { xs: "320px", sm: "400px", md: "600px" }, // Responsive max-width
                margin: "0 auto",
                px: { xs: 2, sm: 0 } // Add horizontal padding on mobile
              }}
            >
              <Box
                sx={{
                  position: "relative",
                  width: "100%",
                  height: 0,
                  paddingBottom: "63%", // Standard credit card aspect ratio
                  transformStyle: "preserve-3d",
                  transition: "transform 0.6s",
                  transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
                }}
              >
                {/* Front of Card */}
                <Paper
                  elevation={3}
                  sx={{
                    position: "absolute",
                    width: "100%",
                    height: "100%",
                    backfaceVisibility: "hidden",
                    borderRadius: "15px",
                    background: "linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)",
                    color: "white",
                    p: { xs: 2, sm: 3, md: 4 },
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                  }}
                >
                  {/* Card Type Icon */}
                  <Box sx={{ position: "absolute", top: 20, right: 20 }}>
                    {cardType === "visa" && (
                      <Typography variant="h5" sx={{ fontWeight: "bold" }}>
                        VISA
                      </Typography>
                    )}
                    {cardType === "mastercard" && (
                      <Typography variant="h5" sx={{ fontWeight: "bold" }}>
                        MASTERCARD
                      </Typography>
                    )}
                    {cardType === "amex" && (
                      <Typography variant="h5" sx={{ fontWeight: "bold" }}>
                        AMEX
                      </Typography>
                    )}
                  </Box>

                  {/* Card Chip */}
                  <Box
                    sx={{
                      width: { xs: "40px", sm: "50px", md: "60px" },
                      height: { xs: "30px", sm: "40px", md: "50px" },
                      background: "linear-gradient(135deg, #FFD700 0%, #FFA500 100%)",
                      borderRadius: "5px",
                      mt: 2,
                      position: "relative",
                      "&::after": {
                        content: '""',
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        width: "80%",
                        height: "2px",
                        background: "rgba(0,0,0,0.2)",
                      },
                    }}
                  />

                  {/* Card Number */}
                  <Box sx={{ mt: 4 }}>
                    <Typography 
                      variant="h5" 
                      sx={{ 
                        letterSpacing: 2,
                        fontSize: { xs: "1.2rem", sm: "1.5rem", md: "1.8rem" }
                      }}
                    >
                      {formData.cardNumber || "•••• •••• •••• ••••"}
                    </Typography>
                  </Box>

                  {/* Card Details */}
                  <Box sx={{ mt: "auto" }}>
                    <Grid container spacing={2}>
                      <Grid item xs={8}>
                        <Typography variant="body2" sx={{ opacity: 0.8 }}>
                          Card Holder
                        </Typography>
                        <Typography 
                          variant="body1" 
                          sx={{ 
                            textTransform: "uppercase",
                            fontSize: { xs: "0.9rem", sm: "1rem", md: "1.1rem" },
                            wordBreak: "break-word"
                          }}
                        >
                          {formData.cardHolder || "YOUR NAME"}
                        </Typography>
                      </Grid>
                      <Grid item xs={4}>
                        <Typography variant="body2" sx={{ opacity: 0.8 }}>
                          Expires
                        </Typography>
                        <Typography 
                          variant="body1"
                          sx={{
                            fontSize: { xs: "0.9rem", sm: "1rem", md: "1.1rem" }
                          }}
                        >
                          {formData.expiryDate || "MM/YY"}
                        </Typography>
                      </Grid>
                    </Grid>
                  </Box>
                </Paper>

                {/* Back of Card */}
                <Paper
                  elevation={3}
                  sx={{
                    position: "absolute",
                    width: "100%",
                    height: "100%",
                    backfaceVisibility: "hidden",
                    transform: "rotateY(180deg)",
                    borderRadius: "15px",
                    background: "linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)",
                    color: "white",
                    p: { xs: 2, sm: 3, md: 4 },
                  }}
                >
                  {/* Magnetic Stripe */}
                  <Box
                    sx={{
                      width: "100%",
                      height: { xs: "30px", sm: "40px", md: "50px" },
                      background: "#000",
                      mt: 2,
                    }}
                  />

                  {/* Signature Strip */}
                  <Box
                    sx={{
                      width: "80%",
                      height: { xs: "30px", sm: "40px", md: "50px" },
                      background: "white",
                      mt: 3,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "flex-end",
                      pr: 2,
                    }}
                  >
                    <Typography 
                      variant="body2" 
                      color="black"
                      sx={{
                        fontSize: { xs: "0.9rem", sm: "1rem", md: "1.1rem" }
                      }}
                    >
                      {formData.cvv || "CVV"}
                    </Typography>
                  </Box>
                </Paper>
              </Box>
            </Box>
          </Grid>

          {/* Payment Form */}
          <Grid item xs={12} md={7}>
            <Paper 
              elevation={3} 
              sx={{ 
                p: { xs: 2, sm: 3, md: 4 }, // Responsive padding
                borderRadius: 2,
                mx: { xs: 2, sm: 0 } // Add horizontal margin on mobile
              }}
            >
              <Typography variant="h4" component="h1" gutterBottom align="center">
                Complete Your Payment
              </Typography>
              <Typography variant="subtitle1" color="text.secondary" align="center" sx={{ mb: 4 }}>
                Enter your payment details to subscribe to our premium plan
              </Typography>

              <Box component="form" onSubmit={handleSubmit} noValidate>
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      label="Card Number"
                      name="cardNumber"
                      value={formData.cardNumber}
                      onChange={handleChange}
                      error={!!errors.cardNumber}
                      helperText={errors.cardNumber}
                      placeholder="1234 5678 9012 3456"
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      label="Card Holder Name"
                      name="cardHolder"
                      value={formData.cardHolder}
                      onChange={handleChange}
                      error={!!errors.cardHolder}
                      helperText={errors.cardHolder}
                      placeholder="John Doe"
                    />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      fullWidth
                      label="Expiry Date"
                      name="expiryDate"
                      value={formData.expiryDate}
                      onChange={handleChange}
                      error={!!errors.expiryDate}
                      helperText={errors.expiryDate}
                      placeholder="MM/YY"
                    />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      fullWidth
                      label="CVV"
                      name="cvv"
                      value={formData.cvv}
                      onChange={handleChange}
                      error={!!errors.cvv}
                      helperText={errors.cvv}
                      placeholder="123"
                      onFocus={() => setIsFlipped(true)}
                      onBlur={() => setIsFlipped(false)}
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <FormControl fullWidth>
                      <InputLabel>Subscription Plan</InputLabel>
                      <Select
                        name="plan"
                        value={formData.plan}
                        onChange={handleSelectChange}
                        label="Subscription Plan"
                      >
                        <MenuItem value="premium">Premium - $9.99/month</MenuItem>
                        <MenuItem value="professional">Professional - $29.99/month</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>

                  <Grid item xs={12}>
                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      size="large"
                      sx={{
                        mt: 2,
                        py: 1.5,
                        fontSize: "1.1rem",
                      }}
                    >
                      Pay Now
                    </Button>
                  </Grid>
                </Grid>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default PaymentPage; 