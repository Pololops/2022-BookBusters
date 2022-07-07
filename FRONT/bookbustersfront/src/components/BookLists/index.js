import PropTypes from 'prop-types';
import { Box } from '@mui/system';
import { useEffect, useState } from 'react';
import Book from '../Book/Book';
import { latestAddition, getBooks } from '../../api/fetchApi';
import BookDetailModal from '../BookDetailModal/BookDetailModal';
import Spinner from '../Spinner/Spinner';

export default function BookLists({ list }) {
	const [data, setData] = useState([]);
	const [isLoading, setisLoading] = useState(true);

	useEffect(() => {
		if (list === 'library') {
			getBooks(setData, setisLoading, list);
		} else if (list === 'favorite') {
			getBooks(setData, setisLoading, list);
		} else if (list === 'alert') {
			getBooks(setData, setisLoading, list);
		} else if (list === 'home') {
			latestAddition(setData, setisLoading);
		} else {
			setData([]);
		}
	}, [list]);

	return (
		<>
			<Box
				sx={{
					display: 'flex',
					flexWrap: 'wrap',
					justifyContent: 'space-evenly',
					alignItems: 'stretch',
					width: { md: '70%' },
					margin: 'auto',
				}}
			>
				{!isLoading ? (
					data.map((book, index) => (
						<Book
							key={`je-suis-unique-${index}`}
							book={book}
							users={book.donors}
						/>
					))
				) : (
					<Spinner />
				)}
				<BookDetailModal />
			</Box>
		</>
	);
}

BookLists.propTypes = {
	list: PropTypes.string.isRequired,
};
