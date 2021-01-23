import React from "react";

const PostData = props => (
	<React.Fragment>

	<p>This is going to be the start of a series that I am going to call, "Cool Sh*t I've Coded."  I'm going to talk about little things I've coded up that I thought were cool.</p>

	<p>The first one is from a problem I looked at with a SQL query last week.  We were already unioning 2 tables that had similar info in a stored procedure.  It was really important to keep the tables in a certain order when spitting out the output.  The procedure sort of looked like this (this is pseudocode, don't @ me if it's not exactly syntactically correct):</p>

	<CodeBlock>{`
		select make, model
		from (
			select make, model, 0 as ordinal
			from tableA

			union all

			select make, model, 1 as ordinal
			from tableB
		) makemodel
		order by ordinal
	`}</CodeBlock>

	<p>There were duplicate make/models in both tables, and we wanted to remove them, while keeping the ordering the same.  First we tried just changing over to a union, instead of union all, which will act like a distinct and get rid of the dupes:</p>

	<CodeBlock>{`
		select make, model
		from (
			select make, model, 0 as ordinal
			from tableA

			union

			select make, model, 1 as ordinal
			from tableB
		) makemodel
		order by ordinal
	`}</CodeBlock>

	<p>But, that didn't work because of the ordinal.  It got rid of the duplicates in each table individually, but if there were dupes between the 2 tables those were still there.</p>

	<p>After a lot of trial and error and research, here's what I arrived at that fixed the issue:</p>

	<CodeBlock>{`
		select make, model
		from (
			select make, model, 0 as ordinal
			from tableA

			union

			select tableB.make, tableB.model, 1 as ordinal
			from tableB
			left join tableA on tableB.make = tableA.make and tableB.model = tableB.model
			where tableA.make is null
		) makemodel
		order by ordinal
	`}</CodeBlock>

	<p>This takes the duplicate records between tableA and tableB out of tableB.  So now there are no duplicate records between the two tables, and we could still do our sorting by the ordinal.</p>

	</React.Fragment>
);

export default PostData;