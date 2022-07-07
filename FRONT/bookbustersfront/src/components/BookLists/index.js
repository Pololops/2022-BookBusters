import PropTypes from 'prop-types';
import { Box } from '@mui/system';
import { useEffect, useState } from 'react';
import Book from '../Book/Book';
import { getBooks } from '../../api/fetchApi';
import BookDetailModal from '../BookDetailModal/BookDetailModal';
import Spinner from '../Spinner/Spinner';

export default function BookLists({ list }) {
	const [data, setData] = useState([]);
	const [user] = useState([]);
	const [isLoading, setisLoading] = useState(true);

	useEffect(() => {
		getBooks(setData, setisLoading, list);
	}, [list, user]);

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
