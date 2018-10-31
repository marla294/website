/* 
Method for disabling click events for dropdown found here: https://github.com/JedWatson/react-select/issues/532
*/

import React from "react";
import TopNav from "./TopNav";
import Footer from "./Footer";
import Snippet from "./PostSnippet";
import Dropdown from "./Dropdown";
import PropTypes from "prop-types";
import "../css/Blog.css";

class Blog extends React.Component {
	state = {
		showCategoryDropdown: false,
		showSortByDropdown: false,
		disableClick: false,
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

	toggleCategoryDropdown = () => {
		this.setState({
			showCategoryDropdown: !this.state.showCategoryDropdown,
			disableClick: !this.state.disableClick
		});
	};

	toggleSortByDropdown = () => {
		this.setState({
			showSortByDropdown: !this.state.showSortByDropdown,
			disableClick: !this.state.disableClick
		});
	};

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

	clickOutsideDropdown = () => {
		if (this.state.showCategoryDropdown) {
			this.toggleCategoryDropdown();
		}
		if (this.state.showSortByDropdown) {
			this.toggleSortByDropdown();
		}
	};

	/* Render Methods */

	renderPostSnippets = () => {
		/* Because sorting works differently on Safari than on Chrome */
		const isChrome =
			navigator.userAgent.indexOf("Chrome") !== -1 ? true : false;

		const postArr =
			this.state.displayCategories.length === 0
				? Object.entries(this.props.posts)
				: this.filterPostsByCategory();

		const displayKeys = postArr.map(post => post[0]).sort(() => {
			if (this.state.sortBy === "Newest First") {
				return isChrome ? 1 : -1;
			} else {
				return isChrome ? -1 : 1;
			}
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
			<div className="container" onClick={this.clickOutsideDropdown}>
				<div className="wrapper">
					<TopNav push={this.props.history.push} />
					<div className="blog_posts_container">
						<div className="blog_posts_header">
							<h1>Blog Posts</h1>
							<Dropdown
								name={"Categories"}
								show={this.state.showCategoryDropdown}
								toggleDropdown={this.toggleCategoryDropdown}
								options={this.getAllCategories()}
								displayOptions={this.state.displayCategories}
								clickFn={this.clickCategory}
							/>
							<Dropdown
								name={"Sort By"}
								show={this.state.showSortByDropdown}
								toggleDropdown={this.toggleSortByDropdown}
								options={["Newest First", "Oldest First"]}
								displayOptions={[this.state.sortBy]}
								clickFn={this.clickSortOption}
							/>
							</div>
						<div
							className="blog_posts"
							style={{
								pointerEvents: this.state.disableClick
									? "none"
									: "all"
							}}
						>
							{this.renderPostSnippets()}
						</div>
					</div>
				</div>
				<Footer />
			</div>
		);
	}
}

Blog.propTypes = {
	posts: PropTypes.object.isRequired,
	history: PropTypes.object.isRequired
};

export default Blog;


