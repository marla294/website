import React from "react";
import CodeBlock from '../components/CodeBlock';

const PostData = props => (
	<React.Fragment>
		<p>Hello there!  At this point you may be wondering how I pick the header images for the blog posts.  There is absolutely no rhyme or reason for the images I choose.  I just find a big enough stock image that I like and roll with it.  This one seemed appropriate, because I'm talking about React Hooks, and a paperclip is a hook... kind of ;).  Just roll with it.</p>

		<p>What are hooks?  You may have heard the hype from the React developer conference late last year.  React hooks are a different way of using state.  You can now use State in functional components instead of having to go all-in with extending the React Component class.</p>

		<p>Hooks are out now in an alpha release (16.7.0-alpha).  Since trying new things is my jam, I decided to test them out in my latest project, <a href="www.mybooklist.io" alt="my booklist link" target="_blank">mybooklist.io</a>.  I'll talk a little about how to set them up and use them, and the benefits and drawbacks that I found</p>

		<h4>How To Use Hooks</h4>

		<p>Hooks are RIDICULOUSLY easy to use.  I think it is easier to use hooks than to use state normally.  There's no setState, which I often find myself forgetting to do.  Woohoo!  Partay!  I'm not going to cover all the features of hooks, just the basics.  If you want to go more in depth, which I recommend if you seriously want to start using it, please check out the official Hooks documentation <a href="https://reactjs.org/docs/hooks-intro.html" alt="react hooks official documentation" target="_blank">here</a>.</p>

		<p>First thing you've got to do is, import hooks.  You'll need the "useState" package from react.</p>

		<CodeBlock>{`import {useState} from 'react';`}</CodeBlock>

		<p>Then, to use it, all you need to do is create a couple constants inside your functional component.  For example, let's say your component is a checkbox, and you need to add a "checked" flag to state:</p>

		<CodeBlock>{`export default function MyCheckbox(props) { \n
	const [checked, setChecked] = useState(false);`}
		</CodeBlock>

		<p>"checked" would be the reference to your item in state, which is initially set to false.  And "setChecked" is the function that you use within MyCheckbox to set checked.  "useState(false)" tells these constants to use React Hooks.  Now let's take a look at how to actually use these within the element.</p>

		<CodeBlock> {`<FormField> \n
	Checkbox: \n
	<input \n
		type="checkbox" \n
		id="myCheck" \n
		name="myCheck" \n
		required \n
		value={checked} \n
		onChange={e => setChecked(e.target.value)} \n
	/> \n
</FormField>`}
		</CodeBlock>

		<p>The value of the checkbox is tied to the checked state property.  checked is initially set to false in state, so the checkbox is unchecked by default.  When someone clicks it, the checked property is updated using the setChecked function, the value of the field is updated and the field is checked.  See how easy!</p>

		<p>Something else you might be wondering is how do we use componentDidMount and other lifecycle methods now, since this is a functional component, not a class.  Don't worry, React added stuff for that too.  "UseEffect" functions as componentDidMount.  You have to import it, just like useState:</p>

		<CodeBlock>{`import {useState, useEffect} from 'react';`}</CodeBlock>

		<p>Say you want to grab some data when the user first loads the component, a perfect use case for componentDidMount.  Here is how you'd use useEffect for that:</p>

		<CodeBlock>{`useEffect(async () => { \n
	await loadMyDataPlease(); \n
}, []);`}
		</CodeBlock>

		<p>One thing to remember is that useEffect functions a little differently than componentDidMount.  You have to pass it an array after the function you want it to run that tells it when to run.  If something in the array changes, useEffect will run.  I passed an empty array in the example above, which means it will only run once, when the component first mounts, and hence it will act just like componentDidMount.  If you forget to do this, useEffect will continuously run... which is obviously bad, so try to remember to do it!</p>

		<h4>The Benefits and Drawbacks Of Hooks</h4>

		<p>Ok, so we've covered the very basics of how to use hooks.  I want to talk a little about the benefits and drawbacks of using them, both from my perspective and from the perspective of a company that might be thinking about switching to using hooks in the future.  Personally, I'm not for or against using hooks.  I'm neutral.  It's like any tool, it's good to know how to use it, but there may be situations where using something else makes a lot more sense.</p>

		<h5>The Good</h5>

		<p>I think that hooks intuitively make more sense than the old way of using state.  The whole "you have to run setState and set the property on the state object to your new state" is just kind of weird.  Hooks just make it look a lot cleaner and easier to use and understand than setState.  A company that has a lot of new developers on the team might like to use hooks to make their code a little cleaner and easier to understand.</p>
		<p>Also, I like that useEffect gives you the option of running it when different variables change.  It is kind of a multi-purpose tool.</p>

		<p>I also really like that you are forced to use functional components instead of component classes to use hooks.  JavaScript is a language based on functions.  Classes are syntactic sugar.  Hooks allow you to get back to the basics of JavaScript, and start thinking of it as the prototype-based language that it is.</p>

		<h5>The Confusing</h5>

		<p>There are some downsides to hooks.  To any companies thinking about switching, I can see how it would be challenging to have to change all your component classes over to functional components using hooks.  Especially since the old way of using state will be supported in the future.  Maybe it wouldn't be worth the time or effort in some cases.</p>

		<p>The other couple things I ran into while using hooks may be possibly due to hooks not being out in an official release yet.  One thing is that the Chrome React dev tools, which I use heavily for debugging React, don't seem to support hooks yet.  The State dropdown is real confusing.  Maybe I'm not understanding it properly, but it's not intuitive to figure out.  So that's been a bit of a bummer.</p>

                <p><strike>Also, I found that component refs don't work with functional components, which means they don't work with hooks.  My example was that I needed to blur an input component, and for that I needed a component ref.  You can't do a component reference with functional components.  No idea if they plan to support that in the future or not, or if it even can be supported.</strike>  After publishing this post, my brother (senior software engineer <a href="https://raymondjcox.com" target="_blank">RJ Cox</a> at Drift) sent me <a href="https://reactjs.org/docs/hooks-reference.html#useref" alt="React documentation for refs" target="_blank">this link</a> about creating references with hooks in the React documentation.  I haven't tried it yet, but it might be the solution to using component refs with hooks.</p>

	</React.Fragment>
);

export default PostData;
