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
					Bienvenue dans {list === 'library' && 'votre bibliothèque'}
					{list === 'favorite' && 'vos favoris'}
					{list === 'alert' && 'vos alertes'}
				</Typography>
				<Typography variant="body1" sx={{ padding: '15px' }}>
					{list === 'library' && 'Cliquez sur l\'un de vos livres pour indiquer aux autres utilisateurs que vous le donnez.'}
					{list === 'favorite' && 'Ajoutez vos livres préférés dans vos favoris.'}
					{list === 'alert' && 'BookBusters vous alertera par email dès que l\'un de ces livres sera donné par un de nos utilisateurs.'}
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
