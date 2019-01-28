import React from "react";

const PostData = props => (
	<React.Fragment>
	<p>I've been thinking about this post for a while.  Blog post ideas get kind of stuck in my mind until I write them.  Now that I am starting a job soon, I want to get this out there so that it is off my mind and on the internet.  Maybe not the BEST strategy in life but... yeah.</p>

	<p>I've written custom user authentication for my latest project, <a href="www.mybooklist.io" alt="my booklist link" target="_blank">mybooklist.io</a>.  It's based loosely on how Wes Bos did custom auth in his Advanced React course.  The difference is that he did it with GraphQL on an Express server while I'm doing it with .NET Framework hosted on IIS.  I've had to adapt parts of it to fit my project.</p>

	<p>I'll talk about this at a high level, so you could take this and apply it to your project even if you're using a totally different stack.  Or you might find an external provider suits your needs better.  If you're working at a company where security is super high priority I would 100% recommend finding an external authentication service (for example, Okta).</p>

	<h5>One-way hash the password</h5>

	<p>When a user signs up for your site, you're going to want to hash the password so that if someone gets hold of the data they don't just have the passwords of your users.  Also, I can see the data in the database, and man I don't want to know your password is 'cat'!  In fact, I'd like to just hash all the user data in the database, because I don't want to know that much about you!  But I suppose you wouldn't actually want to encrypt all your user data in case, in theory, you had to debug something in the database.  So anyway, I just have the passwords hashed.</p>

	<p>There are 2 ways of hashing that I know about, one-way or two-way hashing.  Two way means that you have a method of decrypting the hash.  So if your password is 'cat' (please change that, by the way, that is not safe), and I'm using a two-way hash, I change your password from 'cat' to '2shfjg2850qwer' and that gets stored in the database.  When you want to sign in again, I take '2shfjg2850qwer' and convert that back to 'cat' and compare it to the password you input.</p>

	<p>One way is slightly different.  I take 'cat' and convert it to '2shfjg2850qwer'.  But there's no way to go from '2shfjg2850qwer' to 'cat'.  Instead, I take the password you input, use the same one-way hash, and compare it to what's in the database.  So, you go to sign in again, and enter 'cat', the hashing gives me '2shfjg2850qwer' and I compare that to what is in the database.  This method is safer, because if hackers got ahold of this information there is no way they could decrypt it.</p>

	<p>The thing you've got to look out for is that the one-way hash algorithms are well known.  MD5 is a commonly used one, and there are websites out there with hashes and what the passwords are, so if someone did get a hold of data using MD5 hashes they could go on the website and find '2shfjg2850qwer' and see your password is 'cat'.  The other bad thing about MD5 is that it is way too fast.  If you are using MD5 and no salt (which is a random string added to the end of every password) a hacker could get a password like 'gfhdsa2345' in something like 700 seconds.  With a salt, that makes it harder, and if the password contains a special character harder still... but you don't want to take a chance with that.  That is why you should use BCrypt to generate and validate your passwords.  BCrypt is a lot slower than MD5, which in this case is a good thing!</p>

	<h5>Unique userToken</h5>

	<p>Okay, so you've got it set up so that the user can get themselves into the database via a username and encrypted password so they can sign in.  The other thing that bad people can do to mess things up on your site is to impersonate someone else and enter data through them.  We have to make sure they can't do that.  As an added bonus, wouldn't it be nice if a user didn't get logged out of the site if they navigated to another page and came back?  We can accomplish both things by storing some information about the logged in user on a cookie stored on the browser.</p>

	<p>The way Wes Bos in his Advanced React course does this is to create a JWT (JSON Web Token) and store this on the cookie.  Creating the JWT generates a unique token which is then decrypted in your program when you need it.  It can store JSON data about your user.  In Wes' case, he stores the username on the cookie.</p>

	<p>I decided to do it a little differently.  Wes generates the JWT on his server (express) and checks it every time the user does any API call.  I wanted to do that too but I'm using .NET framework hosted on IIS for the server - a little different.  I could have generated the JWT on the server, but it turned out there was an easier way.</p>

	<p>What I do is to take the user's username, generate a unique token for them (using the same methodology as the password, a one-way hash with a different salt) and store that on the database.  When the user signs in, I store this token on the cookie.  I have a method that checks if the user token on the cookie is valid.  If the user comes to the website and they have an invalid token, or they don't have a token at all, they are automatically signed out.  Same thing happens if they are on the page, and they try to make a request to the database but don't have a token or have an invalid token.  That way, no one can scam the system (because it would be really hard to guess the user token), and the user doesn't have to sign in every time they come to the page.</p>

	<h5>The next steps - resetting passwords, editing user permissions</h5>

	<p>There are a couple things I haven't implemented yet into my site but I want to.</p>

	<p>One is resetting passwords.  I think the most secure way to do this would be to send an email.  Unfortunately, I didn't ask the users for an email address when I first set up the site.  So I am going to have to do this in 2 steps.  First I'll allow the user to reset their passwords on a page inside the site, like an "edit my info" page.  The next step would be to somehow force all users to enter an email address to be associated with their username (or just make them make their username an email address).  Then I'll change the password resetting to just be a button you push somewhere saying "reset my password" and it'll send you an email.</p>

	<p>The other thing that would be fun would be to have user permissions and allow admin users to edit them.  This is sort of a pipe dream right now because my site isn't complex enough to have anything to secure!  But say you want to lock down deleting books to only certain users.  Admin users could go in and say, okay Joe needs to delete a book so let's give him permission to do that... they could log in and go to the permissions management page and give him delete permission.</p>

	</React.Fragment>
);

export default PostData;