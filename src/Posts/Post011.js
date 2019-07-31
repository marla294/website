import React from "react";

const PostData = props => (
	<React.Fragment>
	
	<p>Today at work, I was working with a couple of the front end developers helping me deploy a site.  One of them called me a rookie developer, but then quickly added "you're having a great rookie season!"  I laughed at that.  He's right, I guess I am a rookie, but one who has spent many years in the minor leagues!</p>

	<p>So I realized that in about a week I will have been a professional web developer for 6 months, thanks to Volano Solutions (my company).  I wanted to just talk a little bit about how it's been going, what's been fun, surprising, and challenging in this job.</p>

	<p>I am truly shocked at the amount of my work that is now out there on the internet for all the world to see.  That's a big benefit to working at a smaller company - your work gets out there, fast!  Today we deployed an update to MDRelo.com, a site that helps medical students find housing when they become residents and get matched at hospitals.  The public-facing site is done in Wordpress, which I didn't have a hand in, but I hooked up the sign up page, added integration to Active Campaign (marketing software), updated a bunch of internal logic, and even deployed the site through Azure CI/CD.  And that is just one of about 10 projects that I have worked on in 6 months.  I've learned so much from working on all these different projects, and getting to do all kinds of different things, it is really awesome.  This is what I wanted to get out of working at Volano.</p>

	<p>Something else that I have really enjoyed recently has been working with clients.  A large part of the reason why I love working on software is the satisfaction that I get from making something work better for a client.  I like trying to understand things from their point of view, improving the relationships we have with them, just getting to know them and their needs better.  I think clients like to feel that there is someone who has their back if something were to go wrong, and I like to be that person giving them that.</p>

	<p>And I can't not mention that I really like every single one of my coworkers on a personal level.  It's cheesy but, I think that's really cool.  I won't go on about it - they're just good people.</p>

	<p>Obviously there are things that could be better.  I think the main thing for me is wishing that there was a little more guidance in some areas.  For example, going back to deploying sites on Azure, which I have recently started doing.  I have never used Azure before this job.  There isn't much documentation on how we deploy sites at Volano.  Deploying production is a little scary because one wrong move and you can instantly bring down a website and you'll get angry client phone calls/emails.  I appreciate that people trust me enough to let me press the big red "deploy!" button, but at times I do wish there was a little more hand-holding around some of these things.  But, in full disclosure - I did get through the deployments and nothing majorly bad happened, and people were around to help me during the small issues that did come up.</p>

	<p>That's about all I can do tonight.  It's been a really great 6 months... looking forward to more fun times at Volano Solutions!</p>

	</React.Fragment>
);

export default PostData;