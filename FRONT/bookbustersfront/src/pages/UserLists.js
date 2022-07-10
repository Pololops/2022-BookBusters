import PropTypes from 'prop-types';
import { Box, Typography } from '@mui/material';
import BookLists from '../components/BookLists';
import ButtonsLibrary from '../components/ButtonsLibrary/ButtonsLibrary';
import Header from '../components/Header/Header';

export default function UserLists({ list }) {
	return (
		<>
			<Header />
			<Box
				sx={{
					padding: '15px',
					marginBottom: '25px',
					textAlign: 'center',
					gap: '40px',
					margin: { xs: 'auto' },
				}}
			>
				<Typography variant="h4" sx={{ paddingTop: '25px' }}>
					Bienvenue dans vos favoris
				</Typography>
				<Typography variant="body1" sx={{ padding: '15px' }}>
					Ajoutez en favoris vos livres préféres.
				</Typography>
			</Box>
			<ButtonsLibrary sx={{ textAlign: 'center' }} />
			<BookLists list={list} />
		</>
	);
}

BookLists.propTypes = {
	list: PropTypes.string,
};
BookLists.defaultProps = {
	list: 'home',
};
