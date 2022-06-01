<script>

</script>

<div id="container">
	<header>
		<div id="logo-box">
			<img alt="bmail logo"/>
		</div>

		<div id="search-box">
			<input type="text">
			<button></button>
		</div>
	</header>
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
		width: fit-content;
	}
}

#container {
	margin: 0 auto;
	font-size: 16px;
}

header {
	display: flex;
	flex-flow: row nowrap;
	min-height: 125px;
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
</style>