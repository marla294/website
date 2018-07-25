import React from "react";
import TopNav from "./TopNav";
import Footer from "./Footer";
import Snippet from "./PostSnippet";
import "../css/Blog.css";

class Blog extends React.Component {
	state = {
		show: false,
		displayCategories: []
	};

	toggleShow = () => {
		this.setState({
			show: !this.state.show
		});
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

	renderPostSnippets = () => {
		const arr = Object.entries(this.props.posts).sort(
			(a, b) => (a[1].order < b[1].order ? -1 : 1)
		);
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

		return categories;
	};

	renderCategories = () => {
		const categories = this.getAllCategories();
		return categories.map(cat => (
			<a
				key={cat}
				onClick={() => {
					this.addDisplayCategory(cat);
				}}
			>
				{cat}
			</a>
		));
	};

	render() {
		return (
			<div className="container">
				<div className="wrapper">
					<TopNav push={this.props.history.push} />
					<div className="blog_posts_container">
						<div className="blog_posts_header">
							<h1>Blog Posts</h1>
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
						</div>
						<div
							className="blog_posts"
							style={{ pointerEvents: "none" }}
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
