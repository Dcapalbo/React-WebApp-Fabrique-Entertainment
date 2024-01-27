/** @format */

import { createSlice } from '@reduxjs/toolkit';

const dataArticleSlice = createSlice({
	name: 'dataArticle',
	initialState: {
		articleData: {},
		articlesData: [],
	},
	reducers: {
		setArticlesData(state, action) {
			state.articlesData = action.payload;
		},
		setArticleData(state, action) {
			state.articleData = action.payload;
		},
		removeArticleData(state, action) {
			state.articlesData = state.articlesData.filter(
				(article) => article._id !== action.payload._id
			);
		},
		removeImageKey(state, action) {
			const imageKeyToRemove = action.payload;
			if (imageKeyToRemove) {
				state.articleData.articleImageKey = null;
				state.articleData.articleImageUrl = null;
			}
		},
		resetarticleData(state) {
			state.articleData = {};
		},
	},
});

export const dataArticleActions = dataArticleSlice.actions;
export default dataArticleSlice;
