<script>
	import { push } from 'svelte-spa-router';
	import { currentPage, currentSort, inbox, landingOpen, bannerClosed, resetInbox } from './stores.js';
	import Email from './components/email.svelte';
	import Modal from './components/modal.svelte';

	const labels = [
		'New Mail',
		'Inbox',
		'Starred',
		'Sent',
		'Drafts',
		'Archived',
		'Spam',
		'Trash'
	]

	const landingEmail = {
		senderEmail: 'greteSa@email.com',
    sender: 'Grete Samsa',
    subject: 'Archived Inbox of Gregor',
    to: 'Jefe Bezos',
    toemail: 'Jefe.Bezos@amazoff.com',
    time: '8:43AM',
    starred: false,
    read: false,
    text: `Mr. Bezos, 

		I'm writing to confirm that I've received the archived inbox of Gregor Samsa. Thank you, and I'm sorry.
		
		Best, 
		Grete`
	}

	// changed values get saved to localStorage
	$: localStorage.setItem('landingOpen', $landingOpen);
	$: localStorage.setItem('bannerClosed', $bannerClosed);

	const submitSearch = (e) => {
		e.preventDefault();
		if (e.target[0].value){
			push(`/bug?query=${e.target[0].value}`);
		}
	}
</script>

<div id="container">

	<div id="info-banner" class="{$bannerClosed ? 'hidden' : 'shown'}">
		<span>
			This inbox has been archived as of 09/01/19. Emails can no longer be sent out.
		</span>
		<button class="outset" on:click={()=>{$bannerClosed=!$bannerClosed}}>Ok</button>
	</div>

	<header>
		<div id="logo-box">
			<div on:click={()=>{window.location.href='#Inbox/all'}}>
				<img alt="bmail logo"/>
			</div>
		</div>

		<div id="search-box">
			<form on:submit={submitSearch}>
				<input name="query" type="text">
				<button type="submit" class="outset" ></button>
			</form>
		</div>
	</header>

	<div id="body-cont">
		<nav>
			{#each labels as label}
				<div class="label" class:selected={$currentPage == label}>
					<a href="#{label}/all" class="link" class:disabled={label == 'New Mail'}>{label}</a>
				</div>
			{/each}
		</nav>

		<div id="main-and-footer">
			<main>
				<div id="sorting-bar">
					<div id="left">
						Show: 
						<a href="#{$currentPage}/all" class:selected='{$currentSort == 'all'}'>All</a>
						<a href="#{$currentPage}/unread" class:selected='{$currentSort == 'unread'}'>Unread</a>
						<a href="#{$currentPage}/read" class:selected='{$currentSort == 'read'}'>Read</a>
					</div>
					<div id="right">
						{$inbox.length} of {$inbox.length}
					</div>
				</div>
				<div id="email-list">
					{#each $inbox as email}
						<Email {...email} bind:read={email.read}/>
					{/each}
				</div>
			</main>
			<footer>
				<p>Use the search bar to find messages quickly!</p>
				<p>You are currently using  247 MB (3%) of your 7063 MB.</p>
				<p>Last Account Activity: 30 days | <span class="link" on:click={()=>{$landingOpen=!$landingOpen}}>Details</span></p>
				<p>Powered by <a class="link" href="https://jogao.weebly.com/" target="_blank">me</a> | <span class="link" on:click={resetInbox}>Reset</span></p>
			</footer>
		</div>
	</div>
	
	<Modal {...landingEmail} open={$landingOpen} on:click={()=>{$landingOpen = !$landingOpen}}/>
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

#info-banner {
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	padding: 0 5px;
	background-color: #FFFECD;
	border-bottom: 1px solid #FFE600;
}

#info-banner span {
	margin-top: 9px;
	margin-right: 5px;
}

@media (max-width: 600px) {
	#info-banner span {
		overflow-x: scroll;
		white-space: nowrap;
	}

	/* hides scrollbar on narrow screens, assumes the user is using a touchscreen but alas this could be a problem for devices that are both non-touchscreen and narrow */
	::-webkit-scrollbar {
    width: 0px;
    background: transparent; 
		display: none;
	}
}

#info-banner button {
	margin-bottom: 0;
}

.hidden {
	display: none;
}

.shown {
	display: flex;
	flex-flow: row nowrap;
	justify-content: center;
}

header {
	display: flex;
	flex-flow: row nowrap;
	min-height: 125px;
}

#body-cont {
	width: 100%;
	display:flex;
	flex-flow: row nowrap;
}

nav, 
#logo-box {
	width: 170px;
	min-width: 170px;
	max-width: 170px;
}

@media (max-width: 600px) {
	nav, 
	#logo-box {
		width: 100px;
		min-width: 100px;
		max-width: 100px;
	}
}

.label,
#logo-box {
	padding-left: 8px;
}

#logo-box {
	display: grid;
	align-items: center;
}

@media (min-width: 601px) {
	#logo-box img {
		content: url('../assets/full-logo.svg');
		cursor: pointer;
	}
}

@media (max-width: 600px) {
	#logo-box img {
		content: url('../assets/short-logo.svg');cursor: pointer;
	}
}

#search-box,
#search-box form {
	display: flex;
	width: 100%;
	align-items: center;
}

#search-box input,
#search-box button {
	display: flex;
	align-self: center;
	margin-bottom: 0;
}

#search-box input {
	width: 95%;
	max-width: 430px;
	height: 32px;
	margin-right: 10px;
	background-color: white;
	box-shadow: inset 1px 1px 1px 1px rgba(136, 136, 136, 0.5);
}

#search-box button {
	width: 131px;
	height: 32px;

	font-size: 16px;

	cursor: pointer;

	display: grid;
	justify-content: center;
}

.outset {
	box-shadow: inset -1px -1px 1px 1px #888;
}

#search-box button:before {
	content: "Search Mail";
}

@media (max-width: 600px) {
	#search-box button:before {
		content: "Search";
	}

	#search-box button {
		width: 100px;
	}
}

.label {
	height: 25px;
	
	display: flex;
	align-items: center;
}

.label.selected {
	background-color: #C3D9FF;
	font-weight: bold;
}

.label .disabled {
	cursor: not-allowed;
	pointer-events: none;
	color: rgba(9,1,200,0.5);
}

#main-and-footer {
	max-width: 1250px;
	width: 100%;
}

#sorting-bar {
	background-color: #C3D9FF;
	width: 100%;
	height: 30px;
	display: flex;
	align-items: center;
	padding: 0 10px;
	justify-content: space-between;
}

#sorting-bar a {
	color: #0901C8;
	margin: 0 5px;
}

#left .selected {
	text-decoration: underline;
}

#email-list {
	border-left: 10px solid #C3D9FF;
	border-bottom: 30px solid #C3D9FF;
	min-height: 250px;
	width: 100%
}

footer {
	text-align: center;
}

footer p {
	margin: 2px;
}
</style>