import React from "react";

const PostData = props => (
	<React.Fragment>
	
	<p>Hi there.  I'm back!  It's been a while.  I've been figuring out how to balance my personal and professional lives now that I'm working again.  That has been one of the most difficult things about this job.  Other than that it's going great though, absolutely love my coworkers and the work I'm doing.</p>

	<p>This post has been on my mind for a couple weeks.  I think I've mentioned on here that before I became a developer, I did software quality assurance for 9 years, for 3 different companies.  And currently I am still a CSTE (a certified software test engineer), though I'll likely let that lapse in 2020.  As a developer, I still do testing.  But it's a little different.  I want to talk through all the things you can do to test your software better while you are a developer on it.</p>

	<p>This will be a two-part post.  The first part (here) we'll talk about the mindset that you need to try to be in to test your code well.  In the second post I'll talk about specific technologies you can use to ensure quality - unit testing, coding techniques, etc.</p>

	<h4>Why write about this?</h4>

	<p>We all know that it's important to make sure the software we develop works correctly.  I believe most developers try to test their code while they are making it... what's the point of making software that doesn't do what it's supposed to?  But since testing isn't our first priority (as it shouldn't be), when we're crunched for time things can easily slip through the cracks.</p>

	<p>A couple weeks ago, I was supposed to implement a filter on a grid that filtered the records by year.  I had to do this on four different pages.  The first page was easy to do and I got it working quickly, so I just put the same thing on all three other pages and assumed it worked.  A week later, I went back and tested, and the feature didn't work on the other 3 pages!  Part of it was because the other pages had the year located at a deeper "level" of the grid, and part of it was due to sloppy coding.  I totally forgot to implement the javascript on the click event on one of the pages.  Insert facepalm emoji here.</p>

	<p>There were a few reasons this happened.  One was, honestly, inexperience.  There were a lot of things I had to do to implement even one filter.  If I had been coding for longer, it would have been easier for me to do the job and less likelihood for mistakes.  Also inexperience with this particular software project - this was the first time I had worked on this program and I didn't realize things were slightly different across the pages.  Another reason was time.  It's not that I was deliberately trying to go fast and cut corners.  It's more that the task was at a somewhat low number of hours, and it seemed easy enough (add a year filter to a grid, how hard can that really be?), so I thought it would be easier than it turned out to be.  At least I caught the bug and fixed it before it went to the client.</p>

	<p>I want to do better in the future.  I think there are some "low hanging fruit" in mindset shifts that I can make to catch some of these things earlier on in the process.</p>

	<h4>Ask questions</h4>

	<p>I am a natural question-asker.  I have always been a curious and inquisitive person.  But at the beginning of this job, I'll admit that I held back some of my questions.  Partly because I was used to having to figure everything out on my own when I was teaching myself to code.  I wasn't in the habit of "oh yeah, Joe can answer this question for me," I was in the do-it-your-damn-self mode still.  But partly it was out of pride.  I didn't want to seem dumb, or annoy my coworkers.  So, I held back a little bit at the beginning.  (Should mention, this is 100% my own doing, my coworkers don't seem bothered by my question-asking, which is awesome)</p>

	<p>Now I see that asking all the questions I have is an integral part to helping me get better and eventually go faster.  Asking a bunch of questions might be bothersome for some people in the short term.  But in the long term, I will start to get projects done faster, I will pick up the company's coding best practices and standards quicker, and I will get a better idea for what is expected on coding projects I will do the future.</p>

	<h4>Be open to feedback about your code</h4>

	<p>Accepting feedback gracefully is hard, there's no doubt about it.  I've noticed when I get feedback, there is a minute or two right after receiving it where I get a little angry.  Usually I will get defensive, and depending on how mad the feedback makes me, I can even be downright snarky about it.  But, after a couple minutes, I calm down and look for the parts of the feedback that are valid.</p>

	<p>I think there are 2 keys here.  The first is reading yourself and recognizing what happens to you when someone gives you negative feedback.  If you know ahead of time how you usually react, it is easier to know, okay if I can make it through the first couple minutes without saying anything too bad, that is half the battle.  It's not that it's wrong to feel bad or defensive when someone tells you you goofed, but your problems will increase if you react badly.</p>

	<p>The second part is accepting the feedback.  Even if it was poorly delivered, it's always better that the person told you about the problem.  The earlier, the better.  If you never got feedback about your code, you could never improve.  Personally, I have a fear of being a developer that is out of touch, doesn't really know what they're doing, and other people complain about.  Feedback helps prevent me from becoming that developer.</p>

	<h4>Look at the details</h4>

	<p>I'm still really detail oriented with software.  If there is a bug on a page that I'm working on, there's a good chance that I'll find it.  The thing I've had to train out of myself is the excessive hunting-down and fully understanding where these bugs are coming from, and trying to fix all the bugs myself right now (fixing bugs has been novel for me, since I wasn't able to do that in my former life and I really wanted to).  But, I'm not a tester anymore, and finding bugs with other people's code isn't my first priority as a developer.  I will for sure either write up an issue or (more likely) ask someone about it.  Sometimes they'll tell me to go ahead and fix it.  However, if they aren't in my direct path with whatever I'm working on, I'm not going to look into it too much or try to fix it without asking.</p>

	<p>But I do think it's good to be detail oriented around features that you are directly working on.  You may not have to understand everything the software is doing on a whole, but you should at least make sure it's doing the right thing in your feature.  Which, to me, means going in and manually testing my changes, and making sure that it's doing what it should be doing.  I may not do all the testing I once did as a QA, but I at least make sure my stuff works, and I didn't break anything else.</p>

	<h4>Next time</h4>

	<p>That's it for today.  Part two about specific testing techniques (hopefully) coming soon.  Have a great day!</p>

	</React.Fragment>
);

export default PostData;