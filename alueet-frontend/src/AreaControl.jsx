import React, { useState, useEffect } from 'react';
import {
  Container,
  Grid,
  Typography,
  Paper,
  TableContainer,
  Table,
  TableBody,
  TextField,
  TablePagination,
  Autocomplete,
} from "@mui/material";
import { InfinitySpin } from "react-loader-spinner";

import theme from './style/theme';
import AreaMap from './AreaMap';
import AreaTableRowComponent from './components/AreaTableRowComponent';
import { ALLOW_AREA_REQUEST, FILTERED_AREAS, MAKE_REQUEST } from './queries';
import { useMutation, useQuery } from '@apollo/client';
import { cities } from './db/cities';

const styles = {
	container: {
		mb: 8,
	},
	areas: {
		flewGrow: 1,
	},
	selectMenu: {
		display: 'flex',
		flexWrap: 'wrap',
		gap: 0.5,
	},
	menuProps: {
		PaperProps: {
			style: {
				maxHeight: 200,
				width: 250,
			},
		},
	},
	mainText: {
		borderBottom: 'solid',
		borderColor: theme.bgColor.secondary,
		borderWidth: 1,
		mt: 4,
		mb: 2,
		pb: 2,
	},
	search: {
		mb: 2,
		ml: 2,
		width: '96%',
	},
	form: {
		width: '100%',
	},
	areainfo: {
		backgroundColor: theme.bgColor.primary,
		border: 'solid',
		borderColor: theme.bgColor.secondary,
		borderWidth: 1,
		borderRadius: 1,
		display: 'flex',
		py: 2,
		my: 1,
	},
	info: {
		flexGrow: 2,
	},
	infotext: {
		mb: 0.5,
	},
	button: {},
	areaButton: {
		m: 0.5,
	},
};

const AreaControl = () => {
	const defaultFilter = localStorage.getItem('defaultFilter');
	if (!defaultFilter || defaultFilter === 'null')
		localStorage.setItem('defaultFilter', 'Mikkeli');

	const [selectedArea, setSelectedArea] = useState(undefined);
	const [hoverStatus, setHoverStatus] = useState(undefined);
	const [cityFilter, setCityFilter] = useState(
		defaultFilter ? defaultFilter : cities[0].Kunta
	);
	const [cityFilterInput, setCityFilterInput] = useState('');
	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(10);
	const [filteredAreas, setFilteredAreas] = useState(null);
	const [cityIndex, setCityIndex] = useState(
		cities.findIndex((city) => city.Kunta === defaultFilter)
	);

  const { loading, data, refetch } = useQuery(FILTERED_AREAS, {
    variables: { cityName: cityFilter },
    onError: (e) => {
      console.log(e);
    },
  });

	const [makeAreaRequest] = useMutation(MAKE_REQUEST, {
		onError: (e) => {
			console.log(e);
		},
	});
	const [loanAreaMutation] = useMutation(ALLOW_AREA_REQUEST, {
		onError: (e) => {
			console.log(e);
		},
	});

	useEffect(() => {
		setFilteredAreas(data?.allAreas);
	}, [data, loading, filteredAreas]);

	useEffect(() => {
		console.log(selectedArea);
	}, [selectedArea, setSelectedArea]);

	const handleChangePage = (event, newPage) => {
		setPage(newPage);
	};

	const handleChangeRowsPerPage = (event) => {
		setRowsPerPage(+event.target.value);
		setPage(0);
	};

	const loanArea = async (props) => {
		makeAreaRequest({
			variables: { areaId: props.id, email: 'nikoe123@outlook.com' },
		}).then(() => {
			loanAreaMutation({
				variables: { areaId: props.id, email: 'nikoe123@outlook.com' },
			});
		});
	};

	const clearSelected = () => {
		setSelectedArea(undefined);
	};

	return (
		<Container sx={styles.container}>
			<Typography
				sx={styles.mainText}
				variant='h6'
			>
				Alueiden hallinta
			</Typography>

			<Autocomplete
				disablePortal
				id='findCity'
				options={cities.map((city) => city.Kunta)}
				value={cityFilter}
				onChange={(e, newValue) => {
					if (newValue === '') return;
					setCityFilter(newValue);
					localStorage.setItem('defaultFilter', newValue);
					setCityIndex(
						cities.findIndex((city) => city.Kunta === newValue)
					);
				}}
				inputValue={cityFilterInput}
				onInputChange={(e, newValue) => setCityFilterInput(newValue)}
				sx={styles.search}
				renderInput={(params) => (
					<TextField
						{...params}
						label='Hae kaupunkia...'
					/>
				)}
			/>

      <Container xs={styles.areas}>
        <Grid container spacing={3}>
          <Grid item md={6} xs={12}>
            <AreaMap
              areas={filteredAreas}
              setAreas={setFilteredAreas}
              selectedArea={selectedArea}
              setSelectedArea={setSelectedArea}
              clearSelected={clearSelected}
              cityIndex={cityIndex}
              canEdit={false}
              cityFilter={cityFilter}
              hoverStatus={hoverStatus}
              cities={cities}
            />
          </Grid>
          <Grid item md={6} xs={12}>
            {filteredAreas ? (
              <Paper sx={styles.form}>
                <TableContainer sx={{ maxHeight: 440 }}>
                  <Table stickyHeader>
                    <TableBody>
                      {filteredAreas
                        .slice(
                          page * rowsPerPage,
                          page * rowsPerPage + rowsPerPage
                        )
                        .map((area) => (
                          <AreaTableRowComponent
                            key={area.id}
                            area={area}
                            cityFilter={cityFilter}
                            setSelectedArea={setSelectedArea}
                            selectedArea={selectedArea}
                            setHoverStatus={setHoverStatus}
                            loanArea={loanArea}
                            refetch={refetch}
                          />
                        ))}
                    </TableBody>
                  </Table>
                </TableContainer>
                <TablePagination
                  rowsPerPageOptions={[5, 10, 25, 50, 100]}
                  component="div"
                  count={filteredAreas ? filteredAreas.length : 1}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  labelRowsPerPage="Rivejä per sivu:"
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                />
              </Paper>
            ) : (
              <div
                style={{
                  marginLeft: "30%",
                  marginTop: "15%",
                  paddingBottom: "0px",
                }}
              >
                <InfinitySpin
                  width="200"
                  color="gray"
                  wrapperStyle
                  wrapperClass
                  ariaLabel="loading"
                />
              </div>
            )}
          </Grid>
        </Grid>
      </Container>
    </Container>
  );
};

export default AreaControl;
