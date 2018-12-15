import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import TopNav from "./TopNav";
import Snippet from "./PostSnippet";
import CategoryDropdown from "./Dropdown/CategoryDropdown";
import SortByDropdown from "./Dropdown/SortByDropdown";
import { GlobalStyle } from "./GlobalStyles";

const BlogWrapper = styled.div`
	width: 100%
	display: grid;
	justify-items: center;
`;

const BlogContent = styled.div`
	margin: 40px 0;
	display: grid;
	grid-template-rows: repeat(auto-fit, auto);
	grid-gap: 20px;
`;

const BlogPosts = styled.div`
	justify-self: center;
	display: grid;
	grid-template-columns: 1fr;
	grid-gap: 40px;
	justify-items: center;
`;

const DropdownContainer = styled.div`
	display: grid;
	grid-gap: 10px;
`;




class Blog extends React.Component {
	state = {
		displayCategories: [],
		sortBy: "Newest First"
	};

	/* Helper Methods */

	getAllCategories = () => {
		let categories = [];
		Object.entries(this.props.posts).forEach(post => {
			post[1].categories.forEach(cat => {
				if (!categories.find(c => c === cat)) {
					categories.push(cat);
				}
			});
		});

		return ["Show All"].concat(...categories);
	};

	addDisplayCategory = category => {
		const index = this.getDisplayCategoryIndex(category);

		if (index === -1) {
			let displayCategories = [...this.state.displayCategories];
			displayCategories.push(category);
			this.setState({
				displayCategories
			});
		}
	};

	removeDisplayCategory = category => {
		const index = this.getDisplayCategoryIndex(category);

		if (index !== -1) {
			let displayCategories = [...this.state.displayCategories];
			displayCategories.splice(index, 1);
			this.setState({
				displayCategories
			});
		}
	};

	getDisplayCategoryIndex = category => {
		return this.state.displayCategories.findIndex(
			cat => cat === category
		);
	};

	removeAllDisplayCategories = () => {
		this.setState({
			displayCategories: []
		});
	};

	filterPostsByCategory = () => {
		const displayCategories = [...this.state.displayCategories];

		return Object.entries(this.props.posts).filter(post => {
			let filter = false;
			displayCategories.forEach(cat => {
				if (post[1].categories.find(category => category === cat)) {
					filter = true;
				}
			});
			return filter;
		});
	};

	/* Click Events */

	clickCategory = category => {
		if (category !== "Show All") {
			if (!this.state.displayCategories.find(cat => cat === category)) {
				this.addDisplayCategory(category);
			} else {
				this.removeDisplayCategory(category);
			}
		} else {
			this.removeAllDisplayCategories();
		}
	};

	clickSortOption = option => {
		this.setState({sortBy: option});
	};

	/* Render Methods */

	renderPostSnippets = () => {
		const postArr =
			this.state.displayCategories.length === 0
				? Object.entries(this.props.posts)
				: this.filterPostsByCategory();

		const displayKeys = postArr.map(post => post[0]).sort(() => {
			return this.state.sortBy === "Newest First" ? -1 : 1;
		});

		return displayKeys.map(key => {
			return (
				<Snippet
					key={key}
					index={key}
					post={this.props.posts[key]}
					push={this.props.history.push}
				/>
			);
		});
	};

	render() {
		return (
			<React.Fragment>
				<TopNav push={this.props.history.push} />
				<BlogWrapper>
					<BlogContent>
						<h1>Blog Posts</h1>
						<DropdownContainer>
						<CategoryDropdown
							options={this.getAllCategories()}
							selectedOptions={this.state.displayCategories}
							clickFn={this.clickCategory}
						/>
						<SortByDropdown
							options={["Newest First", "Oldest First"]}
							selectedOptions={[this.state.sortBy]}
							clickFn={this.clickSortOption}
						/>
						</DropdownContainer>
						<BlogPosts>
							{this.renderPostSnippets()}
						</BlogPosts>
					</BlogContent>
				</BlogWrapper>
				<GlobalStyle />
			</React.Fragment>
		);
	}
}

Blog.propTypes = {
	posts: PropTypes.object.isRequired,
	history: PropTypes.object.isRequired
};

export default Blog;