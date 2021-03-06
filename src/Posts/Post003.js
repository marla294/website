import React from "react";

const PostData = props => (
	<React.Fragment>
		<p>
			As you may have noticed, this website has had a complete facelift in the past week!  To celebrate, I thought I'd talk through some tips on how to do this yourself, based on what I learned from doing it myself.
		</p>

		<h4>1. Don't panic!</h4>
		<p>I may or may not have taken my own advice on this :).  The reason I decided to redo this site is because I applied for a job on a whim (I was trying to take the holiday season off from job-hunting), and realized that my site was possibly (probably) not conveying the message I wanted it to convey.</p>

		<p>After a couple hours of panicking, I realized that if your site doesn't look like you want it to look, that just means that you've learned some stuff in the interim and you know you can do better.  And learning as a web developer is a great thing!  So, just calm down.</p>

		<h4>2. Decide what you want your website to say</h4>

		<p>Before doing a thing, I thought about what I wanted this website to do for me.  At the end of the day, the main purpose of this site right now is to help me get a job as a software developer.  Its secondary purpose is to help me get more practice.</p>

		<p>So knowing that, I want this site to look as polished as I can get it.  I also want a job where it's a good fit with my personality, so it needs to convey something about who I am as well.</p>

		<h4>3. Create a theme</h4>

		<p>To make it easier to choose colors and fonts for my theme, I wrote down a list of words of what I wanted this website to convey to the user.  The words I chose were: honest, intelligent, caring, and rebel.  Rebel!?!?  I can hear you thinking it through the screen.  Well, yeah.  That's kind of how I see myself.  I don't think of it as a bad thing - I basically mean that I do things differently than a lot of other people would.  It might have a negative connotation to some people, and that's fine.  It's who I am, not gonna try and change it.</p>

		<p>Once you've got the list of words, it's time to start choosing stuff.  I started with the color palette.  I used the site <a href="https://coolors.co/">https://coolors.co/</a> to choose the initial palette.  That site is so fun!  I flipped through the colors, took a bunch of screenshots, and then opened them all up and picked the one that seemed to express that list of words the best.  Later on, I expanded on the palette, and put in 6 more grays and reds that still work with the palette.</p>

		<p>After that I chose the font.  Before, the website had a unique serif font that I chose just based on the look.  While it was pretty neat, and I still love it, I realized that it was holding me back a bit.  First off, if I had wanted to display some code on the screen in a blog post, that font really wouldn't have played well with a monospace, sans-serif font.  And secondly, I think that font was a bit too fancy and too hard to read for my purposes.  I wanted something that still conveyed my theme while being easier on the eyes and well supported.  I chose Open Sans (and a slightly fancier one for the header font)</p>

		<h4>4. Strip it back to the studs</h4>

		<p>So I had my theme, my old website, and fonts and colors.  The next thing I did was to take out every single thing that was unnecessary.  For example, on my Blog page, I had some filters on the page for categories and a "sort by" dropdown, and at the time I had 2 blog posts.  Did I need all that stuff?  No!  So I got rid of it.  Maybe later on I will want something like that again, but for now, not so much.</p>

		<p>I also wanted to incorporate styled-components into this site because I flipping LOVE styled-components.  So, one page at a time, I converted my css files over to my css-in-js.  In the process I removed a lot of things that seemed unnecessary to me, like extra margins/padding/etc that was probably just there from trying to get things to look right across multiple CSS files.</p>

		<h4>5. Design mobile first</h4>

		<p>For some reason, I have just not liked designing for mobile first in the past and I haven't done it.  But this time around, I was reading a UI book (Refactoring UI), and it just seemed like the easiest way to go about it.  So for the initial redesign of each page, I literally took the Chome instance I had open, made it as narrow as I possibly could, and developed using that first.  Then when I had gotten things looking pretty good, I widened the screen and fixed things up that needed fixing on the wider page.</p>

		<h4>6. One small thing at a time</h4>

		<p>Refactoring UI says to start with one feature and totally complete it before moving on.  They say don't necessarily start with the nav bar, you might not even need it!  Well I already had a nav bar component, but I took their "one component at a time" advice, and I have to say that it was helpful to focus and really get one thing at a time looking good and move on to the next.</p>

		<h4>7. Create consistency</h4>

		<p>Once you have done quite a few pages, you'll start noticing some things that you like that you've done.  Try to take those good things and put them on other pages too to create consistency across the site.</p>

		<p>An example you can see on this site is how on my blog post "snippet" component, there is the picture on top and then a gray row at the bottom with some white text.  I really liked that look and used that in the About page as well.</p>

		<h4>8. Give yourself credit</h4>

		<p>Even if you don't get everything in there that you wanted to, give yourself a pat on the back for improving things even just a little.  I wanted (still want) to migrate this site over to using Next.js, which is a server-side rendering framework that has a lot of cool features (outside of just the server-side stuff) that I want to use.  This site wasn't created using Next.js, it was created in create-react-app, and migrating it over is not trivial.  I'm still working on it, and maybe I will get it working, but it's not a "must have".</p>

	</React.Fragment>
);

export default PostData;
