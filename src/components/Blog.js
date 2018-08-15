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
		show: false,
		disableClick: false,
		displayCategories: []
	};

	/* Helper Methods */

	getAllCategories = () => {
		const arr = Object.entries(this.props.posts).map(
			post => post[1].categories
		);
		let categories = [];
		arr.forEach(cat => categories.push(...cat));

		/* Filter categories arr to unique categories */
		categories.sort();
		categories.forEach((cat, i) => {
			if (cat === categories[i + 1]) {
				const first = categories.slice(0, i + 1);
				let rest = categories.slice(i + 1);
				while (cat === rest[0]) {
					rest.shift();
				}
				categories = first.concat(rest);
			}
		});

		categories = ["Show All"].concat(...categories);

		return categories;
	};

	clickCategory = category => {
		if (category !== "Show All") {
			if (!this.state.displayCategories.find(cat => cat === category)) {
				this.addDisplayCategory(category);
			} else {
				this.removeDisplayCategory(category);
			}
		} else {
			// wipe all categories from state
			this.removeAllDisplayCategories();
		}
	};

	/* Adds a display category to state if it is not already there */
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

	/* Removes a display category to state if it is not already there */
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

	/* Empties Display Categories from state */
	removeAllDisplayCategories = () => {
		this.setState({
			displayCategories: []
		});
	};

	/* Filters the posts to ones that contain displayCategories */
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

	/* Sets the styles of the categories in the dropdown */
	categoryClasses = cat => {
		let catClass;
		this.state.displayCategories.find(c => c === cat)
			? (catClass = "category-show")
			: (catClass = "");
		if (cat === "Show All") {
			catClass = "category-show-all";
		}
		return catClass;
	};

	/* Click Events */

	/* Toggle for the dropdown menu */
	toggleShow = () => {
		this.setState({
			show: !this.state.show,
			disableClick: !this.state.disableClick
		});
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
		return this.state.displayCategories.length === 0
			? "All"
			: categories.map((cat, i) => {
					if (i < categories.length - 1) {
						return `${cat}, `;
					} else {
						return cat;
					}
			  });
	};

	render() {
		return (
			<div
				className="container"
				onClick={this.state.show ? this.toggleShow : null}
			>
				<div className="wrapper">
					<TopNav push={this.props.history.push} />
					<div className="blog_posts_container">
						<div className="blog_posts_header">
							<h1>Blog Posts</h1>
							<div className="blog_posts_categories">
								<div className="dropdown">
									<button
										onClick={this.toggleShow}
										className="dropbtn"
									>
										Categories
									</button>
									<div
										id="myDropdown"
										className={
											this.state.show
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
