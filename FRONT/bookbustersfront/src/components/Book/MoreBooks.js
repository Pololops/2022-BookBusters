import PropTypes from 'prop-types';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

export default function MoreBooks({ handleClick }) {
	return (
		<Button
			onClick={handleClick}
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
					<Typography gutterBottom sx={{ fontSize: '4em' }} component="div">
						+
					</Typography>
				</CardContent>
			</Card>
		</Button>
	);
}

MoreBooks.propTypes = {
	handleClick: PropTypes.func.isRequired,
};
