import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Typography,
  Paper,
  Box,
  Grid,
  Card,
  CardContent,
  CardHeader,
  Button,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { Check as CheckIcon } from "@mui/icons-material";
import NavigationBar from "../../components/NavigationBar";

interface PricingPlan {
  title: string;
  price: string;
  description: string;
  features: string[];
  buttonText: string;
  highlighted?: boolean;
}

const PricesPage: React.FC = () => {
  const navigate = useNavigate();

  const pricingPlans: PricingPlan[] = [
    {
      title: "Basic",
      price: "$0",
      description: "Perfect for occasional users",
      features: [
        "10 medical queries per day",
        "Basic medical information",
        "Text-based responses",
        "Web access only",
      ],
      buttonText: "Get Started",
    },
    {
      title: "Premium",
      price: "$9.99/month",
      description: "Ideal for regular users",
      features: [
        "Unlimited medical queries",
        "Detailed medical information",
        "Priority response time",
        "Web and mobile access",
        "Save conversation history",
      ],
      buttonText: "Subscribe Now",
      highlighted: true,
    },
    {
      title: "Professional",
      price: "$29.99/month",
      description: "For healthcare professionals",
      features: [
        "All Premium features",
        "Advanced medical terminology",
        "Research paper references",
        "API access",
        "Team accounts",
        "24/7 priority support",
      ],
      buttonText: "Contact Sales",
    },
  ];

  const handleSubscribe = (plan: string) => {
    if (plan === "Premium" || plan === "Professional") {
      navigate("/payment");
    }
  };

  return (
    <div>
      <NavigationBar />
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Box sx={{ textAlign: "center", mb: 6 }}>
          <Typography variant="h4" component="h1" gutterBottom>
            Pricing Plans
          </Typography>
          <Typography
            variant="subtitle1"
            color="text.secondary"
            sx={{ maxWidth: 600, mx: "auto" }}
          >
            Choose the plan that fits your needs. All plans include access to
            our AI-powered medical chatbot.
          </Typography>
        </Box>

        <Grid container spacing={4} justifyContent="center">
          {pricingPlans.map((plan) => (
            <Grid item xs={12} md={4} key={plan.title}>
              <Card
                elevation={plan.highlighted ? 8 : 2}
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  borderRadius: 2,
                  position: "relative",
                  ...(plan.highlighted && {
                    border: "2px solid",
                    borderColor: "primary.main",
                  }),
                }}
              >
                {plan.highlighted && (
                  <Box
                    sx={{
                      position: "absolute",
                      top: 0,
                      right: 0,
                      backgroundColor: "primary.main",
                      color: "white",
                      px: 2,
                      py: 0.5,
                      borderBottomLeftRadius: 8,
                    }}
                  >
                    <Typography variant="subtitle2">Most Popular</Typography>
                  </Box>
                )}

                <CardHeader
                  title={plan.title}
                  titleTypographyProps={{ align: "center", variant: "h5" }}
                  sx={{
                    backgroundColor: plan.highlighted
                      ? "primary.light"
                      : "grey.100",
                    color: plan.highlighted
                      ? "primary.contrastText"
                      : "inherit",
                  }}
                />

                <CardContent
                  sx={{ flexGrow: 1, display: "flex", flexDirection: "column" }}
                >
                  <Box sx={{ textAlign: "center", mb: 2 }}>
                    <Typography component="h2" variant="h3">
                      {plan.price}
                    </Typography>
                    <Typography variant="subtitle1" color="text.secondary">
                      {plan.description}
                    </Typography>
                  </Box>

                  <List sx={{ flexGrow: 1, mb: 2 }}>
                    {plan.features.map((feature) => (
                      <ListItem key={feature} sx={{ py: 0.5 }}>
                        <ListItemIcon sx={{ minWidth: 36 }}>
                          <CheckIcon color="primary" />
                        </ListItemIcon>
                        <ListItemText primary={feature} />
                      </ListItem>
                    ))}
                  </List>

                  <Button
                    fullWidth
                    variant={plan.highlighted ? "contained" : "outlined"}
                    color="primary"
                    onClick={() => handleSubscribe(plan.title)}
                  >
                    {plan.buttonText}
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        <Box
          sx={{
            textAlign: "center",
            mt: 8,
            p: 4,
            bgcolor: "background.paper",
            borderRadius: 2,
          }}
        >
          <Typography variant="h5" gutterBottom>
            Need a custom plan for your organization?
          </Typography>
          <Typography variant="body1" paragraph>
            Contact our sales team to discuss custom pricing options for larger
            organizations.
          </Typography>
          <Button variant="contained" color="primary" size="large">
            Contact Sales
          </Button>
        </Box>
      </Container>
    </div>
  );
};

export default PricesPage;
