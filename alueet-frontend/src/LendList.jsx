import React, { useEffect, useState } from 'react';
import {
	Container,
	Paper,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TablePagination,
	TableRow,
	Typography,
} from '@mui/material';
import { InfinitySpin } from 'react-loader-spinner';
import {
	ALLOW_AREA_REQUEST,
	AREAS_WITH_REQUESTS,
	DENY_LOAN_REQUEST,
} from './queries';

import { useMutation, useQuery } from '@apollo/client';

import theme from './style/theme';

import DeleteWarningModal from './components/DeleteWarningModal';
import LendListTableRowComponent from './components/LendListTableRowComponent';

const styles = {
	container: {
		mb: 8,
	},
	mainText: {
		borderBottom: 'solid',
		borderColor: theme.bgColor.secondary,
		borderWidth: 1,
		mt: 4,
		mb: 2,
		pb: 2,
	},
	button: {
		m: 0.5,
	},
};

const columns = [
	{
		id: 'area',
		label: 'Alue',
		minWidth: 170,
	},
	{ id: 'info', label: 'Alueen tiedot', minWidth: 170, textAlign: 'center' },
	{
		id: 'city',
		label: 'Kaupunki',
		minWidth: 170,
	},
];

const LendList = () => {
	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(10);
	const [openDel, setDelOpen] = useState(false);
	// const [warningText, setWarningText] = useState('');
	const [areasWithRequests, setAreasWithRequests] = useState(null);

	const {
		data: areaData,
		// loading: areaLoading,
		// error: areaError,
		refetch: areaRefetch,
	} = useQuery(AREAS_WITH_REQUESTS, { variables: { hasRequests: true } });

	const [denyLoanRequest] = useMutation(DENY_LOAN_REQUEST, {
		onError: (e) => {
			console.log(e);
		},
	});

	const [loanAreaMutation] = useMutation(ALLOW_AREA_REQUEST, {
		onError: (e) => {
			console.log(e);
		},
	});

	const handleChangePage = (event, newPage) => {
		setPage(newPage);
	};

	const handleChangeRowsPerPage = (event) => {
		setRowsPerPage(+event.target.value);
		setPage(0);
	};

	const delProps = {
		openDel,
		handleCloseDelModal: () => setDelOpen(false),
		// warningText,
	};
	useEffect(() => {
		setAreasWithRequests(areaData?.allAreas);
	}, [areaData]);

	return areasWithRequests ? (
		<Container sx={styles.container}>
			<Typography
				variant='h6'
				sx={styles.mainText}
			>
				Lainauslista
			</Typography>
			<Paper sx={styles.form}>
				<TableContainer sx={{ maxHeight: 440 }}>
					<Table
						stickyHeader
						aria-label='sticky label'
					>
						<TableHead>
							<TableRow>
								{columns.map((column) => (
									<TableCell
										key={column.id}
										align={column.align}
										style={{
											minWidth: column.minWidth,
											textAlign:
												column.textAlign || 'left',
										}}
									>
										{column.label}
									</TableCell>
								))}
							</TableRow>
						</TableHead>
						<TableBody>
							{areasWithRequests.map((area, i) => {
								return (
									<LendListTableRowComponent
										key={i}
										area={area}
										allowLoan={loanAreaMutation}
										denyLoan={denyLoanRequest}
										refetch={areaRefetch}
									/>
								);
							})}
						</TableBody>
					</Table>
					<TablePagination
						rowsPerPageOptions={[5, 10, 25, 50, 100]}
						component='div'
						count={areasWithRequests.length}
						rowsPerPage={rowsPerPage}
						page={page}
						labelRowsPerPage='Rivejä per sivu:'
						onPageChange={handleChangePage}
						onRowsPerPageChange={handleChangeRowsPerPage}
					/>
				</TableContainer>
			</Paper>
			<DeleteWarningModal {...delProps} />
		</Container>
	) : (
		<div
			style={{
				marginLeft: '40%',
				marginTop: '15%',
				paddingBottom: '0px',
			}}
		>
			<InfinitySpin
				width='200'
				color='gray'
				wrapperStyle
				wrapperClass
				ariaLabel='loading'
			/>
		</div>
	);
};

export default LendList;
