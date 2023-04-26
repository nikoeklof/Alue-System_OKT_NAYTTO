import React, { useState } from "react";
import {
  Box,
  Typography,
  Modal,
  Button,
  FormGroup,
  FormControl,
  TextField,
  FormControlLabel,
  Switch,
} from "@mui/material";

import theme from "../style/theme";

const styles = {
  modal: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "50%",
    backgroundColor: theme.bgColor.default,
    boxShadow: 24,
    borderRadius: 2,
    px: 4,
    py: 3,
  },
  header: {
    mb: 2,
    pb: 1,
    borderBottom: "1px solid",
    borderColor: theme.color.primary,
  },
  input: {
    m: 0.5,
  },
  button: {
    float: "right",
    m: 0.5,
    mt: 2,
  },
};

const CreateUserModal = ({ ...createProps }) => {
	const [admin, setAdmin] = useState(false);
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [emailError, setEmailError] = useState('');
	const [passwordError, setPasswordError] = useState('');

	const handleClose = () => {
		setEmailError('');
		setPasswordError('');
		setEmail('');
		setPassword('');
		setAdmin(false);
		createProps.handleCreateModalClose();
	};

  const handleSubmit = () => {
    if (!password) setPasswordError("Salasana on pakollinen");
    else setPasswordError("");
    if (!email) setEmailError("Sähköposti on pakollinen");
    else setEmailError("");

		const user = {
			email,
			password,
		};
		createProps.addUser(user);
		handleClose();
	};

	const handleChangeAdmin = () => {
		setAdmin(!admin);
	};

	return (
		<Modal
			component='div'
			open={createProps.openCreate}
			onClose={handleClose}
		>
			<Box sx={styles.modal}>
				<Typography
					variant='h6'
					component='h2'
					sx={styles.header}
				>
					Luo käyttäjä
				</Typography>
				<FormGroup>
					<FormControl>
						<TextField
							label='Sähköposti'
							variant='outlined'
							type='email'
							onChange={(e) => setEmail(e.target.value)}
							required
							error={!email}
							helperText={emailError}
							sx={styles.input}
						/>
						<TextField
							label='Salasana'
							variant='outlined'
							type='password'
							onChange={(e) => setPassword(e.target.value)}
							required
							error={!password}
							helperText={passwordError}
							sx={styles.input}
						/>
						<FormControlLabel
							control={<Switch onChange={handleChangeAdmin} />}
							label='Admin'
							sx={styles.input}
						/>
					</FormControl>
				</FormGroup>
				<Button
					sx={styles.button}
					variant='contained'
					onClick={() => handleClose()}
				>
					Peruuta
				</Button>
				<Button
					sx={styles.button}
					variant='contained'
					onClick={() => handleSubmit()}
				>
					Valmis
				</Button>
			</Box>
		</Modal>
	);
};

export default CreateUserModal;
