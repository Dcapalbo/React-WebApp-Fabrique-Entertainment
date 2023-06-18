/** @format */

import FilmCardContainer from '../components/UI/card/filmCardContainer';
import Header from '../components/header/header';
import Footer from '../components/footer/footer';
import Navigation from '../components/nav/nav';

const Films = () => {
	return (
		<>
			<Header>
				<Navigation />
			</Header>
			<FilmCardContainer />
			<Footer />
		</>
	);
};

export default Films;
