/* 
Method for disabling click events for dropdown found here: https://github.com/JedWatson/react-select/issues/532
*/

import React from "react";
import TopNav from "./TopNav";
import Footer from "./Footer";
import Snippet from "./PostSnippet";
import "../css/Blog.css";

class Blog extends React.Component {
	state = {
		showCategoryDropdown: false,
		showSortByDropdown: false,
		disableClick: false,
		displayCategories: []
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
		if (
			this.state.displayCategories.findIndex(cat => cat === category) ===
			-1
		) {
			let displayCategories = [...this.state.displayCategories];
			displayCategories.push(category);
			this.setState({
				displayCategories
			});
		}
	};

	removeDisplayCategory = category => {
		const index = this.state.displayCategories.findIndex(
			cat => cat === category
		);
		if (index !== -1) {
			let displayCategories = [...this.state.displayCategories];
			displayCategories.splice(index, 1);
			this.setState({
				displayCategories
			});
		}
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

	categoryClasses = category => {
		if (category === "Show All") {
			return "category-show-all";
		}

		return this.state.displayCategories.find(cat => cat === category)
			? "category-show"
			: "";
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
			return isChrome ? 1 : -1;
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

	renderCategories = () => {
		const categories = this.getAllCategories();
		return categories.map(cat => (
			<a
				className={this.categoryClasses(cat)}
				key={cat}
				onClick={() => {
					this.clickCategory(cat);
				}}
			>
				{cat}
			</a>
		));
	};

	renderCategoriesLabel = () => {
		const categories = this.state.displayCategories;
		return categories.length === 0
			? "All"
			: categories.map((cat, i) => {
					if (i < categories.length - 1) {
						return `${cat}, `;
					} else {
						return cat;
					}
			  });
	};

	renderSortBy = () => {
		const options = ["Newest First", "Oldest First"];
		return options.map(opt => <a key={opt}>{opt}</a>);
	};

	render() {
		return (
			<div className="container" onClick={this.clickOutsideDropdown}>
				<div className="wrapper">
					<TopNav push={this.props.history.push} />
					<div className="blog_posts_container">
						<div className="blog_posts_header">
							<h1>Blog Posts</h1>
							<div className="blog_posts_categories">
								<div className="dropdown">
									<button
										onClick={this.toggleCategoryDropdown}
										className="dropbtn"
									>
										Categories
									</button>
									<div
										className={
											this.state.showCategoryDropdown
												? "dropdown-content show"
												: "dropdown-content"
										}
									>
										{this.renderCategories()}
									</div>
								</div>
								<div className="label">
									{this.renderCategoriesLabel()}
								</div>
							</div>
							<div className="blog_posts_sort_order">
								<div className="dropdown">
									<button
										onClick={this.toggleSortByDropdown}
										className="dropbtn"
									>
										Sort By
									</button>
									<div
										className={
											this.state.showSortByDropdown
												? "dropdown-content show"
												: "dropdown-content"
										}
									>
										{this.renderSortBy()}
									</div>
								</div>
								<div className="label">
									{this.renderCategoriesLabel()}
								</div>
							</div>
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

export default Blog;
