import PropTypes from 'prop-types';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Spinner from '../Spinner/Spinner';

export default function MoreBooks({ onClick, isLoading }) {
	return (
		<Button
			onClick={onClick}
			sx={{
				alignItems: 'flex-start',
			}}
		>
			<Card
				sx={{
					width: { xs: '160px', md: '200px' },
					margin: { xs: '8px 4px', md: '16px' },
					display: 'flex',
					flexDirection: 'column',
					alignSelf: 'stretch',
					justifyContent: 'space-between',
				}}
			>
				<CardContent
					sx={{
						flexGrow: '1',
						gap: '20px',
						display: 'flex',
						flexDirection: 'column',
						justifyContent: 'center',
					}}
				>
					<Typography gutterBottom sx={{ fontSize: '5em' }} component="div">
						{!isLoading ? '+' : <Spinner />}
					</Typography>
				</CardContent>
			</Card>
		</Button>
	);
}

MoreBooks.propTypes = {
	onClick: PropTypes.func.isRequired,
	isLoading: PropTypes.bool.isRequired,
};
