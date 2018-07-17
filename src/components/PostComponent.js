import React from "react";
import TopNavComponent from "./TopNavComponent";
import FooterComponent from "./FooterComponent";
import OverlayComponent from "./OverlayComponent";

class PostComponent extends React.Component {
	/* Overlay stuff */
	state = {
		show: false
	};

	imgURL = "";

	showFullImage = event => {
		this.imgURL = event.currentTarget.src;
		this.setState({ show: true });
	};

	hideFullImage = () => {
		this.setState({ show: false });
	};

	render() {
		return (
			<div>
				<div
					className={
						this.state.show ? "overlay open" : "overlay closed"
					}
				>
					<div className="overlay-inner">
						<button className="close" onClick={this.hideFullImage}>
							× Close
						</button>
						<img src={`${this.imgURL}`} />
					</div>
				</div>
				<div className="wrapper">
					<TopNavComponent push={this.props.history.push} />
					<article className="post">
						<div className="post_header">
							<figure className="post_headImg">
								<img
									onClick={this.showFullImage}
									src={require("../Assets/Pictures/Spain/20180607_Flags.jpg")}
								/>
							</figure>
							<div className="post_header_content">
								<h2>When We Went To Barcelona</h2>
								<h4>July 16, 2018</h4>
							</div>
						</div>
						<h4>&#191;Por Que Barcelona?</h4>
						<p>
							Lorem ipsum dolor sit amet, consectetur adipisicing
							elit. Quis obcaecati facere voluptatibus iste
							impedit reprehenderit. Incidunt quas ratione
							molestiae, eaque natus alias magni sequi illo id
							ducimus nulla voluptas. Ducimus ab porro mollitia et
							cupiditate, quam illo! Ullam debitis id, aliquid
							quis sed tenetur enim consequuntur nemo laudantium
							pariatur reprehenderit voluptates dicta nesciunt
							omnis, illum alias atque tempore sit incidunt vero
							soluta fuga odio facere? Ut laborum assumenda
							veritatis consectetur! Fugit, nihil, sint. Iure
							sapiente, asperiores minima rem suscipit labore, et
							dignissimos dolorem numquam quisquam error
							temporibus iste? Animi molestiae similique quidem
							minima, voluptatibus consequatur cumque saepe
							delectus. Alias, nihil!
						</p>

						<figure className="post_contentImg right">
							<img
								onClick={this.showFullImage}
								src={require("../Assets/Pictures/SelfPortraits/20180607_Graffiti.jpg")}
							/>
							<figcaption className="figcaption">
								Standing in front of a cool wall
							</figcaption>
						</figure>

						<p>
							Lorem ipsum dolor sit amet, consectetur adipisicing
							elit. Minima recusandae, suscipit. Labore, provident
							magni in magnam est consequatur sint incidunt
							accusamus alias cumque, nisi dicta neque eligendi
							recusandae dolorum, ab quisquam quibusdam.
							Dignissimos natus repellat quae consequuntur
							praesentium voluptas tempore fugiat quod expedita
							modi, consequatur aut laboriosam culpa, provident
							sunt reiciendis non officia vero totam pariatur
							corporis saepe officiis eum deserunt! Ex, quasi.
							Rem, perspiciatis, assumenda. Quasi, rerum sed,
							perspiciatis magni eaque natus magnam quis tenetur
							dolorem, officiis reiciendis id, facilis quas ut
							aliquam cupiditate tempora voluptate provident
							corporis deleniti. Laudantium tempora voluptatem
							possimus ex error enim, dolor obcaecati similique
							sequi! Minima vero atque laborum sit cupiditate
							nesciunt odit soluta accusantium aperiam, facilis
							accusamus, quo eveniet et necessitatibus at nulla
							temporibus, cum eum hic quas nisi facere ipsam ipsum
							provident. Deleniti molestiae ducimus, deserunt
							delectus fugit dolore sit recusandae numquam quam
							harum vitae debitis, tenetur laudantium illum eum
							ratione, asperiores magni provident dolorum. Aperiam
							porro, soluta minima similique expedita cupiditate
							fugiat voluptates autem libero inventore
							voluptatibus unde, eius sunt, magni cum quidem
							reiciendis. Aut optio, quidem, nisi eos temporibus
							repellat quisquam animi. Quisquam voluptates,
							quibusdam est odio deleniti quae impedit recusandae
							ipsum omnis amet placeat nihil repellat ipsa vero
							illum tempora suscipit quis dicta itaque, veniam
							reprehenderit, doloribus excepturi. Facere saepe
							omnis laborum, incidunt quo asperiores. Dolorem
							voluptatum architecto odio praesentium corporis
							voluptates placeat eius commodi laudantium est,
							impedit harum ut officiis et molestias sequi
							necessitatibus numquam velit. Dolore, laudantium ut
							maxime sunt impedit vitae accusamus quae
							dignissimos, aperiam veritatis.
						</p>

						<h4>What we did there</h4>

						<p>
							Lorem ipsum dolor sit amet, consectetur adipisicing
							elit. Cumque obcaecati beatae nam, commodi
							aspernatur animi quibusdam sequi esse, laboriosam
							culpa, adipisci suscipit error natus doloribus
							aperiam aliquam libero expedita optio voluptatibus
							vitae sunt ipsum quia voluptatem laborum. Suscipit
							quia amet, minus. Nesciunt, ipsam impedit accusamus
							cumque maiores, vitae corporis consequuntur!
						</p>

						<figure className="post_contentImg left">
							<img
								onClick={this.showFullImage}
								src={require("../Assets/Pictures/SelfPortraits/20180607_Graffiti.jpg")}
							/>
							<figcaption className="figcaption">
								Standing in front of a cool wall 2
							</figcaption>
						</figure>

						<p>
							Lorem ipsum dolor sit amet, consectetur adipisicing
							elit. Recusandae aspernatur tempora, repellat
							placeat vel, ex veritatis qui excepturi sed
							quibusdam voluptas nostrum dolore aut! Et provident
							est, deleniti quo quas eaque temporibus non
							obcaecati, harum aliquam voluptate recusandae saepe,
							enim quidem repellendus porro officiis soluta. Error
							explicabo eos dolores quia nobis recusandae
							veritatis pariatur autem, ad omnis sed dignissimos
							adipisci quisquam iure repellendus, nisi officia
							corporis, fugit nostrum molestiae quam debitis. Iure
							eligendi debitis quia eum commodi quis! Architecto
							optio sint quaerat accusamus est consequatur ex
							eveniet, nemo laudantium obcaecati amet velit
							voluptatum laboriosam suscipit nulla iure delectus
							iusto autem, reprehenderit tempore neque nobis
							dolorem. Nulla suscipit veniam necessitatibus nihil,
							sapiente ipsam. Esse accusantium, ab, ipsam dolorum
							corporis illum nemo odit modi officiis dignissimos
							explicabo.
						</p>
					</article>
					<FooterComponent />
				</div>
			</div>
		);
	}
}

export default PostComponent;
