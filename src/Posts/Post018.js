import React from "react";

const PostData = props => (
	<React.Fragment>

	<p>Hi!  It's been a while, as per usual when I post here :)</p> 

	<p>I've been at Fixation almost a year now.  It will be 1 year in 2 weeks, on Feb 7th.  Wanted to post a little update of how it's been going and what I've been doing at work!</p>

	<p>Let's go back... way back... to when I decided to become a developer by teaching myself to code.  I didn't know back when I started exactly what I wanted to do as a developer.  Meaning, I didn't know whether I wanted to do freelance work, or work at a company, or become a contractor.  After about 9 months, I decided I wanted to go back to the traditional software engineer type role that I had seen in the past as a QA engineer.</p>

	<p>Why?  Because, I was setting up all these projects on my own, and they worked... but I had no idea if this was "how it's done" in the industry, or if my code was super wonky and gross.  AKA, I wanted to learn from other people and learn from professional codebases.</p>

	<p>When I worked at Volano, to be super, brutally honest - I did not feel that I was learning the right things there.  They are mainly a consulting company that is focused on getting things done within the speced hours.  I saw them they underbid projects massively.  Due to this, they did not have unit tests, QA, documentation, pull requests, or code reviews there.  In fact, one of the founders of the company was extremely opposed to unit tests.  As a result, most of the code that I saw was, in my opinion, pure spaghetti.</p>

	<p>It was insane how I found the job at Fixation.  One day in mid-January last year, I found a bug in some legacy code that I just could not believe.  It was in a system that calculated coupon claim codes for a lawnmower website.  They had a switch in the code that operated off of a text value that an admin would type into a field.  If the admin typed in the wrong value, or even the right value but with the wrong case, it would break the entire system and it would be impossible to know why.  It absolutely killed me.  Why would you have this as a TEXT FIELD on the site?!?  It made 0 sense.  I argued about fixing it, and they were all "leave it alone, work to live don't live to work" - aka, "don't touch it you moron (because you'll break something else, because we don't have the time to fix our tech debt)!"</p>

	<p>That day, I was so annoyed that I went home, got on LinkedIn, and started looking for jobs.  I saw 2 that I was interested in, and put in my application - one was Fixation.  2 days later, on a Friday, I was on a phone interview with them.  They asked me to do a technical problem, build a small application in .NET, over the weekend.  I did that, then the next Wednesday I had an in person interview where we went over the technical problem.  They let me know that night that they wanted me to come work there!  So it was literally a week from when I applied for a job to getting the offer at Fixation.  Put in my notice at Volano (they were pissed), and the rest is history.</p>

	<p>So I've been here almost a year.  I think I can say now that I love working here, without fear of them seeing that and being like, "whoa, too soon".  It is a super small company, we're only 4 right now, including me, though we're hiring for another senior developer.  It is night and day different from Volano.  Like, if Volano could have an opposite, Fixation would be it.  All the things (except QA - sort of) I felt were missing at Volano, I've found here.  We have pull requests up the wazoo.  Everything goes through a PR.  Curtis is the architect, and he is super smart.  He does most of my pull requests and he sees a ton of things that I miss.</p>

	<p>We also do unit tests here, believe it or not.  I haven't written a ton - yet - because we ARE still a consulting company and hours rule the day, and I'm not fast enough on tasks yet to have the time to get to them.  I am working up to it, though, and have started writing a few.  But we do have them, use them, and run them.</p>

	<p>I've worked on 2 projects since I've been here.  The main one has been Senior Care Finder (seniorcarefinder.com).  It is a website that allows people to search for care for the senior citizens in their life.  When I came on the project at the beginning of last year, it was set up and working, but there was a lot left to do to get it to "go live" state.  I helped build much of the site, and it went live last fall!  Since then it's been mostly in maintance mode, and I've ramped down on hours on it, though we have some big changes coming up and I'll likely be ramping back up for a short period of time.</p>

	<p>The other project I've been helping out with lately, over the past month, is Auction Resource.  This is a project that was developed in house by Fixation and was recently sold to Iron Connect.  Iron Connect has come up with a bunch of changes they want to make to the site, hence why I'm working on it.  It's a bigger codebase than CareFinder, and legacy code, but that's fine.  I don't mind legacy code as long as it's well-written and maintained (ahem VOLANO listen up), which the vast majority of Fixation's code appears to be.</p>

	<p>I also really like that the company is small.  They depend on me to pull my weight.  That does make it hard on days when I'm not feeling great, or have other stuff going on.  But for the most part, I like it.  I always have work to do!  Which is awesome, I can't stand to be sitting around doing nothing.</p>

	<p>It's not perfect.  I've been working from home most of the time since last March, when stupid COVID hit us.  Now everybody is going into the office parttime, and I go in 1 day a week.  But, I didn't sign up for an almost full-time wfh gig... I prefer going into the office.  I get more done and communication, which is not my strong point, is easier for me in person.  Not much I can do about that until I get the vaccine.  Sigh, which might be in like, June?  Dear God.</p>

	<p>The other thing is, with a small company, it can get a little lonely sometimes.  I prefer this to always-on Volano, where people were talking on Slack non-stop and part of your job description seemed to be to entertain others.  But still... there are days when the entire day, no one says anything on Slack except for "hello" in the morning.  And with the pandemic, we're not going out doing anything else anyway... so I can get a little stir crazy.</p>

	<p>But on a whole, I really like it here.  I can see that I have improved, a LOT, which is awesome.  The main reason I came to work here was to learn a bunch from other smart people, and I am doing that.  I don't see myself going anywhere anytime soon.  Hopefully they aren't planning on kicking me out any time soon either :)</p>

	</React.Fragment>
);

export default PostData;