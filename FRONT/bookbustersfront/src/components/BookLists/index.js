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
	const [moreData, setMoreData] = useState([]);
	const [pageList, setPageList] = useState(0);
	const { connected } = useContext(authContext);
	const [isLoading, setisLoading] = useState(true);
	const [isLoadingMore, setisLoadingMore] = useState(false);

	async function getMoreData() {
		setisLoadingMore(true);
		await getBooks(setMoreData, setisLoadingMore, list, pageList + 1);
	}

	useEffect(() => {
		setPageList(0);
		setisLoading(true);
		getBooks(setData, setisLoading, list);
	}, [list, connected]);

	useEffect(() => {
		if (moreData.length > 0) {
			setPageList((prevPageList) => prevPageList + 1);
			setData((prevData) => [...prevData, ...moreData]);
		}
	}, [moreData]);

	useEffect(() => {
		console.log('pageList : ', pageList);
	}, [pageList]);

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
			{data && data.length > 9 + 10 * pageList && (
				<MoreBooks onClick={getMoreData} isLoading={isLoadingMore} />
			)}
			<BookDetailModal />
		</Box>
	);
}

BookLists.propTypes = {
	list: PropTypes.string.isRequired,
};
