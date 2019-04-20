import React from "react";

const PostData = props => (
	<React.Fragment>
	
	<p>I made it back, and it's only been like, 2-ish weeks!  Go me!</p>

	<p>So this time around, I wanted to get into the specific techniques that you can use to test your code as a developer.  It would take approximately forever to thoroughly talk through each technique.  And I don't have forever, but I do want to get into each one a little bit.  Let's just try it and see how this goes.</p>

	<h4>Manual Testing</h4>

	<p>Manual testing is the "no duh" solution to testing your code.  But even though it's obvious, I do think that developers can sometimes get so wrapped up in the coding that they forget to build it and check it as much as they should along the way.  Especially if you have a QA team in place, you may think "oh well they'll catch any of my bugs."  I believe it's in your best interest to pretend there is no QA team, and whatever you make is going directly into production with no more eyeballs on it.  Spend that extra 30 minutes to check things over and fix the issues you find.</p>

	<p>Why?  In my short tenure at Volano, pretty much everything I've put out has come back with some bug in it.  Usually it comes back after I've already moved on to another project.  It can be tough to switch gears and go back to a project you've already marked as "finished" in your mind and fix the issue.  It will probably take you longer to fix the bug at this point than if you had found the bug yourself while you were still "in" the project.</p>

	<p>That being said, manual testing your own code can be really difficult.  As a developer, you have a positive mindset - you're looking for the stuff going right with the software.  Testers take a different view, they are looking for what is screwy with it.  And especially with your own code, it can be very easy to develop blind spots and miss even glaringly obvious bugs.</p>

	<p>That's why I also recommend, if you're working at a place without a QA team, that you are generous and help test other people's code.  When you help others out, they will eventually return the favor and help you.</p>

	<h4>Code Standards and Code Reviews</h4>

	<p>Process changes are another pretty common and fairly "low hanging fruit" way to catch bugs.</p>

	<h5>Code Standards</h5>

	<p>Code standards are typically a document that describes how a company likes to style its code.  I really like <a href="https://codeahoy.com/2016/05/22/effective-coding-standards/" target="_blank">this article</a> that talks more about the real purpose behind them and how to do them effectively.  Check it out if you want to go more in depth.</p>

	<p>Essentially, the purpose of code standards is to catch bugs before they happen.  You want to make bad code stick out like a sore thumb.  The goal is to have the standards become second nature for the developers that work at a place so that they just automatically won't make those mistakes.</p>

	<p>The thing that can go wrong with code standards is that, you don't want your developers to feel boxed in.  The standards shouldn't be so strict that developers can't independantly decide how to structure their code.  It's a fine line.  Again, you can read more in the article I linked that says it better than I can here.</p>

	<h5>Code Reviews</h5>

	<p>The other fairly common practice to improving your code quality is code reviews (or pull requests if you're in the Git world).  Before you can merge your code into the main shared code branch, you need to have someone review your changes and make sure the code looks kosher.</p>

	<p>Personally, if someone tells me to change something, and it seems like it is a matter of opinion, as long as I don't feel it would hurt the quality of the code or the readability, I just make the change.  There might be a point to it that I'm not seeing now.  I'm still fairly green at this, after all.</p>

	<h4>Automation</h4>

	<p>There are like, a million different types of automated testing tools, and millions of different philosophies on automated testing.  I'm going to try to group it down to just a couple categories and talk through the tools I know of.</p>

	<h5>Unit Tests</h5>

	<p>Unit testing can be a contentious category.  I'll be totally honest here, I don't totally understand the lack of love for unit testing.  While teaching myself to code, I wrote unit tests for everything.  It was pretty awesome if I do say so myself.  Once you have a good suite of tests built up, you can make a change in your code, run the unit tests, and see very quickly if something broke.  It took a little longer to write the tests while I was coding, but after a while it saved me time in the long run.  And, bonus, they can even serve as documentation of use cases for a piece of functionality in a pinch.</p>

	<p>But, to be fair, I'll try to address the other side.  I just wrote very basic unit tests.  If you have a service, you might want to mock it up and create tests using that, which can take time.  A lot of developers have never unit tested, and some companies do not see the cost savings of automated tests, which to a degree I can understand.</p>

	<p>As far as tools for unit testing, I have a bunch to recommend.  For .NET, NUnit is amazing.  React, try Jest and Enzyme, those seem to be the gold standard.  And Angular, use Jasmine and Karma.</p>

	<p>With the JavaScript framework unit testing tools, they are doing this new thing now called snapshot testing.  You can load a component, take a "snapshot" of it (kind of like a photo of the code in that point in time, then when you rerun the test in the future that snapshot should be the same.  If it's not you know there's a problem with your component.</p>

	<h5>Automated test tools</h5>

	<p>Finally, end to end automation testing tools.  These are the tools that you'd typically let your QA team (or your automation team) set up.</p>

	<p>Personally, I am not a big fan of these types of tools.  I know I know... I'm pushing the unit test tools and downgrading these tools, but hear me out.  I was a tester for 9 years, at 3 different companies.  All 3 companies tried to do automation, and I never saw a single one actually work well.  It seemed like a big money pit and a giant waste of time in all 3 cases.</p>

	<p>At one company, I wrote an automated smoke test myself, using Smart Bear's Test Complete.  The software was wonky, and often clicked on the wrong parts of the page which caused the tests to false-fail.  Plus, I never found a single bug while running the tests - the only bugs I found were while writing the tests.  I didn't trust the tests.</p>

	<p>But, again, I'll play devil's advocate.  I would much rather write an automated test to do regression testing, because regression testing SUCKS SO MUCH.  If you can easily replace some regression testing with automation (note I said EASILY) then by all means do it.  Your testers will thank you.</p>

	<p>Also, I think some bigger companies have had success with automation.  If you have the dream environment to set up a full automated test suite, then by all means, go ahead.  But, I believe those companies are the exception rather than the norm, and smaller places would be better off to focus on unit testing and other code quality techniques.</p>

	<p>I am reluctant to give you this list of automated test tools, but, here it is, use at your own risk.  Selenium seems to be the automation tool of choice for testing web applications.  And it's free.  Why would you use something else if this is free.  If you like wasting money, then the other tools I've used are Test Complete (which is terrible, please don't use it), and Ranorex - seems okay, not great.</p>

	<p>A couple notable exceptions in this category.  Postman is free and is great for API testing.  You can use it on the dev side for testing your API calls, and then even save your tests and re-run them later as automated regression tests.  Another cute tool is Fitnesse.  FitNesse might be the most underrated testing tool I've ever seen.  It's again, free, it is easy to set up and use, and you can write a shedload of useful end-to-end tests with it.  Your testers need to be slightly technical to get the hang of it, but not overly so.  You can teach manual testers to use it, no problem.</p>

	<h4>The End</h4>

	<p>That concludes my 2 part series on testing as a developer.  There are techniques and tools I left out (linting, for example), but, like, seriously, I literally can't even.  This post took me 3 days to write, and if you made it this far, I commend you.</p>

	<p>Have a wonderful, sunny Easter weekend!</p>

	</React.Fragment>
);

export default PostData;