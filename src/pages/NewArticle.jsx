/** @format */

import ArticleForm from '../components/UI/form/articleForm';
import Header from '../components/header/header';
import Footer from '../components/footer/footer';
import React from 'react';

const NewArticle = () => {
	return (
		<>
			<Header />
			<ArticleForm />
			<Footer />
		</>
	);
};

export default NewArticle;
