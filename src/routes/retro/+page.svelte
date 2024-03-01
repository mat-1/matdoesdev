<script lang="ts">
	import sparkles from './sparkles.gif'
	import contact from './contact.gif'
	import links from './links.gif'
	import projects from '../_projects.json'

	import type { BlogPostPreview } from '../blog.json/+server.js'
	import Button from './Button.svelte'

	export let data
	export let posts: BlogPostPreview[] = data.posts
</script>

<table id="main-table">
	<tr>
		<td>
			<div id="welcome">
				<table>
					<tr>
						<td><img src={sparkles} alt="sparkles" width="100" height="100" /></td>
						<td>
							<h1>welcome to mat's site!!!</h1>
						</td>
						<td><img src={sparkles} alt="sparkles" width="100" height="100" /></td>
					</tr>
				</table>
				<table>
					<tr>
						<td>
							<div>
								hi, thanks for stopping by. i am mat, i make things on the internet.
								<br />
								this is my personal web site on the world wide web.
							</div>
						</td>
					</tr>
				</table>
				<br />
				<table width="600">
					<tr>
						<td>
							<div class="buttons">
								<Button href="//matdoes.dev" src="mat.png" alt="matdoesdev" />
								<Button href="//adryd.com" src="adryd.png" alt="adryd" />
								<Button href="//notnite.com" src="notnite.png" alt="notnite" />
								<Button href="//shrecked.dev" src="shwecky.png" alt="shrecknt" />
								<Button href="//goldenstack.net" src="goldenstack.png" alt="goldenstack" />
								<Button href="//www.kibty.town" src="kibtytown.gif" alt="kibty.town" />
								<Button href="//honbra.com" src="honbra.png" alt="honbra" />
								<Button href="//ssi.fyi" src="ssi.gif" alt="server scanning inc" />
								<Button href="//cbax.dev" src="cbax.gif" alt="cbax" />
								<Button href="//8minty.me" src="8minty.gif" alt="8minty" />
								<Button href="//slonk.ing" src="slonk.png" alt="slonkazoid" />
								<Button href="//actuallyruben.nl" src="actuallyruben.gif" alt="actuallyruben" />
								<Button href="//jamie.rs" src="jamie.png" alt="jamie" />
								<Button href="//archlinux.org" src="archbtw.png" alt="archbtw" />
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
								<Button href="//www.eff.org" src="fightforprivacy.gif" alt="fight for privacy" />
								<Button
									href="//ftp.nluug.nl/netscape/netscape9/en-US/9.0/windows/win32/netscape-navigator-9.0.0.6.exe"
									src="netscape.gif"
									alt="netscape"
								/>
								<Button href="//archive.org" src="internet-archive.png" alt="internet archive" />
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
								<Button href="//caddyserver.com/" src="caddy.png" alt="caddy" />
							</div>
						</td>
					</tr>
				</table>
			</div>
		</td>
		<td>
			<div class="sidebar-list">
				<h2>BLOG POSTS</h2>
				{#each posts as post}
					<div><a href={post.slug}>{post.title}</a></div>
				{/each}
			</div>
		</td>
	</tr>
	<tr>
		<td>
			<table id="sections">
				<tr>
					<td class="section contact">
						<table width="300">
							<tr>
								<td>
									<div><img src={contact} alt="contact" width="200" height="40" /></div>
									<p>
										my preferred method of contact is <a href="https://matrix.to/#/@mat:matdoes.dev"
											>matrix</a
										>, but you can also email me (i have a catch-all on this domain). i'm also on
										<a href="https://f.matdoes.dev/mat">the fediverse</a>.
									</p>
								</td>
							</tr>
						</table>
					</td>
					<td class="section links">
						<table width="300">
							<tr>
								<td>
									<div><img src={links} alt="links" width="200" height="40" /></div>
									<p>
										i have a github at <a href="https://github.com/mat-1">github.com/mat-1</a>, and
										you can give me money through ko-fi at
										<a href="https://ko-fi.com/matdoesdev">ko-fi.com/matdoesdev</a>.
									</p>
								</td>
							</tr>
						</table>
					</td>
				</tr>
			</table>
		</td>
		<td>
			<div class="sidebar-list">
				<h2>PROJECTS</h2>
				{#each projects as project}
					<div><a href={project.href}>{project.name}</a></div>
				{/each}
			</div>
		</td>
	</tr>
	<tr>
		<td>
			<img src="//counter.matdoes.dev" alt="visitor counter" id="counter" />
		</td>
	</tr>
	<tr><td><p class="last-updated">Page last updated: February 24, 2024</p></td></tr>
</table>

<style>
	.sidebar-list {
		text-align: right;
		height: 400px;
		overflow-y: scroll;
		padding-right: 10px;
	}

	#main-table {
		width: 100%;
	}

	#welcome {
		margin: 0 auto;
		max-width: 600px;
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
	}
	.section p {
		max-width: 300px;
	}
	.contact {
		padding-right: 10px;
	}

	#counter {
		margin: 0 auto;
		display: block;
	}

	.last-updated {
		font-style: italic;
		color: #888;
		text-align: center;
		font-family: monospace;
	}
</style>
