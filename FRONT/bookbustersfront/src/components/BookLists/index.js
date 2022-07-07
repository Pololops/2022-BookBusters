import PropTypes from 'prop-types';
import { Box } from '@mui/system';
import { useEffect, useState, useContext } from 'react';
import authContext from '../../contexts/AuthContext';
import Book from '../Book/Book';
import MoreBooks from '../Book/MoreBooks';
import { getBooks } from '../../api/fetchApi';
import BookDetailModal from '../BookDetailModal/BookDetailModal';
import Spinner from '../Spinner/Spinner';

export default function BookLists({ list }) {
	const [data, setData] = useState([]);
	const [newData, setNewData] = useState([]);
	const [pageList, setPageList] = useState(0);
	const { connected } = useContext(authContext);
	const [isLoading, setisLoading] = useState(true);

	async function handleClick() {
		setPageList((prevPageList) => prevPageList + 1);
	}

	useEffect(() => {
		setPageList(0);
		setisLoading(true);
		getBooks(setData, setisLoading, list);
	}, [list, connected]);

	useEffect(() => {
		console.log('page : ', pageList);
		if (pageList > 0) {
			getBooks(setNewData, setisLoading, list, pageList);
		}
	}, [pageList]);

	useEffect(() => {
		setData((prevData) => [...prevData, ...newData]);
	}, [newData]);

	useEffect(() => {
		console.log('data : ', data);
	}, [data]);

	return (
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
					<Book key={book.id} book={book} users={book.donors} />
				))
			) : (
				<Spinner />
			)}
			{!isLoading && data.length > 9 + 10 * pageList && (
				<MoreBooks pageList={pageList} handleClick={handleClick} />
			)}
			<BookDetailModal />
		</Box>
	);
}

BookLists.propTypes = {
	list: PropTypes.string.isRequired,
};
