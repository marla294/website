import React from "react";

const PostData = props => (
	<React.Fragment>

	<p>Hi yet again!  I don't know what it is but I'm really on a role with these blog posts lately!  Since I've been posting again, it makes sense to do another update to the site.</p>

	<p>So, plot twist, at my new job I'm doing Angular again!  When I started learning to code, the first framework I picked up was Angular (and built the front end to axequest.com in it).  But then I picked up React and jumped ship for a while.  At Volano... they didn't really use JavaScript frameworks (facepalm) so I was just in the JQuery desert for a year.  Now at Fixation the site I'm working on is being built in Angular.  Since I'll be doing a lot of Angular, it will be nice to do this as a little side project to keep up to date in React.</p>

	<h3>Site Updates</h3>

	<h5>Routing</h5>

	<p>If you refresh this page right now (go ahead, do it), it'll give you a "Page not found!" error.  I can't share links either because of the same error.  This makes zero sense to me because I have React Router installed, and it's working fine locally.  I don't know if it's an issue with my hosting platform (Netlify) or if it's on my end somehow.  This problem has vexed me for a very long time, and before I make the next update I need to figure it out.</p>

	<h5>Paging</h5>

	<p>Finally have gotten to the point on the blog section of the site where I need to start thinking about paging and other ways to make searching blog posts easier.  To make things easy, I am going to go with the traditional 1, 2, 3... style of paging instead of the fancy blog posts "appearing" paging that some blogs have these days.</p>

	<h5>Categorization</h5>

	<p>If I actually get the above 2 things done, I'll be very happy.  Another thing I could work on if I want to is a categorization filter.  There are categories to each of these blog posts and it would be neat to allow you to filter using those categories in some way.  I'll figure it out when I get there.</p>

	<h5>Styling</h5>

	<p>Finally, the site could use a minor refresh in terms of its style.  I'm not 100% sure what to change yet.  Will probably just play around with some things and see what sticks.</p>

	</React.Fragment>
);

export default PostData;