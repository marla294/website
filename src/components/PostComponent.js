import React from "react";
import TopNavComponent from "./TopNavComponent";
import FooterComponent from "./FooterComponent";

class PostComponent extends React.Component {
	render() {
		return (
			<div className="wrapper">
				<TopNavComponent push={this.props.history.push} />
				<div className="post_header">
					<h1 className="post_title">Title</h1>
					<h3 className="post_date">Date</h3>
					<h3 className="post_categories">Categories</h3>
					<img
						src={require("../Assets/Pictures/SelfPortraits/20180607_Graffiti.jpg")}
					/>
				</div>
				<section className="post_content">
					<p>
						Lorem ipsum dolor sit amet, consectetur adipisicing
						elit. Quis obcaecati facere voluptatibus iste impedit
						reprehenderit. Incidunt quas ratione molestiae, eaque
						natus alias magni sequi illo id ducimus nulla voluptas.
						Ducimus ab porro mollitia et cupiditate, quam illo!
						Ullam debitis id, aliquid quis sed tenetur enim
						consequuntur nemo laudantium pariatur reprehenderit
						voluptates dicta nesciunt omnis, illum alias atque
						tempore sit incidunt vero soluta fuga odio facere? Ut
						laborum assumenda veritatis consectetur! Fugit, nihil,
						sint. Iure sapiente, asperiores minima rem suscipit
						labore, et dignissimos dolorem numquam quisquam error
						temporibus iste? Animi molestiae similique quidem
						minima, voluptatibus consequatur cumque saepe delectus.
						Alias, nihil!
					</p>

					<p>
						Lorem ipsum dolor sit amet, consectetur adipisicing
						elit. Minima recusandae, suscipit. Labore, provident
						magni in magnam est consequatur sint incidunt accusamus
						alias cumque, nisi dicta neque eligendi recusandae
						dolorum, ab quisquam quibusdam. Dignissimos natus
						repellat quae consequuntur praesentium voluptas tempore
						fugiat quod expedita modi, consequatur aut laboriosam
						culpa, provident sunt reiciendis non officia vero totam
						pariatur corporis saepe officiis eum deserunt! Ex,
						quasi. Rem, perspiciatis, assumenda. Quasi, rerum sed,
						perspiciatis magni eaque natus magnam quis tenetur
						dolorem, officiis reiciendis id, facilis quas ut aliquam
						cupiditate tempora voluptate provident corporis
						deleniti. Laudantium tempora voluptatem possimus ex
						error enim, dolor obcaecati similique sequi! Minima vero
						atque laborum sit cupiditate nesciunt odit soluta
						accusantium aperiam, facilis accusamus, quo eveniet et
						necessitatibus at nulla temporibus, cum eum hic quas
						nisi facere ipsam ipsum provident. Deleniti molestiae
						ducimus, deserunt delectus fugit dolore sit recusandae
						numquam quam harum vitae debitis, tenetur laudantium
						illum eum ratione, asperiores magni provident dolorum.
						Aperiam porro, soluta minima similique expedita
						cupiditate fugiat voluptates autem libero inventore
						voluptatibus unde, eius sunt, magni cum quidem
						reiciendis. Aut optio, quidem, nisi eos temporibus
						repellat quisquam animi. Quisquam voluptates, quibusdam
						est odio deleniti quae impedit recusandae ipsum omnis
						amet placeat nihil repellat ipsa vero illum tempora
						suscipit quis dicta itaque, veniam reprehenderit,
						doloribus excepturi. Facere saepe omnis laborum,
						incidunt quo asperiores. Dolorem voluptatum architecto
						odio praesentium corporis voluptates placeat eius
						commodi laudantium est, impedit harum ut officiis et
						molestias sequi necessitatibus numquam velit. Dolore,
						laudantium ut maxime sunt impedit vitae accusamus quae
						dignissimos, aperiam veritatis.
					</p>

					<p>
						Lorem ipsum dolor sit amet, consectetur adipisicing
						elit. Cumque obcaecati beatae nam, commodi aspernatur
						animi quibusdam sequi esse, laboriosam culpa, adipisci
						suscipit error natus doloribus aperiam aliquam libero
						expedita optio voluptatibus vitae sunt ipsum quia
						voluptatem laborum. Suscipit quia amet, minus. Nesciunt,
						ipsam impedit accusamus cumque maiores, vitae corporis
						consequuntur!
					</p>

					<p>
						Lorem ipsum dolor sit amet, consectetur adipisicing
						elit. Recusandae aspernatur tempora, repellat placeat
						vel, ex veritatis qui excepturi sed quibusdam voluptas
						nostrum dolore aut! Et provident est, deleniti quo quas
						eaque temporibus non obcaecati, harum aliquam voluptate
						recusandae saepe, enim quidem repellendus porro officiis
						soluta. Error explicabo eos dolores quia nobis
						recusandae veritatis pariatur autem, ad omnis sed
						dignissimos adipisci quisquam iure repellendus, nisi
						officia corporis, fugit nostrum molestiae quam debitis.
						Iure eligendi debitis quia eum commodi quis! Architecto
						optio sint quaerat accusamus est consequatur ex eveniet,
						nemo laudantium obcaecati amet velit voluptatum
						laboriosam suscipit nulla iure delectus iusto autem,
						reprehenderit tempore neque nobis dolorem. Nulla
						suscipit veniam necessitatibus nihil, sapiente ipsam.
						Esse accusantium, ab, ipsam dolorum corporis illum nemo
						odit modi officiis dignissimos explicabo.
					</p>
				</section>
				<FooterComponent />
			</div>
		);
	}
}

export default PostComponent;
