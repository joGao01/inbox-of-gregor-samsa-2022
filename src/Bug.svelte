<script>
	import {querystring} from 'svelte-spa-router'
	console.log($querystring);
	const params = new Proxy(new URLSearchParams($querystring), {
  	get: (searchParams, prop) => searchParams.get(prop),
	});

	let query = params.query; // "some_value"

</script>

<div id="container">
	<header>
		<div id="logo-box">
			<a href="/#Inbox/all"><img alt="bmail logo"/></a>
		</div>

		<div id="top-bar-cont">
			<div class="bar"></div>
		</div>
	</header>

	<main>
		<h1>Server Error Encountered</h1>
		<p>Looks like you've encountered a bug while searching for: {query}</p>
		<p>No worries though! Our team is probably already looking into the issue.</p>
		<a href="/#Inbox/all" class="link">Back to Inbox</a>
	</main>

	<footer>
		<div class="bar"></div>
	</footer>
	
</div>

<style>
  @media (max-width: 800px) {
	#container {
		width: 95%;
		max-width: 95%
	}
}

@media (min-width: 801px) {
	#container {
		max-width: 1500px;
	}
}

#container {
	margin: 0 auto;
	font-size: 16px;
}

header,
footer {
	display: flex;
	flex-flow: row nowrap;
	min-height: 125px;
}

#logo-box {
	display: grid;
	align-items: center;
	padding-left: 8px;

	width: 170px;
	min-width: 170px;
	max-width: 170px;
}

@media (max-width: 600px) { 
	#logo-box {
		width: 100px;
		min-width: 100px;
		max-width: 100px;
	}
}

@media (min-width: 601px) {
	#logo-box img {
		content: url('../assets/full-logo.svg');
	}
}

@media (max-width: 600px) {
	#logo-box img {
		content: url('../assets/short-logo.svg');
	}
}

#top-bar-cont {
	width: 100%;
	display: grid;
	align-items: center;
}

main {
	padding: 20px 8px;
}

.bar {
	background-color: #C3D9FF;
	height: 25px;
	width: 100%;
}

footer {
	display: grid;
	align-items: center;
}
</style>