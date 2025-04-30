import React, { useState, useRef, ChangeEvent, useEffect } from "react";
import {
  Box,
  Container,
  Typography,
  Paper,
  Avatar,
  Grid,
  TextField,
  Button,
  CircularProgress,
  Snackbar,
  Alert,
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  IconButton,
  FormHelperText,
  Badge
} from "@mui/material";
import { 
  Person as PersonIcon, 
  Edit as EditIcon, 
  Save as SaveIcon,
  Visibility as VisibilityIcon,
  VisibilityOff as VisibilityOffIcon,
  AddPhotoAlternate as AddPhotoIcon,
  Delete as DeleteIcon
} from "@mui/icons-material";
import axios from "axios";
import NavigationBar from "../../components/NavigationBar";
import getUserIdFromToken from "../../components/getUserIdFromToken";
import { useUserImage } from '../../Context/UserImageContext';
import {useUserById} from "../../hooks/GetUserInfo";

const ProfilePage: React.FC = () => {
  const userId=getUserIdFromToken();

  const [user, setUser] = useState({
    name:  "null",
    email: "null",
    role: "null",
    joinDate: "January 1, 2023",
    profileImage: ""
  });
  const fileInputRef = useRef<HTMLInputElement>(null);
  

  
  const [loading, setLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState({ ...user });

  // Image upload states
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageError, setImageError] = useState("");
  const [uploadProgress, setUploadProgress] = useState(0);
  const [userImage, setUserImage] = useState<string | null>(null);
  const { imageUrl, setImageUrl } = useUserImage();

// eslint-disable-next-line no-debugger
debugger



   useUserById({
      userId,
      setUser,
    
    });
    


  // Password states
  const [passwords, setPasswords] = useState({
    current: "",
    new: "",
    confirm: ""
  });
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false
  });
  const [passwordErrors, setPasswordErrors] = useState({
    current: "",
    new: "",
    confirm: ""
  });

  const [notification, setNotification] = useState<{ open: boolean, message: string, severity: "success" | "error" }>({ 
    open: false, 
    message: "", 
    severity: "success" 
  });



  const handleEditToggle = () => {
    // eslint-disable-next-line no-debugger
    debugger
    if (isEditing) {
      // Cancel editing
      setEditedUser({ ...user });
      // Reset password fields
      setPasswords({
        current: "",
        new: "",
        confirm: ""
      });
      setPasswordErrors({
        current: "",
        new: "",
        confirm: ""
      });
      // Reset image upload
      setSelectedImage(null);
      setImagePreview(null);
      setImageError("");
      setUploadProgress(0);
    }
    setIsEditing(!isEditing);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // eslint-disable-next-line no-debugger
    debugger
    const { name, value } = e.target;
    setEditedUser(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // eslint-disable-next-line no-debugger
    debugger
    const { name, value } = e.target;
    setPasswords(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear errors when typing
    if (passwordErrors[name as keyof typeof passwordErrors]) {
      setPasswordErrors(prev => ({
        ...prev,
        [name]: ""
      }));
    }

    // Validate confirm password when typing
    if (name === "confirm" && value !== passwords.new) {
      setPasswordErrors(prev => ({
        ...prev,
        confirm: "Passwords don't match"
      }));
    } else if (name === "confirm") {
      setPasswordErrors(prev => ({
        ...prev,
        confirm: ""
      }));
    }

    // Validate new password when typing
    if (name === "new") {
      if (value.length > 0 && value.length < 8) {
        setPasswordErrors(prev => ({
          ...prev,
          new: "Password must be at least 8 characters"
        }));
      } else {
        setPasswordErrors(prev => ({
          ...prev,
          new: ""
        }));
      }

      // Update confirm error state if confirm already has a value
      if (passwords.confirm && value !== passwords.confirm) {
        setPasswordErrors(prev => ({
          ...prev,
          confirm: "Passwords don't match"
        }));
      } else if (passwords.confirm) {
        setPasswordErrors(prev => ({
          ...prev,
          confirm: ""
        }));
      }
    }
  };

  const handleClickShowPassword = (field: keyof typeof showPasswords) => {
    setShowPasswords({
      ...showPasswords,
      [field]: !showPasswords[field]
    });
  };

  const validatePasswords = (): boolean => {
    let isValid = true;
    const errors = {
      current: "",
      new: "",
      confirm: ""
    };

    // Only validate if user is trying to change password
    if (passwords.new || passwords.confirm || passwords.current) {
      // Current password is required
      if (!passwords.current) {
        errors.current = "Current password is required";
        isValid = false;
      }

      // New password must be at least 8 characters
      if (!passwords.new) {
        errors.new = "New password is required";
        isValid = false;
      } else if (passwords.new.length < 8) {
        errors.new = "Password must be at least 8 characters";
        isValid = false;
      }

      // Confirm password must match new password
      if (!passwords.confirm) {
        errors.confirm = "Please confirm your password";
        isValid = false;
      } else if (passwords.confirm !== passwords.new) {
        errors.confirm = "Passwords don't match";
        isValid = false;
      }
    }

    setPasswordErrors(errors);
    return isValid;
  };

  const handleImageSelect = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) {
      return;
    }

    // Validate file type
    const validTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
    if (!validTypes.includes(file.type)) {
      setImageError("Please select a valid image file (JPEG, PNG, GIF, WEBP)");
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setImageError("Image size should be less than 5MB");
      return;
    }

    setImageError("");
    setSelectedImage(file);

    // Create preview
    const reader = new FileReader();
    reader.onload = () => {
      setImagePreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleImageUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleRemoveImage = () => {
    setSelectedImage(null);
    setImagePreview(null);
    setUploadProgress(0);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

 useEffect(() => {
    if (userId) {
      fetchUserImage();
    }

    // Listen for image update events from other components
    const handleImageUpdate = (event: CustomEvent<{ imageUrl: string }>) => {
      setUserImage(event.detail.imageUrl);
    };

    window.addEventListener('userImageUpdated', handleImageUpdate as EventListener);

    return () => {
      window.removeEventListener('userImageUpdated', handleImageUpdate as EventListener);
    };
  }, [userId]);


    const fetchUserImage = async () => {
      if (!userId) return;
      
      try {
        const token = sessionStorage.getItem("access_token");
        const response = await axios.get(`https://localhost:7059/api/UserImage/${userId}`, {
          headers: {
            ...(token && { Authorization: `Bearer ${token}` })
          },
          responseType: 'blob'
        });
        
        // Create an object URL from the image blob
        const imageUrl = URL.createObjectURL(response.data);
        setUserImage(imageUrl);
      } catch (error) {
        console.error('Error fetching user image:', error);
        // Silently fail - do not show error notification to user
      }
    };
  

  // Function to upload or update image on the server
const uploadImageToServer = async (file: File) => {
  if (!userId) {
    throw new Error('User ID is required for uploading profile image');
  }

  try {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('userId', userId);

    const token = sessionStorage.getItem("access_token");

    // Use axios.put instead of post
    await axios.put(
      'https://localhost:7059/api/UserImage/upload',
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
          ...(token && { Authorization: `Bearer ${token}` })
        }
      }
    );

    // Create a local URL for immediate display
    const imageUrl = URL.createObjectURL(file);

    // Dispatch an event to notify other components (like navbar) about the image update
    const imageUpdatedEvent = new CustomEvent('userImageUpdated', { 
      detail: { imageUrl } 
    });
    window.dispatchEvent(imageUpdatedEvent);

    return imageUrl;
  } catch (error) {
    console.error('Failed to upload or update image:', error);
    throw error;
  }
};


  const handleSave = async () => {
    // Validate passwords if user is trying to change them
    if ((passwords.new || passwords.confirm || passwords.current) && !validatePasswords()) {
      return;
    }

    setLoading(true);
    let updatedImage = user.profileImage;

    try {
      // If we're in edit mode and there's no image, it means the user deleted the image
      if (isEditing && !userImage && !selectedImage) {
        try {
          const token = sessionStorage.getItem("access_token");
          await axios.delete(`https://localhost:7059/api/UserImage/${userId}`, {
            headers: {
              ...(token && { Authorization: `Bearer ${token}` })
            }
          });
          updatedImage = "";
          
          // Update the UserImageContext and notify other components
          setImageUrl(null);
          const imageUpdatedEvent = new CustomEvent('userImageUpdated', { 
            detail: { imageUrl: null } 
          });
          window.dispatchEvent(imageUpdatedEvent);
        } catch (error) {
          console.error('Error deleting profile image:', error);
          setNotification({
            open: true,
            message: "Failed to delete profile photo",
            severity: "error"
          });
          setLoading(false);
          return;
        }
      }

      // Upload new image if selected
      if (selectedImage) {
        try {
          updatedImage = await uploadImageToServer(selectedImage);
        } catch (uploadError) {
          console.error("Image upload error:", uploadError);
          setNotification({
            open: true,
            message: "Failed to upload image",
            severity: "error"
          });
          setLoading(false);
          return;
        }
      }

      // In a real app, update other profile data here
      await new Promise(resolve => setTimeout(resolve, 500));

      try {
        const response = await axios.get(`http://localhost:5001/api/User/${userId}`);
        const updatedUser = {
          name: response.data.username || "Not set",
          email: response.data.email || "Not set",
          role: response.data.roles[0] || "User",
          joinDate: new Date().toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          }),
          profileImage: updatedImage
        };
        setUser(updatedUser);
      } catch (err) {
        console.error("Failed to fetch user information:", err);
        setNotification({
          open: true,
          message: "Failed to update profile information",
          severity: "error"
        });
        setLoading(false);
        return;
      }

      setIsEditing(false);
      
      // Reset password fields
      setPasswords({
        current: "",
        new: "",
        confirm: ""
      });

      // Reset image upload state
      setSelectedImage(null);
      setImagePreview(null);
      
      // Show success notification
      let message = "Profile updated successfully!";
      if (passwords.new && selectedImage) {
        message = "Profile, password, and profile photo updated successfully!";
      } else if (passwords.new) {
        message = "Profile and password updated successfully!";
      } else if (selectedImage) {
        message = "Profile and profile photo updated successfully!";
      } else if (!userImage && !selectedImage) {
        message = "Profile photo deleted successfully!";
      }
      
      setNotification({
        open: true,
        message,
        severity: "success"
      });
    } catch (err) {
      // Show error notification
      setNotification({
        open: true,
        message: "Failed to update profile",
        severity: "error"
      });
      console.error("Error updating profile:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleCloseNotification = () => {
    setNotification(prev => ({ ...prev, open: false }));
  };

  // Create a complementary gradient for the profile header
  const profileHeaderGradient = "linear-gradient(135deg, #6a11cb 0%, #2575fc 100%)";

  // Determine the image to display in avatar
  const avatarImage = imagePreview || user.profileImage;

  const handleDeleteProfileImage = () => {
    // Only clear the local state
    setUserImage(null);
    setUser(prev => ({ ...prev, profileImage: "" }));
    setImagePreview(null);
    setSelectedImage(null);
  };

  return (
    <>
      <NavigationBar />
      <Container maxWidth="md" sx={{ mt: 5, mb: 5 }}>
        <Paper
          elevation={3}
          sx={{
            borderRadius: 2,
            overflow: "hidden"
          }}
        >
          {/* Profile Header */}
          <Box
            sx={{
              background: profileHeaderGradient,
              color: "white",
              py: 2,
              px: 4,
              display: "flex",
              alignItems: "center",
              gap: 3
            }}
          >
            <Badge
              overlap="circular"
              anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
              badgeContent={
                isEditing ? (
                  <IconButton
                    size="small"
                    sx={{
                      bgcolor: '#2575fc',
                      color: 'white',
                      '&:hover': { bgcolor: '#1a65e6' }
                    }}
                    onClick={handleImageUploadClick}
                  >
                    <AddPhotoIcon />
                  </IconButton>
                ) : null
              }
            >
              <Box sx={{ position: 'relative' }}>
                <Avatar 
                  src={userImage || imageUrl || avatarImage}
                  sx={{ 
                    width: 80, 
                    height: 80,
                    border: "3px solid rgba(255,255,255,0.8)",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.2)"
                  }}
                >
                  {!avatarImage && <PersonIcon sx={{ fontSize: 50 }} />}
                </Avatar>
                {isEditing && (userImage || imageUrl || avatarImage) && (
                  <IconButton
                    size="small"
                    sx={{
                      position: 'absolute',
                      top: -8,
                      right: -8,
                      bgcolor: 'error.main',
                      color: 'white',
                      '&:hover': { bgcolor: 'error.dark' }
                    }}
                    onClick={handleDeleteProfileImage}
                  >
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                )}
              </Box>
            </Badge>
            <Box>
              <Typography variant="h5" fontWeight="bold" sx={{ mb: 0.5 }}>
                {user.name}
              </Typography>
              <Typography variant="body1">
                {user.role}
              </Typography>
            </Box>
          </Box>

          {/* Profile Content */}
          <Box sx={{ p: 4 }}>
            <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 3 }}>
              <Button
                variant={isEditing ? "outlined" : "contained"}
                color={isEditing ? "error" : "primary"}
                onClick={handleEditToggle}
                disabled={loading}
                startIcon={isEditing ? null : <EditIcon />}
              >
                {isEditing ? "Cancel" : "Edit Profile"}
              </Button>
            </Box>

            {/* Hidden file input */}
            <input
              type="file"
              ref={fileInputRef}
              style={{ display: 'none' }}
              accept="image/jpeg,image/png,image/gif,image/webp"
              onChange={handleImageSelect}
            />

            {isEditing && imagePreview && (
              <Box sx={{ mb: 3, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Typography variant="subtitle1" fontWeight="bold" gutterBottom color="primary.main">
                  Selected Profile Photo
                </Typography>
                <Box sx={{ position: 'relative', mb: 1 }}>
                  <Avatar 
                    src={imagePreview} 
                    sx={{ width: 100, height: 100 }}
                  />
                  <IconButton
                    size="small"
                    sx={{
                      position: 'absolute',
                      top: -8,
                      right: -8,
                      bgcolor: 'error.main',
                      color: 'white',
                      '&:hover': { bgcolor: 'error.dark' }
                    }}
                    onClick={handleRemoveImage}
                  >
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                </Box>
                {uploadProgress > 0 && uploadProgress < 100 && (
                  <Box sx={{ width: '100%', maxWidth: 200, mt: 1 }}>
                    <Typography variant="caption" display="block" gutterBottom>
                      Uploading: {uploadProgress}%
                    </Typography>
                    <Box
                      sx={{
                        width: '100%',
                        height: 4,
                        bgcolor: '#e0e0e0',
                        borderRadius: 2,
                        position: 'relative',
                        overflow: 'hidden'
                      }}
                    >
                      <Box
                        sx={{
                          position: 'absolute',
                          top: 0,
                          left: 0,
                          height: '100%',
                          width: `${uploadProgress}%`,
                          bgcolor: 'primary.main',
                          borderRadius: 2,
                          transition: 'width 0.3s ease'
                        }}
                      />
                    </Box>
                  </Box>
                )}
                {imageError && (
                  <Typography color="error" variant="caption">
                    {imageError}
                  </Typography>
                )}
              </Box>
            )}

            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <Typography variant="subtitle1" fontWeight="bold" gutterBottom color="primary.main">
                  Full Name
                </Typography>
                {isEditing ? (
                  <TextField
                    fullWidth
                    name="name"
                    value={user.name}
                    onChange={handleChange}
                    variant="outlined"
                    size="small"
                  />
                ) : (
                  <Typography variant="body1">{user.name}</Typography>
                )}
              </Grid>
              
              <Grid item xs={12} sm={6}>
                <Typography variant="subtitle1" fontWeight="bold" gutterBottom color="primary.main">
                  Email Address
                </Typography>
                {isEditing ? (
                  <TextField
                    fullWidth
                    name="email"
                    value={user.email}
                    onChange={handleChange}
                    variant="outlined"
                    size="small"
                    type="email"
                  />
                ) : (
                  <Typography variant="body1">{user.email}</Typography>
                )}
              </Grid>
              
              <Grid item xs={12} sm={6}>
                <Typography variant="subtitle1" fontWeight="bold" gutterBottom color="primary.main">
                  Role
                </Typography>
                <Typography variant="body1">{user.role}</Typography>
              </Grid>
              
              <Grid item xs={12} sm={6}>
                <Typography variant="subtitle1" fontWeight="bold" gutterBottom color="primary.main">
                  Joined
                </Typography>
                <Typography variant="body1">{user.joinDate}</Typography>
              </Grid>

              {isEditing && (
                <>
                  <Grid item xs={12}>
                    <Typography variant="subtitle1" fontWeight="bold" gutterBottom color="primary.main" sx={{ mt: 2 }}>
                      Change Password
                    </Typography>
                  </Grid>
                  
                  <Grid item xs={12} sm={6}>
                    <FormControl 
                      fullWidth 
                      variant="outlined" 
                      size="small"
                      error={!!passwordErrors.current}
                    >
                      <InputLabel htmlFor="current-password">Current Password</InputLabel>
                      <OutlinedInput
                        id="current-password"
                        name="current"
                        type={showPasswords.current ? 'text' : 'password'}
                        value={passwords.current}
                        onChange={handlePasswordChange}
                        endAdornment={
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={() => handleClickShowPassword('current')}
                              edge="end"
                            >
                              {showPasswords.current ? <VisibilityOffIcon /> : <VisibilityIcon />}
                            </IconButton>
                          </InputAdornment>
                        }
                        label="Current Password"
                      />
                      {passwordErrors.current && (
                        <FormHelperText error>{passwordErrors.current}</FormHelperText>
                      )}
                    </FormControl>
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <FormControl 
                      fullWidth 
                      variant="outlined" 
                      size="small"
                      error={!!passwordErrors.new}
                    >
                      <InputLabel htmlFor="new-password">New Password</InputLabel>
                      <OutlinedInput
                        id="new-password"
                        name="new"
                        type={showPasswords.new ? 'text' : 'password'}
                        value={passwords.new}
                        onChange={handlePasswordChange}
                        endAdornment={
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={() => handleClickShowPassword('new')}
                              edge="end"
                            >
                              {showPasswords.new ? <VisibilityOffIcon /> : <VisibilityIcon />}
                            </IconButton>
                          </InputAdornment>
                        }
                        label="New Password"
                      />
                      {passwordErrors.new && (
                        <FormHelperText error>{passwordErrors.new}</FormHelperText>
                      )}
                    </FormControl>
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <FormControl 
                      fullWidth 
                      variant="outlined" 
                      size="small"
                      error={!!passwordErrors.confirm}
                    >
                      <InputLabel htmlFor="confirm-password">Confirm New Password</InputLabel>
                      <OutlinedInput
                        id="confirm-password"
                        name="confirm"
                        type={showPasswords.confirm ? 'text' : 'password'}
                        value={passwords.confirm}
                        onChange={handlePasswordChange}
                        endAdornment={
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={() => handleClickShowPassword('confirm')}
                              edge="end"
                            >
                              {showPasswords.confirm ? <VisibilityOffIcon /> : <VisibilityIcon />}
                            </IconButton>
                          </InputAdornment>
                        }
                        label="Confirm New Password"
                      />
                      {passwordErrors.confirm && (
                        <FormHelperText error>{passwordErrors.confirm}</FormHelperText>
                      )}
                    </FormControl>
                  </Grid>
                </>
              )}
            </Grid>

            {isEditing && (
              <Box sx={{ mt: 4, display: "flex", justifyContent: "center" }}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleSave}
                  disabled={loading}
                  startIcon={loading ? undefined : <SaveIcon />}
                >
                  {loading ? <CircularProgress size={24} /> : "Save Changes"}
                </Button>
              </Box>
            )}
          </Box>
        </Paper>
      </Container>

      <Snackbar 
        open={notification.open} 
        autoHideDuration={4000} 
        onClose={handleCloseNotification}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert 
          onClose={handleCloseNotification} 
          severity={notification.severity} 
          sx={{ width: '100%' }}
        >
          {notification.message}
        </Alert>
      </Snackbar>
    </>
  );
};

export default ProfilePage; 