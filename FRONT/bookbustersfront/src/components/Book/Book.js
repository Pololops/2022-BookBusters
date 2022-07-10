import React, { useContext } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import bookDefaultCover from '../../assets/img/logo_bb.png';
import './Book.scss';
import bookContext from '../../contexts/BookContext';

export default function Book({ book }) {
	function livrePLS() {
		if (book.cover === undefined) {
			return bookDefaultCover;
		} else {
			return book.cover;
		}
	}

	const { setOpenedBook } = useContext(bookContext);
	return (
		<Button
			onClick={() => setOpenedBook(book)}
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
				<CardMedia
					component="img"
					image={livrePLS()}
					alt={`Couverture du livre ${book.title}`}
				/>

				<CardContent
					sx={{
						flexGrow: '1',
						gap: '20px',
						display: 'flex',
						flexDirection: 'column',
						justifyContent: 'flex-start',
					}}
				>
					<Typography
						gutterBottom
						sx={{ fontSize: '1.2em' }}
						component="div"
					>
						{book.title}
					</Typography>
					<Typography
						variant="body1"
						color="text.secondary"
						sx={{ fontSize: '0.9em' }}
					>
						{book.author}
					</Typography>
				</CardContent>
			</Card>
		</Button>
	);
}
