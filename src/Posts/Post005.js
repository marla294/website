import React from "react";
import CodeBlock from '../components/CodeBlock';

const PostData = props => (
	<React.Fragment>
		<p>Hello there!  At this point you may be wondering how I pick the header images for the blog posts.  There is absolutely no rhyme or reason for the images I choose.  I just find a big enough stock image that I like and roll with it.  This one seemed appropriate, because I'm talking about React Hooks, and a paperclip is a hook... kind of ;).  Just roll with it.</p>

		<p>What are hooks?  You may have heard the hype from the React developer conference late last year.  React hooks are a different way of using state.  You can now use State in functional components instead of having to go all-in with extending the React Component class.  I'm by no means an expert on Hooks, but I did use the feature in my latest project, <a href="www.mybooklist.io" alt="my booklist link" target="_blank">mybooklist.io</a>.  I'll talk a little about how to set them up and use them, and the benefits and drawbacks that I found</p>

		<h4>How To Use Hooks</h4>

		<p>Hooks are RIDICULOUSLY easy to use.  I think it is easier to use hooks than to use state normally.  There's no setState, which I often find myself forgetting to do.  Woohoo!  Partay!</p>

		<p>First thing you've got to do is, import hooks.  You'll need the "useState" package from react.  Now let me try my hand at my first code block ever on this blog...</p>

		<CodeBlock>{`import {useState} from 'react';`}</CodeBlock>

		<p>Yas!  It worked!  See, I'm glad I changed the font of this blog to look good with code blocks.</p>
	</React.Fragment>
);

export default PostData;
