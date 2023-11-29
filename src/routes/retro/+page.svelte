<script lang="ts">
	import sparkles from './sparkles.gif'
	import contact from './contact.gif'
	import links from './links.gif'
	import projects from '../_projects.json'

	import type { BlogPostPreview } from '../blog.json/+server.js'
	import MusicPlayer from './MusicPlayer.svelte'

	export let data
	export let posts: BlogPostPreview[] = data.posts
</script>

<MusicPlayer />

<table id="main-table">
	<tr>
		<td>
			<div id="welcome">
				<table>
					<tr>
						<td><img src={sparkles} alt="sparkles" /></td>
						<td>
							<h1>welcome to mat's site!!!</h1>
						</td>
						<td><img src={sparkles} alt="sparkles" /></td>
					</tr>
				</table>
				<div>
					hi, thanks for stopping by. i am mat, i make things on the internet.
					<br />
					this is my personal web site on the world wide web.
				</div>
				<br />
				<div>
					<a href="//matdoes.dev/"><img src="/retro/buttons/matdoesdev.png" alt="matdoesdev" /></a>
					<a href="//adryd.com/"><img src="/retro/buttons/adryd.png" alt="adryd" /></a>
					<a href="//notnite.com/"><img src="/retro/buttons/notnite.gif" alt="notnite" /></a>
					<a href="//shrecked.dev/"><img src="/retro/buttons/shwecky.png" alt="shrecknt" /></a>
					<a href="//goldenstack.github.io/"
						><img src="/retro/buttons/goldenstack.png" alt="goldenstack" /></a
					>
					<a href="//www.kibty.town/"><img src="/retro/buttons/kibtytown.gif" alt="kibty.town" /></a
					>
					<a href="//honbra.com/"><img src="/retro/buttons/honbra.png" alt="honbra" /></a>
					<a href="//archlinux.org/"><img src="/retro/buttons/archbtw.png" alt="archbtw" /></a>
					<a href="//www.mozilla.org/en-US/firefox/new/"
						><img src="/retro/buttons/getfirefox.gif" alt="getfirefox" /></a
					>
					<a href="//github.com/mat-1"><img src="/retro/buttons/github.gif" alt="github" /></a>
					<a href="//ko-fi.com/matdoesdev"><img src="/retro/buttons/kofi.gif" alt="kofi" /></a>
					<a href="//code.visualstudio.com/"><img src="/retro/buttons/vscode.gif" alt="vscode" /></a
					>
					<a href="//www.hetzner.com/"><img src="/retro/buttons/hetzner.gif" alt="hetzner" /></a>
					<a href="//www.mozilla.org/en-US/firefox/new/"
						><img src="/retro/buttons/anythingbutchrome.gif" alt="anythingbutchrome" /></a
					>
					<a href="//www.torproject.org/"><img src="/retro/buttons/tor.gif" alt="tor" /></a>
					<a href="//ublockorigin.com/"
						><img src="/retro/buttons/ublockorigin.png" alt="ublock origin" /></a
					>
					<a href="//www.eff.org/"
						><img src="/retro/buttons/fightforprivacy.gif" alt="fight for privacy" /></a
					>
					<a
						href="//ftp.nluug.nl/netscape/netscape9/en-US/9.0/windows/win32/netscape-navigator-9.0.0.6.exe"
						><img src="/retro/buttons/netscape.gif" alt="netscape" /></a
					>
				</div>
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
						<div><img src={contact} alt="contact" /></div>
						<p>
							my preferred method of contact is <a href="https://matrix.to/#/@mat:matdoes.dev"
								>matrix</a
							>, but you can also email me (i have a catch-all on this domain). i'm also on
							<a href="https://f.matdoes.dev/mat">the fediverse</a>.
						</p>
					</td>
					<td class="section links">
						<div><img src={links} alt="links" /></div>
						<p>
							i have a github at <a href="https://github.com/mat-1">github.com/mat-1</a>, and you
							can give me money through ko-fi at
							<a href="https://ko-fi.com/matdoesdev">ko-fi.com/matdoesdev</a>.
						</p>
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
	<tr><p class="last-updated">Page last updated: November 28, 2023</p></tr>
</table>

<style>
	.sidebar-list {
		text-align: right;
		height: 400px;
		overflow-y: scroll;
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
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		background-clip: text;
		filter: drop-shadow(2px 2px #333);
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
		text-align: right;
		font-family: monospace;
	}
</style>
