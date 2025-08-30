<script lang="ts">
	import sparkles from './sparkles.gif'
	import contact from './contact.gif'
	import links from './links.gif'
	import projects from '../_projects.json'

	import { initNeko, pageRendered, loadedNekoCount } from '../neko/oneko'
	import '../neko/oneko.css'

	import type { BlogPostPreview } from '../blog.json/preview'
	import Button from './Button.svelte'
	import { browser } from '$app/environment'
	import { onMount } from 'svelte'

	export let data
	export let posts: BlogPostPreview[] = data.posts
	export let status = data.status

	const lastComplaintAt = new Date(status.last_complaint_at)
	const hoursSinceLastComplaint = Math.floor(
		(Date.now() - lastComplaintAt.getTime()) / 1000 / 60 / 60
	)
	const daysSinceLastComplaint = Math.floor(hoursSinceLastComplaint / 24)

	const lastUpdatedAt = new Date(status.last_updated_at)

	function timeAgo(date: Date) {
		const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000)
		let interval = seconds / 31536000
		if (interval > 1) return Math.floor(interval) + ' years'
		interval = seconds / 2592000
		if (interval > 1) return Math.floor(interval) + ' months'
		interval = seconds / 86400
		if (interval > 1) return Math.floor(interval) + ' days'
		interval = seconds / 3600
		if (interval > 1) return Math.floor(interval) + ' hours'
		interval = seconds / 60
		if (interval > 1) return Math.floor(interval) + ' minutes'
		return Math.floor(seconds) + ' seconds'
	}

	function getCurrentTimeInCst(): string {
		return new Date().toLocaleString('en-US', {
			timeZone: 'America/Chicago',
			hour: 'numeric',
			minute: 'numeric',
			second: 'numeric',
			hour12: true,
		})
	}

	let currentTimeInCst = getCurrentTimeInCst()
	let nekoEl: HTMLDivElement
	let nekoSpriteName: keyof typeof nekoSpriteIdsToNames = 'idle'
	onMount(() => {
		const startFollowingMouse = initNeko(nekoEl, (spriteName) => {
			nekoSpriteName = spriteName as any
		})
		nekoEl.onclick = startFollowingMouse

		const interval = setInterval(() => {
			currentTimeInCst = getCurrentTimeInCst()
		}, 1000)
		return () => clearInterval(interval)
	})

	const nekoSpriteIdsToNames = {
		idle: 'Idle',
		alert: 'Alert',
		scratchSelf: 'Idle',
		scratchWallN: 'Idle',
		scratchWallS: 'Idle',
		scratchWallE: 'Idle',
		scratchWallW: 'Idle',
		tired: 'Tired',
		sleeping: 'Sleeping',
		N: 'Chasing',
		NE: 'Chasing',
		E: 'Chasing',
		SE: 'Chasing',
		S: 'Chasing',
		SW: 'Chasing',
		W: 'Chasing',
		NW: 'Chasing',
	}
	const nekoSpriteIdsToStatuses = {
		idle: 'idle',
		alert: 'down',
		scratchSelf: 'idle',
		scratchWallN: 'idle',
		scratchWallS: 'idle',
		scratchWallE: 'idle',
		scratchWallW: 'idle',
		tired: 'idle',
		sleeping: 'idle',
		N: 'up',
		NE: 'up',
		E: 'up',
		SE: 'up',
		S: 'up',
		SW: 'up',
		W: 'up',
		NW: 'up',
	}

	onMount(() => {
		$pageRendered = true
	})

	$: nekoStatusClickable = $loadedNekoCount >= 2
</script>

<table id="main-table">
	<tbody>
		<tr>
			<td valign="top" class="left-sidebar-container" width="200">
				<table class="left-sidebar" width="210" cellspacing="0">
					<tbody>
						<tr>
							<td class="website-status-container">
								<h3>Website status</h3>
								<div class="website-status-value">
									<table>
										<tbody>
											<tr>
												<td>probably</td>
												<td><span class="status-up">Up!</span></td>
											</tr>
										</tbody>
									</table>
								</div>
							</td>
						</tr>
						<tr class="spacing hidden-if-noscript"></tr>
						<tr class="hidden-if-noscript">
							<td class="current-time-cst-container">
								<h3>Current time for me</h3>
								<div class="current-time-cst-value">
									{currentTimeInCst}
									{#if currentTimeInCst.startsWith('11:11:')}
										<a href="http://makea.fish">🐟</a>
									{/if}
								</div>
								<div class="current-time-cst-info">(CST)</div>
							</td>
						</tr>
						<tr class="spacing"></tr>
						<tr>
							<td class="active-minecraft-servers-container">
								<h3>Active Minecraft servers</h3>
								<div class="active-minecraft-servers-value">
									<a
										href="https://grafana.scanner.matdoes.dev/d/MVK-dYM4z/scanner-stats?orgId=1&refresh=1m"
									>
										{status.active_minecraft_servers.toLocaleString()}
									</a>
								</div>
							</td>
						</tr>
						<tr class="spacing"></tr>
						<tr>
							<td class="days-since-last-complaint-container">
								<h3>Days since last complaint</h3>
								<div class="days-since-last-complaint-value">
									{daysSinceLastComplaint.toString().padStart(3, '0')}
								</div>
								<div class="time-ago">({hoursSinceLastComplaint} hours ago)</div>
							</td>
						</tr>
						<tr class="spacing hidden-if-noscript"></tr>
						<tr>
							<td class="neko-status-container hidden-if-noscript">
								<div class="neko-status-title-container">
									<h3>Neko status</h3>
									<div
										class="oneko"
										aria-hidden="true"
										style="background-image: url(/retro/oneko.gif)"
										bind:this={nekoEl}
									></div>
								</div>
								<div class="neko-status-value">
									{#if nekoStatusClickable}
										<a class="status-{nekoSpriteIdsToStatuses[nekoSpriteName]}" href="/neko">
											{nekoSpriteIdsToNames[nekoSpriteName]}
										</a>
									{:else}
										<span class="status-{nekoSpriteIdsToStatuses[nekoSpriteName]}">
											{nekoSpriteIdsToNames[nekoSpriteName]}
										</span>
									{/if}
								</div>
							</td>
						</tr>
						<tr class="spacing"></tr>
						<tr>
							<td class="minecraft-uuids-scraped-container">
								<h3>Minecraft UUIDs scraped</h3>
								<div class="minecraft-uuids-scraped-value">
									<a href="https://mowojang.matdoes.dev">
										{status.minecraft_uuids_scraped.toLocaleString()}
									</a>
								</div>
							</td>
						</tr>
						<tr class="spacing"></tr>
						<tr>
							<td class="buttons-scraped-container">
								<h3>88x31s scraped</h3>
								<div class="buttons-scraped-value">
									<a href="/buttons">{status.buttons_scraped.toLocaleString()}</a>
								</div>
							</td>
						</tr>
						<tr class="spacing"></tr>
						<tr>
							<td class="data-last-updated">
								<h3>Data last updated</h3>
								<div class="data-last-updated-date">
									{browser ? `${timeAgo(lastUpdatedAt)} ago` : lastUpdatedAt.toISOString()}
								</div>
							</td>
						</tr>
					</tbody>
				</table>
			</td>
			<td valign="top">
				<div id="welcome">
					<table>
						<tbody>
							<tr>
								<td><img src={sparkles} alt="sparkles" width="100" height="100" /></td>
								<td>
									<h1>welcome to mat's site!!!</h1>
								</td>
								<td><img src={sparkles} alt="sparkles" width="100" height="100" /></td>
							</tr>
						</tbody>
					</table>
					<table>
						<tbody>
							<tr>
								<td>
									<div>
										hi, thanks for stopping by. i am mat, i make things on the internet.
										<br />
										this is my personal web site on the world wide web.
									</div>
								</td>
							</tr>
						</tbody>
					</table>
					<br />
					<table width="600">
						<tbody>
							<tr>
								<td>
									<div class="buttons">
										<!-- friends -->
										<Button href="//matdoes.dev" src="mat.png" alt="matdoesdev" />
										<Button href="//adryd.com" src="adryd.png" alt="adryd" />
										<Button href="//notnite.com" src="notnite.png" alt="notnite" />
										<Button href="//shrecked.dev" src="shwecky.png" alt="shrecknt" />
										<Button href="//goldenstack.net" src="goldenstack.png" alt="goldenstack" />
										<Button href="//kibty.town" src="kibtytown.gif" alt="kibty.town" />
										<Button href="//honbra.com" src="honbra.png" alt="honbra" />
										<Button href="//ssi.fyi" src="ssi.gif" alt="server scanning inc" />
										<Button href="//cbax.dev" src="cbax.gif" alt="cbax" />
										<Button href="//8minty.me" src="8minty.gif" alt="8minty" />
										<Button href="//slonk.ing" src="slonk.png" alt="slonkazoid" />
										<Button href="//actuallyruben.nl" src="actuallyruben.gif" alt="actuallyruben" />
										<Button href="//jamie.rs" src="jamie.png" alt="jamie" />
										<Button href="//jamsharp.net" src="jamsharp.png" alt="jamsharp" />
										<Button href="//sipacid.com" src="sipacid.gif" alt="sipacid" />
										<Button href="//lina.sh" src="lina.gif" alt="lina" />
										<Button href="//mudkip.dev" src="mudkip.png" alt="mudkip" />
										<Button href="//lily.pet" src="lily.png" alt="lily" />
										<Button href="//aubrey.rs" src="aubrey.png" alt="aubrey" />
										<Button href="//hayl.in" src="haylin.png" alt="haylin moore" />
										<Button href="//ezri.pet" src="ezri.png" alt="ezri" />
										<Button
											href="//thomasricci.dev"
											src="rudrecciah.png"
											alt="thomas ricci aka rudrecciah"
										/>
										<Button href="//zptr.cc" src="zeroptr.png" alt="yui aka zeroptr" />
										<Button href="//ednamode.xyz" src="edna.png" alt="edna" />
										<Button href="//alula.me" src="alula.png" alt="alula" />
										<Button href="//nap.is.being.pet" src="nap.gif" alt="naphteine" />
										<Button href="//jordane.day" src="jordan.gif" alt="jordan aka 1sreal" />
										<Button href="//izzyn.dev" src="izzy.gif" alt="izzyn" />
										<Button
											href="//www.pineapplecat.dev"
											src="pineapplecat.png"
											alt="pineapple cat"
										/>
										<Button href="//patsore.org" src="patsore.png" alt="patsore" />
										<!-- other -->
										<Button href="//github.com/mat-1" src="github.gif" alt="github" />
										<Button href="//ko-fi.com/matdoesdev" src="kofi.gif" alt="kofi" />
										<Button href="//code.visualstudio.com" src="vscode.gif" alt="vscode" />
										<Button href="//www.hetzner.com" src="hetzner.gif" alt="hetzner" />
										<Button
											href="//www.mozilla.org/en-US/firefox/new"
											src="anythingbutchrome.gif"
											alt="anythingbutchrome"
										/>
										<Button href="//www.torproject.org" src="tor.gif" alt="tor" />
										<Button href="//ublockorigin.com" src="ublockorigin.png" alt="ublock origin" />
										<Button
											href="//www.eff.org"
											src="fightforprivacy.gif"
											alt="fight for privacy"
										/>
										<Button
											href="//ftp.nluug.nl/netscape/netscape9/en-US/9.0/windows/win32/netscape-navigator-9.0.0.6.exe"
											src="netscape.gif"
											alt="netscape"
										/>
										<Button
											href="//archive.org"
											src="internet-archive.png"
											alt="internet archive"
										/>
										<Button
											href="//thunderbird.net"
											src="thunderbird.gif"
											alt="thunderbird: free your inbox"
										/>
										<Button
											href="//www.mozilla.org/en-US/firefox/new"
											src="firefox.gif"
											alt="tested on firefox"
										/>
										<Button href="//matrix.org" src="matrix.png" alt="matrix" />
										<Button href="//caddyserver.com" src="caddy.png" alt="caddy" />
										<Button
											href="//display-a.sand.cat"
											src="sandcat.png"
											alt="display a sand cat"
										/>
										<Button href="http://makea.fish" src="makeafish.png" alt="make a fish" />
										<Button
											href="//seized.matdoes.dev"
											src="seized.gif"
											alt="this 88x31 has been seized"
										/>
										<Button href="//deltarune.com" src="deltarune.png" alt="kris where tf are we" />
									</div>
								</td>
							</tr>
						</tbody>
					</table>

					<table id="sections">
						<tbody>
							<tr>
								<td class="section contact">
									<table width="300">
										<tbody>
											<tr>
												<td>
													<div><img src={contact} alt="contact" width="200" height="40" /></div>
													<p>
														my preferred method of contact is <a
															href="https://matrix.to/#/@mat:matdoes.dev">matrix</a
														>, but you can also email me (i have a catch-all on this domain). i'm
														also on
														<a href="https://f.matdoes.dev/mat">the fediverse</a>.
													</p>
												</td>
											</tr>
										</tbody>
									</table>
								</td>
								<td class="section links">
									<table width="300">
										<tbody>
											<tr>
												<td>
													<div><img src={links} alt="links" width="200" height="40" /></div>
													<p>
														i have a github at <a href="https://github.com/mat-1"
															>github.com/mat-1</a
														>, and you can give me money through ko-fi at
														<a href="https://ko-fi.com/matdoesdev">ko-fi.com/matdoesdev</a>.
													</p>
												</td>
											</tr>
										</tbody>
									</table>
								</td>
							</tr>
						</tbody>
					</table>
				</div>
			</td>
			<td valign="top">
				<div class="right-sidebar">
					<h2>PROJECTS</h2>
					{#each projects as project}
						<div class="sidebar-list-entry-container">
							<a href={project.href}>{project.name}</a>
						</div>
					{/each}
				</div>
			</td>
		</tr>
		<tr>
			<td>
				<p class="last-updated">Page last updated: December 9, 2014</p>
			</td>
			<td>
				<center>
					<img src="//counter.matdoes.dev" alt="visitor counter" id="counter" />
				</center>
			</td>
			<td></td>
			<td></td>
		</tr>
		<tr>
			<td> </td>
			<td>
				<div class="blog-posts-section">
					<h2>BLOG POSTS</h2>
					{#each posts as post}
						<a href={post.slug} class="blog-post-container">
							<div class="blog-post">
								<h2 class="blog-post-preview-title">{post.title}</h2>
								<div class="blog-post-preview">{@html post.html}</div>
							</div>
						</a>
					{/each}
				</div>
			</td>
		</tr>
	</tbody>
</table>
<table id="second-table">
	<tbody>
		<tr>
			<td class="about-container" rowspan="2">
				<div class="about"></div>
			</td>
			<td width="300px" class="qotd-container">
				<div class="qotd">
					<h3>QUOTE OF THE DAY</h3>
					<p>
						&gt;&nbsp;{data.qotd}
					</p>
				</div>
			</td>
		</tr>
		<tr>
			<td>
				<!--  -->
			</td><td>
				<!--  -->
			</td>
		</tr>
	</tbody>
</table>
<div class="bottom"></div>

<noscript>
	<style>
		.hidden-if-noscript {
			display: none;
		}
	</style>
</noscript>

<style>
	.right-sidebar {
		text-align: right;
		height: 800px;
		overflow-y: scroll;
		float: right;
		clear: right;
	}
	.sidebar-list-entry-container {
		margin: 0.5em 0;
		max-width: fit-content;
		float: right;
		clear: right;
	}

	#main-table {
		width: 100%;
	}

	.bottom {
		margin-bottom: 5rem;
	}

	#welcome {
		margin: 0 auto;
		max-width: 600px;
		height: 100%;
	}

	h1 {
		background: linear-gradient(0deg, #aaa, #fff);
		/* fallback */
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		background-clip: text;
		filter: drop-shadow(2px 2px #333);
		text-align: center;
	}

	@supports (-webkit-background-clip: text) {
		h1 {
			background-color: #fff;
		}
	}

	#sections {
		width: 100%;
		table-layout: fixed;
		margin-top: 8em;
	}
	.section p {
		max-width: 300px;
	}
	.contact {
		padding-right: 10px;
	}

	#counter {
		display: block;
	}

	.last-updated {
		font-style: italic;
		color: #888;
		text-align: center;
		font-family: monospace;
	}

	.left-sidebar {
		/* 210px so "Sleeping" fits */
		width: 210px;
		text-align: center;
	}
	.left-sidebar-container {
		width: 210px;
	}
	.left-sidebar > tbody > tr > td {
		background-color: #000;
		border: 2px solid #222;
		border-radius: 8px;
		padding: 0.25em;
	}
	.days-since-last-complaint-container {
		text-align: center;
	}
	.left-sidebar h3 {
		margin-top: 0;
		margin-bottom: 0.2em;
	}
	.days-since-last-complaint-value {
		font-family: 'Courier New', Courier, monospace;
		color: #11151c;
		background: #bfbdb6;
		width: fit-content;
		margin: 0 auto;
		padding: 0 0.15em;
		border: 1px solid #000;
		border-radius: 4px;
		font-size: 1.5em;
		vertical-align: 4px;
		text-shadow: 2px 2px 0 #999;
	}

	.left-sidebar .spacing {
		height: 12px;
	}
	.days-since-last-complaint-container .time-ago {
		color: #999;
		font-size: 0.8em;
	}

	.data-last-updated {
		font-family: monospace;
	}
	.data-last-updated-date {
		color: #eee;
	}

	.current-time-cst-container {
		text-align: center;
	}
	.current-time-cst-value {
		color: #aad94c;
	}
	.current-time-cst-info {
		color: #acb6bf8c;
	}

	.website-status-container {
		text-align: center;
	}
	.website-status-value {
		color: #555;
		vertical-align: middle;
	}

	.status-up,
	.status-idle,
	.status-down {
		font-size: 1.5em;
		font-family: 'Press Start 2P';
		margin-left: 0.1em;
	}
	.status-up {
		color: #0f0;
		text-shadow:
			0 0 2px #0f0,
			0 0 2px #0f0,
			0 0 2px #0f0,
			0 0 2px #0f0;
	}
	.status-idle {
		color: #ff0;
		text-shadow:
			0 0 2px #ff0,
			0 0 2px #ff0,
			0 0 2px #ff0,
			0 0 2px #ff0;
	}
	.status-down {
		color: #f00;
		text-shadow:
			0 0 2px #f00,
			0 0 2px #f00,
			0 0 2px #f00,
			0 0 2px #f00;
	}

	.neko-status-title-container h3 {
		display: inline-block;
	}
	.oneko {
		display: inline-block;
	}

	.left-sidebar a {
		/* don't make the links obviously clickable */
		text-decoration: none;
		color: inherit !important;
	}

	.active-minecraft-servers-value,
	.minecraft-uuids-scraped-value,
	.buttons-scraped-value {
		border: 2px solid #333;
		background-color: #111;
		border-radius: 8px;
		max-width: fit-content;
		margin: 0 auto;
		padding: 1px;
		color: #d2a6ff;
	}

	.qotd-container {
		vertical-align: top;
	}
	.qotd {
		font-family: serif;
		border: 1px solid #fffa;
		padding: 1rem;
		background: url(/retro/purple4.gif);
		max-width: 300px;
		word-wrap: break-word;
	}
	.qotd h3 {
		margin: 0;
		color: #7fd962;
	}

	#second-table {
		width: 100%;
	}

	.about {
		margin-left: 0.5em;
		padding: 0.5em;
		display: block;
		max-width: 650px;
	}

	.blog-posts-section {
		margin: 0 auto;
		width: fit-content;
	}
	.blog-post-container {
		display: block;
		border: 2px solid #00f;
		background-color: #000;
		max-width: 650px;
		font-family: 'Courier New', Courier, monospace;
		margin-top: 1rem;
		margin-bottom: 1.5rem;
		box-shadow: 6px 6px #104;
		height: 14em;
		overflow: hidden;
	}
	.blog-post-preview-title {
		background: #004;
		border-bottom: 2px solid #008;
		padding: 0.4rem 1rem 0.1rem 1rem;
	}
	.blog-post-preview {
		font-size: 0.8rem;
		padding: 0.5rem 1rem;
	}
	.blog-post-preview :global(:first-child) {
		margin-top: 0;
	}
	.blog-post-container {
		text-decoration: none;
	}
</style>
