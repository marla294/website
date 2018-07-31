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

	/* Toggle for the dropdown menu, Categories */

	toggleShow = () => {
		this.setState({
			show: !this.state.show,
			disableClick: !this.state.disableClick
		});
	};

	/* Categories */

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
			// wipe all categories from State
			this.removeAllDisplayCategories();
		}
	};

	/* Adds a display category to state if it is not already there */
	addDisplayCategory = category => {
		if (
			this.state.displayCategories.findIndex(cat => cat === category) ===
			-1
		) {
			/* 1. Take a copy of state */
			let displayCategories = [...this.state.displayCategories];
			/* 2. Push category to the end of the displayCategories list */
			displayCategories.push(category);
			/* 3. Set state */
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
			/* 1. Take a copy of state */
			let displayCategories = [...this.state.displayCategories];
			/* 2. Remove category from the displayCategories list */
			displayCategories.splice(index, 1);
			/* 3. Set state */
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

	/* Filters the posts to ones that contain displayCategories */
	filterPostsByCategory = () => {
		const arr = Object.entries(this.props.posts);
		const displayCategories = [...this.state.displayCategories];
		let retArr = []; /* return array */

		arr.forEach(post => {
			displayCategories.forEach(cat => {
				if (
					post[1].categories.find(category => category === cat) &&
					!retArr.find(p => p === post)
				) {
					retArr.push(post);
				}
			});
		});

		return retArr;
	};

	/* Render methods */

	renderPostSnippets = () => {
		/* If no categories are selected, show all posts - else show filtered */
		const postArr =
			this.state.displayCategories.length === 0
				? Object.entries(this.props.posts)
				: this.filterPostsByCategory();

		/* Sort the post array for display */
		const arr = postArr.sort((a, b) => (a[1].order < b[1].order ? -1 : 1));
		const displayKeys = arr.map(post => post[0]).sort((a, b) => 1);

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
				className={
					this.state.displayCategories.find(c => c === cat)
						? "category-show"
						: ""
				}
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
